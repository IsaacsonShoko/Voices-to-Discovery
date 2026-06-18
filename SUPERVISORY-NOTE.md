# Supervisory Revision Note — From Voices to Discovery

**To:** GPT-5 (implementer)
**From:** Supervising engineer
**Re:** Scope-gap remediation against `fvtd-agent-prompt.md` and the client brief (`Details - Movement Website.docx`)

You delivered a working scaffold with several sections built well. The engine choice
(**MySQL via `mysql2`**) is accepted as an intentional deviation from the spec — it is
simpler on Railway and we are keeping it. **Do not migrate to PostgreSQL.** However, the
build still drifts from the spec on its **data contract**, and it silently deferred the
brief's single most important page. Treat `fvtd-agent-prompt.md` as authoritative on
everything *except* the database engine, and treat the brief as authoritative on
*priority/emphasis*. Fix the items below in priority order, and preserve the parts marked
correct.

## Context you must respect
- **Database engine: MySQL is final.** Keep `mysql2`, the pool in `server/db.js`, and the
  MySQL-flavored DDL (`AUTO_INCREMENT`, `SHOW INDEX FROM`). Where the spec says PostgreSQL,
  ignore it and use the MySQL equivalent.
- The spec wins on **everything else** (schema shape, endpoints, UI behavior) unless noted.
- Confirmed genuine **Phase 2** (do not build): Ambassador Programme, Youth & Students,
  Events, Discoveries. The brief frames these as later expansion ("eventually").

---

## P0 — Contract violations (must fix)

**1. Split the single `supporters` table into the two spec'd tables (MySQL).**
The spec requires distinct semantics for signing the declaration vs. joining the movement.
You collapsed both into one `supporters` table, which lost the unique-email guarantee on
signatures and made signers indistinguishable from joiners/newsletter. Recreate both,
MySQL-native, auto-created on startup with `CREATE TABLE IF NOT EXISTS`:
- `signatories` — `id INT AUTO_INCREMENT PRIMARY KEY`, `name`, `email` **UNIQUE NOT NULL**,
  `country`, `role`, `signed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`.
- `movement_joiners` — `id INT AUTO_INCREMENT PRIMARY KEY`, `name`, `email NOT NULL`,
  `audience_type NOT NULL`, `country`, `organisation`, `joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`.
- On a duplicate-signature insert (`ER_DUP_ENTRY`), return a clean handled response
  (e.g. 409), not a 500.

**2. Implement the live signature counter — this is a missing feature, not a bug.**
- Add `GET /api/signatories/count` (public) returning the total from `signatories`.
- In `Declaration.tsx`, fetch it on mount and render `[count] voices have signed this
  declaration.`, replacing the static placeholder line (`Declaration.tsx:28`).
- This is an explicit Quality Checklist item and is currently absent everywhere.

**3. Restore the endpoint contract.** Replace `/api/supporters` with:
- `POST /api/signatories`, `GET /api/signatories/count` (public), `GET /api/signatories`
  (admin, `x-admin-key`)
- `POST /api/joiners`, `GET /api/joiners` (admin, `x-admin-key`)
- Footer newsletter posts to `/api/joiners` with `audience_type: "Newsletter"`.

**4. Give the Declaration its own dedicated signature form + success state.**
Spec wants an **inline** signature form in the Declaration section (fields: name*, email*,
country, `I am a:` dropdown → maps to `signatories.role`), not the shared generic modal.
On success show the personalized gold flash: `[Name], your voice has been added.`
- Keep the shared `SignupModal` for the Join pathways only (posts to `/api/joiners`).
- Join success state must read `Welcome to the movement.` with a gold checkmark +
  "Share this page" link (currently a generic message for all paths).

---

## P0.5 — Phase-boundary decisions the owner must confirm (do not silently inherit)

The agent prompt deferred several items the brief marks as important. These must be
**conscious owner decisions**, not defaults inherited by omission.

**A. "Why Representation Matters" is the brief's #1 priority but is deferred.**
The brief names this *the single most important page* ("If I could only create one page, it
would be: Why Representation Matters"). The current build omits it.
- **Recommended:** build it now as one long-form static article page (own route,
  Cormorant Garamond / Inter, same 60-30-10 palette) with placeholder copy the owner fills
  in. Low effort; satisfies the brief's stated #1.
- If it truly stays Phase 2, that must be an explicit, recorded owner decision.
- *Status: awaiting owner confirmation before implementation.*

**B. Stories is "the emotional heart" but has no real content.**
Section 5 renders six placeholder cards with dark rectangles. The shell is acceptable for
launch **only if** the owner has a content plan. Treat real video/thumbnails as a launch
blocker for this section's stated purpose, not a nice-to-have. Surface this to the owner.

**C. Hero is abstract, not human.**
Brief asked for a cinematic hero of faces/communities/scientists; build delivers an abstract
constellation. Confirm whether that substitution is acceptable or whether the owner intends
to supply hero imagery/video.

---

## P1 — Deploy & config

**5. Add `railway.toml`** at repo root with `[build]`/`[deploy]` blocks (nixpacks build;
`startCommand = "node server/index.js"`; `restartPolicyType = "on_failure"`). Reconcile the
build strategy with the root `package.json` workspaces setup — don't ship two conflicting
build definitions. Assume a **Railway MySQL plugin** providing `MYSQL_URL`/`DATABASE_URL`
(your `db.js` already reads both — keep that).

**6. `server/.env.example` stays MySQL** (current contents are fine). Confirm `ADMIN_KEY`,
`NODE_ENV`, `PORT`, and the MySQL connection vars are all present and that no real
credentials are committed.

---

## P2 — Behavioral detail

**7. Modal locks the wrong field.** When opened from a Join pathway card, `audience_type`
must be **pre-filled and read-only** (it's the card's audience). Currently `audience_type`
is an editable `<select>` and `signup_for` is the read-only field — invert this.

---

## Do NOT change (verified correct — preserve)
- The MySQL engine, pool config, and connection-resolution logic in `db.js`.
- All 9 sections + Navbar + Footer structure and wiring in `App.tsx`.
- **The Journey** signature element: sequential `IntersectionObserver` activation,
  complete/active/future node states, `river-pulse` / `pulse-node` keyframes. Well done.
- `prefers-reduced-motion` handling, Framer Motion scroll reveals, the 60-30-10 palette,
  no-pure-white/black compliance.
- Admin-key guard and server-side input trimming/validation (port these to the new routes
  unchanged).

---

## Acceptance criteria (verify before returning)
- [ ] Still MySQL (`mysql2`); no PostgreSQL introduced.
- [ ] `signatories` and `movement_joiners` both auto-create; `signatories.email` is UNIQUE;
      duplicate signature handled gracefully (no 500).
- [ ] `GET /api/signatories/count` returns a number; Declaration shows the live count on load.
- [ ] All five spec'd endpoints exist with correct public/admin guards; `/api/supporters` removed.
- [ ] Declaration has its own inline form + personalized success flash; Join modal shows
      "Welcome to the movement." + checkmark.
- [ ] Newsletter posts to `/api/joiners` with `audience_type: "Newsletter"`.
- [ ] `railway.toml` present and consistent with root build scripts.
- [ ] Pathway-card audience type is read-only in the modal.
- [ ] Owner decisions on P0.5 items A/B/C recorded before final sign-off.
- [ ] `npm run build` (client) and server start both succeed with no type errors.

# Agent Build Prompt: From Voices to Discovery

## Project Overview

You are building a high-fidelity movement website called **From Voices to Discovery** for Afromics and the African Genome Project. This is not a biotech company website. It is a continental movement platform, comparable in emotional register to Global Citizen, TED, and the Gates Foundation. The site must make a visitor think: "I want to be part of this", not "this is a genomics initiative."

The deliverable is a full-stack web application deployable to Railway, consisting of:

- A React 18 + Vite frontend
- An Express.js backend
- A PostgreSQL database
- A monorepo folder structure with `/client` and `/server`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, TypeScript |
| Styling | Tailwind CSS v3 + custom CSS for animations |
| Animations | Framer Motion |
| Backend | Node.js, Express.js |
| Database | PostgreSQL via `pg` (node-postgres) |
| Deployment | Railway (single service, monorepo) |
| Fonts | Google Fonts: Cormorant Garamond (display), Inter (body) |

---

## Folder Structure

```
from-voices-to-discovery/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── MissingVoices.tsx
│   │   │   ├── WhyVoicesMatter.tsx
│   │   │   ├── TheJourney.tsx
│   │   │   ├── Stories.tsx
│   │   │   ├── AfricanGenomeProject.tsx
│   │   │   ├── Imagine2040.tsx
│   │   │   ├── JoinTheMovement.tsx
│   │   │   ├── Declaration.tsx
│   │   │   └── Footer.tsx
│   │   ├── hooks/
│   │   │   └── useScrollReveal.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
├── server/
│   ├── index.js
│   ├── db.js
│   ├── routes/
│   │   ├── signatories.js
│   │   └── joiners.js
│   └── package.json
├── package.json
└── README.md
```

---

## Colour System: The 60-30-10 Rule

This is non-negotiable. Every colour decision in the UI must conform to the 60-30-10 rule. Any deviation will make the site feel inconsistent and generic.

### The Palette

| Role | Name | Hex | Usage |
|---|---|---|---|
| 60% Dominant | Deep Night | `#0A0F1E` | Page backgrounds, section backgrounds, the canvas |
| 30% Secondary | Warm Parchment | `#F2EDE4` | Body text, card backgrounds, large text blocks |
| 10% Accent | Ancestral Gold | `#C9A84C` | CTAs, highlights, animated elements, active states, the Journey river glow |

### Supporting Tones (used sparingly within the 30% budget)

| Name | Hex | Usage |
|---|---|---|
| Deep Forest | `#1A3A2F` | Alternate section backgrounds for contrast rhythm |
| Muted Clay | `#8B5E3C` | Secondary text, icon fills, subtle borders |

### Rules

1. Deep Night `#0A0F1E` must cover at least 60% of any given viewport at all times. It is the sky. Everything lives within it.
2. Parchment `#F2EDE4` is the light. It appears in text, cards, and content containers. Never use pure white `#FFFFFF`.
3. Gold `#C9A84C` is used only where attention is required: primary CTAs, the animated Journey element, active nav items, and declaration highlights. If gold appears more than 3 times on any screen at once, reduce it.
4. Never place gold text on a parchment background. The contrast is insufficient for readability.
5. Never use grey as a neutral. The muted clay and deep forest tones serve that function within the brand palette.

---

## Typography

### Typefaces

- **Display:** Cormorant Garamond (weights: 400, 600, 700). Used for all section headlines and the hero headline. This face carries gravitas and cultural weight without feeling cold or academic.
- **Body:** Inter (weights: 400, 500, 600). Used for all body copy, navigation, labels, and form elements.

### Type Scale

| Token | Size | Weight | Face | Usage |
|---|---|---|---|---|
| `display-xl` | 72px / 4.5rem | 600 | Cormorant Garamond | Hero headline |
| `display-lg` | 52px / 3.25rem | 600 | Cormorant Garamond | Section headlines |
| `display-md` | 36px / 2.25rem | 400 | Cormorant Garamond | Sub-headlines, card titles |
| `body-lg` | 20px / 1.25rem | 400 | Inter | Lead paragraphs |
| `body-md` | 16px / 1rem | 400 | Inter | Standard body copy |
| `label` | 13px / 0.8125rem | 600 | Inter | Navigation, badges, eyebrow labels |
| `caption` | 12px / 0.75rem | 400 | Inter | Captions, metadata |

### Rules

- All display headlines are set in Cormorant Garamond. No exceptions.
- Headline colour is always Parchment `#F2EDE4` on dark backgrounds.
- Line height for display text: 1.1. Line height for body text: 1.7.
- Letter spacing for `label` type: `0.12em` uppercase.
- Never centre-align body paragraphs. Centre alignment is only permitted for short display headlines and CTAs.

---

## Section Specifications

Build each section as a self-contained React component. Sections alternate between Deep Night and Deep Forest backgrounds to create rhythm without visual noise.

### Section 1: Hero

Background: Deep Night `#0A0F1E` with a very subtle radial gradient from `#0F1A35` at centre.

Layout: Full viewport height. Vertically centred content. Two columns on desktop (text left, animated visual right). Single column on mobile.

Content:
- Eyebrow label: `A CONTINENTAL MOVEMENT` in gold, uppercase, label type
- Headline: `Every Discovery Begins With A Voice` in display-xl Cormorant Garamond, parchment
- Subheadline: `For too long, millions of people have been missing from the discoveries shaping the future of healthcare. From Voices to Discovery is a movement to ensure every community has a place in the future of medicine.` in body-lg Inter, parchment at 70% opacity
- Two CTAs side by side: primary button `Join The Movement` (gold background, night text), ghost button `Watch The Story` (gold border, gold text)
- Animated element on the right: a slow-moving constellation of connected dots representing community nodes. Dots pulse gently. Connection lines are gold at 20% opacity. Built in pure CSS or lightweight canvas, not a heavy library.

Animation: On page load, headline fades up with a 0.6s ease-out. Subheadline follows at 0.9s. CTAs at 1.2s. Constellation is ambient and continuous.

### Section 2: The Missing Voices

Background: Deep Forest `#1A3A2F`

Layout: Full-width. Large headline centred. Three-column stat grid below on desktop, stacked on mobile.

Content:
- Headline: `The Future Of Medicine Cannot Be Built On Missing Voices` in display-lg, parchment, centred
- Body: `Every day, new medicines are developed. New AI systems are trained. New diagnostic tools are created. New discoveries change lives. Yet many of the world's most diverse populations remain underrepresented in the data that powers these advances. When voices are missing, knowledge is incomplete. When knowledge is incomplete, healthcare suffers.` in body-md, parchment at 80% opacity
- Three impact statements rendered as large-number cards with clay borders:
  - `90%` / `of genomic research data comes from populations of European ancestry`
  - `1.4B` / `people on the African continent currently underrepresented in global genomic databases`
  - `2040` / `the year by which representative genomic data could transform African healthcare outcomes`

Note: These are illustrative placeholder figures. The owner must replace with verified statistics before launch.

Animation: Cards count up from zero when they scroll into view.

### Section 3: Why Voices Matter

Background: Deep Night `#0A0F1E`

Layout: Headline top. Five horizontally scrollable cards on mobile, five-column grid on desktop.

Content:
- Eyebrow: `FIVE VOICES. ONE DISCOVERY.`
- Headline: `Every Voice Contributes Something Essential`
- Five cards, each with an icon, a title, and two lines of copy:
  - A Mother: `Seeking answers for her child. Her experience reveals gaps that data alone cannot show.`
  - A Patient: `Searching for better treatment. Her biology holds clues science has not yet mapped.`
  - A Doctor: `Making difficult decisions. Her practice depends on evidence built for her patients.`
  - A Scientist: `Trying to understand disease. Her research needs the full picture of human diversity.`
  - A Community: `Wanting a healthier future. Their participation is what makes discovery possible.`
- Footer line below the cards: `Together they become discovery.` in display-md Cormorant Garamond, gold, centred

Cards: Deep Forest background `#1A3A2F`, parchment text, gold icon accent, subtle gold border on hover. Hover state lifts the card 4px with a box-shadow transition.

### Section 4: The Journey (SIGNATURE ELEMENT)

Background: Deep Night `#0A0F1E`

This is the most important visual on the site. It must be built with care.

Layout: Full-width, tall section. Centred vertical flow. On desktop, the journey nodes are arranged in a vertical river with branching connectors. On mobile, it is a clean vertical stack.

Content: Six animated nodes in sequence:

```
VOICE
  |
PARTICIPATION
  |
KNOWLEDGE
  |
DISCOVERY
  |
HEALTHCARE
  |
IMPACT
```

Each node is a circle with the stage label inside. The connecting lines between nodes are animated: a gold pulse travels downward continuously, as if energy is flowing from voice to impact. This represents the movement's central thesis visually.

Node state: The active (pulsing) node glows with a gold outer ring. Completed nodes are solid parchment. Future nodes are outlined only in clay.

On scroll: As the visitor scrolls through this section, each node activates in sequence. Use an Intersection Observer to trigger each node's active state.

Each node also has a short descriptor that appears to the right on desktop:

- VOICE: `A community shares their experience`
- PARTICIPATION: `They contribute to research`
- KNOWLEDGE: `Data becomes understanding`
- DISCOVERY: `Understanding becomes insight`
- HEALTHCARE: `Insight shapes treatment`
- IMPACT: `Communities share in the benefits`

Headline above the flow: `From A Single Voice To A Changed World` in display-lg, parchment.

### Section 5: Stories That Shape Discovery

Background: Deep Forest `#1A3A2F`

Layout: Headline left. Three-column video card grid on desktop, single column on mobile.

Content:
- Eyebrow: `STORIES`
- Headline: `The Human Stories Behind The Science`
- Six story cards. Each card contains: a 16:9 thumbnail placeholder (dark rectangle with a play icon in gold), a category badge, and a title.
  - Category: Patient Voice / Title: `Living With Sickle Cell`
  - Category: Researcher / Title: `The Researcher's Story`
  - Category: Community / Title: `Voices From Communities`
  - Category: Science / Title: `Building Science In Africa`
  - Category: Future / Title: `The Future Through A Student's Eyes`
  - Category: Why It Matters / Title: `Why Representation Matters`

Note: Video thumbnails and links are placeholders. Owner populates real content.

CTA below grid: `Explore All Stories` ghost button, gold border.

### Section 6: The African Genome Project

Background: Deep Night `#0A0F1E` with a horizontal gold rule `1px` across the top.

Layout: Two columns. Left: headline and copy. Right: a simple visual of a stylised African continent outline drawn in gold SVG lines, glowing softly.

Content:
- Eyebrow: `THE PROJECT`
- Headline: `Building One Of The Most Important Scientific Initiatives Of Our Generation`
- Body: `The African Genome Project aims to ensure that future discoveries reflect the full diversity of humanity. Powered by Afromics, the project seeks to build the genomic infrastructure required for the next generation of healthcare, research and innovation across the continent.`
- CTA: `Explore The African Genome Project` primary button, gold

### Section 7: Imagine 2040

Background: Deep Forest `#1A3A2F`

Layout: Full-viewport-height immersive section. Dark background. Four vision statements appear one at a time as the visitor scrolls, each fading in and then fading out before the next appears. On mobile, they stack vertically.

Content:
- Eyebrow: `IMAGINE 2040`
- Four statements in display-md Cormorant Garamond, parchment, centred, with generous spacing:
  - `Every child receives treatment informed by their biology.`
  - `Every healthcare system has access to representative evidence.`
  - `Every discovery reflects humanity's diversity.`
  - `Every community shares in the benefits of science.`
- Closing line: `That future begins today.` in display-lg, gold, centred

Animation: Each statement uses a slow fade-in / fade-out scroll-linked transition. This section should feel meditative, not rushed.

### Section 8: Join The Movement

Background: Deep Night `#0A0F1E`

Layout: Headline centred. Six audience pathway cards in a 3x2 grid on desktop, stacked on mobile. Each card has a title, three action words, and a `Get Involved` CTA that opens a modal form.

Content:
- Headline: `Where Do You Fit In This Movement?`
- Six audience cards:
  - Communities: Learn. Participate. Share.
  - Researchers: Collaborate. Contribute. Discover.
  - Students: Learn. Train. Lead.
  - Healthcare Professionals: Advocate. Educate. Support.
  - Policymakers: Shape systems. Enable progress.
  - Philanthropists: Catalyse change.

Modal form fields (posts to `/api/joiners`):
- Full name (required)
- Email address (required)
- Audience type (pre-filled from the card they clicked, read-only)
- Country
- Organisation or Institution
- Submit button: `Join The Movement`

Success state: Modal shows `Welcome to the movement.` with a gold checkmark and a `Share this page` link.

### Section 9: The Declaration

Background: Deep Night `#0A0F1E` with a centred gold vertical rule running the full height behind the content.

Layout: Full-width centred column. Narrow max-width (720px). This section must feel solemn and significant.

Content:
- Eyebrow: `THE FROM VOICES TO DISCOVERY DECLARATION`
- Declaration text in display-md Cormorant Garamond, parchment, line-height 2.0, with each belief on its own line:

```
We believe:

Every voice matters.
Every community deserves representation.
Every discovery should benefit humanity.
Science should be inclusive.
Innovation should be ethical.
Communities should share in the value they create.
The future of medicine should belong to everyone.

We commit to building that future together.
```

- Live counter below: `[count] voices have signed this declaration.` Updates in real time on page load from `/api/signatories/count`.

- Signature form (posts to `/api/signatories`):
  - Full name (required)
  - Email address (required)
  - Country
  - I am a: dropdown (Community member, Patient, Researcher, Doctor, Student, Policymaker, Philanthropist, Other)
  - Submit button: `Sign The Declaration`

Success state: Name appears briefly in a gold flash below the form: `[Name], your voice has been added.`

---

## Navigation

Fixed top navbar. Transparent on hero, transitions to Deep Night `#0A0F1E` with a bottom border in clay on scroll.

Left: `From Voices to Discovery` wordmark in Cormorant Garamond 600, parchment.
Right: nav links in Inter label type: `The Movement`, `Stories`, `The Project`, `Join`, `Sign The Declaration` (gold, slightly bolder).

Mobile: hamburger icon opens a full-screen menu overlay in Deep Night with the same links stacked vertically, centred.

---

## Footer

Background: Deep Night `#0A0F1E` with a top gold rule.

Three columns: About the movement (short copy), Quick Links, and a newsletter sign-up (name + email, posts to `/api/joiners` with audience_type `Newsletter`).

Bottom bar: `From Voices to Discovery is a movement powered by Afromics.` in caption type, clay.

---

## Database: PostgreSQL

On server start, auto-create two tables if they do not exist:

```sql
CREATE TABLE IF NOT EXISTS signatories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(300) NOT NULL UNIQUE,
  country VARCHAR(100),
  role VARCHAR(100),
  signed_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS movement_joiners (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(300) NOT NULL,
  audience_type VARCHAR(100) NOT NULL,
  country VARCHAR(100),
  organisation VARCHAR(200),
  joined_at TIMESTAMP DEFAULT NOW()
);
```

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| POST | `/api/signatories` | Submit a declaration signature |
| GET | `/api/signatories/count` | Public: returns total signature count |
| GET | `/api/signatories` | Admin only (requires `x-admin-key` header) |
| POST | `/api/joiners` | Submit a movement join request |
| GET | `/api/joiners` | Admin only (requires `x-admin-key` header) |

The server serves the React build as static files in production. All non-API routes return `index.html` for client-side routing.

---

## Environment Variables

The server reads from a `.env` file. Create a `.env.example` with these keys:

```
DATABASE_URL=postgresql://user:password@host:5432/fvtd
ADMIN_KEY=replace-with-a-secure-random-string
NODE_ENV=development
PORT=3001
```

On Railway, these are set as environment variables in the service dashboard. Railway auto-injects `DATABASE_URL` when a PostgreSQL plugin is added to the project.

---

## Railway Deployment Configuration

Create a `railway.toml` in the root:

```toml
[build]
builder = "nixpacks"
buildCommand = "cd client && npm install && npm run build && cd ../server && npm install"

[deploy]
startCommand = "node server/index.js"
restartPolicyType = "on_failure"
```

Set `NODE_ENV=production` in Railway environment variables.

---

## Animations: Rules and Constraints

1. Use Framer Motion for scroll-triggered reveals on section entry. Every section fades up with a `y: 40` to `y: 0` transition and `opacity: 0` to `opacity: 1` over `0.7s ease-out`.
2. The Journey river pulse is the single most important animation. It must feel alive and continuous, not jittery. Use a CSS `@keyframes` pulse that travels downward through the connecting lines. Gold at 80% opacity at peak, 20% opacity at rest.
3. The Imagine 2040 section uses scroll-linked opacity. Each statement fades in as it enters the viewport and fades out as it leaves. Do not use auto-play timers for this.
4. The hero constellation is ambient. It must never distract from the headline. Maximum opacity of connection lines: 25%.
5. Respect `prefers-reduced-motion`. Wrap all Framer Motion animations with a check: if reduced motion is preferred, disable transitions and show content statically.
6. Do not use animation libraries other than Framer Motion and native CSS. No GSAP, no ScrollMagic.

---

## Responsiveness

- Mobile breakpoint: 640px
- Tablet breakpoint: 1024px
- Desktop: 1280px and above
- All grid layouts collapse to single-column on mobile
- Navigation collapses to hamburger on mobile
- The Journey river becomes a straight vertical stack on mobile with no branching lines
- Font sizes scale down one step on mobile: display-xl becomes display-lg, display-lg becomes display-md

---

## Quality Checklist

Before considering the build complete, verify each item:

- [ ] 60-30-10 colour rule is respected across all sections: Deep Night dominates, Parchment carries content, Gold is used only for emphasis
- [ ] No pure white `#FFFFFF` or pure black `#000000` appears anywhere
- [ ] All headlines are set in Cormorant Garamond
- [ ] All body text and UI elements are set in Inter
- [ ] The Journey section pulse animation is smooth and continuous
- [ ] Declaration form posts to `/api/signatories` and shows a success state
- [ ] Join form posts to `/api/joiners` and shows a success state
- [ ] Signature count loads from `/api/signatories/count` on page load
- [ ] All sections have scroll-triggered entry animations
- [ ] `prefers-reduced-motion` disables animations
- [ ] Site is fully responsive at 375px, 768px, and 1440px
- [ ] Navbar transitions correctly from transparent to opaque on scroll
- [ ] Railway deployment config is present and correct
- [ ] `.env.example` is present in `/server`
- [ ] No hardcoded database credentials in any committed file

---

## Content Notes for the Owner

The following items in this wireframe use placeholder or illustrative content. The owner must review and replace before any public launch:

1. The three statistics in Section 2 (90%, 1.4B, 2040) must be verified against published genomic research sources.
2. Story cards in Section 5 are placeholders. Real video content and thumbnails must be supplied.
3. The African continent SVG in Section 6 is a wireframe placeholder. A final branded illustration is recommended.
4. The ambassador programme, youth section, events, and discoveries pages referenced in the brief are not included in this version. They are planned for a future phase.
5. The `Why Representation Matters` page described in the brief as the single most important page is not included in this version. It should be a standalone long-form article page, built as a second phase deliverable.

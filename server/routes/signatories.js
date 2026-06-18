import { Router } from "express";
import { getDatabaseState, query } from "../db.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

function normalizeInput(value) {
  return typeof value === "string" ? value.trim() : "";
}

router.get("/count", async (_request, response) => {
  try {
    const rows = await query("SELECT COUNT(*) AS count FROM signatories");
    response.json({ count: Number(rows[0].count || 0) });
  } catch (_error) {
    const state = getDatabaseState();
    response.status(503).json({ error: state.message || "Database is unavailable." });
  }
});

router.get("/", requireAdmin, async (_request, response) => {
  try {
    const rows = await query("SELECT id, name, email, country, role, signed_at FROM signatories ORDER BY signed_at DESC LIMIT 500");
    response.json(rows);
  } catch (_error) {
    const state = getDatabaseState();
    response.status(503).json({ error: state.message || "Database is unavailable." });
  }
});

router.post("/", async (request, response) => {
  const name = normalizeInput(request.body?.name);
  const email = normalizeInput(request.body?.email).toLowerCase();
  const country = normalizeInput(request.body?.country);
  const role = normalizeInput(request.body?.role);

  if (!name || !email) {
    response.status(400).json({ error: "Name and email are required." });
    return;
  }

  try {
    await query("INSERT INTO signatories (name, email, country, role) VALUES (?, ?, ?, ?)", [name, email, country, role]);
    const rows = await query("SELECT COUNT(*) AS count FROM signatories");
    response.status(201).json({
      message: "Your declaration has been recorded.",
      count: Number(rows[0].count || 0),
    });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ER_DUP_ENTRY") {
      response.status(409).json({ error: "This email has already signed the declaration." });
      return;
    }

    const state = getDatabaseState();
    response.status(503).json({ error: state.message || "Unable to save the declaration." });
  }
});

export default router;

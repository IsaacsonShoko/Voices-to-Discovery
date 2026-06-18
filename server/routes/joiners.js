import { Router } from "express";
import { getDatabaseState, query } from "../db.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

function normalizeInput(value) {
  return typeof value === "string" ? value.trim() : "";
}

router.get("/", requireAdmin, async (_request, response) => {
  try {
    const rows = await query(
      "SELECT id, name, email, audience_type, country, organisation, joined_at FROM movement_joiners ORDER BY joined_at DESC LIMIT 500",
    );
    response.json(rows);
  } catch (_error) {
    const state = getDatabaseState();
    response.status(503).json({ error: state.message || "Database is unavailable." });
  }
});

router.post("/", async (request, response) => {
  const name = normalizeInput(request.body?.name);
  const email = normalizeInput(request.body?.email).toLowerCase();
  const audienceType = normalizeInput(request.body?.audience_type);
  const country = normalizeInput(request.body?.country);
  const organisation = normalizeInput(request.body?.organisation);

  if (!name || !email || !audienceType) {
    response.status(400).json({ error: "Name, email, and audience type are required." });
    return;
  }

  try {
    await query(
      "INSERT INTO movement_joiners (name, email, audience_type, country, organisation) VALUES (?, ?, ?, ?, ?)",
      [name, email, audienceType, country, organisation],
    );

    response.status(201).json({
      message: "Welcome to the movement.",
    });
  } catch (_error) {
    const state = getDatabaseState();
    response.status(503).json({ error: state.message || "Unable to save your movement entry." });
  }
});

export default router;

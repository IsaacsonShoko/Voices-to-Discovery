import { Router } from "express";
import { getDatabaseState, query } from "../db.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

function csvValue(value) {
  let text = value == null ? "" : value instanceof Date ? value.toISOString() : String(value);
  // Neutralize spreadsheet formula injection (=, +, -, @, tab, CR).
  if (/^[=+\-@\t\r]/.test(text)) {
    text = `'${text}`;
  }
  return `"${text.replace(/"/g, '""')}"`;
}

router.get("/export.csv", requireAdmin, async (_request, response) => {
  try {
    const signatories = await query(
      "SELECT 'signatory' AS record_type, name, email, country, role, '' AS audience_type, '' AS organisation, signed_at AS submitted_at FROM signatories ORDER BY signed_at DESC",
    );
    const joiners = await query(
      "SELECT 'joiner' AS record_type, name, email, country, '' AS role, audience_type, organisation, joined_at AS submitted_at FROM movement_joiners ORDER BY joined_at DESC",
    );

    const rows = [...signatories, ...joiners];
    const header = ["record_type", "name", "email", "country", "role", "audience_type", "organisation", "submitted_at"];
    const lines = [header.join(",")];

    rows.forEach((row) => {
      lines.push(
        [
          row.record_type,
          row.name,
          row.email,
          row.country,
          row.role,
          row.audience_type,
          row.organisation,
          row.submitted_at,
        ]
          .map(csvValue)
          .join(","),
      );
    });

    response.setHeader("Content-Type", "text/csv; charset=utf-8");
    response.setHeader("Content-Disposition", 'attachment; filename="fvtd-admin-export.csv"');
    // BOM so Excel reads UTF-8 (diacritics in names/countries); CRLF per RFC 4180.
    response.status(200).send(`﻿${lines.join("\r\n")}`);
  } catch (_error) {
    const state = getDatabaseState();
    response.status(503).json({ error: state.message || "Unable to export records." });
  }
});

export default router;

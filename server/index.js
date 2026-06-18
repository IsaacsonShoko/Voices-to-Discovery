import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import adminRouter from "./routes/admin.js";
import { getDatabaseState, initializeDatabase } from "./db.js";
import joinersRouter from "./routes/joiners.js";
import signatoriesRouter from "./routes/signatories.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3001);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, "../client/dist");
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: clientOrigin,
    credentials: false,
  }),
);
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({
    status: "ok",
    database: getDatabaseState(),
  });
});

app.use("/api/admin", adminRouter);
app.use("/api/signatories", signatoriesRouter);
app.use("/api/joiners", joinersRouter);

if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));

  app.get("*", (request, response, next) => {
    if (request.path.startsWith("/api/")) {
      next();
      return;
    }

    response.sendFile(path.join(clientDistPath, "index.html"));
  });
}

app.use((error, _request, response, _next) => {
  console.error("[server]", error);
  response.status(500).json({ error: "Unexpected server error." });
});

await initializeDatabase();

app.listen(port, () => {
  console.log(`FVTD server listening on http://localhost:${port}`);
});

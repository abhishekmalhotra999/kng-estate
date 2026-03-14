import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, "../dist");

app.use(cors());
app.use(express.json({ limit: "5mb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    message: "Node API is working",
    timestamp: new Date().toISOString(),
  });
});

// Serve Vite build output for single-deployment setup.
app.use(express.static(distPath));

// SPA fallback for all non-API routes.
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }
  return res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Node API listening on http://localhost:${PORT}`);
});

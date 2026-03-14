import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, "../dist");
const indexPath = path.join(distPath, "index.html");

const log = (...args) => {
  console.log(new Date().toISOString(), "[kng-server]", ...args);
};

log("boot:start", {
  node: process.version,
  port: PORT,
  cwd: process.cwd(),
  dirname: __dirname,
  distPath,
  distExists: fs.existsSync(distPath),
  indexExists: fs.existsSync(indexPath),
  env: process.env.NODE_ENV || "undefined",
});

app.use(cors());
app.use(express.json({ limit: "5mb" }));

app.use((req, res, next) => {
  const startedAt = Date.now();

  res.on("finish", () => {
    log("request", {
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      durationMs: Date.now() - startedAt,
      ip: req.ip,
      userAgent: req.headers["user-agent"] || "unknown",
    });
  });

  next();
});

app.get("/api/health", (_req, res) => {
  log("route-hit", "/api/health");
  res.json({
    ok: true,
    message: "Node API is working",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (_req, res) => {
  log("route-hit", "/health");
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
    log("api-404", { path: req.originalUrl });
    return res.status(404).json({
      ok: false,
      error: "API route not found",
      path: req.originalUrl,
    });
  }

  if (!fs.existsSync(indexPath)) {
    log("spa-fallback-failed", { reason: "index.html missing", indexPath });
    return res.status(500).json({
      ok: false,
      error: "Frontend build not found. Run npm run build.",
    });
  }

  log("spa-fallback", { path: req.originalUrl });
  return res.sendFile(indexPath, (err) => {
    if (!err) return;
    log("spa-fallback-send-error", {
      message: err.message,
      code: err.code,
      path: req.originalUrl,
    });
    return next();
  });
});

app.use((err, req, res, _next) => {
  log("express-error", {
    message: err?.message || "unknown",
    stack: err?.stack || "none",
    path: req?.originalUrl || "unknown",
  });
  res.status(500).json({ ok: false, error: "Internal server error" });
});

process.on("uncaughtException", (error) => {
  log("uncaughtException", {
    message: error.message,
    stack: error.stack || "none",
  });
});

process.on("unhandledRejection", (reason) => {
  log("unhandledRejection", { reason: String(reason) });
});

app.listen(PORT, "0.0.0.0", () => {
  log(`boot:ready listening on http://0.0.0.0:${PORT}`);
});

import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: "5mb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    message: "Node API is working",
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Node API listening on http://localhost:${PORT}`);
});

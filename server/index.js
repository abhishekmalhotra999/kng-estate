import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import multer from "multer";

const app = express();
const PORT = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, "../dist");
const indexPath = path.join(distPath, "index.html");
const MAIL_FROM_NAME = process.env.MAIL_FROM_NAME || "KNG Estate";
const SMTP_HOST = process.env.SMTP_HOST || "smtp.hostinger.com";
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_SECURE = String(process.env.SMTP_SECURE || "true") === "true";
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const LEAD_RECEIVER = process.env.LEAD_RECEIVER || "abhishekmalhotra999@gmail.com";
const SMTP_CONFIGURED = Boolean(SMTP_USER && SMTP_PASS);
const EMAIL_LOGO_PATH = path.resolve(__dirname, "../src/assets/kng-logo.webp");
const EMAIL_LOGO_CID = "kng-estate-logo";
const MAX_UPLOAD_FILES = 20;
const MAX_UPLOAD_SIZE_BYTES = 8 * 1024 * 1024;
const ACCEPTED_UPLOAD_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

const log = (...args) => {
  console.log(new Date().toISOString(), "[kng-server]", ...args);
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: MAX_UPLOAD_FILES,
    fileSize: MAX_UPLOAD_SIZE_BYTES,
  },
  fileFilter: (_req, file, cb) => {
    if (!ACCEPTED_UPLOAD_TYPES.has(file.mimetype)) {
      cb(new Error(`Unsupported file type: ${file.mimetype}`));
      return;
    }
    cb(null, true);
  },
});

const EMAIL_LOGO_ATTACHMENT = fs.existsSync(EMAIL_LOGO_PATH)
  ? {
      filename: "kng-logo.webp",
      path: EMAIL_LOGO_PATH,
      cid: EMAIL_LOGO_CID,
    }
  : null;

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

const transporter = SMTP_CONFIGURED
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })
  : null;

const baseEmailShell = (contentHtml) => `
  <div style="background:#f7f3ea;padding:28px 14px;font-family:Georgia,'Times New Roman',serif;color:#241a0d;">
    <table width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e7dbc5;">
      <tr>
        <td style="padding:28px 30px 22px;border-bottom:1px solid #efe5d3;">
          ${
            EMAIL_LOGO_ATTACHMENT
              ? `<img src="cid:${EMAIL_LOGO_CID}" alt="KNG Estate" width="132" style="display:block;height:auto;margin-bottom:14px;" />`
              : ""
          }
          <div style="font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#9a7a44;margin-bottom:8px;">KNG Estate</div>
          <div style="font-size:25px;line-height:1.2;color:#1e160a;">Private Advisory Desk</div>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 30px;">${contentHtml}</td>
      </tr>
      <tr>
        <td style="padding:18px 30px 24px;border-top:1px solid #efe5d3;color:#806840;font-size:12px;line-height:1.6;">
          KNG Estate, Tricity Luxury Advisory<br />
          This is an automated service communication.
        </td>
      </tr>
    </table>
  </div>
`;

const generateThankYouHtml = ({ name, contextLine }) =>
  baseEmailShell(`
    <div style="font-size:24px;line-height:1.2;color:#1f160a;margin-bottom:12px;">
      Thank you, <span style="font-style:italic;color:#b38a4c;">${escapeHtml(name || "there")}</span>
    </div>
    <p style="margin:0 0 14px;color:#3f311f;font-size:15px;line-height:1.75;">
      We have received your request and our advisory team is reviewing the details.
    </p>
    <p style="margin:0 0 14px;color:#3f311f;font-size:15px;line-height:1.75;">
      ${escapeHtml(contextLine)}
    </p>
    <div style="margin-top:18px;padding:14px 16px;border:1px solid #e8dbc4;background:#fbf8f2;color:#5a472d;font-size:13px;line-height:1.7;">
      Expected response window: within 24 business hours.
    </div>
  `);

const generateContactLeadHtml = (payload) =>
  baseEmailShell(`
    <div style="font-size:19px;line-height:1.25;color:#1f160a;margin-bottom:14px;">New Contact Form Lead</div>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;color:#3d2f1d;">
      <tr><td style="padding:7px 0;color:#8e7241;width:160px;">Name</td><td style="padding:7px 0;">${escapeHtml(payload.firstName)} ${escapeHtml(payload.lastName)}</td></tr>
      <tr><td style="padding:7px 0;color:#8e7241;">Email</td><td style="padding:7px 0;">${escapeHtml(payload.email)}</td></tr>
      <tr><td style="padding:7px 0;color:#8e7241;">Phone</td><td style="padding:7px 0;">${escapeHtml(payload.phone || "-")}</td></tr>
      <tr><td style="padding:7px 0;color:#8e7241;">Interest</td><td style="padding:7px 0;">${escapeHtml(payload.interest || "-")}</td></tr>
      <tr><td style="padding:7px 0;color:#8e7241;">City</td><td style="padding:7px 0;">${escapeHtml(payload.city || "-")}</td></tr>
      <tr><td style="padding:7px 0;color:#8e7241;vertical-align:top;">Message</td><td style="padding:7px 0;white-space:pre-wrap;">${escapeHtml(payload.message || "-")}</td></tr>
    </table>
  `);

const generateSellLeadHtml = (payload) => {
  const images = Array.isArray(payload.images) ? payload.images : [];
  const imageRows = images.length
    ? images
        .map(
          (img) =>
            `<li style="margin-bottom:4px;">${escapeHtml(img.name || "image")} (${escapeHtml(img.type || "unknown")}, ${escapeHtml(String(img.sizeMB || "?"))} MB)</li>`
        )
        .join("")
    : "<li>No image metadata received</li>";

  return baseEmailShell(`
    <div style="font-size:19px;line-height:1.25;color:#1f160a;margin-bottom:14px;">New Sell Property Lead</div>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;color:#3d2f1d;">
      <tr><td style="padding:7px 0;color:#8e7241;width:180px;">Owner Name</td><td style="padding:7px 0;">${escapeHtml(payload.ownerName)}</td></tr>
      <tr><td style="padding:7px 0;color:#8e7241;">Email</td><td style="padding:7px 0;">${escapeHtml(payload.email)}</td></tr>
      <tr><td style="padding:7px 0;color:#8e7241;">Phone</td><td style="padding:7px 0;">${escapeHtml(payload.phone)}</td></tr>
      <tr><td style="padding:7px 0;color:#8e7241;">Property Type</td><td style="padding:7px 0;">${escapeHtml(payload.propertyType)}</td></tr>
      <tr><td style="padding:7px 0;color:#8e7241;">City / Location</td><td style="padding:7px 0;">${escapeHtml(payload.city)}</td></tr>
      <tr><td style="padding:7px 0;color:#8e7241;">Expected Price</td><td style="padding:7px 0;">${escapeHtml(payload.expectedPrice)}</td></tr>
      <tr><td style="padding:7px 0;color:#8e7241;">Property Size</td><td style="padding:7px 0;">${escapeHtml(payload.propertySize)}</td></tr>
      <tr><td style="padding:7px 0;color:#8e7241;">Preferred Contact Time</td><td style="padding:7px 0;">${escapeHtml(payload.preferredContactTime)}</td></tr>
      <tr><td style="padding:7px 0;color:#8e7241;vertical-align:top;">Description</td><td style="padding:7px 0;white-space:pre-wrap;">${escapeHtml(payload.message)}</td></tr>
    </table>
    <div style="margin-top:16px;">
      <div style="font-size:13px;color:#8e7241;margin-bottom:6px;">Image Metadata</div>
      <ul style="margin:0;padding-left:18px;color:#3d2f1d;font-size:13px;line-height:1.6;">${imageRows}</ul>
    </div>
  `);
};

const sendEmail = async (mailOptions) => {
  if (!transporter) {
    throw new Error("SMTP is not configured. Set SMTP_USER and SMTP_PASS.");
  }

  const existingAttachments = Array.isArray(mailOptions.attachments) ? mailOptions.attachments : [];
  const attachments = EMAIL_LOGO_ATTACHMENT
    ? [EMAIL_LOGO_ATTACHMENT, ...existingAttachments]
    : existingAttachments;

  return transporter.sendMail({
    ...mailOptions,
    attachments,
  });
};

const isValidEmail = (email = "") => /^\S+@\S+\.\S+$/.test(email);
const getTextField = (value) => {
  if (Array.isArray(value)) {
    return String(value[0] || "");
  }
  return String(value || "");
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
  smtpConfigured: SMTP_CONFIGURED,
  smtpHost: SMTP_HOST,
  smtpPort: SMTP_PORT,
  smtpSecure: SMTP_SECURE,
  leadReceiver: LEAD_RECEIVER,
});

if (SMTP_CONFIGURED && transporter) {
  transporter
    .verify()
    .then(() => log("smtp:ready"))
    .catch((error) => log("smtp:verify-failed", { message: error.message }));
} else {
  log("smtp:missing-config", { hint: "Set SMTP_USER and SMTP_PASS environment variables." });
}

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

app.post("/api/contact", async (req, res) => {
  log("route-hit", "/api/contact");

  const payload = req.body || {};
  const required = ["firstName", "lastName", "email", "interest"];
  const missing = required.filter((field) => !String(payload[field] || "").trim());

  if (missing.length) {
    return res.status(400).json({ ok: false, error: `Missing required fields: ${missing.join(", ")}` });
  }

  if (!isValidEmail(payload.email)) {
    return res.status(400).json({ ok: false, error: "Invalid email address." });
  }

  try {
    await Promise.all([
      sendEmail({
        from: `"${MAIL_FROM_NAME}" <${SMTP_USER}>`,
        to: LEAD_RECEIVER,
        subject: `New Contact Inquiry - ${payload.firstName} ${payload.lastName}`,
        html: generateContactLeadHtml(payload),
        replyTo: payload.email,
      }),
      sendEmail({
        from: `"${MAIL_FROM_NAME}" <${SMTP_USER}>`,
        to: payload.email,
        subject: "Thank you for contacting KNG Estate",
        html: generateThankYouHtml({
          name: payload.firstName,
          contextLine:
            "A senior advisor will connect with you shortly to discuss your requirements and guide the next steps.",
        }),
      }),
    ]);

    return res.json({ ok: true, message: "Contact inquiry submitted successfully." });
  } catch (error) {
    log("mail:contact-failed", { message: error.message });
    return res.status(500).json({ ok: false, error: "Unable to deliver email at the moment." });
  }
});

app.post("/api/sell-property", upload.array("images", MAX_UPLOAD_FILES), async (req, res) => {
  log("route-hit", "/api/sell-property");

  const payload = {
    ownerName: getTextField(req.body?.ownerName),
    phone: getTextField(req.body?.phone),
    email: getTextField(req.body?.email),
    propertyType: getTextField(req.body?.propertyType),
    city: getTextField(req.body?.city),
    expectedPrice: getTextField(req.body?.expectedPrice),
    propertySize: getTextField(req.body?.propertySize),
    preferredContactTime: getTextField(req.body?.preferredContactTime),
    message: getTextField(req.body?.message),
  };
  const files = Array.isArray(req.files) ? req.files : [];

  payload.images = files.map((file) => ({
    name: file.originalname,
    type: file.mimetype,
    sizeMB: Number((file.size / (1024 * 1024)).toFixed(2)),
  }));

  const required = [
    "ownerName",
    "phone",
    "email",
    "propertyType",
    "city",
    "expectedPrice",
    "propertySize",
    "preferredContactTime",
    "message",
  ];

  const missing = required.filter((field) => !String(payload[field] || "").trim());

  if (missing.length) {
    return res.status(400).json({ ok: false, error: `Missing required fields: ${missing.join(", ")}` });
  }

  if (!isValidEmail(payload.email)) {
    return res.status(400).json({ ok: false, error: "Invalid email address." });
  }

  if (files.length === 0) {
    return res.status(400).json({ ok: false, error: "At least one property image is required." });
  }

  try {
    await Promise.all([
      sendEmail({
        from: `"${MAIL_FROM_NAME}" <${SMTP_USER}>`,
        to: LEAD_RECEIVER,
        subject: `New Sell Property Lead - ${payload.ownerName}`,
        html: generateSellLeadHtml(payload),
        replyTo: payload.email,
        attachments: files.map((file) => ({
          filename: file.originalname,
          content: file.buffer,
          contentType: file.mimetype,
        })),
      }),
      sendEmail({
        from: `"${MAIL_FROM_NAME}" <${SMTP_USER}>`,
        to: payload.email,
        subject: "Thank you for listing your property with KNG Estate",
        html: generateThankYouHtml({
          name: payload.ownerName,
          contextLine:
            "Our listings desk will review your submission and reach out with valuation and go-to-market guidance.",
        }),
      }),
    ]);

    return res.json({ ok: true, message: "Property submission received successfully." });
  } catch (error) {
    log("mail:sell-failed", { message: error.message });
    return res.status(500).json({ ok: false, error: "Unable to deliver email at the moment." });
  }
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
  if (err instanceof multer.MulterError) {
    log("multer-error", {
      code: err.code,
      message: err.message,
      path: req?.originalUrl || "unknown",
    });
    return res.status(400).json({ ok: false, error: `Upload error: ${err.message}` });
  }

  if (err?.message?.startsWith("Unsupported file type:")) {
    log("upload-filetype-error", {
      message: err.message,
      path: req?.originalUrl || "unknown",
    });
    return res.status(400).json({ ok: false, error: err.message });
  }

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

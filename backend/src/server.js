// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB, { getConnectionStatus } from "./config/db.js";
import reportRoutes from "./routes/report-routes.js";

dotenv.config();

const app = express();

// Configure CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [
      "https://semt-api-dev-e3hmcyfqh6g9fvc3.eastasia-01.azurewebsites.net/",
      "http://localhost:3000",
    ];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: false,
  })
);
app.use(express.json());

// Debug: Log incoming requests
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    if (req.method === "POST" && req.path.includes("/api")) {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
      console.log("Body:", JSON.stringify(req.body, null, 2));
    }
    next();
  });
}

// ---- Health check (Azure Container Apps needs this) ----
app.get("/health", (req, res) => {
  const dbStatus = getConnectionStatus();
  const health = {
    status: "ok",
    timestamp: new Date().toISOString(),
    database: {
      connected: dbStatus.isConnected,
      readyState: dbStatus.readyState,
    },
  };

  // Return 200 even if DB is down - container should stay alive
  res.status(200).json(health);
});

// Readiness probe for Azure
app.get("/ready", (req, res) => {
  const dbStatus = getConnectionStatus();

  // Only ready if database is connected
  if (dbStatus.isConnected) {
    res.status(200).json({ status: "ready" });
  } else {
    res
      .status(503)
      .json({ status: "not ready", reason: "database not connected" });
  }
});

app.use(reportRoutes);

app.get("/", (req, res) => {
  res.send("SeMT Report API Running");
});

// ---- Database Connection (async, non-blocking) ----
connectDB();

// ---- Start server ----
const PORT = process.env.PORT || 4000;

// Export app for testing. Only start the server when not running tests.
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () =>
    console.log(`SEMT App Server running on port ${PORT}`)
  );
}

export default app;

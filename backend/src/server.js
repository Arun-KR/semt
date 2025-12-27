import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import reportRoutes from "./routes/report-routes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", reportRoutes);

app.get("/", (req, res) => {
  res.send("SeMT Report API Running");
});

const PORT = process.env.PORT || 4000;

// Export app for testing. Only start the server when not running tests.
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () =>
    console.log(`SEMT App Server running on port ${PORT}`)
  );
}

export default app;

import express from "express";
import { submitReport } from "../controllers/report-controller.js";

const router = express.Router();

router.post("/semt/reports", submitReport);

export default router;

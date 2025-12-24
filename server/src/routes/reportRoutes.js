import express from "express";
import { submitReport } from "../controllers/reportController.js";

const router = express.Router();

router.post("/reports", submitReport);

export default router;

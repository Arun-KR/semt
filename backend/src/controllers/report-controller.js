import Report from "../models/report.js";
import { reportValidationSchema } from "../validation/report-validation.js";

export const submitReport = async (req, res) => {
  try {
    // 1️⃣ Validate incoming data
    await reportValidationSchema.validate(req.body, {
      abortEarly: false,
    });

    // 2️⃣ Create MongoDB document
    const report = new Report(req.body);

    // 3️⃣ Save to database
    const savedReport = await report.save();

    // 4️⃣ Respond to frontend
    res.status(201).json({
      message: "Report submitted successfully",
      reportId: savedReport._id,
    });
  } catch (error) {
    console.error("Error in submitReport:", error);
    
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.errors,
      });
    }

    // MongoDB connection error
    if (error.name === "MongooseError" || error.message?.includes("connect")) {
      return res.status(503).json({
        message: "Database connection error. Please ensure MongoDB is running.",
        error: error.message || String(error),
      });
    }

    res.status(500).json({
      message: "Server error",
      error: error.message || String(error),
    });
  }
};

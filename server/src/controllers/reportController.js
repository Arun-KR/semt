import Report from "../models/Report.js";
import { reportValidationSchema } from "../validation/reportValidation.js";

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
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.errors,
      });
    }

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

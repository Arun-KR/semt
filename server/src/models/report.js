import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    stateName: { type: String, required: true },
    reportingMonth: { type: String, required: true },

    semtTeam: [
      {
        name: String,
        designation: String,
      },
    ],

    ongoingProjects: [
      {
        projectName: String,
        currentStage: String,
        description: String,
      },
    ],

    keyDocuments: [
      {
        documentName: String,
        submissionDate: String,
        approvalStatus: String,
      },
    ],

    majorActivities: {
      digitalTransformation: [String],
      dataAnalytics: [String],
      emergingTechnologies: [String],
      itInfraCyber: [String],
    },

    proposedActivities: [String],

    status: {
      type: String,
      default: "SUBMITTED", // DRAFT | SUBMITTED | APPROVED
    },
  },
  { timestamps: true }
);

export default mongoose.model("Report", ReportSchema);

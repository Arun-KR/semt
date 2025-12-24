import * as yup from "yup";

export const reportValidationSchema = yup.object({
  stateName: yup.string().required(),
  reportingMonth: yup.string().required(),
  semtTeam: yup.array().min(1),
  ongoingProjects: yup.array().min(1),
  proposedActivities: yup.array().min(1),
});

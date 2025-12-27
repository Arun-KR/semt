import {
  Container,
  Button,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import useApiWithSnackbar from "../hooks/use-api-with-snackbar";

import StateHeaderForm from "./state-header-form";
import SemtTeamForm from "./semt-team-form";
import OngoingProjectsForm from "./ongoing-projects-form";
import KeyDocumentsForm from "./key-documents-form";
import MajorActivitiesForm from "./major-activities-form";
import ProposedActivitiesForm from "./proposed-activities-form";

export default function StateReportForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      semtTeam: [],
      ongoingProjects: [],
      keyDocuments: [],
      majorActivities: {
        digitalTransformation: [],
        dataAnalytics: [],
        emergingTechnologies: [],
        itInfraCyber: [],
      },
      proposedActivities: [],
    },
  });

  const { loading, post } = useApiWithSnackbar();

  const onSubmit = async (data) => {
    try {
      await post("/reports", data, { autoSuccess: true });
      reset();
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        SeMT Monthly Report
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <StateHeaderForm
            register={register}
            control={control}
            errors={errors}
          />
          <SemtTeamForm register={register} control={control} />
          <OngoingProjectsForm register={register} control={control} />
          <KeyDocumentsForm register={register} control={control} />
          <MajorActivitiesForm register={register} control={control} />
          <ProposedActivitiesForm register={register} control={control} />
          <Button
            variant="contained"
            size="large"
            type="submit"
            disabled={loading}
            startIcon={
              loading ? <CircularProgress size={18} color="inherit" /> : null
            }
          >
            {loading ? "Submitting..." : "Submit Report"}
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

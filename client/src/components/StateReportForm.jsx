import { Container, Button, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

import StateHeaderForm from "./StateHeaderForm";
import SemtTeamForm from "./SemtTeamForm";
import OngoingProjectsForm from "./OngoingProjectsForm";
import KeyDocumentsForm from "./KeyDocumentsForm";
import MajorActivitiesForm from "./MajorActivitiesForm";
import ProposedActivitiesForm from "./ProposedActivitiesForm";

export default function StateReportForm() {
  const { register, control, handleSubmit } = useForm({
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

  const onSubmit = async (data) => {
    const response = await fetch("http://localhost:5000/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    alert(result.message);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        SeMT Monthly Report
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <StateHeaderForm register={register} />
          <SemtTeamForm register={register} control={control} />
          <OngoingProjectsForm register={register} control={control} />
          <KeyDocumentsForm register={register} control={control} />
          <MajorActivitiesForm register={register} control={control} />
          <ProposedActivitiesForm register={register} control={control} />

          <Button variant="contained" size="large" type="submit">
            Submit Report
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

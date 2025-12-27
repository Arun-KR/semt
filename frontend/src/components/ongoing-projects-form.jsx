import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useFieldArray } from "react-hook-form";

const stages = ["Planned", "In Progress", "UAT", "Completed"];

export default function OngoingProjectsForm({ register, control }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ongoingProjects",
  });

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Ongoing Projects</Typography>

        {fields.map((item, index) => (
          <Grid container spacing={2} key={item.id} sx={{ mt: 1 }}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Project Name"
                fullWidth
                {...register(`ongoingProjects.${index}.projectName`)}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                select
                label="Stage"
                fullWidth
                {...register(`ongoingProjects.${index}.currentStage`)}
              >
                {stages.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Remarks"
                fullWidth
                {...register(`ongoingProjects.${index}.description`)}
              />
            </Grid>

            <Grid item xs={12} md={1}>
              <Button color="error" onClick={() => remove(index)}>
                X
              </Button>
            </Grid>
          </Grid>
        ))}

        <Button
          sx={{ mt: 2 }}
          variant="outlined"
          onClick={() =>
            append({ projectName: "", currentStage: "", description: "" })
          }
        >
          Add Project
        </Button>
      </CardContent>
    </Card>
  );
}

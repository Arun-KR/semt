import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { useFieldArray } from "react-hook-form";

export default function SemtTeamForm({ register, control }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "semtTeam",
  });

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">SeMT Team</Typography>

        {fields.map((item, index) => (
          <Grid container spacing={2} key={item.id} sx={{ mt: 1 }}>
            <Grid item xs={12} md={5}>
              <TextField
                label="Name"
                fullWidth
                {...register(`semtTeam.${index}.name`)}
              />
            </Grid>

            <Grid item xs={12} md={5}>
              <TextField
                label="Designation"
                fullWidth
                {...register(`semtTeam.${index}.designation`)}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <Button color="error" onClick={() => remove(index)}>
                Remove
              </Button>
            </Grid>
          </Grid>
        ))}

        <Button
          sx={{ mt: 2 }}
          variant="outlined"
          onClick={() => append({ name: "", designation: "" })}
        >
          Add Team Member
        </Button>
      </CardContent>
    </Card>
  );
}

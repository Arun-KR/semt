import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useFieldArray } from "react-hook-form";

export default function ProposedActivitiesForm({ register, control }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "proposedActivities",
  });

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Proposed Activities (Next Month)</Typography>

        {fields.map((item, index) => (
          <Stack direction="row" spacing={1} key={item.id} sx={{ mt: 1 }}>
            <TextField fullWidth {...register(`proposedActivities.${index}`)} />
            <Button color="error" onClick={() => remove(index)}>
              X
            </Button>
          </Stack>
        ))}

        <Button sx={{ mt: 2 }} onClick={() => append("")}>
          Add Proposed Activity
        </Button>
      </CardContent>
    </Card>
  );
}

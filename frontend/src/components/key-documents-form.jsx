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

const statuses = ["Submitted", "In Progress", "Approved"];

export default function KeyDocumentsForm({ register, control }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "keyDocuments",
  });

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Key Documents</Typography>

        {fields.map((item, index) => (
          <Grid container spacing={2} key={item.id} sx={{ mt: 1 }}>
            <Grid item xs={12} md={5}>
              <TextField
                label="Document Name"
                fullWidth
                {...register(`keyDocuments.${index}.documentName`)}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                type="date"
                label="Submission Date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register(`keyDocuments.${index}.submissionDate`)}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                select
                label="Status"
                fullWidth
                {...register(`keyDocuments.${index}.approvalStatus`)}
              >
                {statuses.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
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
            append({ documentName: "", submissionDate: "", approvalStatus: "" })
          }
        >
          Add Document
        </Button>
      </CardContent>
    </Card>
  );
}

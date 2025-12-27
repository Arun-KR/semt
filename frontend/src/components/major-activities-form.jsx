import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useFieldArray } from "react-hook-form";

function ActivitySection({ title, name, register, control }) {
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <Stack spacing={1}>
      <Typography variant="subtitle1">{title}</Typography>

      {fields.map((item, index) => (
        <Stack direction="row" spacing={1} key={item.id}>
          <TextField fullWidth {...register(`${name}.${index}`)} />
          <Button color="error" onClick={() => remove(index)}>
            X
          </Button>
        </Stack>
      ))}

      <Button size="small" onClick={() => append("")}>
        Add Activity
      </Button>
    </Stack>
  );
}

export default function MajorActivitiesForm({ register, control }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Major Activities</Typography>

        <ActivitySection
          title="Digital Transformation & Strategy"
          name="majorActivities.digitalTransformation"
          register={register}
          control={control}
        />

        <ActivitySection
          title="Data Analytics & BI"
          name="majorActivities.dataAnalytics"
          register={register}
          control={control}
        />

        <ActivitySection
          title="Emerging Technologies"
          name="majorActivities.emergingTechnologies"
          register={register}
          control={control}
        />

        <ActivitySection
          title="IT Infra & Cyber Security"
          name="majorActivities.itInfraCyber"
          register={register}
          control={control}
        />
      </CardContent>
    </Card>
  );
}

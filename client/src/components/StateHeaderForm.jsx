import { Card, CardContent, Grid, TextField, Typography } from "@mui/material";

export default function StateHeaderForm({ register }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          State & Reporting Period
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="State Name"
              fullWidth
              {...register("stateName", { required: true })}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Reporting Month"
              type="month"
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...register("reportingMonth", { required: true })}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

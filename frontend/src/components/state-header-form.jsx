import { Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { Autocomplete } from "@mui/material";
import { INDIAN_STATES } from "../constants/indian-states";

export default function StateHeaderForm({ register, control, errors = {} }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          State & Reporting Period
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Controller
              name="stateName"
              control={control}
              rules={{ required: "State is required" }}
              render={({ field }) => (
                <Autocomplete
                  options={INDIAN_STATES}
                  value={field.value || null}
                  onChange={(_, value) => field.onChange(value)}
                  sx={{ minWidth: 250 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="State Name"
                      fullWidth
                      error={!!errors.stateName}
                      helperText={errors.stateName?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Reporting Month"
              type="month"
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...register("reportingMonth", {
                required: "Reporting month is required",
              })}
              error={!!errors.reportingMonth}
              helperText={errors.reportingMonth?.message}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

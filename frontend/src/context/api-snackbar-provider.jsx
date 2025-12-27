/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useCallback } from "react";
import { Snackbar, Alert } from "@mui/material";

const ApiSnackbarContext = createContext(null);

export const ApiSnackbarProvider = ({ children }) => {
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const showMessage = useCallback(
    ({ message, severity = "info", duration = 6000 }) => {
      setSnack({ open: true, message, severity, duration });
    },
    []
  );

  const handleClose = useCallback((e, reason) => {
    if (reason === "clickaway") return;
    setSnack((s) => ({ ...s, open: false }));
  }, []);

  return (
    <ApiSnackbarContext.Provider value={{ showMessage }}>
      {children}

      <Snackbar
        open={snack.open}
        autoHideDuration={snack.duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={snack.severity}
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </ApiSnackbarContext.Provider>
  );
};

export const useApiSnackbar = () => {
  const ctx = useContext(ApiSnackbarContext);
  if (!ctx)
    throw new Error("useApiSnackbar must be used within ApiSnackbarProvider");
  return ctx;
};

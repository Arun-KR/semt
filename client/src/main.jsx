import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { ApiSnackbarProvider } from "./context/ApiSnackbarProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <ApiSnackbarProvider>
      <App />
    </ApiSnackbarProvider>
  </React.StrictMode>
);

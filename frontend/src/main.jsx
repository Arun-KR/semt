import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { ApiSnackbarProvider } from "./context/api-snackbar-provider";

// Debug: Log environment info to help diagnose Azure deployment issues
console.log("🚀 App starting...");
console.log("Environment:", import.meta.env.MODE);
console.log("VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL || "NOT SET");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <ApiSnackbarProvider>
      <App />
    </ApiSnackbarProvider>
  </React.StrictMode>
);

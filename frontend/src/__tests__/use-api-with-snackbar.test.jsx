import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ApiSnackbarProvider } from "../context/api-snackbar-provider";
import useApiWithSnackbar from "../hooks/use-api-with-snackbar";
import { describe, test, expect } from "vitest";
function TestComponent() {
  const { post } = useApiWithSnackbar();
  return (
    <button
      onClick={() => post("/reports", { foo: "bar" }, { autoSuccess: true })}
    >
      Submit
    </button>
  );
}

describe("useApiWithSnackbar hook", () => {
  test("shows success snackbar on autoSuccess", async () => {
    render(
      <ApiSnackbarProvider>
        <TestComponent />
      </ApiSnackbarProvider>
    );

    fireEvent.click(screen.getByText("Submit"));

    // Wait for snackbar to appear with message
    await waitFor(() =>
      expect(screen.getByText(/Report submitted/i)).toBeInTheDocument()
    );
  });

  test("shows error snackbar on failure", async () => {
    function FailComponent() {
      const { post } = useApiWithSnackbar();
      return (
        <button
          onClick={() => {
            post("/reports", { fail: true }).catch(() => {});
          }}
        >
          SubmitFail
        </button>
      );
    }

    render(
      <ApiSnackbarProvider>
        <FailComponent />
      </ApiSnackbarProvider>
    );

    fireEvent.click(screen.getByText("SubmitFail"));

    await waitFor(() =>
      expect(screen.getByText(/Invalid payload/i)).toBeInTheDocument()
    );
  });
});

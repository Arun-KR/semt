import { useCallback } from "react";
import useApi from "./use-api";
import { useApiSnackbar } from "../context/api-snackbar-provider";

/**
 * Wrapper around useApi that automatically shows snackbars for errors and
 * for successful responses when `autoSuccess` option is true or the
 * response contains a `message` field.
 */
export default function useApiWithSnackbar() {
  const { loading, error, setError, request } = useApi();
  const { showMessage } = useApiSnackbar();

  const requestWithToast = useCallback(
    async (config, opts = {}) => {
      try {
        const res = await request(config);
        if (opts.autoSuccess && res?.message) {
          showMessage({ message: res.message, severity: "success" });
        }
        return res;
      } catch (err) {
        showMessage({
          message: err.message || "Network error",
          severity: "error",
        });
        throw err;
      }
    },
    [request, showMessage]
  );

  const get = useCallback(
    (url, params = {}, opts = {}) =>
      requestWithToast({ method: "get", url, params }, opts),
    [requestWithToast]
  );
  const post = useCallback(
    (url, data = {}, opts = {}) =>
      requestWithToast({ method: "post", url, data }, opts),
    [requestWithToast]
  );

  return { loading, error, setError, request: requestWithToast, get, post };
}

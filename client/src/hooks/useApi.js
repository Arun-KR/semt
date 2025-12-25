import { useState, useCallback } from "react";
import { requestData, getData, postData } from "../api/axios";

/**
 * useApi hook
 * - manages loading and error state
 * - exposes request/get/post convenience methods that return response.data
 */
export default function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (config) => {
    setLoading(true);
    setError(null);
    try {
      const data = await requestData(config);
      return data;
    } catch (err) {
      setError(err);
      throw err; // rethrow so callers can also handle
    } finally {
      setLoading(false);
    }
  }, []);

  const get = useCallback((url, params = {}) => getData(url, params), []);
  const post = useCallback(
    (url, data = {}, config = {}) => postData(url, data, config),
    []
  );

  return { loading, error, setError, request, get, post };
}

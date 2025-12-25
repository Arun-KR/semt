import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000/api",
  timeout: 30_000,
});

// Centralized response interceptor to normalize errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Prefer API-provided message, fallback to axios/network message
    const message =
      error?.response?.data?.message || error?.message || "Network error";
    // Attach original response for callers that still need it
    const normalized = new Error(message);
    normalized.response = error?.response;
    return Promise.reject(normalized);
  }
);

/**
 * Lightweight helper that returns response.data directly.
 * Accepts an axios request config or (method, url, data) tuple if preferred.
 */
export async function requestData(config) {
  // allow convenience: requestData({method: 'post', url: '/x', data}) or requestData('/x')
  if (typeof config === "string") {
    const res = await api.get(config);
    return res.data;
  }

  const res = await api.request(config);
  return res.data;
}

/**
 * Convenience wrapper for GET requests: getData(url, params)
 * returns response.data
 */
export async function getData(url, params = {}) {
  return requestData({ method: "get", url, params });
}

/**
 * Convenience wrapper for POST requests: postData(url, data, config)
 * returns response.data
 */
export async function postData(url, data = {}, config = {}) {
  return requestData({ method: "post", url, data, ...config });
}

export default api;

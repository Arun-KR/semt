import axios from "axios";

// Get backend URL from environment variable
// For Azure Static Web Apps, VITE_API_BASE_URL is injected at build time
const getBackendURL = () => {
  // Use build-time environment variable
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  // Only allow localhost fallback in development mode
  if (import.meta.env.DEV) {
    console.warn(
      "⚠️ Using localhost fallback. Set VITE_API_BASE_URL in production!"
    );
    return "http://localhost:4000";
  }

  throw new Error(
    "VITE_API_BASE_URL environment variable is required in production. Set it in GitHub Secrets."
  );
};

const api = axios.create({
  baseURL: getBackendURL(),
  timeout: 30_000,
});

console.log("Backend URL:", api.defaults.baseURL);

// Debug logging in development
if (import.meta.env.DEV) {
  api.interceptors.request.use((config) => {
    console.log("[API Request]", config.method?.toUpperCase(), config.url);
    console.log("[Body]", config.data);
    return config;
  });
}

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
    console.log("Backend URL:", import.meta.env.VITE_API_BASE_URL);
    console.error("[API Error]", normalized);
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

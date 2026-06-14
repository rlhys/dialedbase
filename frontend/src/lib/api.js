import axios from "axios";

// In production, Vercel routes the backend at /_/backend (router adds /api).
// In local dev, set REACT_APP_BACKEND_URL=http://localhost:8001 (uvicorn serves /api directly).
const BACKEND = process.env.REACT_APP_BACKEND_URL ?? "/_/backend";
export const API_BASE = `${BACKEND}/api`;

const TOKEN_KEY = "db_admin_token";

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (t) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      tokenStore.clear();
      // Avoid redirect loop when already on the login page.
      if (!window.location.pathname.endsWith("/admin/login")) {
        window.location.assign("/admin/login");
      }
    }
    return Promise.reject(error);
  }
);

export default api;

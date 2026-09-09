export const BASE_URL =
  import.meta.env.VITE_BACKEND_URL ||
  (typeof window !== "undefined" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1"
    ? "https://primebid-backend-4g6y.onrender.com"
    : "http://localhost:5000");


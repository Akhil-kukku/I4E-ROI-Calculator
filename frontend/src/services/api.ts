import axios from "axios";

const productionFallbackApi = "https://i4e-roi-calculator.onrender.com";
const resolvedBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  (process.env.NODE_ENV === "production" ? productionFallbackApi : "http://localhost:8000");

const api = axios.create({
  baseURL: resolvedBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default api;

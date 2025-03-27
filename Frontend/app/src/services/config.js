const isLocalhost = window.location.hostname === "localhost";

export const baseURL = isLocalhost
  ? "http://localhost:5000/" // Localhost
  : "https://desenvolvimento-software-ayeh.vercel.app"; 
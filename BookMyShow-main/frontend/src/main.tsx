import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { useAuthStore } from "./services/useAuthStore"; // Corrected import path

// Initialize auth state from localStorage when the app starts
useAuthStore.getState().initializeAuth();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

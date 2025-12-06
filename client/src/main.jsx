import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.jsx";
import {AuthProvider} from "./contexts/AuthContext.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Envolver la App con el AuthProvider */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);

import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.jsx";
import {AuthProvider} from "./contexts/AuthContext.jsx";
import {ToastContainer} from "react-toastify";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </AuthProvider>
  </StrictMode>
);

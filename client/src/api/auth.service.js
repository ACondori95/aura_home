import axios from "axios";

// Asegúrate de que esta URL base esté disponible en el entorno de Vite
// (e.g., VITE_API_URL=http://localhost:4000/api)
const API_URL = import.meta.env.VITE_API_URL + "/auth";

const register = (name, email, password) => {
  return axios.post(`${API_URL}/register`, {name, email, password});
};

const login = (email, password) => {
  return axios.post(`${API_URL}/login`, {email, password}).then((response) => {
    // Si el login es exitoso, guardamos el token y el usuario
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  });
};

const logout = () => {
  // Eliminamos el token y la info de usuario del localStorage
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const AuthService = {register, login, logout};

export default AuthService;

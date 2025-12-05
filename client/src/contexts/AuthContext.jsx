import {createContext, useEffect, useMemo, useState} from "react";
import AuthService from "../api/auth.service";
import axios from "axios";

// 1. Crear el Contexto
export const AuthContext = createContext();

// 2. Crear el Proveedor del Contexto
export const AuthProvider = ({children}) => {
  // Inicializar el estado de forma perezosa desde localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("item");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(false);

  // 3. Funciones de Autenticación
  const handleLogin = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await AuthService.login(email, password);

      // Actualizar estado después de guardar en localStorage (dentro de AuthService)
      setUser(response.user);
      setToken(response.token);

      return response; // Devolver la respuesta para manejo de redirección en el componente
    } catch (error) {
      // Limpieza en caso de error
      AuthService.logout();
      setUser(null);
      setToken(null);
      throw error; // Propagar el error
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
    setToken(null);
  };

  // 4. Determinar si el usuario es administrador
  const isAdmin = useMemo(() => user && user.role === "admin", [user]);

  // 5. Memorizar el valor del contexto para evitar re-renderizados innecesarios
  const contextValue = useMemo(
    () => ({
      user,
      token,
      isLoading,
      isAdmin,
      login: handleLogin,
      logout: handleLogout,
      // register no se expone aquí, se llama directamente desde el componente Register
    }),
    [user, token, isLoading, isAdmin]
  );

  // Configurar Axios para enviar el token automáticamente
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

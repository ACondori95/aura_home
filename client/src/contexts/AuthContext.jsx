import {createContext, useState, useEffect} from "react";
import {toast} from "react-toastify";
import * as authService from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);

        // Verify token is still valid by fetching profile
        try {
          const response = await authService.getProfile();
          setUser(response.user);
          localStorage.setItem("user", JSON.stringify(response.user));
        } catch (error) {
          // Token invalid, clear everything
          handleLogout();
        }
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  /**
   * Register new user
   */
  const handleRegister = async (userData) => {
    try {
      const response = await authService.register(userData);

      // Save token and user
      setToken(response.token);
      setUser(response.user);
      setIsAuthenticated(true);

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      toast.success("¡Registro exitoso! Bienvenido/a");
      return {success: true};
    } catch (error) {
      toast.error(error.message || "Error al registrar usuario");
      return {success: false, error: error.message};
    }
  };

  /**
   * Login user
   */
  const handleLogin = async (credentials) => {
    try {
      const response = await authService.login(credentials);

      // Save token and user
      setToken(response.token);
      setUser(response.user);
      setIsAuthenticated(true);

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      toast.success(`¡Bienvenido/a ${response.user.name}!`);
      return {success: true};
    } catch (error) {
      toast.error(error.message || "Error al iniciar sesión");
      return {success: false, error: error.message};
    }
  };

  /**
   * Logout user
   */
  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.info("Sesión cerrada");
  };

  /**
   * Update user profile
   */
  const handleUpdateProfile = async (data) => {
    try {
      const response = await authService.updateProfile(data);

      setUser(response.user);
      localStorage.setItem("user", JSON.stringify(response.user));

      toast.success("Perfil actualizado exitosamente");
      return {success: true};
    } catch (error) {
      toast.error(error.message || "Error al actualizar perfil");
      return {success: false, error: error.message};
    }
  };

  /**
   * Add address
   */
  const handleAddAddress = async (address) => {
    try {
      const response = await authService.addAddress(address);

      // Update user with new addresses
      setUser({...user, addresses: response.addresses});
      localStorage.setItem(
        "user",
        JSON.stringify({...user, addresses: response.addresses})
      );

      toast.success("Dirección agregada exitosamente");
      return {success: true};
    } catch (error) {
      toast.error(error.message || "Error al agregar dirección");
      return {success: false, error: error.message};
    }
  };

  /**
   * Delete address
   */
  const handleDeleteAddress = async (addressId) => {
    try {
      const response = await authService.deleteAddress(addressId);

      // Update user with remaining addresses
      setUser({...user, addresses: response.addresses});
      localStorage.setItem(
        "user",
        JSON.stringify({...user, addresses: response.addresses})
      );

      toast.success("Dirección eliminada exitosamente");
      return {success: true};
    } catch (error) {
      toast.error(error.message || "Error al eliminar dirección");
      return {success: false, error: error.message};
    }
  };

  /**
   * Toggle favorite
   */
  const handleToggleFavorite = async (productId) => {
    try {
      const response = await authService.toggleFavorite(productId);

      // Update user favorites
      setUser({...user, favorites: response.favorites});
      localStorage.setItem(
        "user",
        JSON.stringify({...user, favorites: response.favorites})
      );

      if (response.isFavorite) {
        toast.success("Producto agregado a favoritos");
      } else {
        toast.info("Producto eliminado de favoritos");
      }

      return {success: true, isFavorite: response.isFavorite};
    } catch (error) {
      toast.error(error.message || "Error al actualizar favoritos");
      return {success: false, error: error.message};
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    updateProfile: handleUpdateProfile,
    addAddress: handleAddAddress,
    deleteAddress: handleDeleteAddress,
    toggleFavorite: handleToggleFavorite,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

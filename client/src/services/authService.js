import axiosInstance from "../api/axios.config";

/**
 * Register a new user
 */
export const register = async (userData) => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response.data;
};

/**
 * Login user
 */
export const login = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data;
};

/**
 * Get current user profile
 */
export const getProfile = async () => {
  const response = await axiosInstance.get("/auth/profile");
  return response.data;
};

/**
 * Update user profile
 */
export const updateProfile = async (data) => {
  const response = await axiosInstance.put("/auth/profile", data);
  return response.data;
};

/**
 * Add address to profile
 */
export const addAddress = async (address) => {
  const response = await axiosInstance.post("/auth/profile/addresses", address);
  return response.data;
};

/**
 * Delete address from profile
 */
export const deleteAddress = async (addressId) => {
  const response = await axiosInstance.delete(
    `/auth/profile/addresses/${addressId}`
  );
  return response.data;
};

/**
 * Get user faavorites
 */
export const getFavorites = async () => {
  const response = await axiosInstance.get("/auth/favorites");
  return response.data;
};

/**
 * Toggle product in favorites
 */
export const toggleFavorite = async (productId) => {
  const response = await axiosInstance.post(`/auth/favorites/${productId}`);
  return response.data;
};

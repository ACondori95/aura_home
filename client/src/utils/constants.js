// API Endpoints
export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// User Roles
export const USER_ROLES = {USER: "user", ADMIN: "admin"};

// Order Status
export const ORDER_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
};

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",
};

// Product Status
export const PRODUCT_STATUS = {ACTIVE: "active", INACTIVE: "inactive"};

// Pagination
export const ITEMS_PER_PAGE = 12;

// Toast Configuration
export const TOAST_CONFIG = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

// Image Upload
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

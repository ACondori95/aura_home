const express = require("express");
const router = express.Router();

// Controllers
const {
  register,
  login,
  getProfile,
  updateProfile,
  addAddress,
  deleteAddress,
  getFavorites,
  toggleFavorite,
} = require("../controllers/authController");

// Middleware
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");

// Validation schemas
const {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  addAddressSchema,
} = require("../validators/authSchemas");

// Public routes
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

// Protected routes (require authentication)
router.get("/profile", auth, getProfile);
router.put("/profile", auth, validate(updateProfileSchema), updateProfile);

// Address management
router.post("/profile/addresses", auth, validate(addAddressSchema), addAddress);
router.delete("/profile/addresses/:addressId", auth, deleteAddress);

// Favorites management
router.get("/favorites", auth, getFavorites);
router.post("/favorites/:productId", auth, toggleFavorite);

module.exports = router;

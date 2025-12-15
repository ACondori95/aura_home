const express = require("express");
const router = express.Router();

// Controllers
const {
  getAllCategories,
  getCategoryById,
  getProductsByCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// Middleware
const auth = require("../middleware/auth");
const adminCheck = require("../middleware/adminCheck");
const validate = require("../middleware/validate");

// Validation schemas
const {
  createCategorySchema,
  updateCategorySchema,
} = require("../validators/categorySchemas");

// Validation schemas
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.get("/:id/products", getProductsByCategory);

// Protected Admin routes
router.post(
  "/",
  auth,
  adminCheck,
  validate(createCategorySchema),
  createCategory
);

router.put(
  "/:id",
  auth,
  adminCheck,
  validate(updateCategorySchema),
  updateCategory
);

router.delete("/:id", auth, adminCheck, deleteCategory);

module.exports = router;

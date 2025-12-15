const express = require("express");
const router = express.Router();

// Controllers
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  deleteProductImage,
} = require("../controllers/productController");

// Middleware
const auth = require("../middleware/auth");
const adminCheck = require("../middleware/adminCheck");
const validate = require("../middleware/validate");
const {uploadMultiple, handleUploadError} = require("../middleware/upload");

// Validation schemas
const {
  productQuerySchema,
  createProductSchema,
  updateProductSchema,
} = require("../validators/productSchemas");

// Public routes
router.get("/", validate(productQuerySchema, "query"), getAllProducts);
router.get("/:id", getProductById);

// Protected Admin routes
router.post(
  "/",
  auth,
  adminCheck,
  validate(createProductSchema),
  createProduct
);

router.put(
  "/:id",
  auth,
  adminCheck,
  validate(updateProductSchema),
  updateProduct
);

router.delete("/:id", auth, adminCheck, deleteProduct);

// Image upload routes
router.post(
  "/:id/images",
  auth,
  adminCheck,
  uploadMultiple,
  handleUploadError,
  uploadProductImages
);

router.delete("/:id/images", auth, adminCheck, deleteProductImage);

module.exports = router;

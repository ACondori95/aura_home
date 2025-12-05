const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller.js");
const auth = require("../middleware/auth.js");
const adminCheck = require("../middleware/adminCheck.js");
const {uploadMiddleware} = require("../config/cloudinary.js");

// Rutas Públicas (Lectura)
// GET /api/products -> Obtener todos los productos
router.get("/", productController.getProducts);
// GET /api/products/:id -> Obtener un producto específico
router.get("/:id", productController.getProductById);

// Rutas Protegidas (Escritura/Admin)
// POST /api/products -> Crear un nuevo producto (Requiere autenticación y rol Admin)
router.post(
  "/",
  auth,
  adminCheck,
  uploadMiddleware,
  productController.createProduct
);

// PUT /api/products/:id -> Actualizar un producto (Requiere autenticación y rol Admin)
// Nota: uploadMiddleware debe ir antes del controlador para procesar la imagen
router.put(
  "/:id",
  auth,
  adminCheck,
  uploadMiddleware,
  productController.updateProduct
);

// DELETE /api/products/:id -> Eliminar un producto (Requiere autenticación y rol Admin)
router.delete("/:id", auth, adminCheck, productController.deleteProduct);

module.exports = router;

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.js");

// Ruta POST para el registro de nuevos usuarios
router.post("/register", authController.register);

// Ruta POST para el inicio de sesión
router.post("/login", authController.login);

module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const adminCheck = require("../middleware/adminCheck.js");

// Ruta protegida: Solo requiere que el usuario esté logueado
router.get("/profile", auth, (req, res) => {
  // Si llegamos aquí, req.user está disponible
  res.json({message: "Acceso a perfil exitoso", user: req.user});
});

// Ruta de Admin protegida: Requiere estar logueado Y ser admin
router.get("/admin-data", auth, adminCheck, (req, res) => {
  res.json({
    message: "Acceso a datos de administración exitoso",
    user: req.user,
    data: "Datos sensibles del dashboard",
  });
});

module.exports = router;

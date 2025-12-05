const express = require("express");
const router = express.Router();
const {uploadMiddleware} = require("../config/cloudinary.js");
const auth = require("../middleware/auth.js");
const adminCheck = require("../middleware/adminCheck.js");

// Esta ruta estará protegido solo para administradores
router.post("/image", auth, adminCheck, (req, res) => {
  // 1. Ejecutar el middleware de subida
  uploadMiddleware(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Un error conocido de Multer
      return res
        .status(400)
        .json({message: "Error de subida de archivo.", details: err.message});
    } else if (err) {
      // Otros errores (ej. fallo en Cloudinary, formato no permitido)
      console.error("Error de Cloudinary:", err);
      return res
        .status(500)
        .json({message: "Error al procesar el archivo.", details: err.message});
    }

    // Si todo va bien, el objeto 'file' de Multer contiene la respuesta de Cloudinary
    if (req.file) {
      return res.status(200).json({
        message: "Imagen subida con éxito",
        imageUrl: req.file.path, // La URL pública de Cloudinary
        publicId: req.file.filename, // El ID para futuras eliminaciones
      });
    }

    // Si no se adjuntó ningún archivo
    res.status(400).json({message: "No se ha adjuntado ninguna imagen."});
  });
});

module.exports = router;

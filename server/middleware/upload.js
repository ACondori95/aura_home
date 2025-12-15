const multer = require("multer");
const path = require("path");

// Configure multer for memory storage
const storage = multer.memoryStorage();

// File filter - only accept images
const fileFilter = (req, file, cb) => {
  // Allowed extensions
  const allowedTypes = /jpeg|jpg|png|gif|webp/;

  // Check extension
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  // Check mime type
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Solo se permiten imágenes (jpeg, jpg, pbg, gif, webp)"));
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {fileSize: 5 * 1024 * 1024},
  fileFilter: fileFilter,
});

/**
 * Middleware for single image upload
 */
const uploadSingle = upload.single("image");

/**
 * Middleware for multiple image upload (max 10)
 */
const uploadMultiple = upload.array("images", 10);

/**
 * Error handling middleware for multer
 */
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({error: "El archivo es demasiado grande. Tama~bo máximo: 5MB"});
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res
        .status(400)
        .json({error: "Demasiados archivos. Máximo: 10 imágenes"});
    }
    return res
      .status(400)
      .json({error: `Error al subir archivo: ${err.messgae}`});
  }

  if (err) {
    return res.status(400).json({error: err.message});
  }

  next();
};

module.exports = {uploadSingle, uploadMultiple, handleUploadError};

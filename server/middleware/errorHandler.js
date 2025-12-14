/**
 * Global error handling middleware
 * Should be the last middleware in the chain
 */
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message,
    }));

    return res
      .status(400)
      .json({error: "Error de validación", details: errors});
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({error: `El ${field} ya está en uso`});
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === "CastError") {
    return res.status(400).json({error: "ID inválido"});
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({error: "Token inválido"});
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({error: "Token expirado"});
  }

  // Default server error
  res.status(err.statusCode || 500).json({
    error: err.message || "Error interno del servidor",
    details: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

/**
 * Handle 404 errors (route not found)
 */
const notFound = (req, res, next) => {
  res.status(404).json({error: "Ruta no encontrada", path: req.originalUrl});
};

module.exports = {errorHandler, notFound};

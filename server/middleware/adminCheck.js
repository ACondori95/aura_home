/**
 * Middleware to verify user has admin role
 * Must be used after auth middleware
 */
const adminCheck = (req, res, next) => {
  try {
    // Check if user exists (should be set by auth middleware)
    if (!req.user) {
      return res
        .status(401)
        .json({error: "No autorizado. Debe iniciar sesión"});
    }

    // Check if user is admin
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({error: "Acceso denegado. Requiere permisos de administrador"});
    }

    next();
  } catch (error) {
    console.error("Admin check error:", error);
    res.status(403).json({
      error: "Acceso denegado",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = adminCheck;

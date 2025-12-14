const {verifyToken} = require("../utils/jwt");
const User = require("../models/User");

/**
 * Middleware to verify JWT token and authenticate user
 */
const auth = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({error: "No autorizado. Token no proporcionado"});
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = verifyToken(token);

    if (!decoded) {
      return res
        .status(401)
        .json({error: "No autorizado. Token inválido o expirado"});
    }

    // Check if user still exists
    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(401)
        .json({error: "No autorizado. Usuario no encontrado"});
    }

    // Attach user to request
    req.user = {
      id: user._id,
      role: user.role,
      email: user.email,
      name: user.name,
    };

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({
      error: "No autorizado",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = auth;

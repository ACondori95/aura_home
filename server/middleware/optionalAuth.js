const {verifyToken} = require("../utils/jwt");
const User = require("../models/User");

/**
 * Authentication middleware
 * Attaches user to request if valid token is present
 * Does NOT reject requests without token
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // If no token, continue without user
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      req.user = null;
      return next();
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    // If token invalid, continue without user
    if (!decoded) {
      req.user = null;
      return next();
    }

    // Get user if token is valid
    const user = await User.findById(decoded.id);

    if (user) {
      req.user = {
        id: user._id,
        role: user.role,
        email: user.email,
        name: user.name,
      };
    } else {
      req.user = null;
    }
  } catch (error) {
    // On error, continue without user
    req.user = null;
    next();
  }
};

module.exports = optionalAuth;

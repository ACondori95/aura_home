const jwt = require("jsonwebtoken");

/**
 * Generate JWT token for user
 * @param {Object} payload - User data to include in token
 * @returns {String} - JWT token
 */
const generateToken = (payload) => {
  try {
    const token = jwt.sign(
      {id: payload.id, role: payload.role},
      process.env.JWT_SECRET,
      {expiresIn: process.env.JWT_EXPIRE || "7d"}
    );

    return token;
  } catch (error) {
    throw new Error("Error generating token");
  }
};

/**
 * Verify JWT token
 * @param {String} token - JWT token to verify
 * @returns {Object|null} - Decoded payload or null if invalid
 */
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    // Token expired or invalid
    return null;
  }
};

/**
 * Decode JWT token without verification (for debugging)
 * @param {String} token - JWT token to decoded
 * @returns {Object|null} - Decoded payload or null
 */
const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    return null;
  }
};

module.exports = {generateToken, verifyToken, decodeToken};

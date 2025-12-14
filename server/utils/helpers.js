/**
 * Generate a random order number
 * Format: ORD-YYYYMMDD-XXXXX
 */
const generateOrderNumber = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const random = Math.floor(Math.random() * 90000) + 10000;

  return `ORD-${year}${month}${day}-${random}`;
};

/**
 * Calculate taxes (10% of subtotal)
 */
const calculateTaxes = (subtotal) => {
  return Number((subtotal * 0.1).toFixed(2));
};

/**
 * Calculate shipping cost based on subtotal
 * Free shipping over $1000
 */
const calculateShipping = (subtotal) => {
  if (subtotal >= 1000) return 0;
  return 15.0;
};

/**
 * Format price to 2 decimal places
 */
const formatPrice = (price) => {
  return Number(price).toFixed(2);
};

/**
 * Sanitize user input (remove HTML tags)
 */
const sanitizeInput = (input) => {
  if (typeof input !== "string") return input;
  return input.replace(/<[^>]*>/g, "");
};

/**
 * Generate random SKU
 * Format: SKU-XXXXXXXX
 */
const generateSKU = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let sku = "SKU-";
  for (let i = 0; i < 8; i++) {
    sku += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return sku;
};

module.exports = {
  generateOrderNumber,
  calculateTaxes,
  calculateShipping,
  formatPrice,
  sanitizeInput,
  generateSKU,
};

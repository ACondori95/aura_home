const Joi = require("joi");

/**
 * Validation schema for user registration
 */
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().trim().messages({
    "string.empty": "El nombre es requerido",
    "string.min": "El nombre debe tener al menos 2 caracteres",
    "string.max": "El nombre no puede exceder 50 caracteres",
    "any.required": "El nombre es requerido",
  }),

  email: Joi.string().email().required().lowercase().trim().messages({
    "string.empty": "El email es requerido",
    "string.email": "Debe ser un email válido",
    "any.required": "El email es requerido",
  }),

  password: Joi.string().min(6).max(128).required().messages({
    "string.empty": "La contraseña es requerida",
    "string.min": "La contraseña debe tener al menos 6 caracteres",
    "string.max": "La contraseña no puede exceder 128 caracteres",
    "any.required": "La contraseña es requerida",
  }),

  phone: Joi.string()
    .trim()
    .allow("")
    .optional()
    .messages({"string.base": "El teléfono debe ser texto"}),
});

/**
 * Validation schema for user login
 */
const loginSchema = Joi.object({
  email: Joi.string().email().required().lowercase().trim().messages({
    "string.empty": "El email es requerido",
    "string.email": "Debe ser un email válido",
    "any.required": "El email es requerido",
  }),

  password: Joi.string().required().messages({
    "string.empty": "La contraseña es requerida",
    "any.required": "La contraseña es requerida",
  }),
});

/**
 * Validation schema for updating user profile
 */
const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(50).trim().optional().messages({
    "string.min": "El nombre debe tener al menos 2 caracteres",
    "string.max": "El nombre no puede exceder 50 caracteres",
  }),

  phone: Joi.string()
    .trim()
    .allow("")
    .optional()
    .messages({"string.base": "El teléfono debe ser texto"}),

  addresses: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required().trim(),
        street: Joi.string().required().trim(),
        city: Joi.string().required().trim(),
        postalCode: Joi.string().required().trim(),
        country: Joi.string().default("Argentina"),
        isDefault: Joi.boolean().default(false),
      })
    )
    .optional(),
});

/**
 * Validation schema for adding address
 */
const addAddressSchema = Joi.object({
  name: Joi.string().required().trim().messages({
    "string.empty": "El nombre es requerido",
    "any.required": "El nombre es requerido",
  }),

  street: Joi.string().required().trim().messages({
    "string.empty": "La calle es requerida",
    "any.required": "La calle es requerida",
  }),

  city: Joi.string().required().trim().messages({
    "string.empty": "La ciudad es requerida",
    "any.required": "La ciudad es requerida",
  }),

  postalCode: Joi.string().required().trim().messages({
    "string.empty": "El código postal es requerido",
    "any.required": "El código postal es requerido",
  }),

  country: Joi.string().default("Argentina").trim(),

  isDefault: Joi.boolean().default(false),
});

module.exports = {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  addAddressSchema,
};

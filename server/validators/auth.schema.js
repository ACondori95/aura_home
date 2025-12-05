const Joi = require("joi");

// Esquema de validación para el Registro de Usuario
const registerSchema = Joi.object({
  name: Joi.string().trim().min(3).max(50).required().messages({
    "string.empty": "El nombre es obligatorio",
    "string.min": "El nombre debe tener al menos 3 caracteres",
  }),

  email: Joi.string()
    .email({tlds: {allow: false}})
    .trim()
    .required()
    .messages({
      "string.empty": "El email es obligatorio",
      "string.email": "Debe ser un email válido",
    }),

  password: Joi.string().min(6).required().messages({
    "string.empty": "La contraseña es obligatoria",
    "string.min": "La contraseña debe tener al menos 6 caracteres",
  }),

  // El rol no se pide en el registro, pero lo incluimos si quisiéramos validarlo en el futuro.
  // Por ahora, no lo marcamos como requerido.
  role: Joi.string().valid("user", "admin").optional(),
});

// Esquema de validación para el Login de Usuario
const loginSchema = Joi.object({
  email: Joi.string()
    .email({tlds: {allow: false}})
    .trim()
    .required(),

  password: Joi.string().required(),
});

module.exports = {registerSchema, loginSchema};

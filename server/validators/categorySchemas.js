const Joi = require("joi");

/**
 * Validation schema for creating a category
 */
const createCategorySchema = Joi.object({
  name: Joi.string().min(2).max(50).required().trim().messages({
    "string.empty": "El nombre de la categoría es requerido",
    "string.min": "El nombre debe tener al menos 2 caracteres",
    "string.max": "El nombre no puede exceder 50 caracteres",
    "any.required": "El nombre de la categoría es requerido",
  }),

  description: Joi.string()
    .max(500)
    .trim()
    .allow("")
    .optional()
    .messages({"string.max": "La descripción no puede exceder 500 caracteres"}),

  image: Joi.string()
    .uri()
    .allow("")
    .optional()
    .messages({"string.uri": "La imagen debe ser una URI válida"}),

  status: Joi.string()
    .valid("active", "inactive")
    .default("active")
    .messages({"any.only": 'El estado debe ser "active" o "inactive"'}),
});

/**
 * Validation schema for updating a category
 * All fields are optional
 */
const updateCategorySchema = Joi.object({
  name: Joi.string().min(2).max(50).trim().optional().messages({
    "string.min": "El nombre debe tener al menos 2 caracteres",
    "string.max": "El nombre no puede exceder 50 caracteres",
  }),

  description: Joi.string()
    .max(500)
    .trim()
    .allow("")
    .optional()
    .messages({"string.max": "La descripción no puede exceder 500 caracteres"}),

  image: Joi.string()
    .uri()
    .allow("")
    .optional()
    .messages({"string.uri": "La imagen debe ser una URL válida"}),

  status: Joi.string()
    .valid("active", "inactive")
    .optional()
    .messages({"any.only": 'El estado debe ser "active" o "inactive"'}),
})
  .min(1)
  .messages({
    "object.min": "Debe proporcionar la menos un campo para actualizar",
  });

module.exports = {createCategorySchema, updateCategorySchema};

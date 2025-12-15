const Joi = require("joi");

/**
 * Validation schema for creating a product
 */
const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(200).required().trim().messages({
    "string.empty": "El nombre del producto es requerido",
    "string.min": "El nombre debe tener al menos 3 caracteres",
    "string.max": "El nombre no puede exceder 200 caracteres",
    "any.required": "El nombre del producto es requerido",
  }),

  description: Joi.string().max(2000).required().trim().messages({
    "string.empty": "La descripción es requerida",
    "string.max": "La descripción no puede exceder 2000 caracteres",
    "any.required": "La descripción es requerida",
  }),

  category: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.empty": "La categoría es requerida",
      "string.pattern.base": "ID de categoría inválido",
      "any.required": "La categoría es requerida",
    }),

  price: Joi.number().positive().required().messages({
    "number.base": "El precio debe ser un número",
    "number.positive": "El precio debe ser mayor a 0",
    "any.required": "El precio es requerido",
  }),

  salePrice: Joi.number()
    .positive()
    .less(Joi.ref("price"))
    .optional()
    .allow(null)
    .messages({
      "number.base": "El precio de oferta debe ser un número",
      "number.positive": "El precio de oferta debe ser mayor a 0",
      "number.less": "El precio de oferta debe ser menor que el precio regular",
    }),

  sku: Joi.string()
    .required()
    .trim()
    .uppercase()
    .pattern(/^[A-Z0-9-]+$/)
    .messages({
      "string.empty": "El SKU es requerido",
      "string.pattern.base":
        "El SKU solo puede contener letras mayúsculas, números y guiones",
      "any.required": "El SKU es requerido",
    }),

  stock: Joi.number().integer().min(0).required().messages({
    "number.base": "El stock debe ser un número",
    "number.integer": "El stock debe ser un número entero",
    "number.min": "El stock no puede ser negativo",
    "any.required": "El stock es requerido",
  }),

  images: Joi.array().items(Joi.string().uri()).max(10).optional().messages({
    "array.max": "No se pueden agregar más de 10 imágenes",
    "string.uri": "Cada imagen debe ser una URL válida",
  }),

  colors: Joi.array()
    .items(Joi.string().trim())
    .optional()
    .messages({"array.base": "Los colores deben ser un array"}),

  materials: Joi.array()
    .items(Joi.string().trim())
    .optional()
    .messages({"array.base": "Los materiales deben ser un array"}),

  status: Joi.string()
    .valid("active", "inactive")
    .default("active")
    .messages({"any.only": 'El estado debe ser "active" o "inactive"'}),

  featured: Joi.boolean()
    .default(false)
    .messages({"boolean.base": "Featured debe ser verdadero o falso"}),
});

/**
 * Validación schema for updating a product
 * All fields are optional
 */
const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(200).trim().optional().messages({
    "string.min": "El nombre debe tener al menos 3 caracteres",
    "string.max": "El nombre no puede exceder 200 caracteres",
  }),

  description: Joi.string().max(2000).trim().optional().messages({
    "string.max": "La descripción no puede exceder 2000 caracteres",
  }),

  category: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .optional()
    .messages({"string.pattern.base": "ID de categoría inválido"}),

  price: Joi.number().positive().optional().messages({
    "number.base": "El precio debe ser un número",
    "number.positive": "El precio debe ser mayor a 0",
  }),

  salePrice: Joi.number().positive().optional().allow(null).messages({
    "number.base": "El precio de oferta debe ser un número",
    "number.positive": "El precio de oferta debe ser mayor a 0",
  }),

  sku: Joi.string()
    .trim()
    .uppercase()
    .pattern(/^[A-Z0-9-]+$/)
    .optional()
    .messages({
      "string.pattern.base":
        "El SKU solo puede contener letras mayúsculas, números y guiones",
    }),

  stock: Joi.number().integer().min(0).optional().messages({
    "number.base": "El stock debe ser un número",
    "number.integer": "El stock debe ser un número entero",
    "number.min": "El stock no puede ser negativo",
  }),

  images: Joi.array().items(Joi.string().uri()).max(10).optional().messages({
    "array.max": "No se pueden agregar más de 10 imágenes",
    "string.uri": "Cada imagen debe tener una URL válida",
  }),

  colors: Joi.array().items(Joi.string().trim()).optional(),

  materials: Joi.array().items(Joi.string().trim()).optional(),

  status: Joi.string()
    .valid("active", "inactive")
    .optional()
    .messages({"any.only": 'El estado debe ser "active" o "inactive"'}),

  featured: Joi.boolean()
    .optional()
    .messages({"boolean.base": "Featured debe ser verdadero o false"}),
})
  .min(1)
  .messages({
    "object.min": "Debe proporcionar al menos un campo para actualizar",
  });

/**
 * Validation schema for product query filters
 */
const productQuerySchema = Joi.object({
  category: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .optional(),

  minPrice: Joi.number().min(0).optional(),

  maxPrice: Joi.number().min(0).optional(),

  status: Joi.string().valid("active", "inactive").optional(),

  featured: Joi.boolean().optional(),

  search: Joi.string().trim().optional(),

  sort: Joi.string()
    .valid(
      "price_asc",
      "price_desc",
      "name_asc",
      "name_desc",
      "newest",
      "oldest"
    )
    .optional(),

  page: Joi.number().integer().min(1).default(1).optional(),

  limit: Joi.number().integer().min(1).max(100).default(12).optional(),
});

module.exports = {createProductSchema, updateProductSchema, productQuerySchema};

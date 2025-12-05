const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required(),

  description: Joi.string().min(10).max(500).required(),

  price: Joi.number().positive().required(),

  stock: Joi.number().integer().min(0).required(),

  // Nota: imageUrl y imagePublicId serán validados implícitamente por la lógica del controlador
  // y el middleware de Cloudinary, pero los definimos como requeridos si se envían.
  // En la creación, estos campos vendrán del req.file adjuntado por Multer/Cloudinary, no del body.
  // Solo validamos el body:

  // Si la imagen se maneja por separado (lo ideal en un PUT para no subir imagen si no es necesario):
  imageUrl: Joi.string().uri().optional(),
  imagePublicId: Joi.string().optional(),
});

module.exports = {productSchema};

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
      trim: true,
      maxlength: 100,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "La descripción es obligatoria"],
      maxlength: 500,
    },
    price: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: 0,
      default: 0,
    },
    stock: {
      type: Number,
      required: [true, "El stock es obligatorio"],
      min: 0,
      default: 0,
    },
    // Información de la imagen subida a Cloudinary
    imageUrl: {
      type: String,
      required: [true, "La URL de la imagen es obligatoria"],
    },
    imagePublicId: {
      type: String,
      required: [true, "El Public ID de la imagen es obligatorio"],
    },
  },
  {timestamps: true} // Añade createdAt y updatedAt
);

module.exports = mongoose.model("Product", ProductSchema);

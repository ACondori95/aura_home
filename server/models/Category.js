const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre de la categoría es requerida"],
      unique: true,
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
      maxlength: [50, "El nombre no puede exceder los 50 caracteres"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "La descripción no puede exceder 500 caracteres"],
    },
    image: {type: String, default: ""},
    status: {type: String, enum: ["active", "inactive"], default: "active"},
  },
  {timestamps: true}
);

// Index for faster queries
categorySchema.index({name: 1});
categorySchema.index({status: 1});

// Method is to get active categories
categorySchema.statics.getActive = function () {
  return this.find({status: "active"}).sort({name: 1});
};

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;

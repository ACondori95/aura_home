const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del producto es requerido"],
      trim: true,
      minlength: [3, "El nombre debe tener al menos 3 caracteres"],
      maxlength: [200, "El nombre no puede exceder 200 caracteres"],
    },
    description: {
      type: String,
      required: [true, "La descripción es requerida"],
      trim: true,
      maxlength: [2000, "La descripción no puede exceder 2000 caracteres"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "La categoría es requerida"],
    },
    price: {
      type: Number,
      required: [true, "El precio es requerido"],
      min: [0, "El precio no puede ser negativo"],
    },
    salePrice: {
      type: Number,
      min: [0, "El precio de oferta no puede ser negativo"],
      validate: {
        validator: function (value) {
          // salePrice debe ser menor que price si existe
          return !value || value < this.price;
        },
        message: "El precio de oferta debe ser menor que el precio regular",
      },
    },
    sku: {
      type: String,
      required: [true, "El SKU es requerido"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    stock: {
      type: Number,
      required: [true, "El stock es requerido"],
      min: [0, "El stock no puede ser negativo"],
      default: 0,
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator: function (array) {
          return array.length <= 10;
        },
        message: "No se pueden agregar más de 10 imágenes",
      },
    },
    colors: {type: [String], default: []},
    materials: {type: [String], default: []},
    status: {type: String, enum: ["active", "inactive"], default: "active"},
    featured: {type: Boolean, default: false},
  },
  {timestamps: true}
);

// Indexes for faster queries
productSchema.index({name: 1});
productSchema.index({sku: 1});
productSchema.index({category: 1});
productSchema.index({status: 1});
productSchema.index({price: 1});
productSchema.index({featured: 1});

// Compound index for common queries
productSchema.index({category: 1, status: 1});
productSchema.index({status: 1, featured: 1});

// Virtual for checking if product is on sale
productSchema.virtual("isOnSale").get(function () {
  return this.salePrice && this.salePrice < this.price;
});

// Virtual for final price (salePrice or price)
productSchema.virtual("finalPrice").get(function () {
  return this.salePrice || this.price;
});

// Virtual for discount percentage
productSchema.virtual("discountPercentage").get(function () {
  if (this.salePrice && this.salePrice < this.price) {
    return Math.round(((this.price - this.salePrice) / this.price) * 100);
  }
  return 0;
});

// Include virtuals when converting to JSON
productSchema.set("toJSON", {virtuals: true});
productSchema.set("toObject", {virtuals: true});

// Static method to get active products
productSchema.statics.getActive = function () {
  return this.find({status: "active"});
};

// Static method to get featured products
productSchema.statics.getFeatured = function () {
  return this.find({status: "active", featured: true}).limit(8);
};

// Instance method to check if in stock
productSchema.methods.isInStock = function () {
  return this.stock > 0;
};

// Instance method to reduce stock
productSchema.methods.reduceStock = function (quantity) {
  if (this.stock >= quantity) {
    this.stock -= quantity;
    return true;
  }
  return false;
};

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

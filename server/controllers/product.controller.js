const Product = require("../models/Product.js");
const {productSchema} = require("../validators/product.schema.js");
const {cloudinary} = require("../config/cloudinary.js");

// ===================================
// RUTA 1: CREAR PRODUCTO (POST /api/products)
// ===================================
exports.createProduct = async (req, res) => {
  // El middleware de subida (Multer/Cloudinary) ya se ejecutó si hay archivo.
  if (!req.file) {
    return res
      .status(400)
      .json({message: "Se requiere una imágen del producto."});
  }

  // La URL y Public ID vienen de req.file.path y req.file.filename (Multer-Cloudinary)
  const {name, description, price, stock} = req.body;

  try {
    // 1. Validación de datos del body
    const {error} = productSchema.validate({name, description, price, stock});
    if (error) {
      // Si falla la validación, eliminamos la imagen subida
      await cloudinary.uploader.destroy(req.file.filename);
      return res.status(400).json({message: error.details[0].message});
    }

    // 2. Crear el producto
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      imageUrl: req.file.path,
      imagePublicId: req.file.filename,
    });

    res.status(201).json({message: "Producto creado exitosamente", product});
  } catch (error) {
    // 3. Manejo de error de unicidad o de servidor
    if (req.file) {
      // Asegurarse de eliminar la imagen si la DB falla
      await cloudinary.uploader.destroy(req.file.filename);
    }
    if (error.code === 11000) {
      return res
        .status(400)
        .json({message: "Ya existe un producto con este nombre."});
    }
    console.error(error);
    res.status(500).json({message: "Error interno del servidor."});
  }
};

// ===================================
// RUTA 2: OBTENER TODOS LOS PRODUCTOS (GET /api/products)
// ===================================
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({message: "Error al obtener productos."});
  }
};

// ===================================
// RUTA 3: OBTENER UN PRODUCTO POR ID (GET /api/products/:id)
// ===================================
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({message: "Producto no encontrado."});
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({message: "Error al obtener el producto."});
  }
};

// ===================================
// RUTA 4: ACTUALIZAR PRODUCTO (PUT /api/products/:id)
// ===================================
exports.updateProduct = async (req, res) => {
  const {id} = req.params;
  const {name, description, price, stock} = req.body;
  let updateData = {name, description, price, stock};
  let oldProduct;

  try {
    // 1. Validación de datos del body
    const {error} = productSchema.validate(updateData);
    if (error) {
      // Si hay un archivo nuevo, debemos eliminarlo antes de devolver el error de validación
      if (req.file) await cloudinary.uploader.destroy(req.file.filename);
      return res.status(400).json({message: error.details[0].message});
    }

    // 2. Si se subió una nueva imagen, actualizamos los campos de imagen
    if (req.file) {
      // Obtener el producto antiguo para eliminar su imagen
      oldProduct = await Product.findById(id);

      // Añadir los nuevos datos de imagen al objeto de actualización
      updateData.imageUrl = req.file.path;
      updateData.imagePublicId = req.file.filename;

      // Eliminar la imagen antigua de Cloudinary
      if (oldProduct && oldProduct.imagePublicId) {
        await cloudinary.uploader.destroy(oldProduct.imagePublicId);
      }
    }

    // 3. Actualizar el producto
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      // Si se subió una nueva imagen pero el producto no existe, eliminar la nueva
      if (req.file) await cloudinary.uploader.destroy(req.file.filename);
      return res.status(404).json({message: "Producto no encontrado."});
    }

    res.json({
      message: "Producto actualizado exitosamente",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    if (req.file) await cloudinary.uploader.destroy(req.file.filename); // Limpieza en caso de error
    res
      .status(500)
      .json({message: "Error interno del servidor al actualizar."});
  }
};

// ===================================
// RUTA 5: ELIMINAR PRODUCTO (DELETE /api/products/:id)
// ===================================
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({message: "Producto no encontrado."});
    }

    // Eliminar la imagen asociada de Cloudinary
    await cloudinary.uploader.destroy(product.imagePublicId);

    res.json({
      message: "Producto eliminado exitosamente y su imagen en Cloudinary.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Error interno del servidor al eliminar."});
  }
};

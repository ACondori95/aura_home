const Product = require("../models/Product");
const Category = require("../models/Category");
const {uploadImage, deleteImage} = require("../config/cloudinary");

/**
 * @desc    Get all products with filters
 * @route   GET /api/products
 * @access  Public
 */
const getAllProducts = async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      status,
      featured,
      search,
      sort = "newest",
      page = 1,
      limit = 12,
    } = req.query;

    // Build query
    const query = {};

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Filter by status (default: only active for public)
    if (status) {
      query.status = status;
    } else if (!req.user || req.user.role !== "admin") {
      // Non-admin users only see active products
      query.status = "active";
    }

    // Filter by featured
    if (featured !== undefined) {
      query.featured = featured === "true";
    }

    // Search by name or description
    if (search) {
      query.$or = [
        {name: {$regex: search, $options: "i"}},
        {description: {$regex: search, $options: "i"}},
      ];
    }

    // Sort options
    let sortOption = {};
    switch (sort) {
      case "price_asc":
        sortOption = {price: 1};
        break;
      case "price_desc":
        sortOption = {price: -1};
        break;
      case "name_asc":
        sortOption = {name: 1};
        break;
      case "name_desc":
        sortOption = {name: -1};
        break;
      case "oldest":
        sortOption = {createdAt: 1};
        break;
      case "newest":
      default:
        sortOption = {createdAt: -1};
        break;
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const products = await Product.find(query)
      .populate("category", "name")
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    // Get total count for pagination
    const total = await Product.countDocuments(query);

    res.status(200).json({
      products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error("Get all products error:", error);
    res.status(500).json({
      error: "Error al obtener productos",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * @desc    Get single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name description"
    );

    if (!product) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    // Check if product is active (unless admin)
    if (
      product.status !== "active" &&
      (!req.user || req.user.role !== "admin")
    ) {
      return res.status(404).json({
        error: "Producto no disponible",
      });
    }

    res.status(200).json({
      product,
    });
  } catch (error) {
    console.error("Get product by ID error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        error: "ID de producto inválido",
      });
    }

    res.status(500).json({
      error: "Error al obtener producto",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * @desc    Create new product
 * @route   POST /api/products
 * @access  Private/Admin
 */
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      salePrice,
      sku,
      stock,
      images,
      colors,
      materials,
      status,
      featured,
    } = req.body;

    // Check if category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({
        error: "Categoría no encontrada",
      });
    }

    // Check if SKU already exists
    const skuExists = await Product.findOne({sku});
    if (skuExists) {
      return res.status(400).json({
        error: "El SKU ya está en uso",
      });
    }

    // Create product
    const product = new Product({
      name,
      description,
      category,
      price,
      salePrice,
      sku,
      stock,
      images: images || [],
      colors: colors || [],
      materials: materials || [],
      status: status || "active",
      featured: featured || false,
    });

    await product.save();

    // Populate category
    await product.populate("category", "name");

    res.status(201).json({
      message: "Producto creado exitosamente",
      product,
    });
  } catch (error) {
    console.error("Create product error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        error: "El SKU ya está en uso",
      });
    }

    res.status(500).json({
      error: "Error al crear producto",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    // If category is being updated, check if it exists
    if (req.body.category) {
      const categoryExists = await Category.findById(req.body.category);
      if (!categoryExists) {
        return res.status(400).json({
          error: "Categoría no encontrada",
        });
      }
    }

    // If SKU is being updated, check if it's not already in use
    if (req.body.sku && req.body.sku !== product.sku) {
      const skuExists = await Product.findOne({sku: req.body.sku});
      if (skuExists) {
        return res.status(400).json({
          error: "El SKU ya está en uso",
        });
      }
    }

    // Update fields
    Object.keys(req.body).forEach((key) => {
      product[key] = req.body[key];
    });

    await product.save();

    // Populate category
    await product.populate("category", "name");

    res.status(200).json({
      message: "Producto actualizado exitosamente",
      product,
    });
  } catch (error) {
    console.error("Update product error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        error: "El SKU ya está en uso",
      });
    }

    res.status(500).json({
      error: "Error al actualizar producto",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    // Delete images from Cloudinary (if configured)
    if (
      product.images &&
      product.images.length > 0 &&
      process.env.CLOUDINARY_CLOUD_NAME
    ) {
      try {
        const {extractPublicId, deleteImages} = require("../config/cloudinary");
        const publicIds = product.images.map((url) => extractPublicId(url));
        await deleteImages(publicIds);
      } catch (cloudinaryError) {
        console.error(
          "Error deleting images from Cloudinary:",
          cloudinaryError
        );
        // Continue with product deletion even if image deletion fails
      }
    }

    await product.deleteOne();

    res.status(200).json({
      message: "Producto eliminado exitosamente",
    });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({
      error: "Error al eliminar producto",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * @desc    Upload product images
 * @route   POST /api/products/:id/images
 * @access  Private/Admin
 */
const uploadProductImages = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        error: "No se proporcionaron imágenes",
      });
    }

    // Check if adding these images would exceed the limit
    if (product.images.length + req.files.length > 10) {
      return res.status(400).json({
        error: `No se pueden agregar más de 10 imágenes. Actualmente tienes ${product.images.length} imágenes.`,
      });
    }

    // Upload images to Cloudinary
    const uploadPromises = req.files.map(async (file) => {
      // Convert buffer to base64
      const base64Image = `data:${file.mimetype};base64,${file.buffer.toString(
        "base64"
      )}`;
      const result = await uploadImage(base64Image, "aura-home/products");
      return result.url;
    });

    const uploadedUrls = await Promise.all(uploadPromises);

    // Add URLs to product
    product.images.push(...uploadedUrls);
    await product.save();

    res.status(200).json({
      message: `${uploadedUrls.length} imagen(es) subida(s) exitosamente`,
      images: product.images,
    });
  } catch (error) {
    console.error("Upload product images error:", error);
    res.status(500).json({
      error: "Error al subir imágenes",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * @desc    Delete product image
 * @route   DELETE /api/products/:id/images
 * @access  Private/Admin
 */
const deleteProductImage = async (req, res) => {
  try {
    const {imageUrl} = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        error: "URL de imagen es requerida",
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    // Check if image exists in product
    const imageIndex = product.images.indexOf(imageUrl);
    if (imageIndex === -1) {
      return res.status(404).json({
        error: "Imagen no encontrada en el producto",
      });
    }

    // Delete from Cloudinary (if configured)
    if (process.env.CLOUDINARY_CLOUD_NAME) {
      try {
        const {extractPublicId} = require("../config/cloudinary");
        const publicId = extractPublicId(imageUrl);
        await deleteImage(publicId);
      } catch (cloudinaryError) {
        console.error("Error deleting image from Cloudinary:", cloudinaryError);
        // Continue with removal from product even if Cloudinary deletion fails
      }
    }

    // Remove from product
    product.images.splice(imageIndex, 1);
    await product.save();

    res.status(200).json({
      message: "Imagen eliminada exitosamente",
      images: product.images,
    });
  } catch (error) {
    console.error("Delete product image error:", error);
    res.status(500).json({
      error: "Error al eliminar imagen",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  deleteProductImage,
};

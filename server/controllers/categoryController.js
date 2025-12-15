const Category = require("../models/Category");
const Product = require("../models/Product");

/**
 * @desc    Get all categories
 * @route   GET /api/categories
 * @access  Public
 */
const getAllCategories = async (req, res) => {
  try {
    const {status, includeInactive} = req.query;

    // Build query
    const query = {};

    // Filter by status
    if (status) {
      query.status = status;
    } else if (!includeInactive || includeInactive !== "true") {
      // By default, only show active categories
      query.status = "active";
    }

    // Get categories
    const categories = await Category.find(query).sort({name: 1});

    // Get product count for each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const productCount = await Product.countDocuments({
          category: category._id,
          status: "active",
        });

        return {
          ...category.toObject(),
          productCount,
        };
      })
    );

    res.status(200).json({
      categories: categoriesWithCount,
    });
  } catch (error) {
    console.error("Get all categories error:", error);
    res.status(500).json({
      error: "Error al obtener categorías",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * @desc    Get single category by ID
 * @route   GET /api/categories/:id
 * @access  Public
 */
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        error: "Categoría no encontrada",
      });
    }

    // Get product count
    const productCount = await Product.countDocuments({
      category: category._id,
      status: "active",
    });

    res.status(200).json({
      category: {
        ...category.toObject(),
        productCount,
      },
    });
  } catch (error) {
    console.error("Get category by ID error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        error: "ID de categoría inválido",
      });
    }

    res.status(500).json({
      error: "Error al obtener categoría",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * @desc    Create new category
 * @route   POST /api/categories
 * @access  Private/Admin
 */
const createCategory = async (req, res) => {
  try {
    const {name, description, image, status} = req.body;

    // Check if category name already exists
    const existingCategory = await Category.findOne({
      name: {$regex: new RegExp(`^${name}$`, "i")},
    });

    if (existingCategory) {
      return res.status(400).json({
        error: "Ya existe una categoría con ese nombre",
      });
    }

    // Create category
    const category = new Category({
      name,
      description,
      image,
      status: status || "active",
    });

    await category.save();

    res.status(201).json({
      message: "Categoría creada exitosamente",
      category,
    });
  } catch (error) {
    console.error("Create category error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        error: "Ya existe una categoría con ese nombre",
      });
    }

    res.status(500).json({
      error: "Error al crear categoría",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * @desc    Update category
 * @route   PUT /api/categories/:id
 * @access  Private/Admin
 */
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        error: "Categoría no encontrada",
      });
    }

    // If name is being updated, check if it's not already in use
    if (req.body.name && req.body.name !== category.name) {
      const existingCategory = await Category.findOne({
        name: {$regex: new RegExp(`^${req.body.name}$`, "i")},
        _id: {$ne: category._id},
      });

      if (existingCategory) {
        return res.status(400).json({
          error: "Ya existe una categoría con ese nombre",
        });
      }
    }

    // Update fields
    Object.keys(req.body).forEach((key) => {
      category[key] = req.body[key];
    });

    await category.save();

    res.status(200).json({
      message: "Categoría actualizada exitosamente",
      category,
    });
  } catch (error) {
    console.error("Update category error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        error: "Ya existe una categoría con ese nombre",
      });
    }

    res.status(500).json({
      error: "Error al actualizar categoría",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * @desc    Delete category
 * @route   DELETE /api/categories/:id
 * @access  Private/Admin
 */
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        error: "Categoría no encontrada",
      });
    }

    // Check if category has products
    const productCount = await Product.countDocuments({
      category: category._id,
    });

    if (productCount > 0) {
      return res.status(400).json({
        error: `No se puede eliminar la categoría. Tiene ${productCount} producto(s) asociado(s)`,
        productCount,
      });
    }

    await category.deleteOne();

    res.status(200).json({
      message: "Categoría eliminada exitosamente",
    });
  } catch (error) {
    console.error("Delete category error:", error);
    res.status(500).json({
      error: "Error al eliminar categoría",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * @desc    Get products by category
 * @route   GET /api/categories/:id/products
 * @access  Public
 */
const getProductsByCategory = async (req, res) => {
  try {
    const {page = 1, limit = 12, sort = "newest"} = req.query;

    // Check if category exists
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        error: "Categoría no encontrada",
      });
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

    // Get products
    const products = await Product.find({
      category: req.params.id,
      status: "active",
    })
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum)
      .populate("category", "name");

    // Get total count
    const total = await Product.countDocuments({
      category: req.params.id,
      status: "active",
    });

    res.status(200).json({
      category: {
        _id: category._id,
        name: category.name,
        description: category.description,
      },
      products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error("Get products by category error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        error: "ID de categoría inválido",
      });
    }

    res.status(500).json({
      error: "Error al obtener productos",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getProductsByCategory,
};

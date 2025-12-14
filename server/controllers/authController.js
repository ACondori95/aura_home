const User = require("../models/User");
const {generateToken} = require("../utils/jwt");

/**
 * @desc   Register a new user
 * @route  POST /api/auth/register
 * @access Public
 */
const register = async (req, res) => {
  try {
    const {name, email, password, phone} = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({error: "El email ya está registrado"});
    }

    // Create a new user
    const user = new User({name, email, password, phone});

    await user.save();

    // Generate token
    const token = generateToken({id: user._id, role: user.role});

    // Return user data and token
    res.status(201).json({
      message: "Usuario registrado exitosamente",
      token,
      user: user.getPublicProfile(),
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      error: "Error al registrar usuario",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * @desc   Login user
 * @route  POST /api/auth/login
 * @access Public
 */
const login = async (req, res) => {
  try {
    const {email, password} = req.body;

    // Find user with password field
    const user = await User.findOne({email}).select("+password");

    if (!user) {
      return res.status(401).json({error: "Credenciales inválidas"});
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({error: "Credenciales inválidas"});
    }

    // Generate token
    const token = generateToken({id: user._id, role: user.role});

    // Return user data and token
    res
      .status(200)
      .json({message: "Login exitoso", token, user: user.getPublicProfile()});
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      error: "Error al iniciar sesión",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * @desc   Get current user profile
 * @route  GET /api/auth/profile
 * @access Private
 */
const getProfile = async (req, res) => {
  try {
    // req.user is set by auth middleware
    const user = await User.findById(req.user.id).populate(
      "favorites",
      "name price images"
    );

    if (!user) {
      return res.status(404).json({error: "Usuario no encontrado"});
    }

    res.status(200).json({user: user.getPublicProfile()});
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      error: "Error al obtener perfil",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * @desc   Update user profile
 * @route  PUT /api/auth/profile
 * @access Private
 */
const updateProfile = async (req, res) => {
  try {
    const {name, phone, addresses} = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({error: "Usuario no encontrado"});
    }

    // Update fields if provided
    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (addresses) user.addresses = addresses;

    await user.save();

    res.status(200).json({
      message: "Perfil actualizado exitosamente",
      user: user.getPublicProfile(),
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      error: "Error al actualizar perfil",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * @desc   Add address to user profile
 * @route  POST /api/auth/profile/addresses
 * @access Private
 */
const addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({error: "Usuario no encontrado"});
    }

    // If this is set as default, unset other defaults
    if (req.body.isDefault) {
      user.addresses.forEach((addr) => {
        addr.isDefault = false;
      });
    }

    // Add new address
    user.addresses.push(req.body);
    await user.save();

    res.status(201).json({
      message: "Dirección agregada exitosamente",
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("Add address error:", error);
    res.status(500).json({
      error: "Error al agregar dirección",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * @desc   Delete address from user profile
 * @route  DELETE /api/auth/profile/addresses/:addressId
 * @access Private
 */
const deleteAccess = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({error: "Usuario no encontrado"});
    }

    // Remove address
    user.addresses = user.addresses.filter(
      (addr) => addr._id.toString() !== req.params.addressId
    );

    await user.save();

    res.status(200).json({
      message: "Dirección eliminada exitosamente",
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("Delete address error:", error);
    res.status(500).json({
      error: "Error al eliminar dirección",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * @desc   Toggle product in favorites
 * @route  POST /api/auth/favorites/:productId
 * @access Private
 */
const toggleFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({error: "Usuario no encontrado"});
    }

    const productId = req.params.productId;
    const favoriteIndex = user.favorites.indexOf(productId);

    if (favoriteIndex > -1) {
      // Remove from favorites
      user.favorites.splice(favoriteIndex, 1);
      await user.save();

      return res.status(200).json({
        message: "Producto eliminado de favoritos",
        favorites: user.favorites,
        isFavorite: false,
      });
    } else {
      // Add to favorites
      user.favorites.push(productId);
      await user.save();

      return res.status(200).json({
        message: "Producto agregado a favoritos",
        favorites: user.favorites,
        isFavorite: true,
      });
    }
  } catch (error) {
    console.error("Toggle favorite error:", error);
    res.status(500).json({
      error: "Error al actualizar favoritos",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * @desc   Get user favorites
 * @route  GET /api/auth/favorites
 * @access Private
 */
const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "favorites",
      "name price salePrice images stock status"
    );

    if (!user) {
      return res.status(404).json({error: "Usuario no encontrado"});
    }

    res.status(200).json({favorites: user.favorites});
  } catch (error) {
    console.error("Get favorites error:", error);
    res.status(500).json({
      error: "Error al obtener favoritos",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  addAddress,
  deleteAccess,
  toggleFavorite,
  getFavorites,
};

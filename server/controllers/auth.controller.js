const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {registerSchema, loginSchema} = require("../validators/auth.schema.js");

// Función auxiliar para generar el token
const generateToken = (user) => {
  return jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ===================================
// CONTROLADOR DE REGISTRO
// ===================================
exports.register = async (req, res) => {
  try {
    // 1. Validación de datos con Joi
    const {error, value} = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({messgae: error.details[0].message});
    }

    // 2. Verificar si el usuario ya existe
    let user = await User.findOne({email: value.email});
    if (user) {
      return res
        .status(400)
        .json({message: "El usuario con ese email ya existe."});
    }

    // 3. Hashing de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(value.password, salt);

    // 4. Crear nuevo usuario
    user = new User({
      name: value.name,
      email: value.email,
      password: hashedPassword,
    });

    await user.save();

    // 5. Generar Token e incluir información básica del usuario
    const token = generateToken(user);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error en el registro:", error.message);
    res
      .status(500)
      .json({message: "Error interno del servidor durente el registro."});
  }
};

// ===================================
// CONTROLADOR DE LOGIN
// ===================================
exports.login = async (req, res) => {
  try {
    // 1. Validación de datos con Joi
    const {error, value} = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({message: error.details[0].message});
    }

    // 2. Buscar usuario por email (incluyendo la contraseña que está select: false)
    const user = await User.findOne({email: value.email}).select("+password");

    if (!user) {
      return res.status(400).json({message: "Credenciales inválidas."});
    }

    // 3. Comparar contraseñas
    const isMatch = await bcrypt.compare(value.password, user.password);

    if (!isMatch) {
      return res.status(400).json({message: "Credenciales inválidas."});
    }

    // 4. Generar Token
    const token = generateToken(user);

    // 5. Respuesta exitosa
    res.json({
      token,
      user: {id: user._id, name: user.name, email: user.email, role: user.role},
    });
  } catch (error) {
    console.error("Error en el login:", error.message);
    res
      .status(500)
      .json({message: "Error interno del servidor durante el login."});
  }
};

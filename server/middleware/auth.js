const jwt = require("jsonwebtoken");
const User = require("../models/User.js"); // Para posible validación adicional

const auth = async (req, res, next) => {
  let token;

  // 1. Verificar el formato del header Authorization: Bearer <token>
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Obtener el token (quitar "Bearer")
      token = req.headers.authorization.split(" ")[1];

      // 2. Decodificar el token y obtener la carga (payload)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Buscar el usuario en la DB (opcional, pero buena práctica)
      // Seleccionamos solo el id, name, y role para no cargar toda la información
      req.user = await User.findById(decoded.id).select("_id name role");

      if (!req.user) {
        return res
          .status(401)
          .json({message: "Usuario no encontrado o token inválido."});
      }

      // 4. Continuar con la siguiente función (controlador o siguiente middleware)
      next();
    } catch (error) {
      console.error(error);
      // Error común: Token expirado o firma inválida
      return res
        .status(401)
        .json({message: "Token de acceso no válido o expirado."});
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({message: "No autorizado, no se encontró token."});
  }
};

module.exports = auth;

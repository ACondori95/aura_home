// Este middleware asume que auth.js ya se ejecutó y adjuntó req.user
const adminCheck = (req, res, next) => {
  // 1. Verificar el req.user existe (lo adjunta el middleware auth)
  if (!req.user) {
    return res
      .status(401)
      .json({message: "No autorizado, se requiere autenticación."});
  }

  // 2. Verificar si el rol del usuario es 'admin'
  if (req.user.role !== "admin") {
    // 403. Forbidden: El usuario está logueado, pero no tiene permisos sufucientes
    return res
      .status(403)
      .json({message: "Acceso denegado. Solo para administradores."});
  }

  // 3. Si es admin, continuar
  next();
};

module.exports = adminCheck;

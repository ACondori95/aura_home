require("dotenv").config(); // Carga las variables de entorno al principio

const express = require("express");
const cors = require("cors");
// Importar la función de conexión a la base de datos
const connectDB = require("./config/db.js");
// Importar las rutas de autenticación
const authRoutes = require("./routes/auth.routes.js");
// Importar la nueva ruta de usuario
const userRoutes = require("./routes/user.routes.js");

// Llamar a la función para conectar la DB
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

// MIDDLEWARES
app.use(cors()); // Permite peticiones desde el frontend (diferente origen)
app.use(express.json()); // Permite a Express parsear cuerpos de solicitud JSON

// Integrar las rutas con un prefijo /api
app.use("/api/auth", authRoutes); // Todas las rutas de auth empiezan con /api/auth

// Integrar las rutas de Usuario (ej. Perfil)
app.use("/api/users", userRoutes);

// RUTA DE PRUEBA (Health Check)
app.get("/", (req, res) => {
  res.send("API Aura Home funcionando!");
});

// Inicialización del servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor Express escuchando en el puerto ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
});

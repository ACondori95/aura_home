require("dotenv").config(); // Carga las variables de entorno al principio

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

// MIDDLEWARES
app.use(cors()); // Permite peticiones desde el frontend (diferente origen)
app.use(express.json()); // Permite a Express parsear cuerpos de solicitud JSON

// RUTA DE PRUEBA (Health Check)
app.get("/", (req, res) => {
  res.send("API Aura Home funcionando!");
});

// Inicialización del servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor Express escuchando en el puerto ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
});

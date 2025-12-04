const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Obtenemos la URI la conexión de las variables de entorno
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error el conectar a MongoDB: ${error.message}`);

    // Finaliza el proceso con un código de fallo (1)
    process.exit(1);
  }
};

module.exports = connectDB;

const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const multer = require("multer");

// 1. Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Configuración del Storage para Multer (dónde guardará el archivo)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "aura_home_products", // Carpeta donde se guardarán las imágenes
    allowedFormats: ["jpeg", "png", "jpg"], // Formatos permitidos
    transformation: [{width: 500, height: 500, crop: "limit"}], // Transformación opcional al subir
  },
});

// 3. Crear el Middleware de Multer usando el storage de Cloudinary
// 'image' es el nombre del campo del formulario que contendrá el archivo
const uploadMiddleware = multer({storage: storage}).single("image");

module.exports = {cloudinary, uploadMiddleware};

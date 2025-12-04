const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    trim: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Por favor, ingrese un email válido"], // Regex simple para email
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    select: false, // Importante: No incluir la contraseña en las consultas por defecto
  },
  // El rol por defecto será 'user'. 'admin' debe asignarse manualmente.
  role: {type: String, enum: ["user", "admin"], default: "user"},
  createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model("User", UserSchema);

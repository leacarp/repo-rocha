// La carpeta modelos/models tiene el Schema que vamos a usar

const mongoose = require("mongoose");

// Un Schema en Mongoose es como una plantilla para tus documentos en MongoDB. Define qué campos deben tener y sus características
const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  tareas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tarea" }], // mongoose.Schema.Types.ObjectId es como una foreign key, al ponerlo en un array seria una relacion de uno a muchos, con el ref indicamos al modelo que hacemos referencia
});

// Con la función mongoose.model, creamos un modelo basado en el Schema que definimos antes. Este modelo es lo que utilizamos para interactuar con los documentos de la colección en la base de datos.
const Usuario = mongoose.model("Usuario", usuarioSchema);
module.exports = Usuario;

const mongoose = require("mongoose");

const tareaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String },
  estado: {
    type: String,
    enum: ["pendiente", "en progreso", "completada"],
    default: "pendiente",
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

const Tarea = mongoose.model("Tarea", tareaSchema);
module.exports = Tarea;

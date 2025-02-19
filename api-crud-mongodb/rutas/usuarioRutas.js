// La carpeta rutas/routes es donde definimos que rutas usaran los controladores (CRUD) para interactuar con la base de datos

const express = require("express");
const {
  crearUsuario,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
} = require("../controladores/usuarioControlador");

const router = express.Router();

router.get("/usuarios", obtenerUsuario);
router.post("/usuarios", crearUsuario);
router.put("/usuarios/:id", actualizarUsuario);
router.delete("/usuarios/:id", eliminarUsuario);

module.exports = router;

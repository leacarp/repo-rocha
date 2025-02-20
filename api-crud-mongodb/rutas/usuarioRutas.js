// La carpeta rutas/routes es donde definimos que rutas usaran los controladores (CRUD) para interactuar con la base de datos
const express = require("express");
const router = express.Router();
const {
  crearUsuario,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
  validarLogin
} = require("../controladores/usuarioControlador");
const manejarErrores = require('../middlewares/manejarErrores')
const {
  validarCreacionUsuario,
    validarUsuario,
    validarActualizarUsuario
} = require('../middlewares/validacionUsuario')



router.get("/usuarios", obtenerUsuario);
router.post("/usuarios", validarCreacionUsuario, manejarErrores, crearUsuario);
router.post("/usuarios/login", validarLogin)
router.put("/usuarios/:id", validarActualizarUsuario, manejarErrores, actualizarUsuario);
router.delete("/usuarios/:id", validarUsuario, manejarErrores, eliminarUsuario);

module.exports = router;

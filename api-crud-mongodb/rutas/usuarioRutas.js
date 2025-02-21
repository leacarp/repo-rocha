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
const validarJWT = require('../middlewares/validarToken')
const validarRoles = require('../middlewares/validarRoles')
const manejarErrores = require('../middlewares/manejarErrores')
const {
  validarCreacionUsuario,
    validarUsuario,
    validarActualizarUsuario
} = require('../middlewares/validacionUsuario')



router.get("/usuarios", validarJWT, validarRoles('admin'), obtenerUsuario);
router.post("/usuarios", validarCreacionUsuario, manejarErrores, crearUsuario);
router.post("/usuarios/login", validarLogin)
router.put("/usuarios/:id", validarJWT, validarRoles('admin'), validarActualizarUsuario, manejarErrores, actualizarUsuario);
router.delete("/usuarios/:id", validarJWT, validarRoles('admin'), validarUsuario, manejarErrores, eliminarUsuario);

module.exports = router;

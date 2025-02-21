const express = require("express");
const router = express.Router();
const validarJWT = require('../middlewares/validarToken')
const {
  validarCreacionTarea,
  validarActualizarTarea,
  validarTarea,
  validarEliminarPorEstado,
  validarIdUsuario
} = require('../middlewares/validacionTarea')
const validarRoles = require('../middlewares/validarRoles')
const manejarErrores = require('../middlewares/manejarErrores')
const {
  crearTarea,
  obtenerTarea,
  obtenerTareasPorUsuario,
  actualizarTarea,
  eliminarTarea,
  actualizarTareasPendientes,
  eliminarTareasPorUsuario,
  eliminarTareaPorEstado,
  obtenerTareasPaginadas,
  obtenerTareasPaginadasPorUsuario
} = require("../controladores/tareaControlador");


router.get("/tareas", validarJWT, validarRoles('admin', 'user'), obtenerTarea); // Acceso a todos los usuarios con roles admin y user
router.get("/tareas/paginadas", validarJWT, validarRoles('admin', 'user'), obtenerTareasPaginadas); // Acceso a todos los usuarios con roles admin y user
router.get("/tareas/usuario/:idUsuario", validarJWT, validarRoles('admin', 'user'), validarIdUsuario, manejarErrores, obtenerTareasPorUsuario); // Acceso a admin y user
router.get("/tareas/usuario/:idUsuario/paginadas", validarJWT, validarRoles('admin', 'user'), validarIdUsuario, manejarErrores, obtenerTareasPaginadasPorUsuario); // Acceso a admin y user
router.post("/tareas", validarJWT, validarRoles('admin', 'user'), validarCreacionTarea, manejarErrores, crearTarea); // Acceso a admin y user
router.put("/tareas/:id", validarJWT, validarRoles('admin', 'user'), validarActualizarTarea, manejarErrores, actualizarTarea); // Acceso a admin y user
router.put('/tareas/usuario/:idUsuario/actualizar-pendientes', validarJWT, validarRoles('admin', 'user'), validarIdUsuario, manejarErrores, actualizarTareasPendientes); // Acceso a admin y user
router.delete("/tareas/:id", validarJWT, validarRoles('admin'), validarTarea, manejarErrores, eliminarTarea); // Solo accesible por admin
router.delete('/tareas/usuario/:idUsuario/eliminar', validarJWT, validarRoles('admin', 'user'), validarIdUsuario, manejarErrores, eliminarTareasPorUsuario); // Acceso a admin y user
router.delete('/tareas/usuario/:idUsuario/eliminar-por-estado', validarJWT, validarRoles('admin', 'user'), validarEliminarPorEstado, manejarErrores, eliminarTareaPorEstado); // Acceso a admin y user

module.exports = router;

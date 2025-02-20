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


router.get("/tareas", validarJWT, obtenerTarea);
router.get("/tareas/paginadas", obtenerTareasPaginadas)
router.get("/tareas/usuario/:idUsuario", validarIdUsuario, manejarErrores, obtenerTareasPorUsuario);
router.get("/tareas/usuario/:idUsuario/paginadas", validarIdUsuario, manejarErrores, obtenerTareasPaginadasPorUsuario)
router.post("/tareas", validarCreacionTarea, manejarErrores, crearTarea);
router.put("/tareas/:id", validarActualizarTarea, manejarErrores, actualizarTarea);
router.put('/tareas/usuario/:idUsuario/actualizar-pendientes', validarIdUsuario, manejarErrores, actualizarTareasPendientes)
router.delete("/tareas/:id", validarTarea, manejarErrores, eliminarTarea);
router.delete('/tareas/usuario/:idUsuario/eliminar', validarIdUsuario, manejarErrores, eliminarTareasPorUsuario)
router.delete('/tareas/usuario/:idUsuario/eliminar-por-estado', validarEliminarPorEstado, manejarErrores, eliminarTareaPorEstado)

module.exports = router;

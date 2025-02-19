const express = require("express");
const {
  crearTarea,
  obtenerTarea,
  obtenerTareasPorUsuario,
  actualizarTarea,
  eliminarTarea,
  actualizarTareasPendientes,
  eliminarTareasPorUsuario,
  eliminarTareaPorEstado
} = require("../controladores/tareaControlador");

const router = express.Router();

router.get("/tareas", obtenerTarea);
router.get("/tareas/usuario/:idUsuario", obtenerTareasPorUsuario);
router.post("/tareas", crearTarea);
router.put("/tareas/:id", actualizarTarea);
router.put('/tareas/usuario/:idUsuario/actualizar-pendientes', actualizarTareasPendientes)
router.delete("/tareas/:id", eliminarTarea);
router.delete('/tareas/usuario/:idUsuario/eliminar', eliminarTareasPorUsuario)
router.delete('/tareas/usuario/:idUsuario/eliminar-por-estado', eliminarTareaPorEstado)

module.exports = router;

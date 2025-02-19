const { body, param } = require("express-validator");

const validarCreacionTarea = [
  body("titulo")
    .notEmpty()
    .trim()
    .isLength(3)
    .withMessage("El titulo es obligatorio y debe ser una cadena de texto"),
  body("descripcion")
    .notEmpty()
    .trim()
    .isLength(5)
    .withMessage("Coloque una descripcion a su tarea"),
    body('estado').notEmpty().isIn(['pendiente', 'completada']).withMessage('Ingrese un estado en la tarea'),
  body("usuarioId").isMongoId().withMessage("Ingrese una ID correcta"),
];

const validarActualizarTarea = [
  param("id").isMongoId().withMessage("ID de tarea invalido"),
  body("titulo").optional({ checkFalsy: true }).trim().isLength(3),
  body("descripcion").optional({ checkFalsy: true }).trim().isLength(5),
  body("estado")
    .optional()
    .isIn(["pendiente", "en progreso", "completada"])
    .withMessage("Estado no valido"),
  body("usuarioId").isMongoId().withMessage("ID de usuario invalido"),
];

const validarTarea = [
    param('id').isMongoId().withMessage('ID de la tarea invalido')
]

const validarEliminarPorEstado = [
    param('idUsuario')
        .isMongoId().withMessage('El ID del usuario no es válido'),
    body('estado')
        .notEmpty().withMessage('El estado es obligatorio')
        .isIn(['pendiente', 'completada']).withMessage('El estado debe ser "pendiente" o "completada"'),
];

const validarIdUsuario = [
    param('idUsuario')
        .isMongoId().withMessage('El ID del usuario no es válido'),
];

module.exports = {
  validarCreacionTarea,
  validarActualizarTarea,
  validarTarea,
  validarEliminarPorEstado,
  validarIdUsuario
};

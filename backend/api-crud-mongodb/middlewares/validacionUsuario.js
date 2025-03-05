const {body, param} = require('express-validator')

const validarCreacionUsuario = [
    body('nombre').notEmpty().isString().trim().isLength(3).withMessage('Ingrese un nombre valido'),
    body('correo').notEmpty().isEmail().trim().withMessage('Ingrese un correo valido'),
    body('contraseña').notEmpty().isString().trim().isLength(8).withMessage('Ingrese una contraseña de 8 caracteres minimo')
]

const validarActualizarUsuario = [
    param('id').isMongoId().withMessage('El ID del usuario no es valido'),
    body('nombre').optional().isString().trim().isLength(3).withMessage('Ingrese un nombre valido'),
    body('correo').optional().isEmail().trim().withMessage('Ingrese un correo valido'),
    body('contraseña').optional().isString().trim().isLength(8).withMessage('Ingrese una contraseña de 8 caracteres minimo'),
]

const validarUsuario = [
    param('id').isMongoId().withMessage('ID del usuario invalido')
]

module.exports = {
    validarCreacionUsuario,
    validarUsuario,
    validarActualizarUsuario
}
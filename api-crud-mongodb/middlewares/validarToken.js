const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.JWT_SECRET 

// Middleware para validar el JWT
const validarJWT = (req, res, next) => {
    const token = req.header('Authorization') // Verificamos si el token existe en los headers de la solicitud

    if(!token){ // Si no hay token, devolvemos un error 401 (Unauthorized)
        return res.status(401).json({msg: 'Acceso no autorizado, falta token'})
    }

    try{
        const tokenWithoutBearer = token.replace('Bearer ', '').trim(); // Se utiliza token.replace('Bearer ', '') para eliminar el prefijo Bearer del token antes de intentar validarlo.
        const payload = jwt.verify(tokenWithoutBearer, secret)
        req.usuario = payload // En el req.usuario tendriamos el id y correo que habiamos guardado en el payload en usuarioControlador
        next()
    }catch(error){
        console.error('Error al validar el token:', error.message)
        return res.status(401).json({msg: 'Error al validar el token'})
    }
}

module.exports = validarJWT
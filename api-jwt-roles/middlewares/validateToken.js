const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.JWT_SECRET

const validateToken = (req, res, next) => {
    const token = req.header('Authorization')

    if(!token){
        res.status(401).json({message: 'No autorizado por falta de token'})
    }

    try {
        const tokenWithoutBearer = token.replace('Bearer ', '').trim()
        const payload = jwt.verify(tokenWithoutBearer, secret)

        req.usuario = payload

        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({message: 'Token no valido'})
    }
}

module.exports = validateToken
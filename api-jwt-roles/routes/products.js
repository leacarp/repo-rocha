const express = require('express')
const router = express.Router()
const {
    crearProducto,
    obtenerProductos,
} = require('../controllers/product')

router.get('/productos', obtenerProductos)
router.post('/productos', crearProducto)

module.exports = router

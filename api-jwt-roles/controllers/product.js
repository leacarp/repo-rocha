const Product = require('../models/product')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.JWT_SECRET

const crearProducto = async (req, res) => {
    try {
        const { nombre, precio, descripcion, rol } = req.body
        const newProduct = new Product ({nombre, precio, descripcion, rol})
        await newProduct.save()
        res.status(201).json({message: 'Producto creado con exito', newProduct})
    } catch (error) {
        console.log(error)
        res.status(400).json({message: 'Error al crear el producto'})
    }
}

const obtenerProductos = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json({message: 'Lista de productos:', products})
    } catch (error) {
        console.log(error)
        res.status(400).json({message: 'Error al mostrar los productos'})
    }
}


module.exports = {
    crearProducto,
    obtenerProductos,
}
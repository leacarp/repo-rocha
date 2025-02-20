const mongoose = require('mongoose')
require('dotenv').config()

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Conexion exitosa')
    } catch (error) {
        console.error('Error de conexion al servidor:', error.message)
    }
}

module.exports = connectDb
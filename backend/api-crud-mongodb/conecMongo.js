const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config() // Esto carga las variables del archivo .env
const usuarioRutas = require('../api-crud-mongodb/rutas/usuarioRutas')
const tareaRutas = require('../api-crud-mongodb/rutas/tareaRutas')

const app = express()
app.use(express.json())
const URL_API = process.env.URL_API // Ahora tomamos la URL desde el archivo .env

async function conectarDB(){
    try {
        await mongoose.connect(URL_API)
        console.log('Conexion exitosa ✔️')
    } catch (error) {
        console.error("Error al conectar ❌", error)
    }
}

app.use('/api', usuarioRutas)
app.use('/api', tareaRutas)

const PORT = process.env.PORT || 3000
app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${PORT} ✔️`)
})

conectarDB()



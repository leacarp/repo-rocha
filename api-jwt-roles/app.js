const express = require('express')
const connectDb = require('./config/connect-dB')
const productsRoutes = require('./routes/products')
const usersRoutes = require('./routes/users')
const app = express()
app.use(express.json())

connectDb()

app.use('/api', productsRoutes)
app.use('/api', usersRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
const User = require('../models/users')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.JWT_SECRET

const verifyLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const usuario = await User.findOne({email})

        if(!usuario || usuario.password !== password){
            return res.status(401).json({message: 'Invalid email or password'})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error en el servidor'})
    }
}
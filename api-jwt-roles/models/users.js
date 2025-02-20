const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    nombre: {type:String, require: true},
    email: {type:String, require: true, unique: true},
    password: {type:String, require: true},
    rol: [String],
    default: ['user'],
})

const User = mongoose.model('User', userSchema)

module.exports = User
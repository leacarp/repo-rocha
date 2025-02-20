const jwt = require('jsonwebtoken')

// Clave secreta para firmar los tokens (normalmente se guarda en variables de entorno)
const claveSecreta = "miClaveSuperSecreta";

// Datos del usuario (puede ser un ID, un email, etc.)
const payload = { id: 1, nombre: "Leandro", rol: "admin" };

// 1️⃣ Generamos un token
const token = jwt.sign(payload, claveSecreta, { expiresIn: "5s" });
console.log("Token generado:", token);

setTimeout(() => {
    console.log('Verificando token de 5s despues de 6s')
    verificarToken(token)
}, 6000);

// 2️⃣ Verificamos el token (como lo haría el backend cuando recibe una petición protegida)
const verificarToken = (token) => {
    try{
        const datosValidados = jwt.verify(token, claveSecreta)
        console.log('Token valido. Datos: ', datosValidados)
    }catch(error){
        console.log('Token invalido', error.message)
    }
}

verificarToken(token)
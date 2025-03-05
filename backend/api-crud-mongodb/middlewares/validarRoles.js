const validarRoles = (...roles) => {
    return (req, res, next) => {
        const usuario = req.usuario
        if(!usuario){
            return res.status(401).json({message: 'Acceso no autorizado'})
        }

        if (!usuario.roles || !roles.some(role => usuario.roles.includes(role))) {
            return res.status(403).json({ message: "Acceso denegado, no tienes los permisos necesarios." });
        }
        
        next()
    }
}

module.exports = validarRoles
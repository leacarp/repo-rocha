const Usuario = require('../modelos/usuarioModelo')
const Tarea = require("../modelos/tareaModelo");


/**
 * Asi seria en SQLServer:
 * INSERT INTO Tareas (titulo, descripcion, estado, usuarioId)
    VALUES ('Hacer compras', 'Comprar leche', 'pendiente', 1);
 */
const crearTarea = async (req, res) => {
  try {
    const { titulo, descripcion, estado, usuarioId } = req.body;
    
    const nuevaTarea = new Tarea({ 
        titulo, 
        descripcion, 
        estado,
        usuario: usuarioId 
      });  // Referencia al ID del usuario que creó la tarea (clave foránea)
      await nuevaTarea.save();
      
      const usuario = await Usuario.findById(usuarioId);
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      
      // Agregamos el _id de la tarea al array de tareas del usuario
      usuario.tareas.push(nuevaTarea._id);
      // Guardamos el usuario actualizado
      await usuario.save();

    res.status(201).json({ message: "Tarea creada con exito", nuevaTarea });
  } catch (e) {
    res.status(400).json({ message: "Error al crear la tarea" });
  }
};


/**
 * Asi seria en SQLServer:
 * SELECT Tareas.*, Usuarios.nombre, Usuarios.correo
    FROM Tareas
    JOIN Usuarios ON Tareas.usuarioId = Usuarios.id;
 */
const obtenerTarea = async (req, res) => {
  try {
    const tareas = await Tarea.find().populate('usuario', 'nombre correo'); // .populate("usuario", "nombre correo") es para hacer un "join" entre la colección
    res.status(200).json({ message: "Lista de tareas", tareas });
  } catch (e) {
    res.status(400).json({ message: "Error al obtener la tarea", error });
  }
};


/**
 * Asi seria en SQLServer:
 * SELECT tareas.*
    FROM tareas
    JOIN usuarios ON tareas.usuario = usuarios.id
    WHERE usuarios.id = @idUsuario;
 */
    const obtenerTareasPorUsuario = async (req, res) => {
      const { idUsuario } = req.params; // Obtenemos el ID del usuario de los parámetros de la URL
    
      try {
        const usuario = await Usuario.findById(idUsuario).populate('tareas'); // Usamos el método populate para traer las tareas asociadas al usuario

        if (!usuario) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }
    
        res.status(200).json({ message: `Tareas del usuario ${usuario.nombre}`, tareas: usuario.tareas });
      } catch (error) {
        res.status(400).json({ message: "Error al obtener las tareas", error });
      }
    };


/**
 * Asi seria en SQLServer:
 * UPDATE Tareas
    SET titulo = 'Nueva tarea', descripcion = 'Descripción actualizada', usuarioId = 2
    WHERE id = 1;
 */
const actualizarTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, estado, usuarioId } = req.body;
    try {
      const tareaActualizada = await Tarea.findByIdAndUpdate( // Este método busca una tarea por su ID y la actualiza con los nuevos datos.
        id,
        { titulo, descripcion, estado, usuario: usuarioId },
        { new: true }
      );
      if (!tareaActualizada) {
        res.status(404).json({ message: "Tarea no encontrada", error });
      }
      res
        .status(200)
        .json({ message: "Tarea actualizada con exito", tareaActualizada });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Error al actualizar la tarea", error: error.message });
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "Error al actualizar la tarea", error: error.message });
  }
};

/**
 * Actualizar todas las tareas de un usuario, ruta que permita actualizar todas las tareas de un usuario con un estado de "pendiente" y cambiarlas a "completada"
 * Asi seria en SQLServer:
 * UPDATE Tareas
    SET estado = 'completada'
    WHERE usuarioId = @idUsuario AND estado = 'pendiente';
 */
const actualizarTareasPendientes = async (req, res) => {
  const {idUsuario} = req.params
  try{
    const tareasActualizadas = await Tarea.updateMany( // Con updateMany actualizamos muchas tareas ala vez
      {usuario: idUsuario, estado: "pendiente"}, // Filtro si el estado de la tarea es pendiente
      {$set: {estado: 'completada'}} // Con $set asignamos al estado a completada
    )


    if(tareasActualizadas.modifiedCount === 0){ // nModified devuelve cuantas tareas se modificaron, si es 0 devolvemos 404
      res.status(404).json({message: "No hay tareas pendientes para actualizar",})}


    res.status(200).json({
      message: `Se actualizaron ${tareasActualizadas.modifiedCount} tareas a estado 'completada'`
    })
}catch(error){
    console.log(error)
    res.status(400).json({ message: "Error al actualizar las tareas", error: error.message });
  }
}

/**
 * Asi seria en SQLServer:
 * DELETE FROM Tareas
    WHERE usuarioId = @idUsuario;
 */
const eliminarTareasPorUsuario = async (req, res) => {
  const { idUsuario } = req.params;
  try {
    const tareasEliminadas = await Tarea.deleteMany(
      { usuario: idUsuario }
    )

    if(tareasEliminadas.deletedCount === 0){
      res.status(404).json({message: 'No hay tareas para eliminar en este usuario'})
    }
    res.status(200).json({
      message: `Se eliminaron ${tareasEliminadas.deletedCount} tareas del usuario`})

    }catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Error al borrar las tareas', error: error.message })
  }
}

/**
 * Asi seria en SQLServer:
 * DELETE FROM Tareas
    WHERE usuarioId = @idUsuario AND estado = @estado;
 */
const eliminarTareaPorEstado = async (req, res) => {
  const {idUsuario} = req.params // Lo sacamos del parametro que pasamos por URL
  const {estado} = req.body // Lo sacamos del cuerpo de la solicitud
  try{
    const tareasEliminadas = await Tarea.deleteMany(
      {usuario: idUsuario, estado: estado})

    if(tareasEliminadas.deletedCount === 0){
      res.status(404).json({ message: `No hay tareas por eliminar en el estado: ${estado}`})
    }
    res.status(200).json({
      message: `Se eliminaron ${tareasEliminadas.deletedCount} tareas del usuario en estado ${estado}`
    })
  }catch(error){
    console.log(error)
    res.status(404).json({message: 'Error al borrar las tareas', error: error.message})
  }
}

/**
 * Asi seria en SQLServer:
 * DELETE FROM Tareas WHERE id = 1; 
 * */ 
const eliminarTarea = async (req, res) => {
  const { id } = req.params;
  try {
    const tareaEliminada = await Tarea.findByIdAndDelete(id); // Aquí eliminamos la tarea por su ID.
    if (!tareaEliminada) {
      return res.status(404).json({ message: "Tarea no encontrada", error });
    }
    res
      .status(200)
      .json({ message: "Tarea eliminada con exito", tareaEliminada });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar la tarea", error });
  }
};

module.exports = {
  crearTarea,
  obtenerTarea,
  obtenerTareasPorUsuario,
  actualizarTarea,
  eliminarTarea,
  actualizarTareasPendientes,
  eliminarTareasPorUsuario,
  eliminarTareaPorEstado
};

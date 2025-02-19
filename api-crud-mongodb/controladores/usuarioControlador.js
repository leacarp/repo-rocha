// La carpeta controladores/controllers es donde hacemos las operaciones CRUD
const Usuario = require("../modelos/usuarioModelo");

const crearUsuario = async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;
    const nuevoUsuario = new Usuario({ nombre, correo, contraseña });
    await nuevoUsuario.save(); // El método save() se utiliza para guardar un nuevo documento, sería como un INSERT INTO para agregar un nuevo registro en una tabla.
    res.status(201).json({ message: "Usuario creado con exito", nuevoUsuario });
  } catch (error) {
    res.status(400).json({ message: "Error al crear el usuario", error });
  }
};

const obtenerUsuario = async (req, res) => {
  try {
    const usuarios = await Usuario.find(); // El método find() es un método de Mongoose para buscar documentos dentro de una colección, si no se pasa ningun filtro devuelvo todos los documentos de usuarios, sería como un SELECT * FROM Usuarios.
    res.status(200).json({ message: "Lista de usuarios", usuarios });
  } catch (error) {
    res.status(400).json({ message: "Error al obtener usuarios", error });
  }
};

const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, contraseña } = req.body;

  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      // Sería como un UPDATE donde buscas un registro por su id y luego actualizas los valores.
      id, // El identificador único del documento que quieres actualizar
      { nombre, correo, contraseña }, // Los nuevos datos que quieres poner en el documento.
      { new: true } // Indica a Mongoose que te devuelva el documento actualizado, no el documento original antes de la actualización.
    );
    if (!usuarioActualizado) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res
      .status(200)
      .json({ message: "Usuario actualizado con éxito", usuarioActualizado });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el usuario", error });
  }
};

const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(id); // Este método elimina un documento por su _id sería como un DELETE donde buscas el registro por su id y luego lo eliminas.
    if (!usuarioEliminado) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res
      .status(200)
      .json({ message: "Usuario eliminado con éxito", usuarioEliminado });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar usuario", error });
  }
};

module.exports = {
  crearUsuario,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
};

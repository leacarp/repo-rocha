/**
 * 
POST /usuarios: Crea un nuevo usuario (validar que el email sea válido y la edad mayor a 18).
GET /usuarios: Lista todos los usuarios.
GET /usuarios/:id: Obtiene un usuario por su ID.
PUT /usuarios/:id: Actualiza la información de un usuario.
DELETE /usuarios/:id: Elimina un usuario.

Para el POST y PUT, debes validar que el email tenga un formato correcto (puedes usar una expresión regular simple o librerías como express-validator).
La edad debe ser un número mayor a 18.
Si la validación falla, debes devolver un error con un mensaje apropiado.
En el PUT, los usuarios sólo podrán modificar su nombre, email o edad y no su ID

 */

const express = require("express");
const { body, validationResult } = require("express-validator");
const usuarios = require("../api-usuarios-validaciones/usuarios.json");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json(usuarios);
});

app.post(
  "/usuarios",
  [
    body("nombre")
      .notEmpty()
      .isString()
      .withMessage("El nombre es obligatorio y debe ser un stirng"),
    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("El email es obligatorio y debe ser válido"),
    body("edad")
      .notEmpty()
      .isInt({ min: 18 })
      .withMessage("La edad es obligatorio y debe ser mayor a 18 años"),
  ],
  (req, res) => {
    const errors = validationResult(req); // Obtiene los errores de la validacion del cuerpo de la solicitud (req.body).

    if (!errors.isEmpty()) {
      // Se cumple solo si hay errores, si errores es distinto de vacio
      return res.status(400).json({ errors: errors.array() }); // Devuelve un array con todos los errores
    }

    const { nombre, email, edad } = req.body;
    usuarios.push({ id: usuarios.length + 1, nombre, email, edad });

    res.status(201).json({ mensaje: "Usuario creado con exito" });
  }
);

app.get("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const usuario = usuarios.find((usuario) => usuario.id === id);
  if (usuario) {
    return res.json(usuario);
  }
  res.status(404).json({ error: "No se encontro el usuario con esa ID" });
});

app.put(
  "/usuarios/:id",
  [
    body("nombre")
      .optional()
      .notEmpty()
      .isString()
      .withMessage("El nombre es obligatorio y debe ser un stirng"),
    body("email")
      .optional()
      .notEmpty()
      .isEmail()
      .withMessage("El email es obligatorio y debe ser válido"),
    body("edad")
      .optional()
      .notEmpty()
      .isInt({ min: 18 })
      .withMessage("La edad es obligatorio y debe ser mayor a 18 años"),
  ],
  (req, res) => {
    // Validacion de errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    // Obtener el ID de la URL y convertirlo a número
    const id = parseInt(req.params.id, 10);
    const index = usuarios.findIndex((usuario) => usuario.id === id);

    // Verificar si el ID del usuario existe
    if (index === -1) {
      return res.status(404).json({ error: "No se encontro el usuario con ese id" });
    }

    // Actualizar solo los campos enviados en la petición
    Object.assign(usuarios[index], req.body);

    // Responder con todos los datos del usuario actualizados
    res.json(usuarios[index])
  }
);

app.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  const index = usuarios.findIndex((usuario) => usuario.id === id)

  if (index === -1) {
    return res.status(404).json({ error: "No se encontro el usuario con ese id" });
  }

  usuarios.splice(index, 1)
  res.json({mensaje: "Usuario borrado con exito"})
})

app.listen(1234, () => {
  console.log("Servidor escuchando en el puerto http://localhost:1234");
});

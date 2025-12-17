
var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose
  .connect('mongodb+srv://danelsaavedra:12345@cluster0.pidpj0v.mongodb.net/base')
  .then(() => console.log(" Conectado a MongoDB"))
  .catch((err) => console.log(" Error MongoDB:", err));

const UsuariosSchema = new mongoose.Schema({
  Usuario: String,
  Correo: String,
  Contra: String,
  Rol: { type: String, default: "user" }
});

const usuarios = mongoose.model('usuarios', UsuariosSchema);


const PublicacionSchema = new mongoose.Schema({
  usuario: String,
  correo: String,
  texto: String,
  fecha: { type: Date, default: Date.now }
});

const publicaciones = mongoose.model("publicaciones", PublicacionSchema);


const ComentarioSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "publicaciones"
  },
  usuario: String,
  correo: String,
  texto: String,
  fecha: { type: Date, default: Date.now }
});

const comentarios = mongoose.model("comentarios", ComentarioSchema);


// REGISTRO
app.post('/crear', async (req, res) => {
  try {
    const nuevoUsuario = new usuarios({
      Usuario: req.body.Usuario,
      Correo: req.body.Correo,
      Contra: req.body.Contra,
      Rol: req.body.Rol || "user"
    });

    await nuevoUsuario.save();
    res.status(201).send("Usuario registrado correctamente");
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

// LOGIN
app.post('/login', async (req, res) => {
  try {
    const { Correo, Contra } = req.body;

    const usuarioEncontrado = await usuarios.findOne({ Correo });

    if (!usuarioEncontrado) {
      return res.status(401).send("Correo no encontrado");
    }

    if (usuarioEncontrado.Contra !== Contra) {
      return res.status(401).send("Contraseña incorrecta");
    }

    res.json({
      message: "Login exitoso",
      user: {
        id: usuarioEncontrado._id,
        Usuario: usuarioEncontrado.Usuario,
        Correo: usuarioEncontrado.Correo,
        Rol: usuarioEncontrado.Rol
      }
    });
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
});



// CREAR PUBLICACIÓN
app.post("/publicaciones", async (req, res) => {
  try {
    const nueva = new publicaciones({
      usuario: req.body.usuario,
      correo: req.body.correo,
      texto: req.body.texto
    });

    await nueva.save();
    res.status(201).send("Publicación creada");
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

// LISTAR PUBLICACIONES
app.get("/publicaciones", async (req, res) => {
  try {
    const lista = await publicaciones.find().sort({ fecha: -1 });
    res.json(lista);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

// EDITAR PUBLICACIÓN
app.put("/publicaciones/:id", async (req, res) => {
  try {
    await publicaciones.findByIdAndUpdate(req.params.id, {
      texto: req.body.texto
    });

    res.send("Publicación actualizada");
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

// ELIMINAR PUBLICACIÓN (autor o admin)
app.delete("/publicaciones/:id", async (req, res) => {
  try {
    const { correo, rol } = req.body;

    const post = await publicaciones.findById(req.params.id);

    if (!post) {
      return res.status(404).send("Publicación no encontrada");
    }

    if (post.correo !== correo && rol !== "admin") {
      return res.status(403).send("No tienes permisos para eliminar esta publicación");
    }

    await publicaciones.findByIdAndDelete(req.params.id);
    res.send("Publicación eliminada correctamente");
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});


// CREAR COMENTARIO
app.post("/comentarios", async (req, res) => {
  try {
    const nuevo = new comentarios({
      postId: req.body.postId,
      usuario: req.body.usuario,
      correo: req.body.correo,
      texto: req.body.texto
    });

    await nuevo.save();
    res.status(201).send("Comentario agregado");
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

// LISTAR COMENTARIOS POR PUBLICACIÓN
app.get("/comentarios/:postId", async (req, res) => {
  try {
    const lista = await comentarios
      .find({ postId: req.params.postId })
      .sort({ fecha: 1 });

    res.json(lista);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

app.put("/publicaciones/:id", async (req, res) => {
  try {
    const post = await publicaciones.findById(req.params.id);

    if (!post)
      return res.status(404).send("Publicación no encontrada");

    if (post.correo !== req.body.correo)
      return res.status(403).send("No autorizado");

    post.texto = req.body.texto;
    await post.save();

    res.send("Publicación actualizada");
  } catch (error) {
    res.status(500).send(error.message);
  }
});



const PORT = 3000;
app.listen(PORT, () =>
  console.log(` Servidor corriendo en http://localhost:${PORT}`)
);
  const { listadeusuarios , listadepost } = require("../Lista/ListadeDatos");
  const { Usuario } = require("../clases/Usuarios");
  const { Post } = require("../clases/Post");
  var idPublicaciones = 0
  // Crear usuario administrador
  const admin = new Usuario(
    "12024",
    "Rodrigo",
    "Poron",
    "Masculino",
    "Ingeniería",
    "Ingeniería en Ciencias y Sistemas",
    "ipc11s2024@email.com",
    "@dminIPC1"
  );
  admin.isAdmin = true; // Agrega la propiedad isAdmin
  listadeusuarios.push(admin);

  function registro(req, res) {
    try {
      const {
        codigo,
        nombres,
        apellidos,
        genero,
        facultad,
        carrera,
        correo_electronico,
        contraseña,
      } = req.body;

      const usuarioExistente = listadeusuarios.find((usuario) => usuario.codigo === codigo);
      if (usuarioExistente) {
        return res.json({
          error: "el usuario con este codigo ya existe",
        });
      }

      // Verificar si la contraseña cumple con los requisitos
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!+-.,%*?&])[A-Za-z\d@$!+-.,%*?&]{8,}$/;
      if (!regex.test(contraseña)) {
        return res.json({
          error: "La contraseña debe tener al menos 8 caracteres, entre estos caracteres deberá contar con al menos 1 mayúscula, 1 minúscula y 1 carácter especial.",
        });
      }

      const nuevousuario = new Usuario(
        codigo,
        nombres,
        apellidos,
        genero,
        facultad,
        carrera,
        correo_electronico,
        contraseña
      );
      listadeusuarios.push(nuevousuario);
      return res.json({
        message: "usuario registrado con exito ahora puedes iniciar sesion",
        
      });
    } catch (error) {
      console.log(error);
      return res.json({
        error: "error en el registro",
      });
    }
  }
  function DatosUsuarios(req, res) {
    try {
      res.json({ usuarios: listadeusuarios });
    } catch (error) {
      console.log(error);
      return res.json({
        error: "error en la obtencion de datos de usuario",
      });
    }
  }

  function iniciarSesion(req, res) {
    try {
      const Codigo = req.body.codigo;
      const ContraseñaFronted = req.body.contraseña;
      const usuario = listadeusuarios.find(
        (usuario) =>
          usuario.codigo === Codigo && usuario.contraseña === ContraseñaFronted
      );

      if (usuario) {
        const usuarioubicado = {
          codigo: usuario.codigo,
          nombres: usuario.nombres,
          apellidos: usuario.apellidos,
          genero: usuario.genero,
          facultad: usuario.facultad,
          carrera: usuario.carrera,
          correo_electronico: usuario.correo_electronico,
          isAdmin: usuario.isAdmin, // Agrega la propiedad isAdmin
        };
        res.json({
          message: "inicio de sesion exitoso",
          usuario: usuarioubicado,
        });
      }
      return res.json({
        error: "el usuario no existe o la contraseña es incorrecta",
      });
    } catch (error) {
      console.log(error);
      return res.json({
        error: "error en el inicio de sesion",
      });
    }
  }

  function ActualizarUsuarios(req, res) {
    try {
      const {
        codigo,
        nombres,
        apellidos,
        genero,
        facultad,
        carrera,
        correo_electronico,
        contraseña,
      } = req.body;
      const usuario = listadeusuarios.find(
        (usuario) => usuario.codigo === codigo
      );
      if (usuario) {
        usuario.codigo = codigo;
        usuario.nombres = nombres;
        usuario.apellidos = apellidos;
        usuario.genero = genero;
        usuario.facultad = facultad;
        usuario.carrera = carrera;
        usuario.correo_electronico = correo_electronico;
        usuario.contraseña = contraseña;
        return res.json({
          message: "usuario actualizado con exito",
        });
      }
      return res.json({
        error: "el usuario no existe",
      });
    } catch (error) {
      console.log(error);
      return res.json({
        error: "error en la actualizacion de datos de usuario",
      });
    }
  }
  function EliminarUsuarios(req, res) {
    try {
      const Codigo = req.body.codigo;
      const usuario = listadeusuarios.find(
        (usuario) => usuario.codigo === Codigo
      );
      if (usuario) {
        const index = listadeusuarios.indexOf(usuario);
        listadeusuarios.splice(index, 1);
        return res.json({
          message: "usuario eliminado con exito",
        });
      }
      return res.json({
        error: "el usuario no existe al eliminarlo",
      });
    } catch (error) {
      console.log(error);
      return res.json({
        error: "error en la eliminacion de datos de usuario",
      });
    }
  }
  function crearPost(req, res) {
    try {
      const codigo = req.body.codigo;
      const descripcion = req.body.descripcion;
      const imagen = req.body.imagen;
      const categoria = req.body.categoria;
      const anonimo = req.body.anonimo || false; // Si no se especifica, por defecto no es anónimo

      idPublicaciones++; // Incrementa el ID de publicaciones

      const nuevoPost = new Post(idPublicaciones, codigo, descripcion, imagen, categoria, anonimo);

      // Si el post es anónimo, no asociamos a ningún usuario
      if (!anonimo) {
        const usuario = listadeusuarios.find(user => user.codigo === codigo);
        if (!usuario) {
          return res.json({ error: "El usuario no existe." });
        }
        nuevoPost.user = usuario.codigo;
      }

      listadepost.push(nuevoPost);

      res.json({
        message: "Post creado con éxito",
      });
    } catch (error) {
      console.log(error);
      return res.json({
        error: "Error en la creación de post",
      });
    }
  }


  function getPost(req, res){
    try {

      const postsusuario = [];

      for (const post of listadepost) {

          const usuario = listadeusuarios.find(user => user.codigo === post.user);

  if (post.anonimo === true) {
      // Si el post es anónimo, establecer los valores predeterminados
      const postAnonimo = {
          id: post.id,
          descripcion: post.descripcion,
          imagen: post.imagen,
          fechaHora: post.fechaHora,
          user: "Usuario",
          apellidos: "anónimo",
          carrera: "Universidad",
          facultad: "San Carlos de Guatemala",
          categoria: post.categoria,

      };
      postsusuario.push(postAnonimo);
  } else {
      // Si el post no es anónimo, usar los datos del usuario
      const postusuario = {
          id: post.id,
          descripcion: post.descripcion,
          imagen: post.imagen,
          fechaHora: post.fechaHora,
          user: usuario.nombres,
          apellidos: usuario.apellidos,
          carrera: usuario.carrera,
          facultad: usuario.facultad, 
          categoria: post.categoria,
      };
      postsusuario.push(postusuario);
  }
      }

      postsusuario.reverse();
      res.json(
          { publicaciones: postsusuario }
      );

    } catch (error) {
      return res.json(
          {
              error: "Ocurrió un error al obtener los posts."
          }
      )
    }
  }


  function getReporteBarra(req, res){
    try {
      const postsusuario = {}
      for (const post of listadepost) {
        if (post.user in postsusuario) {
          postsusuario[post.user] ++
        }else {
          postsusuario[post.user] = 1
        } 
      }
      const usuariosPOST = Object.keys(postsusuario).map(user => ({
        
          user,
          post: postsusuario[user]
      }))

      usuariosPOST.sort((a, b) => b.post - a.post)

      const toppost = usuariosPOST.slice(0, 10)
      
      res.json(
          { topbarras: toppost }
      );

    } catch (error) { 
      return res.json(
          {
              error: "Ocurrió un error al obtener los posts"
          }
      )
    }
  }


  function obtenerPublicaciones(req, res) {
    try {
      res.json({ publicaciones: listadepost });
    } catch (error) {
      console.log(error);
      return res.json({
        error: "Error al obtener las publicaciones",
      });
    }
  }


  function eliminarPost(req, res) {
    try {
      const postId = req.params.id;
  
      // Buscar el post en la lista de publicaciones
      const postIndex = listadepost.findIndex(post => post.id === parseInt(postId));
  
      // Verificar si el post existe
      if (postIndex !== -1) {
        // Eliminar el post de la lista de publicaciones
        listadepost.splice(postIndex, 1);
        return res.json({ message: "El post se eliminó con éxito" });
      } else {
        return res.status(404).json({ error: "El post no se encontró" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error al eliminar el post" });
    }
  }
  

  module.exports = {
    registro,
    DatosUsuarios,
    iniciarSesion,
    ActualizarUsuarios,
    EliminarUsuarios,
    crearPost,
    getPost,
    getReporteBarra,
    obtenerPublicaciones,
    eliminarPost
    
  };

const { listadeusuarios } = require("../Lista/ListadeDatos");
const { Usuario } = require("../clases/Usuarios");

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
      carnet,
      nombres,
      apellidos,
      genero,
      facultad,
      carrera,
      correo_electronico,
      contraseña,
    } = req.body;

    const usuarioExistente = listadeusuarios.find((usuario) => usuario.carnet === carnet);
    if (usuarioExistente) {
      return res.json({
        error: "el usuario con este carnet ya existe",
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
      carnet,
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
    const Carnet = req.body.carnet;
    const ContraseñaFronted = req.body.contraseña;
    const usuario = listadeusuarios.find(
      (usuario) =>
        usuario.carnet === Carnet && usuario.contraseña === ContraseñaFronted
    );

    if (usuario) {
      const usuarioubicado = {
        carnet: usuario.carnet,
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
      carnet,
      nombres,
      apellidos,
      genero,
      facultad,
      carrera,
      correo_electronico,
      contraseña,
    } = req.body;
    const usuario = listadeusuarios.find(
      (usuario) => usuario.carnet === carnet
    );
    if (usuario) {
      usuario.carnet = carnet;
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
    const Carnet = req.body.carnet;
    const usuario = listadeusuarios.find(
      (usuario) => usuario.carnet === Carnet
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




module.exports = {
  registro,
  DatosUsuarios,
  iniciarSesion,
  ActualizarUsuarios,
  EliminarUsuarios,
};

const {listadeusuarios}=require('../Lista/ListadeDatos')
const {Usuario}= require('../clases/Usuarios')
function registro(req, res) {
    try {
        const {carnet, nombres, apellidos, genero, facultad, carrera, correo_electronico, contraseña} = req.body
        

        const existeusuario = listadeusuarios.find(usuario => usuario.carnet === carnet)
        if (existeusuario) {
            return res.json(
                {
                    error: "el usuario con este carnet ya existe"
                }
            )
        }

        const nuevousuario = new Usuario(carnet, nombres, apellidos, genero, facultad, carrera, correo_electronico, contraseña)
        listadeusuarios.push(nuevousuario)
        return res.json(
            {
                message: "usuario registrado con exito ahora puedes iniciar sesion"
            }
        ) 
    } catch (error) {
        console.log(error)
        return res.json(
            {
                error: "error en el registro"
            }
        )
    }
}

function DatosUsuarios(req, res) {
    try {
        res.json(
            {usuarios: listadeusuarios}
        )
        
    } catch (error) {
        console.log(error)
        return res.json(
            {
                error: "error en la obtencion de datos de usuario"
            }
        )
        
    }
}

function iniciarSesion(req,res){
    try {
        const Carnet = req.body.carnet
        const ContraseñaFronted = req.body.contraseña
        const usuario = listadeusuarios.find(usuario => usuario.carnet === Carnet && usuario.contraseña === ContraseñaFronted)
        
        if (usuario) {

            const usuarioubicado = {
                carnet: usuario.carnet,
                nombres: usuario.nombres,
                apellidos: usuario.apellidos,
                genero: usuario.genero,
                facultad: usuario.facultad,
                carrera: usuario.carrera,
                correo_electronico: usuario.correo_electronico
            }
            res.json(
                {
                    message: "inicio de sesion exitoso",
                    usuario: usuarioubicado
                }
            )
        }
        return res.json(
            {
                error: "el usuario no existe o la contraseña es incorrecta"
            }
        )
        
    } catch (error) {
        console.log(error)
        return res.json(
            {
                error: "error en el inicio de sesion"
            }
        )
        
    }
}

function ActualizarUsuarios(req, res) {

    try {
        const {carnet, nombres, apellidos, genero, facultad, carrera, correo_electronico, contraseña} = req.body
        const usuario = listadeusuarios.find(usuario => usuario.carnet === carnet)
        if (usuario) {
            usuario.nombres = nombres
            usuario.apellidos = apellidos
            usuario.genero = genero
            usuario.facultad = facultad
            usuario.carrera = carrera
            usuario.correo_electronico = correo_electronico
            usuario.contraseña = contraseña
            return res.json(
                {
                    message: "usuario actualizado con exito"
                }
            )
        }
        return res.json(
            {
                error: "el usuario no existe"
            }
        )
        

    } catch (error) {
        console.log(error)
        return res.json(
            {
                error: "error en la actualizacion de datos de usuario"
            }
        )
        
    }
}
function EliminarUsuarios(req, res) {
    try {
        const Carnet = req.body.carnet
        const usuario = listadeusuarios.find(usuario => usuario.carnet === Carnet)
        if (usuario) {
            const index = listadeusuarios.indexOf(usuario)
            listadeusuarios.splice(index, 1)
            return res.json(
                {
                    message: "usuario eliminado con exito"
                }
            )
        }
        return res.json(
            {
                error: "el usuario no existe al eliminarlo"
            }
        )
        
    } catch (error) {
        console.log(error)
        return res.json(
            {
                error: "error en la eliminacion de datos de usuario"
            }
        )
        
    }
}
module.exports = {
    registro,
    DatosUsuarios,
    iniciarSesion,
    ActualizarUsuarios,
    EliminarUsuarios
}
class Usuario{
    constructor(Codigo,Nombres,Apellidos,Genero,Facultad,Carrera,Correo_electronico,Contraseña ){
        this.codigo = Codigo
        this.nombres = Nombres
        this.apellidos = Apellidos
        this.genero = Genero
        this.facultad = Facultad
        this.carrera = Carrera
        this.correo_electronico = Correo_electronico
        this.contraseña = Contraseña

    }
}
module.exports={
    Usuario
}
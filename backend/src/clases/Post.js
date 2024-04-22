class Post {
    constructor(id, user, descripcion, imagen) {
        this.id = id
        this.user = user 
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.fechaHora = new Date();
    }
  }
  
module.exports = {Post};
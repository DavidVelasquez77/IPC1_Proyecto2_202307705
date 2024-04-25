class Post {
    constructor(id, user, descripcion, imagen, categoria) {
        this.id = id
        this.user = user 
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.fechaHora = new Date();
        this.categoria = categoria;
    }
  }
  
module.exports = {Post};
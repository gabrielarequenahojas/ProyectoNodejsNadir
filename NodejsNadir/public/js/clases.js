var Video = class Video {
    constructor(jsonObj) {
        this.id = jsonObj.id;
        this.titulo = jsonObj.titulo;
        this.descripcion = jsonObj.descripcion;
        this.creditos = jsonObj.creditos;
    }
};


var Video = class Video {
    constructor(jsonObj) {
        this.codigo = jsonObj.codigo;
        this.titulo = jsonObj.titulo;
        this.descripcion = jsonObj.descripcion;
        this.url=jsonObj.url;
        this.portada=jsonObj.portada;
    }
};



var Pregunta = class Pregunta{
    constructor(jsonObj){
        this.id= jsonObj.id;
        this.pregunta=jsonObj.pregunta;
        this.imagencorrecta=jsonObj.imagencorrecta;
        this.audio=jsonObj.audio;
        this.repuesta=jsonObj.repuesta;
    }
};


var Opcion =class Opcion{
    constructor(jsonObj){
        this.id=jsonObj.id;
        this.pregunta_id=jsonObj.pregunta_id;
        this.url=jsonObj.url_imagen;
    }
}

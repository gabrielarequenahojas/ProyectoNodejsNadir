//var datos='{"contenido":[{"video":[{"codigo":"1","titulo":"GRANJA","descripcion":"VISITA A LA GRANJA","creditos":"HECTOR","url":"recursos/video/video_1.mp4","portada":"recursos/imagenes/imagenP01.jpg","preguntas":[{"id":"1","pregunta":"pregunta 1 video 1","audio":"recursos/audios/pregunta_1_1.mp3","opciones":[{"opcion":"recursos/imagenes/imagen_1_1_1.jpg"},{"opcion":"recursos/imagenes/imagen_2_1_1.jpg"}],"respuesta":"2"},{"id":"2","pregunta":"pregunta 2 video 1","audio":"recursos/audios/pregunta_2_1.mp3","opciones":[{"opcion":"recursos/imagenes/imagen_3_1_1.jpg"},{"opcion":"recursos/imagenes/imagen_4_1_1.jpg"}],"respuesta":"2"},{"id":"3","pregunta":"pregunta 3 video 1","audio":"recursos/audios/pregunta_3_1.mp3","opciones":[{"opcion":"recursos/imagenes/imagen_5_1_1.jpg"},{"opcion":"recursos/imagenes/imagen_4_1_1.jpg"}],"respuesta":"1"}]},{"codigo":"2","titulo":"VOCALES","descripcion":"APRENDIENDO VOCALES","creditos":"HECTOR","url":"recursos/video/video_2.mp4","portada":"recursos/imagenes/imagenP02.jpg","preguntas":[{"id":"1","pregunta":"pregunta 1 video 2","audio":"recursos/audios/pregunta_1_2.mp3","opciones":[{"opcion":"recursos/imagenes/imagen_3_2_1.png"},{"opcion":"recursos/imagenes/imagen_1_2_1.png"}],"respuesta":"2"},{"id":"2","pregunta":"pregunta 2 video 2","audio":"recursos/audios/pregunta_2_2.mp3","opciones":[{"opcion":"recursos/imagenes/imagen_5_2_1.png"},{"opcion":"recursos/imagenes/imagen_2_2_1.png"}],"respuesta":"1"}]}]}]}';

var objJSON = "";

$(function() {
    objJSON = leerArchivoJSON();
    //objJSON = JSON.parse(datos);
    grabarArchivoJSON(datos);
});

var leerArchivoJSON = function () {
    var datos = localStorage.getItem("videos")
    if (datos === null) {
        datos = new Object();
        datos.contenido = [];
        localStorage.setItem("videos", JSON.stringify(datos));
    } else {
        datos = JSON.parse(datos);
        if (typeof datos === "string") datos = JSON.parse(datos);
    }
    return datos;
}

var grabarArchivoJSON = function (datos) {
    if (datos === null) {
        datos = new Object();
        datos.contenido = [];
        datos.contenido[0] = new Object();
        datos.contenido[0].video = [];        
        localStorage.setItem("videos", JSON.stringify(datos));
    } else {
        localStorage.setItem("videos", JSON.stringify(datos));
    }
}


//6. Crear y utilizar un método que permita exportar o mostrar la información de todo el JSON. 1pt
function exportJSON() {
    //var IEwindow = window.open();
    //IEwindow.document.write('sep=,\r\n' + JSON.stringify(objJSON));
    //IEwindow.document.close();
    //IEwindow.document.execCommand('SaveAs', true, "datos.json");
    //IEwindow.close();

    let dataStr = JSON.stringify(objJSON);
    let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    let exportFileDefaultName = 'datos.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}
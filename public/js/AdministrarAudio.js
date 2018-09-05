
var jsonAudio = "";

$(function() {
    jsonAudio = leerArchivoJSONAudio();
    //jsonAudio.urlBase = location.protocol + "//" + location.host + "/recursos/audio/";
    jsonAudio.urlBase = "recursos/audios/";

    if (jsonAudio.archivos.length === 0) {
        jsonAudio = JSON.parse(datosAudio);
        grabarArchivoJSONAudio(jsonAudio);
    }
});

var leerArchivoJSONAudio = function () {
    var datos = localStorage.getItem("audio")
    if (datos === null) {
        datos = new Object();
        datos.urlBase = location.protocol + "//" + location.host + "/recursos/audios/";
        datos.archivos = [];
        localStorage.setItem("audio", JSON.stringify(datos));
    } else {
        datos = JSON.parse(datos);
        if (typeof datos === "string") datos = JSON.parse(datos);
    }
    return datos;
}

var grabarArchivoJSONAudio = function (datos) {
    if (datos === null) {
        datos = new Object();
        datos.urlBase = location.protocol + "//" + location.host + "/recursos/audios/";
        datos.archivos = [];
        localStorage.setItem("audio", JSON.stringify(datos));
    } else {
        localStorage.setItem("audio", JSON.stringify(datos));
    }
}


//6. Crear y utilizar un método que permita exportar o mostrar la información de todo el JSON. 1pt
function exportJSONAudio() {
    var IEwindow = window.open();
    IEwindow.document.write('sep=,\r\n' + JSON.stringify(objJSON));
    IEwindow.document.close();
    IEwindow.document.execCommand('SaveAs', true, "audio.json");
    IEwindow.close();

    //let dataStr = JSON.stringify(objJSON);
    //let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    //let exportFileDefaultName = 'archivodedatos.txt';

    //let linkElement = document.createElement('a');
    //linkElement.setAttribute('href', dataUri);
    //linkElement.setAttribute('download', exportFileDefaultName);
    //linkElement.click();
}
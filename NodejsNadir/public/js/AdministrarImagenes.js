
var jsonImagenes = "";

$(function() {
    jsonImagenes = leerArchivoJSONImagenes();
    //jsonImagenes.urlBase = location.protocol + "//" + location.host + "/recursos/imagenes/";
    jsonImagenes.urlBase = "recursos/imagenes/";

   // jsonImagenes.archivos = [];
    if (jsonImagenes.archivos.length === 0) {
        jsonImagenes = JSON.parse(datosImagenes);
        grabarArchivoJSONImagenes(jsonImagenes);
    }
});

var leerArchivoJSONImagenes = function () {
    var datos = localStorage.getItem("imagenes")
    if (datos === null) {
        datos = new Object();
        datos.urlBase = location.protocol + "//" + location.host + "/recursos/imagenes/";
        datos.archivos = [];
        localStorage.setItem("imagenes", JSON.stringify(datos));
    } else {
        datos = JSON.parse(datos);
        if (typeof datos === "string") datos = JSON.parse(datos);
    }
    return datos;
}

var grabarArchivoJSONImagenes = function (datos) {
    if (datos === null) {
        datos = new Object();
        datos.urlBase = location.protocol + "//" + location.host + "/recursos/imagenes/";
        datos.archivos = [];
        localStorage.setItem("imagenes", JSON.stringify(datos));
    } else {
        localStorage.setItem("imagenes", JSON.stringify(datos));
    }
}


//6. Crear y utilizar un método que permita exportar o mostrar la información de todo el JSON. 1pt
function exportJSONImagenes() {
    var IEwindow = window.open();
    IEwindow.document.write('sep=,\r\n' + JSON.stringify(objJSON));
    IEwindow.document.close();
    IEwindow.document.execCommand('SaveAs', true, "imagenes.json");
    IEwindow.close();
}

//6. Crear y utilizar un método que permita exportar o mostrar la información de todo el JSON. 1pt
function importarJSONImagenes() {
    var IEwindow = window.open();
    IEwindow.document.write('sep=,\r\n' + JSON.stringify(objJSON));
    IEwindow.document.close();
    IEwindow.document.execCommand('SaveAs', true, "imagenes.json");
    IEwindow.close();
}

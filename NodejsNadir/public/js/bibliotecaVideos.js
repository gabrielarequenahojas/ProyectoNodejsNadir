var indexVideo = "";
var idxVideoPagina = "";
var urlVideo = "";
/*Funcion inicial al cargar la pagina*/
$(function () {
    
    mostrarHtml();

     $("#btnplay").click(function (e) {
        var i = $("#paginas1 div").length;
        var v = new Object();
        v.audio = "";

        visualizarSonido(i, v);
    });

});
//para poner link 
function linkear(urlVideo){    
    let win= window.open("", urlVideo, "width=500, height=500");
    win.document.body.innerHTML=urlVideo;
}

$('#index').click(linkear);



var mostrarHtml = function () {

    //indexVideo = window.opener.document.getElementById("indexVideo").innerHTML; 
    document.getElementById("indexVideo").innerHTML=indexVideo;

    var bibliotecaTable = "";

    $.each(objJSON.contenido[0].video, function (index, value) { //"<td>" + "</td>"
        //alert (index);
        //bibliotecaTable += "<div class='responsive'><div class='gallery' id ='" + index + "'><a  href='AulaVideo.html' onclick='alert('ooooola')'><img src='" + value.portada + "'></a></div></div>";
        bibliotecaTable += "<div class='responsive'><div class='gallery'><a id='lkvid'><img id='"+index+"'class='imagen' src='" + value.portada + "' alt='"+ value.url +"'></a></div></div>";
    });

    $("#portadas").html("");
    $("#portadas").append(bibliotecaTable);


    $.each($("#portadas img.imagen"), function (i, v) {
        $(v).click(function (e) {

            urlVideo = $(e.target).attr("alt");
            indexVideo = $(e.target).attr("id");    
            localStorage.idv=indexVideo;
            localStorage.urlv=urlVideo;
            //alert(localStorage.urlv);          
            //win.document.body.innerHTML=urlVideo;
            document.getElementById("urlVideo").innerHTML=urlVideo;
            document.getElementById("indexVideo").innerHTML=indexVideo;
            //document.getElementById("lkvid").setAttribute("href","AulaVideo.html");
            var win= window.location.href="AulaVideo.html"; 
            //var win= window.open("AulaVideo.html"); 
            //win.document.body.innerHTML=urlVideo;
            
        });
    });
};

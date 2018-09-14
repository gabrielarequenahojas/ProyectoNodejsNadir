var indexVideo = "";
var indexImagen = "";
var indpreg=0;
var i = 0;

//var aud = "";
window.onload = function(){
   
  //alert(indexVideo);
}   

/*Funcion inicial al cargar la pagina*/
$(function () {
    indexVideo = localStorage.idv;
    localStorage.idp=0;
    //localStorage.idp=i
    $.each(objJSON.contenido[0].video[indexVideo].preguntas, function (index, value) { //"<td>" + "</td>"        
               indpreg ++;               
               //opciones_img += "<div class='responsive'><div class='gallery'><img id='"+ index +"'class='imagen' src='" + value.opcion + "' alt='"+ value.opcion +"'></div></div>";
    });
    /*var ret = 0;
    for (i = 0; i <indpreg; i++) {
        alert("# vez " + i);
        ret = 0;
        while(ret == 0 ){
            mostrarHtml();
        }
                 
    }*/
    mostrarHtml();    

});

//carga de div con las imagenes correspondientes
var mostrarHtml = function () {
    indexVideo = localStorage.idv; 
    //alert(localStorage.idp);
    document.getElementById("indexVideo").innerHTML=indexVideo;
    var audio = objJSON.contenido[0].video[indexVideo].preguntas[localStorage.idp].audio;
    //alert(audio);
    var linea_audio = "<audio src='"+ audio+"'' controls autoplay></audio> ";    
    var resp = objJSON.contenido[0].video[indexVideo].preguntas[localStorage.idp].respuesta;
    resp = resp - 1;
    //alert(resp);    
    var opciones_img = "";
    $.each(objJSON.contenido[0].video[indexVideo].preguntas[localStorage.idp].opciones, function (index, value) { //"<td>" + "</td>"        
               opciones_img += "<div class='responsive'><div class='gallery'><img id='"+ index +"'class='imagen' src='" + value.opcion + "' alt='"+ value.opcion +"'></div></div>";
    });

    $("#opciones").html("");
    $("#opciones").append(opciones_img);
    $("#caja").html("");
    $("#caja").append(linea_audio); 

    $.each($("#opciones img.imagen"), function (i, v) {
        $(v).click(function (e) {
            indexImagen = $(e.target).attr("id");
            i = parseInt(localStorage.idp) + 1;
            localStorage.idp = i; 
            //alert(localStorage.idp);
            if(indexImagen == resp){
                //alert("¡¡¡¡FELICIDADES!!!!");
                var r = document.getElementById("ganar");
                //alert(a)
                aud = r.play();
                                
            }else{
               // alert("¡¡¡¡VUELVE A INTENTARLO!!!!");
                var s = document.getElementById("perder");
                aud = s.play();
                //alert("¡¡¡¡VUELVE A INTENTARLO!!!!");
            }
            //setTimeout("",10000);
            if (indpreg == localStorage.idp){
                //alert("pregunta final");
                setTimeout ("var win= window.location.href='bibliotecaVideo.html';", 5000); 
            }else{
                
                //alert("siguiente pregunta");
                setTimeout ("mostrarHtml()", 5000);
            }
        });
    });
}


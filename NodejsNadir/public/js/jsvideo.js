
window.onload = function(){
  //alert(localStorage.idv);
  localStorage.idp = 0;
  var urlVideo = localStorage.urlv;
  var indexVideo = localStorage.getItem('idv');  
  var valor = urlVideo.indexOf("https");
  //alert(urlVideo);
  var cadena = "";
  if (valor == -1) {
    //alert("es local");
    cadena = "<iframe src='" + localStorage.urlv + "' frameborder='0' allowfullscreen></iframe>";
  }else{
    //alert("hola");
    var patron = "https://www.youtube.com/watch?v=";
    var nuevoValor = "https://www.youtube.com/embed/";
    urlVideo = urlVideo.replace(patron, nuevoValor);
    //alert(urlVideo);
    cadena = "<iframe src='" + urlVideo + "' frameborder='0' allowfullscreen></iframe>";
  }  
  document.getElementById("video").innerHTML=cadena;  
}

      
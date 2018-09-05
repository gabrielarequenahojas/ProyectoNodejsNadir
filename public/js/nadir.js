var idxVideo= "";

/*Funcion inicial al cargar la pagina*/
$(function () {    
    mostrar();
    nuevo();    
    $("#nuevo").click(function (e) {

 //     document.getElementById('tab-0').style.display='block';
 // document.getElementById('tab-1').style.display='block';

 mostrartabla();
        nuevo();
        return false;
    });

    $("#guardar").click(function (e) {
        var obj;
        if (idxVideo === "") {
            obj = new Object();
        } else {
            obj = objJSON.contenido[0].video[idxVideo];
        }

        obj.codigo = $("#codigo").val();
        obj.titulo = $("#titulo").val();
        obj.descripcion = $("#descripcion").val();
        obj.creditos = $("#creditos").val();
         obj.url = $("#url").val();
         obj.portada=$("#portada").val();

        var preguntas = [];
        $.each($("#pregunta div"), function (i, v) {
            var pregunta = new Object();
            pregunta.id = "";
            pregunta.pregunta = $(v).find("input.pre").val();
             pregunta.imagencorrecta= $(v).find("textarea").val();
            pregunta.imagenincorrecta=$(v).find("textarea").val();
              //pregunta.imagencorrecta= $(v).find("source").attr("src");
             //pregunta.imagenincorrecta=$(v).find("source").attr("src");

            //pregunta.audio=$(v).find("source").attr("src");
            pregunta.audio = $(v).find("input.au").val();
            pregunta.respuesta = $(v).find("input.res").val();


           pregunta.opciones = [];
            $.each($(v).find("input.opc"), function (j, w) {
                var opc = new Object();
                opc.opcion = $(w).val();
                pregunta.opciones.push(opc);
            });
            pregunta.respuesta = $(v).find("input.res").val();

            preguntas.push(pregunta);
        });

        obj.preguntas = preguntas;

console.log(obj.preguntas);

        if (!(obj.codigo)) {
            alert("Debe ingresar el código del cuento.");
            return;
        }

   
        if (idxVideo === "") {
            objJSON.contenido[0].video.push(obj);
        }

        grabarArchivoJSON(objJSON);



 //     document.getElementById('tab-0').style.display='none';
 // document.getElementById('tab-1').style.display='none';

    ocultartabla();
        mostrar();

        nuevo();

        return false;
    });

    $("#cancelar").click(function (e) {
        
 // document.getElementById('tab-0').style.display='block';
 // document.getElementById('tab-1').style.display='block';

    ocultartabla();
        nuevo();
        return false;
    });

    $("#exportar").click(function (e) {
        exportJSON();
        return false;
    });



var mostrartabla=function(){

document.getElementById('tab-0').style.display='block';
 document.getElementById('tab-1').style.display='block';
}

var ocultartabla=function(){

document.getElementById('tab-0').style.display='none';
 document.getElementById('tab-1').style.display='none';

}


//  $("#mostrar").click(function(e)){
// document.getElementById('tab-0').style.dispaly='block';
// document.getElementById('tab-1').style.dispaly='block';

//  }


////////////////boton nueva pregunta////////////////////////////////
    $("#btnNuevaPregunta").click(function (e) {
        var i = $("#pregunta div").length;
        var v = new Object();
        v.pregunta = "";
        v.imagencorrecta="";
        v.imagenincorrecta="";
        v.audio="";


        v.opciones = [];
        v.opciones.push(new Object());
        v.opciones.push(new Object());
        // v.opciones.push(new Object());
        v.opciones[0].opcion = "";
        v.opciones[1].opcion = "";
        // v.opciones[2].opcion = "";
        v.respuesta = "";
        visualizarPregunta(i, v);
    });

});

/////////////////funcion para mostrar segun el tab (1.- video) , (2.-Pregunta) /////////////////////////////
var mostrar = function () {
    $.each($("#tabs a"), function (i, v) {
        $(v).click(function (e) {
            var tabindex = $(e.target).attr("tabindex");
            $(".tab:not(hid)").addClass("hid");
            $("#tab-" + tabindex).removeClass("hid");
            return false;
        });
    });


////////////for each para llenar la tabla estructura debe ser segun las clases/////////////////////////////////
    var biblioadmin = "";

    $.each(objJSON.contenido[0].video, function (index, value) { //"<td>" + "</td>"
        biblioadmin+= "<tr id='c" + index + "'><td>" + value.codigo + "</td>" + "<td>" + value.titulo + "</td>" + "<td>" + value.descripcion + "</td>" + "<td>" + value.creditos + "</td>" +"<td>" +value.url+"</td>"+"<td>"+value.portada+"</td>"+
	"<td><a href='#' class='edt' value='" + index + "'>Editar</a></td><td><a href='#' class='del' value='" + index + "'>Eliminar</a></td><tr>";
    });

    $("#demo tbody").html("");
    $("#demo tbody").append(biblioadmin);

///////////////////////for each de edicion de la tabla ////////////////////////////////////////////////    

    $.each($("#demo tbody a.edt"), function (i, v) {
        $(v).click(function (e) {

    document.getElementById('tab-0').style.display='block';
 document.getElementById('tab-1').style.display='block';

            var id = $(e.target).attr("value");
            idxVideo = id;

            var video = objJSON.contenido[0].video[id];
            $("#codigo").val(video.codigo);
            $("#titulo").val(video.titulo);
            $("#creditos").val(video.creditos);
            $("#descripcion").val(video.descripcion);
            $("#url").val(video.url);
            $("#portada").val(video.portada);
            $("#pregunta").html("");
            $.each(video.preguntas, function (i, v) {
                visualizarPregunta(i, v);
            });

            return false;
        });
    });


//////////////////eliminar todo el video///////////
    $("#demo tbody a.del").click(function (e) {
        var id = $(e.target).attr("value");
        idxVideo = id;
        objJSON.contenido[0].video.splice(id, 1);
        grabarArchivoJSON(objJSON);
        mostrar();
        return false;
    });



}
///////////////////////////////////////////////////////////funcion para contrui la nueva pregunta///////////////////////////////////////////////////////////////////////////

var visualizarPregunta= function(i,v){

var lst = [];

    lst.push("<br />");
lst.push("<br />");
lst.push("<div class='hijo' id='p"+i+"' style=' overflow-y:scroll;height:400px;width:900px;'>");
    lst.push("<label>Pregunta#</label> <input type='text' class='npre' value='" + (i + 1) + "' /><br />");
    lst.push("<br />");
    lst.push("<label>Pregunta</label> <input type='text' class='pre' value='");
    lst.push(v.pregunta);
    lst.push("'/><br />");

 ///////////////////////////////////////opciones////////////////////////////////
 

 lst.push("<label>Opciones (Seleccione o Escriba la URL):</label>");
    lst.push("<br />");
    lst.push("<input id='opc1' type='text' class='opc' value='" + v.opciones[0].opcion + "'/>");
    lst.push("<br />");
    lst.push("<input id='opc2' type='text' class='opc' value='" + v.opciones[1].opcion + "'/>");
    lst.push("<br />");
    lst.push("<br />");   

////////////////////////////////////////////////////////imagen coreccta/////////////////////////////////    
lst.push("<label>OPCION 1 : </label> <select id='op1' img='img-" + i + "'>");
 $.each(jsonImagenes.archivos, function (i, w) {
        lst.push("<option value='");
        lst.push(jsonImagenes.urlBase + w);
        lst.push("'");
        if (v.imagencorrecta === (jsonImagenes.urlBase + w)) {
            lst.push("selected='selected'");
        }
        lst.push(">");
        lst.push(w);
        lst.push("</option>");
    });
 lst.push("</select>");
    lst.push("<img id='img-" + i + "' class='img' src='");
    //lst.push(v.imagencorrecta);

    lst.push("' /><br />");
///////////////////////////////////////////////////////image incorrecta//////////////////////////////
 lst.push("<label>OPCION 2 : </label> <select id='op2' img='img1-" + i + "'>");
  $.each(jsonImagenes.archivos, function (i, x) {
         lst.push("<option value='");
         lst.push(jsonImagenes.urlBase + x);
         lst.push("'");
         if (v.imagenincorrecta === (jsonImagenes.urlBase + x)) {
             lst.push("selected='selected'");
         }
         lst.push(">");
         lst.push(x);
         lst.push("</option>");
     });
  lst.push("</select>");
     lst.push("<img id='img1-" + i + "' class='img' src='");
     //lst.push(v.imagenincorrecta);
     lst.push("' /><br />");



////////////////////////////////////////respuesta/////////

 lst.push("<br />");
 lst.push("<br />");
 lst.push("<label>Respuesta:</label>");
 lst.push("<input type='text' class='res' value='" + v.respuesta + "'/>");
 lst.push("<br />");

/////////////////////////////////////////////////audio pregunta////////////////////////////////
  lst.push("<label>Audio Pregunta (Seleccione o Escrina la URL)</label>");
  lst.push("<br />");
 lst.push("<input type='text' class='au' id='au' value='" + v.audio + "'/>");
 lst.push("<br />");

  lst.push("<label></label> <select aud='aud-" + i + "'>");
  
       $.each(jsonAudio.archivos, function (i, w) {
        lst.push("<option value='");
        lst.push(jsonAudio.urlBase + w);
        lst.push("'");
        if (v.audio === (jsonAudio.urlBase + w)) {
            lst.push("selected='selected'");
        }
        lst.push(">");
        lst.push(w);
        lst.push("</option>");
    });
    lst.push("</select>");
    lst.push("<br />");
    lst.push("<audio controls=''><source id='aud-" + i + "' src='");
    lst.push("<br />");
    lst.push(v.audio);
    lst.push("<br />");
    lst.push("' type='audio/mpeg'></audio>");

//PARA ELIMINAR C/P
    lst.push("<br />");
     lst.push("<br />");
   //  lst.push("<input type='button'  style=' color:dimgray; background:orange;' id='abcborrar"+i+"'  class='dele' value='Eliminar " + i +"'/>")
  //  alert(i);

    lst.push("</div><br />");

    lst.push("<hr />");
     var pag = $(lst.join(""));
    $("#pregunta").append(pag);

    $.each(pag.find("select"), function (i, v) {
        $(v).change(function (e) {
            var img = $(e.target).attr("img");
            var idopc = $(e.target).attr("id");
                //alert(idopc);
            if (typeof img !== "undefined") {
                $("#" + img).attr("src", $(e.target).val());     
                if (idopc == "op1") {                               
                    document.getElementById("opc1").value=$(e.target).val();
                }else{                                
                    document.getElementById("opc2").value=$(e.target).val();
                }
             }

            var aud = $(e.target).attr("aud");
            if (typeof aud !== "undefined") {

                var pd = $("#" + aud).parents("audio");
                var lst = [];
                lst.push("<audio controls=''><source id='" + aud + "' src='");
                lst.push($(e.target).val());
                lst.push("' type='audio/mpeg'></audio>");
                pd.replaceWith($(lst.join("")));
                document.getElementById("au").value=$(e.target).val();
            }
        });
    });


    /////////////////////////////////////////////////eliminar cada pregunta////////////////////////////////
     $("#pregunta  input.dele").click(function (e) {
        alert("estoyaqui");
        var id = $(e.target).attr("value");
        alert(id);
            var ax = id.split(" ");
            var nn= ax[1];
            alert(nn);

        $("#p"+nn).remove();
       grabarArchivoJSON(objJSON);

       
        mostrar();
        return false;
    });


}

/////////////////////nuevo elemento /////////////////////////////////

var nuevo = function () {
    idxVideo = "";
    $("#codigo").val("");
    $("#titulo").val("");
    $("#descripcion").val("");
    $("#creditos").val("");
    $("#url").val("");
    $("#portada").val("");
    $("#preguntas").html("");

    // document.getElementById('tab-0').style.display='block';
 //document.getElementById('tab-1').style.display='block';
};








































































//////////////////eliminar todas las preguntas///////////
   /*      $("#btnEliminarPregunta").click(function (e) {
       $("#pregunta").remove();
    //   grabarArchivoJSON(objJSON);
    });

*/
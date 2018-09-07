$(function () {

    alert("hoooola"); 

    $.each($("#portadas img.imagen"), function (i, v) {
            $(v).click(function (e) {
                alert("hoooola");            
        });
    });

});
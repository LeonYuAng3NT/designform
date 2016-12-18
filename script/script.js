/**
 * Created by Ziyao on 2016-11-28. For register form
 */

//-----------------Profile script Ziyao 2016-11-25---------------------
$(document).ready(function (){
  $( "#registerform" ).submit( function(e){
  	e.preventDefault();
    var form_content = $('#registerform').serializeArray();

    $.ajax({
      url: '/artist',
      type: "POST",
      data : JSON.parse(form_content),
      success: function(response){
        alert(response);
      }
    });

  } )
});

$(document).ready(function (){
  $( "#reviewform" ).submit( function(e){
  	e.preventDefault();
    var form_content = $('#reviewform').serializeArray();

    $.ajax({
      url: '/artists/:id/product:name/review',
      type: "POST",
      data : JSON.parse(form_content),
      success: function(response){
        alert(response);
      }
    });

  } )
});

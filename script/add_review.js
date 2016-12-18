 $(document).ready(function (){
    $( "#reviewform" ).submit( function(e){
        e.preventDefault();
        var form_content = $('#reviewform').serializeArray();

        $.ajax({
            url: '/addonereview',
            type: "POST",
            data : form_content,
            success: function(response){
                alert(response);
            }
        });

    } )
});

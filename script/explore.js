function go_to_image() {
	console.log("hifffffffffffffffffffffffff");
	window.location.href = "/productbyname?name=" + this.id +"&username=" + document.getElementById("user_ref").innerText;
}


$(document).ready(function() {

    // set the search btn
    $(".see_btn").on("click", go_to_image);
     
}); 

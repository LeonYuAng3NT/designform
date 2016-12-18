 // declaire the admin username and password

 var admin_user = "admin@designform.com";
 var admin_pass = "csc309";

/*
set the behaviour for admin when clicking sign in
*/
function sign_in() {
	var username = document.getElementById("user_name").value;
	var password = document.getElementById("password").value;
	console.log(username);
	if(admin_user == username && admin_pass == password) {
	    window.location.href = "/admin_home"
	}
}

 $(document).ready(function() {

 	// set the login btn for admin
    $("#sign_in_btn").on("click", sign_in);
     
});

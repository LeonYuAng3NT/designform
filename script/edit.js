var photo_url;
/*
set the behaviour when clicking the upload photo button
*/
function upload_photo() {
    var url = prompt("Enter url: ");
    if (url) {
        photo_url.src = url;
    }
}

/*
the behaviour when clicking the save button
*/
function save_profile() {
	var userName = document.getElementById("user_ref").innerText;
	var givenname = document.getElementById("edit_givenname").value;
	var lastname = document.getElementById("edit_lastname").value;
	var gender = document.getElementById("edit_gender").value;
	var country = document.getElementById("edit_country").value;
	var status = $("#edit_status").val();
	var role = document.getElementById("edit_role").value;
  var photo = photo_url.src;
    
	$.ajax({
        url: "/updateartists",
        type: "GET",
        data: {
          username : userName,
          givenname: givenname,
          lastname: lastname,
          gender: gender,
          country: country,
          status: status,
          role: role,
          picture: photo
        },
        dataType: "json",
        contentType:"application/json; charset=utf-8",
        success: function(response) {
          window.alert('evaluate response and show alert');
        }
      });
      window.alert("You have saved the profile");
}

function get_search_text() {
    var search_text = document.getElementById("search_text").value;
    var search_option = $("#search_option").val();

    console.log(search_option);
    if (search_option == "id") {
      $.ajax({
        url: "/artists",
        type: "GET",
        data: {
          username : search_text
        },
        dataType: "json",
        contentType:"application/json; charset=utf-8",
        success: function(response) {
          window.alert('evaluate response and show alert');
        }
      });
      window.location.href = "/artists?username=" + search_text;
    }

    if (search_option == "country") {
      console.log("the country function is running");
      $.ajax({
        url: "/artists",
        type: "GET",
        data: {
          country : search_text
        },
        dataType: "json",
        contentType:"application/json; charset=utf-8",
        success: function(response) {
          window.alert('evaluate response and show alert');
        }
      });
      //window.location.href = "/artists?id=" + search_text;
      window.location.href = "/artists?country=" + search_text;
    }

    if (search_option == "fname") {
      $.ajax({
        url: "/artists",
        type: "GET",
        data: {
          fname : search_text
        },
        dataType: "json",
        contentType:"application/json; charset=utf-8",
        success: function(response) {
          window.alert('evaluate response and show alert');
        }
        
      });
      //window.location.href = "/artists?id=" + search_text;
      window.location.href = "/artists?fname=" + search_text;
    }
}


$(document).ready(function() {
    photo_url = document.getElementById("user_photo");

    // set the search btn
    $("#search_btn").on("click", get_search_text);

    // set the behaviour for save btn
    $("#ok_btn").on("click", save_profile);

    // set the behaviour for uploading photo
    $("#new_photo").on("click", upload_photo);

    $("[data-toggle]").click(function() {
        var toggle_el = $(this).data("toggle");
        $(toggle_el).toggleClass("open-sidebar");
    });
     
});
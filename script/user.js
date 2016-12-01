// set the global variable to describe the behaviours
var profile = "<img src='assets/pictures/face.jpg' height='200px'>"
// set the behaviour when we click on the home button
function go_home() {
    document.getElementById("changing_part").innerHTML = "<h1>Welcome!</h1>";
}

// set the behaviour when we click on the profile button
function get_profile() {
    document.getElementById("changing_part").innerHTML = profile;
}





$(document).ready(function() {
    // set the button for go home
    $("#go_home_btn").on("click", go_home);

    // set the button for getting profile
    $("#get_profile_btn").on("click", get_profile);

  $("[data-toggle]").click(function() {
    var toggle_el = $(this).data("toggle");
    $(toggle_el).toggleClass("open-sidebar");
  });
     
});
/** seems this doesn't work at all???
$(".swipe-area").swipe({
    swipeStatus:function(event, phase, direction, distance, duration, fingers)
        {
            if (phase=="move" && direction =="right") {
                 $(".container").addClass("open-sidebar");
                 return false;
            }
            if (phase=="move" && direction =="left") {
                 $(".container").removeClass("open-sidebar");
                 return false;
            }
        }
});**/
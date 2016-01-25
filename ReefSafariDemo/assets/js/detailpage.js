$(detailpage);

function detailpage(){
    $("#reviewNow").on("click", function(){
        $('#reviewModal').modal("show");
    });
    $("#reviewLater").on("click", function(){
        window.location.href = "menu.php";
    });
    var temp = $(".strong-dp").text();
    $(".strong-dp").html(createRating(temp, 10, "ratingDivContainer ratingDivContainerPadding"));
}
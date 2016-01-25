$(detailpage);

function detailpage(){
    $("#reviewNow").on("click", function(){
        $('#reviewModal').modal("show");
    });
    $("#reviewLater").on("click", function(){
        window.location.href = "review.php";
    });
}
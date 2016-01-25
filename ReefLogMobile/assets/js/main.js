$(init);
var allEntries = [];

var rarityNames = [
    "Extremely common",
    "Very common",
    "common",
    "Slightly uncommon",
    "Uncommon",
    "Slightly rare",
    "Rare",
    "Very rare",
    "Extremely rare",
    "Extinct"
];
var venomousNames = [
    "Not venomous",
    "Slightly venomous",
    "Venomous"
];
var checkableColors = [
    "Zwart",
    "Wit",
    "Grijs",
    "Rood",
    "Groen",
    "Blauw"
];

function init() {
    //$("#reviewNow").on("click", function(){
    //    $('#reviewModal').modal("show");
    //});
    //$('#search-input').bind('input', searchEntries);
    //getAllEntries();
    //getFileFromCamera();
}
function getEntries(data) {
    allEntries = data;
    deleteCurrentHTML();
    createPageHTML();
    $('.collapse-arrow').on('click', hideShow);
    $('.entryButton').on('click', getEntryData);
    $('#editButton').on('click', editEntryDescription);
    $('#saveButton').on('click', saveEntry).hide();
    $('#deleteButton').on('click', deleteEntry);
    $('#detailsModal').on('hidden.bs.modal', resetModal);
    //$("#modalDescriptionEdit").hide();
}

function editEntryDescription() {
    //$('#modalDescriptionEdit').val($("#modalCoralUserDescription").text());
    //toggleModalEdit();
}

function hideShow() {
    $(this).parent().siblings().toggle();
    if ($(this).hasClass("glyphicon-chevron-down")) {
        this.className = "collapse-arrow glyphicon glyphicon-chevron-right pull-right";
    } else {
        this.className = "collapse-arrow glyphicon glyphicon-chevron-down pull-right";
    }
}
function getAllEntries() {
    $.ajax({
        dataType: "json",
        url: 'ajax.php',
        data: {action: "getEntries"},
        success: getEntries
    });
}
function getReviewItems(){
    $.ajax({
        dataType: "json",
        url: 'ajax.php',
        data: {action: "getReviewEntries"},
        success: getReviewItemsCallback
    });
}
function getReviewItemsCallback(data){
    allEntries = data;
    deleteCurrentHTML();
    createReviewPageHTML();
    $('.collapse-arrow').on('click', hideShow);

    //$('.entryButton').on('click', getEntryData);
    //$('#editButton').on('click', editEntryDescription);
    //$('#saveButton').on('click', saveEntry).hide();
    //$('#deleteButton').on('click', deleteEntry);
    //$('#detailsModal').on('hidden.bs.modal', resetModal);
    //$("#modalDescriptionEdit").hide();
}
function searchEntries() {
    var data = $("#search-input").val();
    if (data == "") {
        getAllEntries();
    } else {
        $.ajax({
            dataType: "json",
            url: 'ajax.php',
            data: {action: "searchEntries", keyWord: data},
            success: getEntries
        });
    }
}
function getEntryData() {
    $('#detailsModal').data('entryid', $(this).data("entryid"));

    $.ajax({
        dataType: "json",
        url: 'ajax.php',
        data: {action: "getEntryInfo", entryId: $(this).data("entryid")},
        success: showModel
    });
}
function showModel(coralEntry) {

    $("#modalCoralName").text(coralEntry[0].name);
    //$("#modalCoralInformation").text(coralEntry[0].coralDescription);
    //$("#modalCoralUserDescription").text(coralEntry[0].description);
    $("#modalCoralVenomous").text(venomousNames[coralEntry[0].venomous]);
    $("#modalCoralRarity").html(createRating(coralEntry[0].rarity - 1, 10));
    $("#modalCoralAvatar").attr("src", coralEntry[0].avatar);
    $('#detailsModal').modal("show");

}
function toggleModalEdit() {
    //$("#modalCoralUserDescription").toggle();
    //$("#modalDescriptionEdit").toggle();
    $("#saveButton").toggle();
    $("#editButton").toggle();
}
function resetModal() {
    //$("#modalCoralUserDescription").show();
    //$("#modalDescriptionEdit").hide();

    $("#saveButton").hide();
    $("#editButton").show();
}
function saveEntry() {
    //var description = $('#modalDescriptionEdit').val();
    //$("#modalCoralUserDescription").text(description);

    $.ajax({
        dataType: "json",
        url: 'ajax.php',
        data: {action: "editEntry", entryId: $('#detailsModal').data("entryid"), description: description},
        success: function () {
        }
    });
    toggleModalEdit();
}
function deleteEntry() {

    var confirmation = confirm("Are you sure you want to delete this entry?");

    if (confirmation == true) {
        $.ajax({
            dataType: "json",
            url: 'ajax.php',
            data: {action: "deleteEntry", entryId: $('#detailsModal').data("entryid")},
            success: closeModel
        });
    }
}
function closeModel() {
    $('#detailsModal').modal('hide');
    getAllEntries();
}
function deleteCurrentHTML() {

    $('.collapse-arrow').off('click', hideShow);
    $('.entryButton').off('click', getEntryData);
    $('#editButton').off('click', editEntryDescription);
    $('#saveButton').off('click', saveEntry);
    $('#deleteButton').off('click', deleteEntry);
    $('#detailsModal').off('hidden.bs.modal', resetModal);

    $('#content-container').empty();
    $("#search-date-list").empty();

}
function getFileFromCamera() {

    (function () {
        var takePicture = document.querySelector("#take-picture"),
            showPicture = document.querySelector("#show-picture");

        if (takePicture && showPicture) {
            // Set events
            takePicture.onchange = function (event) {
                // Get a reference to the taken picture or chosen file
                var files = event.target.files,
                    file;
                if (files && files.length > 0) {
                    file = files[0];
                    try {
                        // Get window.URL object
                        var URL = window.URL || window.webkitURL;

                        // Create ObjectURL
                        var imgURL = URL.createObjectURL(file);

                        // Set img src to ObjectURL
                        showPicture.src = imgURL;

                        // Revoke ObjectURL after imagehas loaded
                        showPicture.onload = function() {
                            URL.revokeObjectURL(imgURL);
                            checkType(showPicture);
                        };

                    }
                    catch (e) {
                        try {
                            // Fallback if createObjectURL is not supported
                            var fileReader = new FileReader();
                            fileReader.onload = function (event) {
                                showPicture.src = event.target.result;
                            };
                            fileReader.readAsDataURL(file);
                        }
                        catch (e) {
                            // Display error message
                            var error = document.querySelector("#error");
                            if (error) {
                                error.innerHTML = "Neither createObjectURL or FileReader are supported";
                            }
                        }
                    }
                }
            };
        }
    })();
}
function checkType(image){
    var img = image;
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);


    var pixelData = [];

    var amountDots = 10;
    var maxAmountWhite = 0.85;
    var minAmountWhite = 0.1;


    var offsetX = canvas.width / amountDots;
    var offsetY = canvas.height / amountDots;


    for(var i = 0; i < amountDots; i++){
        for(var j = 0; j < amountDots; j++){
            pixelData.push(canvas.getContext('2d').getImageData(i * offsetX, j * offsetY, 1, 1).data);

        }
    }
    //for(var i = 0; i < pixelData.length; i ++){
    //    console.log("R " + pixelData[i][0] + " G " + pixelData[i][1] + " B " + pixelData[i][2] + " A " + pixelData[i][3]);
    //}
    var foundColors = [0,0,0,0,0,0];


    // 0 = Zwart
    // 1 = Wit
    // 2 = Grijs
    // 3 = Rood
    // 4 = Groen
    // 5 = Blauw


    for(var i = 0; i < pixelData.length; i ++){
        var color = checkColor(pixelData[i]);

        foundColors[color]++;
    }
    var highestIndex = 0;

    for(var i = 0; i < foundColors.length; i ++){
        if(foundColors[i] > foundColors[highestIndex]){
            if(i != 1 && i != 2){ // skip Wit en Grijs.
                //console.log(i);
                highestIndex = i;
            }
        }
    }

    console.log("Aantal Zwarte Pixels: "+ foundColors[0]);
    console.log("Aantal Witte Pixels: "+ foundColors[1]);
    console.log("Aantal Grijze Pixels: "+ foundColors[2]);
    console.log("Aantal Rode Pixels: "+ foundColors[3]);
    console.log("Aantal Groene Pixels: "+ foundColors[4]);
    console.log("Aantal Blauwe Pixels: "+ foundColors[5]);

    if(foundColors[1] + foundColors[2] > (amountDots * amountDots) * maxAmountWhite){
        appendResult("Er is geen spons gevonden, Probeer opnieuw");
    }
    else if(foundColors[1] + foundColors[2] < (amountDots * amountDots) * minAmountWhite){
        appendResult("Maak de foto op een witte achtergrond");
    }
    else{
        appendResult("deze spons is " + checkableColors[highestIndex]);
        saveEntryToDB(image, highestIndex)
    }

}
function saveEntryToDB(img, type){

    var croppedImage = getCroppedImage(img);
    var thumbnail = getCroppedThumbnail(croppedImage);

    $.ajax({
        url: "ajaxEntryToDB.php",
        method: "POST",
        data: {
            croppedImage: croppedImage.toDataURL(),
            thumbnail: thumbnail.toDataURL(),
            type: type
        },
        success: function(response){
            window.location.href = "detailpage.php?id="+response;
        }
    });

}
function getCroppedImage(img){
    var saveCanvas = document.createElement('canvas');
    saveCanvas.width = 700;
    saveCanvas.height = 700;


    if(img.width > img.height){
        saveCanvas.getContext('2d').drawImage(img, img.width / 2 - img.height / 2, 0,
            img.height, img.height, 0,0,saveCanvas.width, saveCanvas.height);
    }else{
        saveCanvas.getContext('2d').drawImage(img, 0, img.height / 2 - img.width / 2,
            img.width, img.width, 0,0,saveCanvas.width, saveCanvas.height);
    }

    return saveCanvas;
}
function getCroppedThumbnail(canvas){
    var saveCanvasThumbnail = document.createElement('canvas');
    saveCanvasThumbnail.width = 200;
    saveCanvasThumbnail.height = 200;

    saveCanvasThumbnail.getContext('2d').drawImage(canvas, 0, 0, saveCanvasThumbnail.width, saveCanvasThumbnail.height);

    return saveCanvasThumbnail;
}
function checkColor(color) {

    var whiteBreakPoint = 150;
    var blackBreakPoint = 80;

    var breakpointCheckBlack = 40;
    var breapointCheckWhite = 50;

    var greyDiff = 30;

    if (color[0] < blackBreakPoint && color[1] < blackBreakPoint && color[2] < blackBreakPoint &&
    Math.abs(color[0] - color[1]) < breakpointCheckBlack &&
    Math.abs(color[1] - color[2]) < breakpointCheckBlack &&
    Math.abs(color[0] - color[2]) < breakpointCheckBlack) {
        return 0;
    }
    if (color[0] > whiteBreakPoint && color[1] > whiteBreakPoint && color[2] > whiteBreakPoint &&
        Math.abs(color[0] - color[1]) < breapointCheckWhite &&
        Math.abs(color[1] - color[2]) < breapointCheckWhite &&
        Math.abs(color[0] - color[2]) < breapointCheckWhite) {
        return 1;
    }
    if (Math.abs(color[0] - color[1]) < greyDiff &&
        Math.abs(color[1] - color[2]) < greyDiff &&
        Math.abs(color[0] - color[2]) < greyDiff) {
        return 2;
    }
    var highest = Math.max(color[0], color[1], color[2]);

    if (color[0] == highest) {
        return 3;
    }
    if (color[1] == highest) {
        return 4;
    }
    if (color[2] == highest) {
        return 5;
    }

}

function appendResult(result) {
    $("#result").empty().append($( "<h2>" + result + "</h2>"));
}
function createRating(given, max){
    var rating = document.createElement('div');

    for(var i = 0; i < max; i ++){
        if(i <= given){
            var img = document.createElement('span');
            img.className = "myStar glyphicon glyphicon-star"

            rating.appendChild(img);
        }else{
            var img = document.createElement('span');
            img.className = "myStar glyphicon glyphicon-star-empty"
            rating.appendChild(img);
        }
    }
    return rating
}


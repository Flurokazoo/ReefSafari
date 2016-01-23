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
    "Blauw",
    "Geel",
    "Cyaan",
    "Paars"
];

function init() {
    $('#search-input').bind('input', searchEntries);
    getAllEntries();
    getFileFromCamera();
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
    $("#modalDescriptionEdit").hide();
}

function editEntryDescription() {
    $('#modalDescriptionEdit').val($("#modalCoralUserDescription").text());
    toggleModalEdit();
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
    $("#modalCoralInformation").text(coralEntry[0].habitat);
    $("#modalCoralUserDescription").text(coralEntry[0].description);
    $("#modalCoralVenomous").text(venomousNames[coralEntry[0].venomous]);
    $("#modalCoralRarity").text(rarityNames[coralEntry[0].rarity - 1]);
    $("#modalCoralAvatar").attr("src", coralEntry[0].avatar);
}
function toggleModalEdit() {
    $("#modalCoralUserDescription").toggle();
    $("#modalDescriptionEdit").toggle();
    $("#saveButton").toggle();
    $("#editButton").toggle();
}
function resetModal() {
    $("#modalCoralUserDescription").show();
    $("#modalDescriptionEdit").hide();

    $("#saveButton").hide();
    $("#editButton").show();
}
function saveEntry() {
    var description = $('#modalDescriptionEdit').val();
    $("#modalCoralUserDescription").text(description);

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

    var canvasData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);

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
    for(var i = 0; i < pixelData.length; i ++){
        console.log("R " + pixelData[i][0] + " G " + pixelData[i][1] + " B " + pixelData[i][2] + " A " + pixelData[i][3]);
    }
    var foundColors = [0,0,0,0,0,0,0,0,0];


    // 0 = Zwart
    // 1 = Wit
    // 2 = Grijs
    // 3 = Rood
    // 4 = Groen
    // 5 = Blauw
    // 6 = Geel
    // 7 = Cyaan
    // 8 = Paars


    for(var i = 0; i < pixelData.length; i ++){
        var color = checkColor(pixelData[i]);

        foundColors[color]++;
    }
    var highestIndex = 0;

    for(var i = 0; i < foundColors.length; i ++){
        if(foundColors[i] > foundColors[highestIndex]){
            if(i != 1 && i != 2){ // skip Wit en Grijs.
                console.log(i);
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
    //console.log("Aantal Gele Pixels: "+ foundColors[6]);
    //console.log("Aantal Cyane Pixels: "+ foundColors[7]);
    //console.log("Aantal Paarse Pixels: "+ foundColors[8]);


    if(foundColors[1] + foundColors[2] > (amountDots * amountDots) * maxAmountWhite){
        appendResult("Er is geen spons gevonden, Probeer opnieuw");
    }
    else if(foundColors[1] + foundColors[2] < (amountDots * amountDots) * minAmountWhite){
        appendResult("Maak de foto op een witte achtergrond");
    }
    else{
        appendResult("deze spons is " + checkableColors[highestIndex]);
    }


}
function checkColor(color) {

    var whiteBreakPoint = 180;
    var blackBreakPoint = 80;

    var greyDiff = 30;

    if (color[0] < blackBreakPoint && color[1] < blackBreakPoint && color[2] < blackBreakPoint) {
        return 0;
    }
    if (color[0] > whiteBreakPoint && color[1] > whiteBreakPoint && color[2] > whiteBreakPoint) {
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

$("[type=file]").on("change", function(){
    // Name of file and placeholder
    var file = this.files[0].name;
    var dflt = $(this).attr("placeholder");
    if($(this).val()!=""){
        window.location.href = "sendphototodb.php";
    } else {
        $(this).next().text(dflt);
    }
});


    //var diffMixedColor = 70;
    //var diffMixedColorThird = 40;
    //
    //var greyDiff = 20;


    //if(color[0] < blackBreakPoint && color[1] < blackBreakPoint && color[2] < blackBreakPoint &&
    //    Math.abs(color[0]-color[1]) < diffMixedColor &&
    //    Math.abs(color[1]-color[2]) < diffMixedColor &&
    //    Math.abs(color[0]-color[2]) < diffMixedColor){
    //    return 0;
    //}
    //if(color[0] > whiteBreakPoint && color[1] > whiteBreakPoint && color[2] > whiteBreakPoint){
    //    return 1;
    //}
    //if(Math.abs(color[0]-color[1]) < greyDiff &&
    //    Math.abs(color[1]-color[2]) < greyDiff &&
    //    Math.abs(color[0]-color[2]) < greyDiff){
    //    return 2;
    //}
    //
    //if(color[0] > blackBreakPoint && color[1] > blackBreakPoint &&
    //    Math.abs(color[0]-color[1]) < diffMixedColor &&
    //    Math.abs(color[0]-color[2]) > diffMixedColorThird &&
    //    Math.abs(color[1]-color[2]) > diffMixedColorThird){
    //    return 6;
    //}
    //if(color[1] > blackBreakPoint && color[2] > blackBreakPoint &&
    //    Math.abs(color[1]-color[2]) < diffMixedColor &&
    //    Math.abs(color[1]-color[0]) > diffMixedColorThird &&
    //    Math.abs(color[2]-color[0]) > diffMixedColorThird){
    //    return 7;
    //}
    //if(color[0] > blackBreakPoint && color[2] > blackBreakPoint &&
    //    Math.abs(color[0]-color[2]) < diffMixedColor &&
    //    Math.abs(color[0]-color[1]) > diffMixedColorThird &&
    //    Math.abs(color[2]-color[1]) > diffMixedColorThird){
    //    return 8;
    //}
    //var highest = Math.max(color[0], color[1], color[2]);
    //
    //if(color[0] == highest){
    //    return 3;
    //}
    //if(color[1] == highest){
    //    return 4;
    //}
    //if(color[2] == highest){
    //    return 5;
    //}
    // 0 = Zwart
    // 1 = Wit
    // 2 = Grijs
    // 3 = Rood
    // 4 = Groen
    // 5 = Blauw
    // 6 = Geel
    // 7 = Cyaan
    // 8 = Paars

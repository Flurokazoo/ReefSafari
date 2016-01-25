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

function init() {
    $('#search-input').bind('input', searchEntries);
    getAllEntries();

}
function getEntries(data) {
    allEntries = data;
    deleteCurrentHTML();
    createPageHTML();
    updateNav();
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
    $("#modalCoralInformation").text(coralEntry[0].coralDescription);
    $("#modalCoralUserDescription").text(coralEntry[0].description);
    $("#modalCoralRarity").html(createRating(coralEntry[0].rarity - 1, 10, "ratingDivContainer"));
    $("#modalCoralRarityText").text("This coral is: " + rarityNames[coralEntry[0].rarity - 1]);
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
function updateNav() {
    var navList = $("#search-date-list");

    var d = new Date();
    for (var i = d.getFullYear(); i > 2013; i--) {
        var yearUl = $('<ul>').addClass("yearUl");
        var yearLi = $('<li>').addClass("yearLi");
        var yearA = $('<a>').attr("href", "#" + i);

        var yearAmount = 0;

        yearLi.append(yearA);
        yearUl.append(yearLi);


        for (var j = 12; j > 0; j--) {
            var amount = 0;
            $.each(allEntries, function (k, element) {
                if (element.month == j && element.year == i) {
                    amount++;
                }
            });
            if (!amount <= 0) {
                var monthA = $('<a>').attr("href", "#" + monthNames[j-1] + i).text(monthNames[j-1] + "(" + amount + ")");
                var monthLi = $('<li>').addClass("monthLi");
                monthLi.append(monthA);
                yearUl.append(monthLi);
                yearAmount += amount;
            }
        }
        yearA.text(i + "(" + yearAmount + ")");
        navList.append(yearUl);
    }
}
function createRating(given, max, className){
    var rating = document.createElement('div');
    rating.className = className;

    for(var i = 0; i < max; i ++){
        if(i <= given){
            var img = document.createElement('span');
            img.className = "myStar glyphicon glyphicon-star";

            rating.appendChild(img);
        }else{
            var img = document.createElement('span');
            img.className = "myStar glyphicon glyphicon-star-empty";
            rating.appendChild(img);
        }
    }
    return rating
}
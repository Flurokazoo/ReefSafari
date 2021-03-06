/**
 * Created by Niek on 7-12-2015.
 */

var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
function createEntryHTML(data) {

    var entryDiv = document.createElement('div');
    entryDiv.className = "entryDiv thumbnail text-center";

    var entryTitle = document.createElement('h4');
    entryTitle.innerHTML = data.name;
    var entryPicture = document.createElement('img');
    entryPicture.src = data.avatarThumbnail;
    entryPicture.className = "img-rounded";
    var entryButton = document.createElement('button');
    entryButton.href = "index.php";
    entryButton.className = "btn btn-block btn-success entryButton";
    //$(entryButton).attr('data-toggle', 'modal');
    //$(entryButton).attr('data-target', '#detailsModal');
    $(entryButton).attr("data-entryid", data.id);
    entryButton.innerHTML = "View";

    entryDiv.appendChild(entryTitle);
    entryDiv.appendChild(entryPicture);
    entryDiv.appendChild(entryButton);

    return entryDiv;

}
function createDayHTML(day, month, year) {
    var dayDiv = document.createElement('div');
    dayDiv.className = "dayDiv";
    var dayCollapseArrow = document.createElement('span');
    dayCollapseArrow.className = "collapse-arrow glyphicon glyphicon-chevron-down pull-right";
    var dayTitle = document.createElement('h3');
    dayTitle.className = "col-lg-12";
    dayTitle.innerHTML = day + " " + monthNames[month - 1];


    var entryContainer = document.createElement('div');
    entryContainer.className = "col-lg-12";

    $.each(allEntries, function (i, element) {
        if (element.day == day && element.month == month && element.year == year)
            entryContainer.appendChild(createEntryHTML(element));
    });

    dayTitle.appendChild(dayCollapseArrow);
    dayDiv.appendChild(dayTitle);
    dayDiv.appendChild(entryContainer);

    return dayDiv;
}
function createYearHTML(year) {
    var yearDiv = document.createElement('div');
    yearDiv.className = "yearDiv";
    yearDiv.id = year;
    var yearCollapseArrow = document.createElement('span');
    yearCollapseArrow.className = "collapse-arrow glyphicon glyphicon-chevron-down pull-right";
    var yearTitle = document.createElement('h2');
    yearTitle.innerHTML = year;
    var dayContainer = document.createElement('div');

    var addedDates = [];

    var lastEntryMonth = "";

    $.each(allEntries, function (i, element) {
        if (element.year == year && $.inArray(element.day + element.month + element.year, addedDates) < 0) {

            if(lastEntryMonth != element.month){
                dayContainer.appendChild(createMonthAnchorDiv(element.month, element.year));
                lastEntryMonth = element.month;
            }
            dayContainer.appendChild(createDayHTML(element.day, element.month, element.year));
            addedDates.push(element.day + element.month + element.year);
        }
    });
    yearTitle.appendChild(yearCollapseArrow);
    yearDiv.appendChild(yearTitle);
    yearDiv.appendChild(dayContainer);

    return yearDiv;

}
function createPageHTML() {
    var d = new Date();
    for (var i = d.getFullYear(); i > 2013; i--) {
        document.getElementById("content-container").appendChild(createYearHTML(i));
    }

}
function createMonthAnchorDiv(month, year){
    var anchorDiv = document.createElement('div');
    anchorDiv.id = monthNames[month-1] + year;
    return anchorDiv;
}
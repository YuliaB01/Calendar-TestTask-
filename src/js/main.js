function createCalendar(id, year, month) {
    var calendar = document.getElementById(id);
    calendar.appendChild(createCalendarHeader(year, month));
    calendar.appendChild(createTable());
}
//creates the whole table
function createTable() {
    var table = document.createElement("table");
    table.className = "table";

    table.appendChild(createTableHead());

    return table;
}
//creates head of the calendar with month name and year
function createCalendarHeader(year, month) {
    var monthName = new Date(year, --month).toLocaleString("en-us", {month: "long"});//shows month name in a full form

    var head = document.createElement("div");
    head.className = "calendarHeader";

    var monthElement = document.createElement("span");
    monthElement.className = "monthName";
    monthElement.textContent = monthName;

    var selectedYear = document.createElement("span");
    selectedYear.className = "year";
    selectedYear.textContent = year;

    var leftHook = document.createElement("span");
    leftHook.className = "left-hook";

    var rightHook = document.createElement("span");
    rightHook.className = "right-hook";

    head.appendChild(monthElement);
    head.appendChild(selectedYear);
    head.appendChild(leftHook);
    head.appendChild(rightHook);

    return head;
}
//creates row with day names
function createTableHead() {
    var row = document.createElement("tr");
    row.className = "th-row";

    var dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    for(var i = 0; i < dayNames.length; i++) {
        var td = document.createElement("td");
        td.className = "days";
        td.textContent = dayNames[i];
        row.appendChild(td);
    }

    return row;
}

createCalendar("cal", 2011, 2);


function createCalendar(id, year, month) {
    var calendarElement = document.getElementById(id);
    calendarElement.appendChild(createCalendarHeader(year, month));
    calendarElement.appendChild(createTable(year, month));
}

// creates the whole table
function createTable(year, month) {
    var table = document.createElement("table");
    table.className = "table";

    table.appendChild(createTableHead());
    table.appendChild(createTableBody(year, month));

    return table;
}

// creates head of the calendar with month name and year
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

// creates row with day names
function createTableHead() {
    var row = document.createElement("tr");
    row.className = "th-row";

    var dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    for(var i = 0; i < dayNames.length; i++) {
        var td = document.createElement("th");
        td.className = "days";
        td.textContent = dayNames[i];
        row.appendChild(td);
    }

    return row;
}

// creates the whole table with days
function createTableBody(year, month) {
    var date = new Date(year, --month),
        curMonth = date.getMonth(), // current month
        curYear = date.getFullYear(), // current year
        lastMonthDay = new Date(curYear, curMonth + 1, 0).getDate(), // last day of the month
        firstMonthDay = new Date(curYear, curMonth, 1); // first day of the month

    var weekDay = firstMonthDay.getDay() - 1; // number of the first month day in the week
    if(weekDay < 0) {
        weekDay = 6;
    }

    var tbody = document.createElement("tbody");
    tbody.className = "tbody";
    var tr = document.createElement("tr");

    for(var i = 1, j = 1; i <= lastMonthDay + weekDay; i++) {
        var td = document.createElement("td");
        if(i <= weekDay) {
            td.textContent = "";
        } else {
            td.textContent = j++;
        }
        tr.appendChild(td);

        if(i % 7 === 0) {
            tbody.appendChild(tr);
            var tr = document.createElement("tr");
        }

        if(i === lastMonthDay) {
            tbody.appendChild(tr);
        }
    }

    tbody.addEventListener("click", function(e) {
        if(e.target.textContent != "") {
            showModal(e, date, curYear);
        }
    });

    return tbody;
}

var closeBtn = document.getElementById("close-btn");

closeBtn.addEventListener("click", function() {
    hideModal();
});

document.addEventListener("keyup", function(e) {
    if(e.keyCode == 27 && modal.style.display == "inline-block") {
        hideModal();
    }
});

function showModal(e, date, curYear) {
    document.getElementById("overlay").classList.add("overlay");

    document.getElementById("month").textContent = date.toLocaleString("en-us", {month: "long"});//shows month name in a full form
    document.getElementById("year").textContent = curYear;
    document.getElementById("date").textContent = e.target.textContent;

    var modal = document.getElementById("modal");
    modal.style.display = "inline-block";
}

function hideModal() {
    document.getElementById("overlay").classList.remove("overlay");

    var modal = document.getElementById("modal");
    modal.style.display = "none";
}

createCalendar("cal", 2017, 8);


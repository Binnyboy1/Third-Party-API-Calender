// DOM elements references
var containerEl = document.querySelector('.container');
var notificationEl = document.querySelector('.notification');
notificationEl.style.visibility = "hidden";

// Gathering date info
var date = moment();
$("#currentDay").text(date.format('dddd, MMMM Do'));

function am_pm_toggle(p) {
    if (p == "AM") {
        p = "PM";
    } else {
        p = "AM";
    }
    return p;
}

// Dynamic to any schedule based on the parameters given
function createSchedule(min = 9, max = 17, twelveHr = "AM") {
    var trueHr = min;
    var dateA = date.format('a').toUpperCase();
    var dateH = date.format('h');
    var timing = "past";
    var event = "";

    for (var hr = min; hr <= max; hr++) {
        // Retrieving events from Local Storage
        event = localStorage.getItem(`hour-${hr}`);
        if (event === null) {
            event = "";
        }

        // AM/PM switch
        if (trueHr == 12) {
            twelveHr = am_pm_toggle(twelveHr);
        }

        // Timing check (past, present, or future)
        if (timing !== "future") {
            if (twelveHr === "PM" && dateA === "AM") {
                timing = "future";
            } else if (twelveHr === dateA) {
                if (trueHr == dateH) {
                    timing = "present";
                } else if (trueHr > dateH) {
                    if (trueHr !== 12) {
                        timing = "future";
                    }
                } else {
                    if (dateH === 12) {
                        timing = "future";
                    }
                }
            }
        }

        // Creating schedule rows
        containerEl.innerHTML += `
        <div class="row">
            <div class="col-md-1 hour">${trueHr}${twelveHr}</div>
            <textarea class="col-md-10 description ${timing}" id="hour-${hr}">${event}</textarea>
            <button class="saveBtn col-md-1"><i class="fas fa-save"></i></button>
        </div>
        `;
        
        trueHr++;
        // 12-hr Loop
        if (trueHr == 13) {
            trueHr -= 12;
        }
    }
}

function saveEvent(textBoxEl) {
    if (textBoxEl.value !== "") {
        localStorage.setItem(textBoxEl.id, textBoxEl.value);
        notificationEl.style.visibility = "visible";
        // notificationEl.textContent.style.display = "none";
    } else {
        localStorage.removeItem(textBoxEl.id);
    }
}

function buttonTest(event) {
    if (event.target.tagName === 'BUTTON') {
        var textBox = event.target.parentNode.querySelector(".description");
        saveEvent(textBox);
    } else if (event.target.tagName === 'I') {  // Alternate conditions for an element that's indented further
        var textBox = event.target.parentNode.parentNode.querySelector(".description");
        saveEvent(textBox);
    }
}

// Run function when page loads
createSchedule();

/* Key Up Event */
containerEl.addEventListener("click", buttonTest);
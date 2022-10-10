// DOM elements references
var containerEl = document.querySelector('.container');

// Gathering date info
var date = moment();
$("#currentDay").text(date.format('dddd, MMMM Do'));
console.log(date.format('h'));
console.log(date.format('a').toUpperCase());

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

    for (var hr = min; hr <= max; hr++) {
        // AM/PM switch
        if (trueHr == 12) {
            twelveHr = am_pm_toggle(twelveHr);
        }

        // Timing check (past, present, or future)
        if (timing !== "future") {
            if (twelveHr === "PM" && dateA === "AM") {
                timing = "future";
            } else if (twelveHr === dateA) {
                if (trueHr === dateH) {
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
            <div class="col-1 hour">${trueHr}${twelveHr}</div>
            <div class="col-10 ${timing}">a</div>
            <div class="col-1 saveBtn">a</div>
        </div>
        `;
        
        trueHr++;
        // 12-hr Loop
        if (trueHr == 13) {
            trueHr -= 12;
        }
    }
}

// Run function when page loads
createSchedule();
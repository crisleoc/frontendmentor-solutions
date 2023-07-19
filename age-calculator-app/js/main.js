import { InputData } from "./InputData.js";
import { Button } from "./Button.js"

const DAY_LABEL = document.getElementById("day-label");
const MONTH_LABEL = document.getElementById("month-label");
const YEAR_LABEL = document.getElementById("year-label");
const DAY_INPUT = document.getElementById("day-input");
const MONTH_INPUT = document.getElementById("month-input");
const YEAR_INPUT = document.getElementById("year-input");
const ERROR_DAY = document.getElementById("error-day");
const ERROR_MONTH = document.getElementById("error-month");
const ERROR_YEAR = document.getElementById("error-year");
const RESULT_DAY = document.getElementById("result-day");
const RESULT_MONTH = document.getElementById("result-month");
const RESULT_YEAR = document.getElementById("result-year");
const SUBMIT_BUTTON = document.getElementById("submit-button");
SUBMIT_BUTTON.addEventListener("click", (event) => { event.preventDefault() });

const BUTTON = new Button(SUBMIT_BUTTON);

function checkDay(day) {
    day = parseInt(day);
    if (day < 1 || day > 31) {
        return "Must be a valid day";
    } return "";
}

function checkMonth(month) {
    month = parseInt(month);
    if (month < 1 || month > 12) {
        return "Must be a valid month";
    } return "";
}

function checkYear(year) {
    year = parseInt(year);
    const currentYear = new Date().getFullYear();
    if (year < currentYear - 100 || year > currentYear) {
        return "Must be a valid year";
    } return "";
}

const DAY = new InputData({
    label: DAY_LABEL,
    input: DAY_INPUT,
    spanError: ERROR_DAY,
    stateError: false,
    checkFunction: checkDay
});

const MONTH = new InputData({
    label: MONTH_LABEL,
    input: MONTH_INPUT,
    spanError: ERROR_MONTH,
    stateError: false,
    checkFunction: checkMonth
});

const YEAR = new InputData({
    label: YEAR_LABEL,
    input: YEAR_INPUT,
    spanError: ERROR_YEAR,
    stateError: false,
    checkFunction: checkYear
});

function checkAll() {
    DAY.checkData();
    MONTH.checkData();
    YEAR.checkData();
}

function refreshAll() {
    DAY.refresh();
    MONTH.refresh();
    YEAR.refresh();
}

function resetAll() {
    DAY.resetAllInput();
    MONTH.resetAllInput();
    YEAR.resetAllInput();
    RESULT_DAY.innerHTML = "--";
    RESULT_MONTH.innerHTML = "--";
    RESULT_YEAR.innerHTML = "--";
    BUTTON.defaultButton();
}

function checkDate() {
    if (!DAY.stateError && !MONTH.stateError && !YEAR.stateError) {
        try {
            let day = parseInt(DAY.getData());
            let month = parseInt(MONTH.getData());
            let year = parseInt(YEAR.getData());
            let date = new Date(year, month - 1, day);
            calculateFullAge(date);
        } catch (error) {
            console.log(error);
        }
    }
}


function calculateFullAge(bornDate) {
    let currentDate = new Date();
    let age = currentDate.getFullYear() - bornDate.getFullYear();
    let month = currentDate.getMonth() - bornDate.getMonth();
    let days = currentDate.getDate() - bornDate.getDate();
    if (month < 0 || (month === 0 && currentDate.getDate() < bornDate.getDate())) {
        age--;
    }
    if (month < 0) {
        month = 12 + month;
    }
    if (days < 0) {
        month--;
        days = 30 + days;
    }

    RESULT_YEAR.innerHTML = age;
    RESULT_MONTH.innerHTML = month;
    RESULT_DAY.innerHTML = days;
    BUTTON.resetButton();
}

(
    function () {
        refreshAll();

        DAY_INPUT.addEventListener("input", () => {
            DAY.checkData();
            DAY.refresh();
            document.addEventListener("keyup", (event) => {
                if (event.key == "Enter") {
                    if (!DAY.stateError) {
                        MONTH.focus();
                    }
                };
            });
        });

        MONTH_INPUT.addEventListener("input", () => {
            MONTH.checkData();
            MONTH.refresh();
            document.addEventListener("keyup", (event) => {
                if (event.key == "Enter") {
                    if (!MONTH.stateError) {
                        YEAR.focus();
                    }
                };
            });
        });

        YEAR_INPUT.addEventListener("input", () => {
            YEAR.checkData();
            YEAR.refresh();
            document.addEventListener("keyup", (event) => {
                if (event.key == "Enter") {
                    if (!YEAR.stateError) {
                        SUBMIT_BUTTON.focus();
                    }
                };
            });
        });

        SUBMIT_BUTTON.addEventListener("click", () => {
            if (BUTTON.default) {
                checkAll();
                refreshAll();
                checkDate();
            } else {
                resetAll();
            }
        });

        document.addEventListener("keyup", (event) => {
            if (event.key == "Enter") {
                checkAll();
                refreshAll();
                checkDate();
            };
        });
    }
)();


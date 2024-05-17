// convert 24 to 12 jam
const convertTime24_12 = (t) => {
  let [h, ...rest] = t.split(":");
  return (
    (h == "12" ? "12" : h % 12) +
    ":" +
    rest.join(":") +
    (h < 12 ? " AM" : " PM")
  );
};

console.log(convertTime24_12("6:5:00")); //"3:03:05 PM"

//--------------------------------------------------------
// convert 24 to 12 jam cara dua
function convertTo12HourFormat(time24) {
  const [hour, minute, second] = time24.split(":").map(Number);
  let period = "AM";
  let hour12 = hour;

  if (hour >= 12) {
    period = "PM";
    if (hour > 12) {
      hour12 = hour - 12;
    }
  }

  if (hour12 === 0) {
    hour12 = 12; // 0 hour in 12-hour format is 12 AM
  }

  return `${hour12.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}:${second.toString().padStart(2, "0")} ${period}`;
}

const time24 = "6:5:00";
const time12 = convertTo12HourFormat(time24);
console.log(time12); // Output: 05:00:00 PM

//-------------------------------------------------
// Format tgl yang bener
const d = new Date("04/25/2018");
// const today = new Date();
const today = d;
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // month is zero-based
let dd = today.getDate();

if (dd < 10) dd = "0" + dd;
if (mm < 10) mm = "0" + mm;

const formatted = dd + "/" + mm + "/" + yyyy;
console.log(formatted); // 24/04/2023

// -------------------------------------------------------
// format jam 24 jam,
var dt = new Date();
var hours = dt.getHours(); // gives the value in 24 hours format //?
var minutes = dt.getMinutes();
var finalTime = hours + ":" + minutes;
finalTime; // final time Time - 22:10
console.log(finalTime); //

const converTime = (time) => {
  let hour = time.split(":")[0];
  let min = time.split(":")[1];
  let part = hour > 12 ? "pm" : "am";

  min = (min + "").length == 1 ? `0${min}` : min;
  hour = hour > 12 ? hour - 12 : hour;
  hour = (hour + "").length == 1 ? `0${hour}` : hour;

  return `${hour}:${min} ${part}`;
};

console.log(converTime("18:00:00"));
console.log(converTime("6:5:00"));

//==========================================
function formatDateIndo(date) {
  const monthIndoList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Ags",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  console.log(date.getMonth());

  const dateIndo = date.getDate();
  const monthIndo = monthIndoList[date.getMonth()];
  const yearIndo = date.getFullYear();

  const result = `${dateIndo} ${monthIndo} ${yearIndo}`;

  return result; // 15 Mei 2024
}

console.log(formatDateIndo(new Date("2023-12-25")));

// =========================================
// 20/05/2024 15:30
function formatTgl(date, time) {
  const dateInputMentah = "Date @ 20/05/2024 15:30";
  const dateInput = "20/05/2024 15:30";
  const tgl = new Date("2023-12-25");
}

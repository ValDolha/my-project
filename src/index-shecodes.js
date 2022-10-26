function formatDate(date) {
  let houres = date.getHours();
  if (houres < 10) {
    houres = `0${houres}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let data = date.getDate();
  let month = date.getMonth();
  let months = [
    "January",
    "Fabruary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let year = date.getFullYear();
  return `${days[day]}  ${houres}:${minutes} </br>${months[month]}  ${data},  ${year}`;
}
let dataElement = document.querySelector("#today");
let currentTime = new Date();
dataElement.innerHTML = formatDate(currentTime);

function fahrenheit(event) {
  event.preventDefault();
  let temperatureNow = document.querySelector("#temperatureCity");
  let temperature = temperatureNow.innerHTML;
  temperature = Number(temperature);
  temperatureNow.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
function celsius(event) {
  event.preventDefault();
  let temperatureNow = document.querySelector("#temperatureCity");
  temperatureNow.innerHTML = 14;
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", fahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", celsius);





function showTemperature(response) {

    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperatureCity").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#cloud").innerHTML = response.data.weather[0].main;

}

function enterCity(event) {
    event.preventDefault(); 
    let city = document.querySelector("#user-city").value;
    searchCity(city);
}

function searchCity(city) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);  
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", enterCity);

searchCity("Kharkiv");

function showPosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-city");
currentButton.addEventListener("click", getCurrentPosition);

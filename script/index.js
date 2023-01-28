function todaysDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let months = [
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
    "December",
  ];
  let month = months[now.getMonth()];

  let date = now.getDate();
  let year = now.getFullYear();
  let printTodaysDate = document.querySelector("#date");
  printTodaysDate.innerHTML = `${day}, ${month} ${date} ${year}`;
}
todaysDate();

function showFahrenheit(event) {
  event.preventDefault();
  let changeTemp = document.querySelector("#showtemp");
  changeTemp.innerHTML = `66°F`;
}

let fahrenheit = document.querySelector("#btnradio2");
fahrenheit.addEventListener("change", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();
  let changeTemp = document.querySelector("#showtemp");
  changeTemp.innerHTML = `19°C`;
}

let celsius = document.querySelector("#btnradio1");
celsius.addEventListener("change", showCelsius);

function showWeather(response) {
  let changeCity = document.querySelector("#city");
  let currentTemperature = document.querySelector("#showtemp");
  let changeHumidity = document.querySelector("#humidity");
  let changeWind = document.querySelector("#wind");

  changeCity.innerHTML = response.data.city;
  let temperature = Math.round(response.data.temperature.current);
  currentTemperature.innerHTML = `${temperature}°C`;
  let humidity = response.data.temperature.humidity;
  changeHumidity.innerHTML = `Humidity: ${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  changeWind.innerHTML = `Wind: ${wind}km/h`;
}
function showPosition(position) {
  let lat = position.coordinates.latitude;
  let lon = position.coordinates.longitude;
  let key = "04bf7320b0acbo6987aef70f64cbdt6d";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${key}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentCity = document.querySelector("#current-button");
currentCity.addEventListener("click", getCurrentLocation);

function searchCity(query) {
  let key = "04bf7320b0acbo6987aef70f64cbdt6d";
  let units = "metric";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${key}&units=${units}`;
  axios.get(`${apiURL}`).then(showWeather);
}
function searchClick(event) {
  event.preventDefault();
  let cityValue = document.querySelector("#city");
  let cityChange = document.querySelector(".form-control");
  cityValue.innerHTML = cityChange.value;
  searchCity(cityChange.value);
}
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchClick);

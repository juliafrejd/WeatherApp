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
  let currentTemperature = document.querySelector("#showtemp");
  let changeToFahrenheit = (celsiusTemperature * 9) / 5 + 32;
  currentTemperature.innerHTML = `${Math.round(changeToFahrenheit)}°F`;
}

let fahrenheit = document.querySelector("#btnradio2");
fahrenheit.addEventListener("change", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();
  let changeTemperature = document.querySelector("#showtemp");
  changeTemperature.innerHTML = `${Math.round(celsiusTemperature)}°C`;
}

let celsius = document.querySelector("#btnradio1");
celsius.addEventListener("change", showCelsius);

function showWeather(response) {
  let changeCity = document.querySelector("#city");
  let currentTemperature = document.querySelector("#showtemp");
  let changeHumidity = document.querySelector("#humidity");
  let changeWind = document.querySelector("#wind");
  let changeDescription = document.querySelector("#description");
  let changeIcon = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;

  changeCity.innerHTML = response.data.city;
  let temperature = Math.round(celsiusTemperature);
  currentTemperature.innerHTML = `${temperature}°C`;
  let humidity = response.data.temperature.humidity;
  changeHumidity.innerHTML = `Humidity: ${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  changeWind.innerHTML = `Wind: ${wind}km/h`;
  let description = response.data.condition.description;
  changeDescription.innerHTML = `${description}`;
  changeIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  changeIcon.setAttribute("alt", response.data.condition.description);
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
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

let celsiusTemperature = null;

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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
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
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Today", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="weather-forecast-day">${formatDay(forecastDay.time)}</div>
  
      <img
        src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          forecastDay.condition.icon
        }.png"
        alt="weather-icon"
        width="36"
      />
      <div class="weather-forecast-temp">
        <span class="weather-forecast-temperature-max">${Math.round(
          forecastDay.temperature.maximum
        )}°</span>
        <span class="weather-forecast-temperature-min">/ ${Math.round(
          forecastDay.temperature.minimum
        )}°</span>
      </div>
    </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let key = "04bf7320b0acbo6987aef70f64cbdt6d";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${key}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function showWeather(response) {
  let changeCity = document.querySelector("#city");
  let changeCountry = document.querySelector("#country");
  let currentTemperature = document.querySelector("#showtemp");
  let changeHumidity = document.querySelector("#humidity");
  let changeWind = document.querySelector("#wind");
  let changeDescription = document.querySelector("#description");
  let changeIcon = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;
  changeCity.innerHTML = `${response.data.city}`;
  changeCountry.innerHTML = response.data.country;
  let temperature = Math.round(celsiusTemperature);
  currentTemperature.innerHTML = `${temperature}°<small>C</small>`;
  let humidity = response.data.temperature.humidity;
  changeHumidity.innerHTML = `Humidity: ${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  changeWind.innerHTML = `Wind: ${wind}km/h`;
  let description = response.data.condition.description;
  changeDescription.innerHTML = `${description}`;

  changeIcon.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  changeIcon.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
  todaysDate();
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

searchCity("Lisbon");
showWeather();

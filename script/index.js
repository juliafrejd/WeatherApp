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
  let printTodaysDate = document.querySelector(".today");
  printTodaysDate.innerHTML = `${day}, ${month} ${date} ${year}`;
}
todaysDate();

function showCityTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector(".city");
  let temp = document.querySelector("#showtemp");
  let name = response.data.name;
  h1.innerHTML = `${name}`;
  temp.innerHTML = `${temperature}°C`;
  let humidity = response.data.main.humidity;
  let changeHumidity = document.querySelector("#humidity");
  changeHumidity.innerHTML = `Humidity: ${humidity} %`;
  let wind = response.data.wind.speed;
  let changeWind = document.querySelector("#wind");
  changeWind.innerHTML = `Wind: ${wind} km/h`;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1266ad07b66517497b1acf79ea5a6a64&units=${units}`;
  axios.get(apiUrl).then(showCityTemperature);
}
navigator.geolocation.getCurrentPosition(showPosition);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentCity = document.querySelector("#current-button");
currentCity.addEventListener("click", getCurrentLocation);

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
  let city = document.querySelector(".city");
  city.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#showtemp");
  currentTemperature.innerHTML = `${temperature}°C`;
  let humidity = response.data.main.humidity;
  let changeHumidity = document.querySelector("#humidity");
  changeHumidity.innerHTML = `Humidity: ${humidity} %`;
  let wind = response.data.wind.speed;
  let changeWind = document.querySelector("#wind");
  changeWind.innerHTML = `Wind: ${wind} km/h`;
}
function searchCity(event) {
  event.preventDefault();
  let apiKey = "1266ad07b66517497b1acf79ea5a6a64";
  let units = "metric";
  let city = document.querySelector(".form-control").value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=${units}`;
  axios.get(`${apiURL}`).then(showWeather);
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchCity);

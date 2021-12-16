function formatDate(date) {
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    let dayIndex = date.getDay();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let day = days[dayIndex];

    return `${day} ${hours}:${minutes}`;
}
function formatDay (timestamp){
    let date = new Date (timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    return days[day];
}

function displayForecast(response) {
let forecast = response.data.daily;
let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class="row">`;
forecast.forEach(function(forecastDay, index) {
    if (index < 6) {

forecastHTML = forecastHTML + 
`
        <div class="col-2">
            <div class="weather-forecast-date"> ${formatDay(forecastDay.dt)}</div>
            <img  src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                alt=""
                width="36"
            />
            <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}°</span>
                <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.min)}°</span>
            </div>
        </div>
    `;
}});
  
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
    console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");

celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);

    getForecast(response.data.coord);
}
function searchCity(city) {
    let apiKey = "75efa665ee3eb621f57f784ff0443f8e";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
}

function searchLocation(position) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}
function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = 19;
}


// Feature #1
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// Feature #2
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Berlin");

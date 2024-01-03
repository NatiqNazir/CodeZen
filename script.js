// Get references to HTML elements using their IDs
const $temp = document.getElementById("temp");
const $city = document.getElementById("city");
const $date = document.getElementById("date");
const $status = document.getElementById("status");
const $cloudy = document.getElementById("cloudy");
const $humidity = document.getElementById("humidity");
const $wind = document.getElementById("wind");
const $rain = document.getElementById("rain");
const $insert = document.getElementById("insert");
const $btn = document.getElementById("btn");
const $icon = document.getElementById("icon");
const $history = document.querySelector("#dropdownmenu");
const $rightCon = document.querySelector(".imges")


// Define an asynchronous function to update weather information
async function weatherUpdate(e) {
  try {
    // Fetch weather data from the WeatherAPI using the provided API key and the specified city (e)
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=eecdbfb215a44b64a10111336232612&q=${e}&days=1&aqi=yes`
    );
    // Parse the response into JSON format
    const weather = await res.json();
    console.log(weather);

    // If an error occurs in the weather API response, throw an error with the error message
    if (weather.error) {
      throw Error(weather.error.message);
    }

    let random = Math.floor(Math.random() *10) 
    console.log(random)
    $rightCon.style.backgroundImage = `url(./images/${random}.jpg)`
    // Call the renderHtml function to update the HTML elements with the retrieved weather data
    renderHtml(weather, e);
  } catch (error) {
    // Display an alert with the error message if an error occurs
    window.alert(error);
    console.log(error);
  }
}


// Initial weather update for the city "Srinagar"
weatherUpdate("Srinagar");

// Function to be called when the user clicks the button to search for weather
function userSearch() {
  // Call the weatherUpdate function with the city value entered by the user
  weatherUpdate($insert.value);
}

// Function to update the HTML elements with weather data
function renderHtml(weather, e) {
  // Update various HTML elements with weather information
  $temp.innerHTML = Math.round(parseInt(weather.current.temp_c)) + `°`;
  $city.innerHTML = weather.location.name;
  $date.innerHTML = new Date(
    weather.current.last_updated_epoch * 1000
  ).toLocaleString();
  $status.innerHTML = weather.current.condition.text;
  $cloudy.innerHTML = weather.current.cloud;
  $humidity.innerHTML = weather.current.humidity;
  $wind.innerHTML = weather.current.wind_mph;
  $rain.innerHTML = weather.current.precip_in;
  $icon.src = "https:" + weather.current.condition.icon;


  
  // Update the search history dropdown with the current city
  $history.innerHTML =
    ` <li class="dropdown-item bg-dark text-light" id="changes" onclick="weatherUpdate('${e}')"
   >${e}</li>` + $history.innerHTML;
}

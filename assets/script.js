// const API_KEY = "a716356f21db4ffb5e92457fbf0c3855";
// const latitude = '37.7749'; // example latitude
// const longitude = '-122.4194'; // example longitude
// const api_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
// var textbox

// fetch(api_url)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     // Use the data retrieved from the API here
//     console.log(data);
//   })
//   .catch(error => {
//     console.error('There was a problem with the fetch request:', error);
//   });


// function saveInput() {
//   // Get the input value
//   var input = document.getElementById("myInput").value;
  
//   // Save the input value to local storage
//   localStorage.setItem("savedInput", input);
  
//   // Display the input value in the output div
//   document.getElementById("output").innerHTML = input;
// }

// function mapforcast1(){
//   map forcast1 
// }

// Get references to the HTML elements
const locationInput = document.getElementById('locationInput');
const saveButton = document.getElementById('saveButton');
const weatherEl = document.getElementById('weather');
const forecastEl = document.getElementById('forecast');

// Load the saved location from local storage
const savedLocation = localStorage.getItem('location');
if (savedLocation) {
  locationInput.value = savedLocation;
  getWeatherData(savedLocation);
}

// Listen for a click on the Save button
saveButton.addEventListener('click', () => {
  const location = locationInput.value.trim();
  if (location) {
    localStorage.setItem('location', location);
    getWeatherData(location);
  }
});

// Function to fetch weather data from the OpenWeatherMap API
function getWeatherData(location) {
  const apiKey = 'a716356f21db4ffb5e92457fbf0c3855';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Display the current weather
      const weatherHTML = `
        <h2>Current Weather for ${data.name}</h2>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
        <p>Temperature: ${kelvinToFahrenheit(data.main.temp)}&#8457;</p>
        <p>Conditions: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
      `;
      weatherEl.innerHTML = weatherHTML;

      // Get the latitude and longitude for the location
      const lat = data.coord.lat;
      const lon = data.coord.lon;

      // Fetch the weather forecast for the next 5 days
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      return fetch(forecastUrl);
    })
    .then(response => response.json())
    .then(data => {
      // Display the weather forecast for the next 5 days
      const forecastHTML = data.list.slice(0, 5).map(item => `
        <div class="day">
          <h3>${formatDate(item.dt)}</h3>
          <img src="https://openweathermap.org/img/w/${item.weather[0].icon}.png" alt="${item.weather[0].description}">
          <p>High: ${kelvinToFahrenheit(item.main.temp_max)}&#8457;</p>
          <p>Low: ${kelvinToFahrenheit(item.main.temp_min)}&#8457;</p>
          <p>Conditions: ${item.weather[0].description}</p>
        </div>
      `).join('');
      forecastEl.innerHTML = forecastHTML;
    })
    .catch(error => console.error(error));
}

// Helper function to convert Kelvin to Fahrenheit
function kelvinToFahrenheit(kelvin) {
  return Math.round((kelvin - 273.15) * 9/5 + 32);
}

// Helper function to format date in MM/DD/YYYY format
function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

const API_KEY = "a716356f21db4ffb5e92457fbf0c3855";
const latitude = '37.7749'; // example latitude
const longitude = '-122.4194'; // example longitude
const api_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

fetch(api_url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Use the data retrieved from the API here
    console.log(data);
  })
  .catch(error => {
    console.error('There was a problem with the fetch request:', error);
  });

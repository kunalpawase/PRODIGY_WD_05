const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById('cityInput').value;
  if (!city) return;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetchWeatherData(url);
}

async function getLocationWeather() {
  navigator.geolocation.getCurrentPosition(async position => {
    const { latitude, longitude } = position.coords;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    fetchWeatherData(url);
  }, error => {
    alert("Location access denied or unavailable.");
  });
}

async function fetchWeatherData(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();

    document.getElementById('cityName').textContent = data.name;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('temperature').textContent = `${data.main.temp} °C`;
    document.getElementById('extraInfo').textContent = `Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} m/s`;

    document.getElementById('weatherCard').classList.remove('hidden');
  } catch (error) {
    alert("Error: " + error.message);
  }
}

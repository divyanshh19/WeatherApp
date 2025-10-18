document.addEventListener('DOMContentLoaded', () => {
    const weatherInfo = document.getElementById('weatherInfo');
    const backBtn = document.getElementById('backBtn');

    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    const data = localStorage.getItem('weatherData');
    const error = localStorage.getItem('weatherError');

    if (error) {
        weatherInfo.innerHTML = `<p><i class="fas fa-exclamation-triangle"></i> Error: ${error}</p>`;
        localStorage.removeItem('weatherError');
    } else if (data) {
        const weatherData = JSON.parse(data);
        displayWeather(weatherData);
        localStorage.removeItem('weatherData');
    } else {
        weatherInfo.innerHTML = `<p>No weather data available. Please go back and search again.</p>`;
    }
});

function displayWeather(data) {
    const { name, main, weather, wind } = data;
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    
    weatherInfo.innerHTML = `
        <h2><i class="fas fa-map-marker-alt"></i> ${name}</h2>
        <div class="weather-main">
            <img src="${iconUrl}" alt="${weather[0].description}">
            <div class="temp">${Math.round(main.temp)}°C</div>
        </div>
        <p><i class="fas fa-thermometer-half"></i> Feels like: ${Math.round(main.feels_like)}°C</p>
        <p><i class="fas fa-tint"></i> Humidity: ${main.humidity}%</p>
        <p><i class="fas fa-cloud"></i> ${weather[0].description}</p>
        <p><i class="fas fa-wind"></i> Wind: ${wind.speed} m/s</p>
    `;
}
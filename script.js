const apiKey = '38abd7d9e10c7598b835eca65235053b'; // Replace with your OpenWeatherMap API key
const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('cityInput');
const loading = document.getElementById('loading');

getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeatherBtn.click();
    }
});

async function fetchWeather(city) {
    loading.style.display = 'block';
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
            } else if (response.status === 404) {
                throw new Error('City not found. Please check the city name.');
            } else {
                throw new Error(`API error: ${response.status} ${response.statusText}`);
            }
        }
        const data = await response.json();
        // Store data in localStorage and navigate to results page
        localStorage.setItem('weatherData', JSON.stringify(data));
        window.location.href = 'results.html';
    } catch (error) {
        // Store error and navigate
        localStorage.setItem('weatherError', error.message);
        window.location.href = 'results.html';
    } finally {
        loading.style.display = 'none';
    }
}
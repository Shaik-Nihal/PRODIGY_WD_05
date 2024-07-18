document.addEventListener('DOMContentLoaded', () => {
    const getWeatherButton = document.getElementById('getWeatherButton');
    const locationInput = document.getElementById('locationInput');
    const weatherInfo = document.getElementById('weatherInfo');

    getWeatherButton.addEventListener('click', () => {
        const location = locationInput.value;
        if (location) {
            getWeatherByLocation(location);
        } else {
            getCurrentLocation();
        }
    });

    function getWeatherByLocation(location) {
        const apiKey = 'deff35af0a09ad10d6c0d8078447b254';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
        fetch(url)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => console.error('Error fetching weather data:', error));
    }

    function getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const apiKey = 'deff35af0a09ad10d6c0d8078447b254';
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
                fetch(url)
                    .then(response => response.json())
                    .then(data => displayWeather(data))
                    .catch(error => console.error('Error fetching weather data:', error));
            });
        } else {
            weatherInfo.textContent = 'Geolocation is not supported by this browser.';
        }
    }

    function displayWeather(data) {
        if (data.cod === 200) {
            weatherInfo.innerHTML = `
                <p><strong>City:</strong> ${data.name}</p>
                <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
                <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            `;
        } else {
            weatherInfo.textContent = 'Location not found. Please try again.';
        }
    }
});
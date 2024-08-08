// script.js
document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "883a9c88b33306939d7a0cabe65c9b22"; // Replace with your OpenWeatherMap API key
    const searchButton = document.getElementById("searchButton");
    const cityInput = document.getElementById("cityInput");
    const cityName = document.getElementById("cityName");
    const temperature = document.getElementById("temperature");
    const description = document.getElementById("description");
    const humidity = document.getElementById("humidity");
    const windSpeed = document.getElementById("windSpeed");
    const weatherDisplay = document.getElementById("weatherDisplay");

    searchButton.addEventListener("click", () => {
        const city = cityInput.value;
        if (city) {
            getWeatherData(city);
        } else {
            alert("Please enter a city name");
        }
    });

    async function getWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        try {
            console.log("Fetching data from URL: ", url);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`City not found: ${city}`);
            }
            const data = await response.json();
            console.log("Received data: ", data);
            displayWeatherData(data);
        } catch (error) {
            console.error("Error fetching data: ", error);
            alert(error.message);
            weatherDisplay.style.display = "none";
        }
    }

    function displayWeatherData(data) {
        cityName.textContent = data.name;
        temperature.textContent = `Temperature: ${data.main.temp}°C`;
        description.textContent = `Weather: ${data.weather[0].description}`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
        weatherDisplay.style.display = "block";
    }
});

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherCard = document.getElementById('weatherCard');
const loader = document.getElementById('loader');
const errorMsg = document.getElementById('errorMsg');

async function fetchWeather(city) {
    if (!city.trim()) return;
    loader.classList.remove('d-none');
    weatherCard.classList.add('d-none');
    errorMsg.classList.add('d-none');

    try {
        // Llamada a nuestro propio servidor Proxy
        const response = await fetch(`/api/weather?city=${city}`);
        if (!response.ok) throw new Error();
        const data = await response.json();
        
        document.getElementById('cityName').textContent = data.name;
        document.getElementById('temp').textContent = `${Math.round(data.main.temp)}°C`;
        document.getElementById('description').textContent = data.weather[0].description;
        document.getElementById('humidity').textContent = `${data.main.humidity}%`;
        document.getElementById('wind').textContent = `${data.wind.speed} km/h`;
        document.getElementById('date').textContent = new Date().toLocaleDateString('es-ES', {weekday: 'long', day: 'numeric', month: 'long'});
        document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        
        weatherCard.classList.remove('d-none');
    } catch (e) {
        errorMsg.classList.remove('d-none');
    } finally {
        loader.classList.add('d-none');
    }
}

searchBtn.addEventListener('click', () => fetchWeather(cityInput.value));
cityInput.addEventListener('keypress', (e) => e.key === 'Enter' && fetchWeather(cityInput.value));
document.getElementById('closeBtn').addEventListener('click', () => { weatherCard.classList.add('d-none'); cityInput.value = ''; });
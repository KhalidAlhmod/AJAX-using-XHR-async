const apiKey = 'dc9c47de96b641668dd170625242410';

document.getElementById('searchButton').addEventListener('click', function () {
    let city = document.getElementById('city').value;
    //if you write true you will solve it by using AsyncAwait and if you write false you will solve it by using XHR
    let useAsyncAwait = true;
    if (useAsyncAwait) {
        fetchWeatherUsingAsyncAwait(city);
    } else {
        fetchWeatherUsingXHR(city);
    }
});


function fetchWeatherUsingXHR(city) {
    if (!city) return;
    let xhr = new XMLHttpRequest();
    let url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            updateWeatherInfo(data);
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}


async function fetchWeatherUsingAsyncAwait(city) {
    if (!city) return;
    let url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
        let response = await fetch(url);
        let data = await response.json();
        updateWeatherInfo(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

function updateWeatherInfo(data) {
    document.getElementById('high').textContent = data.current.temp_c;
    document.getElementById('low').textContent = data.current.temp_c - 5;
    document.getElementById('windSpeed').textContent = data.current.wind_kph + ' km/h';
}
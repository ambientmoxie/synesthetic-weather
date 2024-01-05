import { updateUI } from "./ui";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Api base configuration

export const apiConfig = {
  zip: 75000,
  cd: "FR",
  units: "metric",
  key: import.meta.env.VITE_API_KEY,
};

// Fetching the data

const fetchWeather = async (zip, country, units, apiKey) => {
  const url = `${BASE_URL}?zip=${zip},${country}&units=${units}&appid=${apiKey}`;
  const resp = await fetch(url);
    if (!resp.ok) throw new Error(resp.statusText);
    return await resp.json();
};

// Creating an object from the current fetched data

const transformWeatherData = (resp) => {
  return {
    city: resp.name,
    temperature: Math.floor(resp.main.temp),
    weather: resp.weather[0].description,
    windSpeed: resp.wind.speed,
    humidity: resp.main.humidity,
  };
};

// Get the data and display create gradient after values are ready to be used

export const getDataAndDisplayGradient = () => {
    fetchWeather(apiConfig.zip, apiConfig.cd, apiConfig.units, apiConfig.key)
      .then((data) => {
        let weatherObject = transformWeatherData(data);
        updateUI(weatherObject);
      })
      .catch(console.error);
  };

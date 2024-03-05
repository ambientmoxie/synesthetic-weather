import "../scss/style.scss";
import { animateBackground, setGradientBackground, setUI } from "./ui";

// API URL
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Api base configuration
export const apiConfig = {
  zip: 75000,
  cd: "FR",
  units: "metric",
  key: import.meta.env.VITE_API_KEY,
};

// Fetch the data
const fetchWeather = async (zip, country, units, apiKey) => {
  const url = `${BASE_URL}?zip=${zip},${country}&units=${units}&appid=${apiKey}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(resp.statusText);
  return await resp.json();
};

// Refactor the data in order to create a more usable object
const transformWeatherData = (resp) => {
  return {
    city: resp.name,
    temperature: Math.floor(resp.main.temp),
    weather: resp.weather[0].description,
    windSpeed: resp.wind.speed,
    humidity: resp.main.humidity,
  };
};

// Wait for the data, create the data object and create the scene
const createScene = () => {
  fetchWeather(apiConfig.zip, apiConfig.cd, apiConfig.units, apiConfig.key)
    .then((resp) => {
      let weatherObject = transformWeatherData(resp);
      setGradientBackground(weatherObject);
      animateBackground(weatherObject.windSpeed);
      setUI(weatherObject);
    })
    .catch(console.error);
};

const updateOnClick = (apiConfig) => {
  document.getElementsByTagName("button")[0].addEventListener("click", () => {
    apiConfig.zip = document.getElementById("zip").value;
    createScene();
  });
};

document.addEventListener("DOMContentLoaded", () => {
  createScene();
  updateOnClick(apiConfig);
});

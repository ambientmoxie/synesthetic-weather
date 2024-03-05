import "../scss/style.scss";
import {
  animateBackground,
  setGradientBackground,
  setUI,
  resizeText,
} from "./ui";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const overlay = document.getElementById("overlay-text");
const modal = document.getElementById("modal");
const submitBtn = document.querySelector("#modal__container button");
const closeModal = document.getElementById("close-modal");

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
      resizeText(overlay);
    })
    .catch(console.error);
};

// Update composition
const updateOnClick = (apiConfig) => {
  document
    .querySelector("#modal__container button")
    .addEventListener("click", () => {
      const newZip = document.getElementById("zip").value;
      if (newZip) {
        apiConfig.zip = newZip;
        createScene();
      }
    });
};

// Hide and Display modal
overlay.addEventListener("click", () => {
  modal.style.display = "block";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

submitBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// First set up
createScene();
updateOnClick(apiConfig);

// Update size of the text when window is resized
window.addEventListener("resize", () => {
  resizeText(overlay);
});

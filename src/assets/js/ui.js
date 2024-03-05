import { COLORS, remap } from "./utils";
let currentBackgroundPosition = 0;
let animationFrameId;
import textFit from "textfit";

// Animate background position
export const animateBackground = (windSpeed) => {
  //! TODO: Find a better way to control windspeed value

  let windSpeedRemap = remap(windSpeed, 0, 200, 0, 60);
  if (window.innerWidth < 800) {
    windSpeedRemap /= 2;
  } else if (window.innerWidth > 1440) {
    windSpeedRemap *= 2;
  }

  // Cancel previous animation frame (If any).
  // This is important to prevent multiple animations from running simultaneously and potentially causing performance issues when user enter a new zip-code.

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  const animate = () => {
    currentBackgroundPosition += windSpeedRemap;
    document.body.style.backgroundPosition = `0px ${currentBackgroundPosition}px`;
    animationFrameId = requestAnimationFrame(animate);
  };

  animationFrameId = requestAnimationFrame(animate);
};

// Set the gradient color
export const setGradientBackground = (weatherObject) => {
  // Handle negative temperature
  const temperatureIndex =
    weatherObject.temperature < 0 ? 0 : weatherObject.temperature;

  let colorTemperature = COLORS[Math.round(temperatureIndex)];
  let colorWeather = COLORS[Math.round(weatherObject.weather.length)];
  let colorWind = COLORS[Math.round(weatherObject.windSpeed)];

  document.body.style.backgroundImage = `linear-gradient( to top, ${colorTemperature}, ${colorWeather}, ${colorWind}, ${colorTemperature})`;
};

// Set the text
export const setUI = (weatherObject) => {
  document.querySelector(
    "#top-text"
  ).innerHTML = `<p>${weatherObject.city}</p><p>${weatherObject.temperature}° celcius</p><p>${weatherObject.weather}</p><p>wind ${weatherObject.windSpeed} mph</p><p>humidity ${weatherObject.humidity}%</p>`;
  document.querySelector(
    "#bottom-text"
  ).innerText = `THE COLOR AND THE SPEED OF THE GRADIENT WERE GENERATED USING THE VALUES BELOW`;
};

export const resizeText = (el) => {
  textFit(el, {
    minFontSize: 16,
    maxFontSize: 9999,
    multiLine: true,
  });
};

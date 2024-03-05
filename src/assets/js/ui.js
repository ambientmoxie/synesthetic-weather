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
  document.querySelector("#overlay-text").innerHTML = `
    In ${weatherObject.city} it is ${weatherObject.temperature}° celcius, ${weatherObject.weather}, wind ${weatherObject.windSpeed} mph, humidity ${weatherObject.humidity}%. The color and the speed of the gradient were generated using these
    values. Enter a new location by clicking the text to create a new composition.`;
};

export const resizeText = (el) => {
  textFit(el, {
    minFontSize: 16,
    maxFontSize: 9999,
    multiLine: true,
  });
};

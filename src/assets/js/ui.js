import { COLORS, remap } from "./utils";
let currentBackgroundPosition = 0;
let animationFrameId;

// Animate background position using requestAnimationFrame

const animateBackground = (windSpeed) => {

  //! TODO: Find a better way to control windspeed value

  let windSpeedRemap = remap(windSpeed, 0, 200, 0, 60);
  if (window.innerWidth < 800) {
    windSpeedRemap /= 2;
  } else if(window.innerWidth > 1440){
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

// Set the background values

const setGradientBackground = (weatherObject) => {

  // Handle negative temperature
  const temperatureIndex = weatherObject.temperature < 0 ? 0 : weatherObject.temperature;

  const colorTemperature = COLORS[Math.round(temperatureIndex)];
  const colorWeather     = COLORS[Math.round(weatherObject.weather.length)];
  const colorWind        = COLORS[Math.round(weatherObject.windSpeed)];

  console.log(colorTemperature);

  document.body.style.backgroundImage = `linear-gradient( to top, ${colorTemperature}, ${colorWeather}, ${colorWind}, ${colorTemperature})`;
};

// Create the whole composition

export const updateUI = (weatherObject) => {
  document.querySelector("#top-text").innerHTML =`<p>${weatherObject.city}</p><p>${weatherObject.temperature}° celcius</p><p>${weatherObject.weather}</p><p>wind ${weatherObject.windSpeed} mph</p><p>humidity ${weatherObject.humidity}%</p>`;
  document.querySelector(
    "#bottom-text"
  ).innerText = `the color and the speed of the gradient was generated with these values`;

  animateBackground(weatherObject.windSpeed);
  setGradientBackground(weatherObject);
};

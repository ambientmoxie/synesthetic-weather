import "../scss/style.scss";
import { getDataAndDisplayGradient, apiConfig } from "./weatherApi";

// TODO: refactor code. Compare zip codes.

document.addEventListener("DOMContentLoaded", () => {

  getDataAndDisplayGradient();

  document.getElementsByTagName("button")[0].addEventListener("click", () => {
    apiConfig.zip = document.getElementById("zip").value; // Update zip code
    getDataAndDisplayGradient();
  });
});




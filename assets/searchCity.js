import {displayActualWeatherData, getDailyWeatherData} from "./showWeatherScript.js";
import {showMsgError} from "./showMsgError.js";
const searchCity = document.querySelector(".textCity");
const suggestionsContainer = document.querySelector(".suggestions-container");
const weatherShow = document.querySelector(".weather-info-container");
const errorCont = document.querySelector(".errorContainer");
const apiKey = "ea5682fd306983493571c384f93737ec";

//SEARCH BAR
searchCity.addEventListener("input", ()=>{
  const query = searchCity.value;
  weatherShow.innerHTML = "";
  errorCont.innerHTML = "";
  if (query.length >= 2) {
    getCitySuggestions(query);
  } else {
    suggestionsContainer.innerHTML = '';
  }
})


async function getCitySuggestions(city){
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

  try{
    const response = await fetch(url);
    if(!response.ok){
      throw new Error("No se pudieron obtener las sugerencias");
    }
    const data = await response.json();
    displayCitySuggestions(data);
  } catch(error){
    console.error(error);
  }
}


function displayCitySuggestions(cities){
  suggestionsContainer.innerHTML = "";

  cities.forEach((city)=>{
    const suggestionElem = document.createElement("div");
    suggestionElem.textContent = `${city.name}, ${city.country}`;
    suggestionElem.classList.add('suggestion');
    suggestionElem.addEventListener('click', () => {
      searchCity.value = `${city.name}, ${city.country}`;
      suggestionsContainer.innerHTML = '';
      getActualWeatherInfo();
    });
    suggestionsContainer.appendChild(suggestionElem);
  })
}


//GET ACTUAL WEATHER INFO
async function getActualWeatherInfo(){
  const city = searchCity.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('No se pudo obtener la información del clima actual.');
    }
    const data = await response.json();
    displayActualWeatherData(data);
    getDailyWeatherInfo();
  } catch (error) {
    // console.error(error);
    showMsgError(error);
  }
}


//GET DAILY WEATHER INFO
async function getDailyWeatherInfo(){
  const city = searchCity.value;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=30&appid=${apiKey}&units=metric`;

  try{
    const response = await fetch(url);
    if(!response.ok){
      throw new Error('No se pudo obtener la información del clima de los proximos dias.');
    }
    const data = await response.json();
    getDailyWeatherData(data)
  }catch(error){
    showMsgError(error)
  }
}



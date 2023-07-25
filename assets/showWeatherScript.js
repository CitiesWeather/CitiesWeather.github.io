const weatherShow = document.querySelector(".weather-info-container");

export function displayWeatherData(data){
  const showCard = document.createElement("div");
  showCard.classList.add("showCard");

  const nomCity = document.createElement("h4");
  nomCity.classList.add("nomCity");
  nomCity.innerHTML = `${data.name}, ${data.sys.country}`

  const currentTemp = document.createElement("h2");
  currentTemp.classList.add("currentTemp");
  currentTemp.innerHTML = `${data.main.temp} °C`;

  const iconW = document.createElement("img");
  iconW.classList.add("iconWeather");
  iconW.setAttribute("src", `../img/${(data.weather[0].main)}Icon.png`)

  const weatherDesc = document.createElement("h3");
  weatherDesc.classList.add("descWeather");
  weatherDesc.innerHTML = `${data.weather[0].description}`;


  showCard.appendChild(nomCity);
  showCard.appendChild(iconW);
  showCard.appendChild(currentTemp);
  showCard.appendChild(weatherDesc);
  weatherShow.appendChild(showCard);
  
}

/*INFO A MOSTRAR:
- nombre: data.name
- pais: data.sys.country  /  data.country
- tiempo: data.weather.main
- desc tiempo: data.weather.description
- tempCurrent: data.main.temp
- tempFeels: data.main.feels_like
- tempMax: data.main.temp_max
- tempMin: data.main.temp_min
*/


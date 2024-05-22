const weatherShow = document.querySelector(".weather-info-container");

export function displayActualWeatherData(data){
  const showCard = document.createElement("div");
  showCard.classList.add("showCard");

  const nomCity = document.createElement("h4");
  nomCity.classList.add("nomCity");
  nomCity.innerHTML = `${data.name}, ${data.sys.country}`

  const currentTemp = document.createElement("h2");
  currentTemp.classList.add("currentTemp");
  currentTemp.innerHTML = `${data.main.temp} °C`;

  const feelsLike = document.createElement("h2");
  feelsLike.classList.add("feelslike");
  feelsLike.innerHTML=`Feels: ${data.main.feels_like} °C`;

  const tempActual = document.createElement("div");
  tempActual.classList.add("tempActual");

  const tempMax = document.createElement("h2");
  tempMax.classList.add("tempMax");
  tempMax.innerHTML = `<svg  xmlns="https://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-caret-up"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 14l-6 -6l-6 6h12" /></svg>${data.main.temp_max} °C`;


  const tempMin = document.createElement("h2");
  tempMin.classList.add("tempMin");
  tempMin.innerHTML = `<svg  xmlns="https://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-caret-down"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 10l6 6l6 -6h-12" /></svg>${data.main.temp_min} °C`;

  const tempMaxMin = document.createElement("div");
  tempMaxMin.classList.add("tempMaxMin");


  const temps = document.createElement("div");
  temps.classList.add("temps");


  const iconW = document.createElement("img");
  iconW.classList.add("iconWeather");
  iconW.setAttribute("src", `../img/${(data.weather[0].main)}Icon.png`)

  const weatherDesc = document.createElement("h3");
  weatherDesc.classList.add("descWeather");
  weatherDesc.innerHTML = `${data.weather[0].description}`;


  showCard.appendChild(nomCity);
  showCard.appendChild(iconW);
  tempActual.appendChild(currentTemp);
  tempActual.appendChild(feelsLike);
  temps.appendChild(tempActual);
  tempMaxMin.appendChild(tempMax);
  tempMaxMin.appendChild(tempMin);
  temps.appendChild(tempMaxMin);
  showCard.appendChild(temps);
  showCard.appendChild(weatherDesc);
  weatherShow.appendChild(showCard);
  
}

/*INFO A MOSTRAR EN ActualWeather:
- feels like: data.main.feels_like
- max: data.main.temp_max
- min: data.main.temp_min
*/


export function getDailyWeatherData(data){
  const actualDate = (data.list[0].dt_txt).slice(0,-9)
  let lastDate = 0
  let tempMinDay = 0
  let tempMaxDay = 0
  let dataCitiesMap = new Map();

  data.list.forEach(dataHsDay => {

    if((dataHsDay.dt_txt).slice(0,-9) != actualDate && (dataCitiesMap.size < 3)){

      if((dataHsDay.dt_txt).slice(0,-9) != lastDate){
        lastDate = (dataHsDay.dt_txt).slice(0,-9)
        tempMaxDay = dataHsDay.main.temp_max
        tempMinDay = dataHsDay.main.temp_min
      }

      let nameDay = ((new Date(lastDate)).toString()).slice(0,3)

      if(dataHsDay.main.temp_max >= tempMaxDay){
        tempMaxDay = dataHsDay.main.temp_max
      }

      if(dataHsDay.main.temp_min <= tempMinDay){
        tempMinDay = dataHsDay.main.temp_min
      }
      dataCitiesMap.set((dataHsDay.dt_txt).slice(0,-9), {tempMin: tempMinDay, tempMax: tempMaxDay, nameDay: nameDay, weatherGral: dataHsDay.weather[0].main})
    }
  });

  displayDailyWeatherInfo(dataCitiesMap)
}


const displayDailyWeatherInfo = (dataDaily) =>{
  const containerCardsDaily = document.createElement("div");
  containerCardsDaily.classList.add("containerCardsDaily");

  dataDaily.forEach(day => {
    const cardShowDailyInfo = document.createElement("div");
    cardShowDailyInfo.classList.add("showCardDaily");

    const nameDayDaily = document.createElement("h4");
    nameDayDaily.classList.add("nameDay");
    nameDayDaily.innerHTML = `${day.nameDay}`;


    const iconWDaily = document.createElement("img");
    iconWDaily.classList.add("iconWeatherDaily");
    iconWDaily.setAttribute("src", `../img/${day.weatherGral}Icon.png`);


    const tempMaxDaily = document.createElement("h2");
    tempMaxDaily.classList.add("tempMaxDaily");
    tempMaxDaily.innerHTML = `<svg  xmlns="https://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-caret-up"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 14l-6 -6l-6 6h12" /></svg>${day.tempMax} °C`;


    const tempMinDaily = document.createElement("h2");
    tempMinDaily.classList.add("tempMinDaily");
    tempMinDaily.innerHTML = `<svg  xmlns="https://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-caret-down"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 10l6 6l6 -6h-12" /></svg>${day.tempMin} °C`;


    const weatherDescDaily = document.createElement("h3");
    weatherDescDaily.classList.add("weatherDescDaily");
    weatherDescDaily.innerHTML = `${day.weatherGral}`;


    cardShowDailyInfo.appendChild(nameDayDaily);
    cardShowDailyInfo.appendChild(iconWDaily);
    cardShowDailyInfo.appendChild(tempMaxDaily);
    cardShowDailyInfo.appendChild(tempMinDaily);
    cardShowDailyInfo.appendChild(weatherDescDaily);
    containerCardsDaily.appendChild(cardShowDailyInfo);
    weatherShow.appendChild(containerCardsDaily)
  })


} 



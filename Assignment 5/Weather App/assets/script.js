//link and api-key
const api = {
  key: "55b7097f5cd30c00f739a0e36b41cf38",
  base: "https://api.openweathermap.org/data/2.5/"
}


//search logic
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}



//api calls
function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}




//weather and data change logic
function displayResults (weather) {
  let place = document.querySelector('.location .place');
  place.innerText = `${weather.name}, ${weather.sys.country}`;


  //date () => dateBuilder
  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);


  //temprature 
  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
  
  //weather 
  let weather_eg = document.querySelector('.current .weather');
  weather_eg.innerText = weather.weather[0].main;


  //temperatue high and low 
  let highlow = document.querySelector('.high-low');
  highlow.innerText = `${Math.floor(weather.main.temp_min)}°C / ${Math.ceil(weather.main.temp_max)}°C`;
}




//date logic
function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
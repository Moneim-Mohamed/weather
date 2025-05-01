// * Html Elements
var currentContainer = document.querySelector(".content-container")
var locationInput = document.querySelector("#locationInput")
var contact = document.querySelector("#contact")
var navLinks = document.querySelectorAll(".navbar-nav li a")
// ^ App Variables
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Functions 
async function getCurrentData(name){
  var response = await fetch (`http://api.weatherapi.com/v1/current.json?key=afed901ad4034a80ac2124007253004&q=${name}`);
  var data = await response.json();
  displayCurrentWeather(data)  
}
// **************************
async function getOtherData(name){
  var responseTwo = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=afed901ad4034a80ac2124007253004&q=${name}&days=3`);
  var otherData = await responseTwo.json();
  displayNextTwoDays(otherData) 
}

getCurrentData("liverpool")
getOtherData("liverpool")
// ***************

function displayCurrentWeather(data) {
  var date = new Date(data.location.localtime);
  var dayName = date.toLocaleDateString("en-US", { weekday: "long" });

  currentContainer.innerHTML = `<div class="card col-lg-4 p-0">
    <div class="top d-flex justify-content-between align-items-center w-100" id="today">
      <div class="day">${dayName}</div>
      <div class="date">${data.location.localtime}</div>
    </div>
    <div class="foot">
      <div class="location mb-2">${data.location.name}</div>
      <div class="degree d-lg-flex justify-content-between align-items-center mb-2">
        <div class="num">${data.current.temp_c}<span>°</span>C</div>
        <div class="icon">
          <img src="https:${data.current.condition.icon}" alt="weather-icon" />
        </div>
      </div>
      <div class="custom mb-5">${data.current.condition.text}</div>
      <div class="info mt-4">
        <img src="./Assets/Gallery/icon-umberella.png" alt="umberella.png" />
        <span class="me-5 text-secondary">${data.current.humidity}%</span>
        <img src="./Assets/Gallery/icon-wind.png" alt="wind.png" />
        <span class="text-secondary me-5">${data.current.wind_kph}km/h</span>
        <img src="./Assets/Gallery/icon-compass.png" alt="compass.png" />
        <span class="text-secondary">${data.current.wind_dir}</span>
      </div>
    </div>
  </div>`;
}



function displayNextTwoDays(data) {
  var forecastDays = data.forecast.forecastday;

  for (var i = 1; i <= 2; i++) {
    var day = forecastDays[i];
    var date = new Date(day.date);
    var dayName = date.toLocaleDateString("en-US", { weekday: "long" });

    currentContainer.innerHTML += `
      <div class="card col-lg-4 p-0">
        <div class="top d-flex justify-content-center align-items-center w-100" id="day">
          ${dayName}
        </div>
        <div class="foot d-flex flex-column justify-content-center align-items-center align-middle h-100">
          <div class="icon">
            <img src="https:${day.day.condition.icon}" alt="weather-icon" width="50" />
          </div>
          <div class="degree num2 mt-4">${day.day.maxtemp_c}<sup>°</sup>C</div>
          <small class="small-2 mb-4">${day.day.mintemp_c}<sup>°</sup></small>
          <div class="custom">${day.day.condition.text}</div>
        </div>
      </div>`;
  }
}
// ******************* Events
locationInput.addEventListener("input",async function searchData(){
  var response = await fetch(`http://api.weatherapi.com/v1/search.json?key=afed901ad4034a80ac2124007253004&q=${locationInput.value}`);
  var searchData = await response.json();
  var name = locationInput.value.trim();
  getCurrentData(name);
getOtherData(name);

})
// &&&
for (var i = 1; i < navLinks.length; i++){
  navLinks[i].addEventListener("click",function(e){
    var activeLink = document.querySelector(".navbar-nav li .active")
    activeLink.classList.remove("active")
     e.target.classList.add("active")
  })
}
// &&&&
contact.addEventListener("click", function(){
  document.location.href="./contact.html"
})
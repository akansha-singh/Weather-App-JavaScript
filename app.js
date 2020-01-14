//SELECT ELEMENTS
const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temp-value p");
const decsElement = document.querySelector(".temp-description p");
const locationElement = document.querySelector(".location p");

//APP DATA
const weather = {};
weather.temperature = {
    unit : "celsius"
}
//APP CONSTS AND VARS
const KELVIN = 273;
//API KEY
const key = "8c5be3ba9e1e4c634d31a3a395e195ee";

//CHECK IF BROWSER SUPPORT GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition,showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation.</p>"
}


displayWeather(){
iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`
tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
decsElement.innerHTML = weather.description;
locationElement.innerHTML = `${weather.city},${weather.country}`;
}

function celTofah(temperature){
    return (temperature * 9/5)+32;
}


tempElement.addEventListener("click",function(){
    if(weather.temperature.value === undefined) return;
    if(weather.temperature.unit === "celsius"){
        let fahrenheit = celTofah(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
        weather.temp1erature.unit = "celsius";
    }
});

if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition,showError); /***** */
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation.</p>"
}

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude,longitude);  /***** */
}

function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message}</p>`;
}  


function getWeather(latitude,longitude){
    let api =`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8c5be3ba9e1e4c634d31a3a395e195ee&units=metric`}




.then(function(data){
    weather.temperature.value = data.main.temp;
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
})





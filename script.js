const rain = document.getElementById("rain");
const celsius = document.getElementById("celsius");
const celsiusNow = document.getElementById("celsiusNow");
const maxTemperature = document.getElementById("maxTemperature");
const minTemperature = document.getElementById("minTemperature");
const coldOrHot = document.getElementById("coldOrHot");
const moon = document.getElementById("moon");
const root = document.getElementById("root");
const data = null;
const greating = document.getElementById("greating");
const dateToday = document.getElementById("dateToday");
const timeTodayNow = document.getElementById("timeTodayNow");
const conditionNow = document.getElementById("conditionNow");
const weatherNow = document.getElementById("weatherNow");
const weatherNowTitle = document.getElementById("weatherNowTitle");



const request = new XMLHttpRequest();
request.withCredentials = true;

request.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        console.log(this.responseText);
        const data = JSON.parse(this.responseText);
        console.log(data);

        const forecast = data.forecast.forecastday[0].day;
        const astro = data.forecast.forecastday[0].astro;
        const time = data.location.localtime;
      
        const currentWeather = data.current;    
        
        const temperature = currentWeather.temp_c;  
        greatings(time);
        dayTimeNow(time);
        isHotOrColdToday(currentWeather);
        isthisRainyDay(forecast);
        weatherToday(temperature, forecast);
        moonPhaseToday(astro);
    }
}
);

function greatings(time) {
    let timeNow = time.substr(11, 2);
    if (timeNow.includes(":")) {
        timeNow = time.substr(11, 1);
    }
    if (timeNow >= 18 && timeNow <= 23) {
        root.classList.add("night");
        greating.innerText = "Boa noite!";
    } else if (timeNow >= 0 && timeNow <= 11) {
        root.classList.add("day");
        greating.innerText = "Bom dia!";
    }
    else {
        root.classList.add("afternoon");
        greating.innerText = "Boa tarde!";
    }
}

function dayTimeNow(time) {
    const day = time.substr(8, 2);
    const month = time.substr(5, 2);
    const year = time.substr(0, 4);
    const hour = time.substr(10);
    dateToday.innerText = day + "/" + month + "/" + year;
    timeTodayNow.innerText = hour;
}

function isHotOrColdToday(currentWeather) {
    const temperature = currentWeather.temp_c;  
    celsiusNow.innerText = temperature + "º";
    const currentConditionIcon = currentWeather.condition.icon;
    weatherNow.setAttribute('src', currentConditionIcon);
    weatherNowTitle.innerText = currentWeather.condition.text;


    if (temperature <= 17) {
        coldOrHot.innerText = "Friaca da muléstia"
    }
    else if (temperature <= 22) {
        coldOrHot.innerText = "Tá frio, mas podia ser pior"
    }
    else if (temperature <= 26) {
        coldOrHot.innerText = "Temperatura perfeita"
    }
    else if (temperature <= 31) {
        coldOrHot.innerText = "Tá quente, hein"
    } else {
        coldOrHot.innerText = "Mil grau!"
    }
}

function isthisRainyDay(forecast) {

    const isthisRainyDayIcon = document.querySelector("#conditionNow");
    const rainIcon = forecast.condition.icon;
    isthisRainyDayIcon.setAttribute('src', rainIcon);

    const willItRain = forecast['daily_will_it_rain'];
    if (willItRain == 1) {
        console.log('vaichuve')
        rain.innerText = 'Se prepara que vai chuvê';
    }
    else {
        rain.innerText = 'Relaxa que num vai chovê';
    }
}

function weatherToday(temperature, forecast) {
    const maxTemp = parseInt(forecast["maxtemp_c"]);
    const minTemp = parseInt(forecast["mintemp_c"]);
    celsius.innerText = temperature + "º";
    maxTemperature.innerText = maxTemp + "º";
    minTemperature.innerText = minTemp + "º";
}

function moonPhaseToday(astro) {

    var img = document.querySelector("#image");


    const moonPhase = astro["moon_phase"];
    //console.log(moonPhase);
    if (moonPhase.includes("Waxing")) {
        moon.innerText = "Crescente";
    }
    else if (moonPhase.includes("Waning")) {
        moon.innerText = "Minguante";
    }
    else if (moonPhase.includes("Full")) {
        moon.innerText = "Cheia";
        img.setAttribute('src', './assets/lua_cheia.jpg');
    }
    else {
        moon.innerText = "Nova";
    }
}


request.open("GET", "https://weatherapi-com.p.rapidapi.com/forecast.json?q=S%C3%A3o%20Paulo&days=1");

request.setRequestHeader("X-RapidAPI-Key", "d5d978f70emshd9deb72e549dfe2p150153jsn41e3942684ea");
request.setRequestHeader("X-RapidAPI-Host", "weatherapi-com.p.rapidapi.com");

request.send(data);
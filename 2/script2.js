const app = document.getElementById('root')

const logo = document.createElement('img')
logo.src = 'logo.png'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)

// var request = new XMLHttpRequest()
// request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)
// request.onload = function () {
//   // Begin accessing JSON data here
//   var data = JSON.parse(this.response)
 
//   if (request.status >= 200 && request.status < 400) {
//     data.forEach(movie => {
//       const card = document.createElement('div')
//       card.setAttribute('class', 'card')

//       const h1 = document.createElement('h1')
//       h1.textContent = movie.title

//       const p = document.createElement('p')
//       movie.description = movie.description.substring(0, 300)
//       p.textContent = `${movie.description}...`

//       container.appendChild(card)
//       card.appendChild(h1)
//       card.appendChild(p)
//     })
//   } else {
//     const errorMessage = document.createElement('p')
//     errorMessage.textContent = `Gah, it's not working!`
//     app.appendChild(errorMessage)
//   }
// }

//request.send();
const data = null;

const celsius = document.getElementById("celsiusNow");
const maxTemperature = document.getElementById("maxTemperature");
const minTemperature = document.getElementById("minTemperature");

const request = new XMLHttpRequest();
request.withCredentials = true;

request.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        console.log(this.responseText);
        const data = JSON.parse(this.responseText);

        const forecast = data.forecast.forecastday[0].day;
        const astro = data.forecast.forecastday[0].astro;
        const time = data.location.localtime;
        const temperature = data.current.temp_c;
        let timeNow = time.substr(11, 2);
        if (timeNow.includes(":")) {
            timeNow = time.substr(11, 1);
        }


        // isthisRainyDay(forecast);
        // moonPhaseToday(astro);
        // isHotOrColdToday(temperature);
         weatherToday(temperature, forecast);
        // greetings(timeNow);      
    }
}
);

function weatherToday(temperature, forecast) {
    console.log('in');
    const maxTemp = parseInt(forecast["maxtemp_c"]);
    const minTemp = parseInt(forecast["mintemp_c"]);
    console.log(maxTemp, minTemp);
    celsius.innerText = temperature;
    maxTemperature.innerText = maxTemp;
    minTemperature.innerText = minTemp;
}

request.open("GET", "https://weatherapi-com.p.rapidapi.com/forecast.json?q=S%C3%A3o%20Paulo&days=1");

request.setRequestHeader("X-RapidAPI-Key", "d5d978f70emshd9deb72e549dfe2p150153jsn41e3942684ea");
request.setRequestHeader("X-RapidAPI-Host", "weatherapi-com.p.rapidapi.com");

request.send(data);

const weather = document.querySelector(".js-wheather")
const API_KEY = "ccb147ad73814177c4e328ebb92b7a9c";
const COORDS = "coords";

function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric
    `).then(function(AAAAA){
        return AAAAA.json();
    }).then(function(BBBBBB){
       const temperature = BBBBBB.main.temp;
       const place = BBBBBB.name;
       weather.innerText = `${temperature}C ${place}`

    })
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const location = {
        latitude,longitude
    }
    saveCoords(location);
    getWeather(latitude,longitude);
}
function handleGeoErro(){
    console.log("Can't acsess");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoErro)
}

function loadCoords(){
    const loadCoords = localStorage.getItem(COORDS);
    if(loadCoords === null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
        // getWeather
    }
}


function init (){
    loadCoords();
}
init();
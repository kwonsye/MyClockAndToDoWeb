const weatherStr = document.querySelector(".js-weather");
const city = document.querySelector(".js-city");

const COORDS = "coords";
const API_KEY="e5895a6d0a08ba4c25487b10333419cf";

let weatherChanging = 0;

function getWeather(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)//api 콜을 한다.
    .then(function(response){
        //console.log(response); //response 자체를 출력
        //console.log(response.json());//fetch로 받은 응답을 json으로 바꿔서 출력한다. promise가 출력됨
        return response.json();
    }).then(function(json){ //위에서 받은 json객체를 가지고
        //console.log(json); //response받은 객체가 출력됨
        const temperature = json.main.temp;
        const place = json.name;
        const weather = json.weather[0].main;

        if(weatherChanging == 0){
            weatherStr.innerText = `${temperature}°C`;
            weatherChanging = 1;
        }else if(weatherChanging == 1){
            weatherStr.innerText = `${weather}`;
            weatherChanging = 0;
        }

        city.innerText = ` in ${place}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}
function handleGeoSuccess(position){
    //console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = { //위치정보저장하기 위한 공간
        latitude : latitude,
        longitude : longitude,
    };

    saveCoords(coordsObj);  //localStorage에 저장
    getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log("Cant access geo location");
}

function askForCoords(){ //사용자의 위치정보를 가져온다.
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){ //저장된 위치정보가 없다면
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCoords);   //localStorage에 저장돼있는 위치정보파싱
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}

function init(){
    loadCoords();
    setInterval(loadCoords,2000); //2초에 한번씩 getWeather() call하면서 WeatherStr의 innerText를 바꿔줌
}

init();
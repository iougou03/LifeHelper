const API_KEY = "56a9bdd85107781e5d2465a4ffa96e24";
const COORDS = 'coords';
const weatherBox = document.querySelector(".weatherBox");


function getWeather(lat, lon){
    //JS network!

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){ //서버로부터 데이터가 오기까지 대기
        return response.json();
    }).then(function(json){
        console.log(json)
        const weather = json.weather[0].main;
        const temperature = json.main.temp;
        const imgCode = json.weather[0].icon;
        const imgURL = `http://openweathermap.org/img/wn/${imgCode}@2x.png` //@4x > biggest size
        
        fetch(imgURL).then((response2)=>response2.json).then(function(json2){
            weatherBox.children[0].children[0].src = imgURL; // img
            weatherBox.children[0].children[1].innerText = `${temperature}°C`;
            weatherBox.children[1].children[0].innerText = `${weather}`
        });

    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, //keyname과 변수명이 같을 때
        longitude,
    }
    saveCoords(coordsObj)
    getWeather(latitude,longitude)
}

function handleGeoError(){}

function getLocation(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}

function printWeather(coordsObj) {
    getWeather(coordsObj.latitude, coordsObj.longitude);
}

function loadCoords() {
    let coordsObj = localStorage.getItem(COORDS);
    if(coordsObj===null){
        getLocation();
    } else{
        coordsObj = JSON.parse(coordsObj);
        printWeather(coordsObj);
    }
}

function init(){
    loadCoords();
}

init();

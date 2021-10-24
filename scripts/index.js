"use strict"
const time = document.querySelector('.time');
const dateView = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const body = document.querySelector('body');
const slidePreview=document.querySelector('.slide-prev');
const slideNext=document.querySelector('.slide-next');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatherCity = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

let timeofDay;

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent =currentTime;
    showDate();
    showGreeting();
    setTimeout(showTime, 1000);

    }
showTime();
function showDate(){
    const date = new Date();
    const options = {weekday:'long', month: 'long', day: 'numeric',timeZone: 'UTC'};
    const currentDate = date.toLocaleDateString('en-US', options);
    dateView.textContent=currentDate;
}

function getTimeOfDay(){
    const date = new Date();
    const hours = date.getHours();
    
    if (hours>=6 && hours<=11){
        timeofDay='morning';
    } else 
    if (hours>=12 && hours<=17){
        timeofDay='afternoon';
    } else 
    if (hours>=18 && hours<=23){
        timeofDay='evening';
    } else 
    if (hours>=0 && hours<=5){
        timeofDay='night';
    }
    return timeofDay
    
}
function showGreeting(){
    const timeOfDay=getTimeOfDay()
    const greetingText = `Good ${timeOfDay}`;
    greeting.textContent=greetingText;
    
}
let randomNum
function getRandomNum(){
    randomNum= Math.round(Math.random()*20)
    if(randomNum==0){randomNum=1}
    randomNum=randomNum.toString().padStart(2,0)
    return randomNum    
}
getRandomNum()
function setBg() {     
    getTimeOfDay()    
    const img = new Image();
    const url=`https://raw.githubusercontent.com/Faraon78/stage1-tasks/assets/images/${timeofDay}/${randomNum}.jpg`;
    img.src =url
    img.onload = () => {      
      body.style.backgroundImage="url("+img.src+")"
    }; 
}
setBg();
slideNext.addEventListener('click', getSlideNext)
function getSlideNext() {
    if(randomNum==20){
    randomNum=1
    randomNum=randomNum.toString().padStart(2,0)
    } else if(randomNum>0 && randomNum<9){
        randomNum++
        randomNum=randomNum.toString().padStart(2,0)
    }
     else randomNum++  
    setBg()
}
slidePreview.addEventListener('click', getSlidePrev)
function getSlidePrev(){
    if(randomNum==1){
    randomNum=20
    } else if(randomNum>0 && randomNum<11){
        randomNum--
        randomNum=randomNum.toString().padStart(2,0)
    }
     else randomNum--  
    setBg()
}
function getCity(){
    if(localStorage.getItem('city')) {
        weatherCity.value = localStorage.getItem('city');
    }
    else weatherCity.value='Minsk';
}
getCity()
async function getWeather() {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherCity.value}&lang=en&appid=3d1c161d6245730c86a6e03eec565af3&units=metric`;
    
    try {const res = await fetch(url);
        const data = await res.json();
        console.log(res);
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        let temp=Math.round(data.main.temp)
        temperature.textContent = `${temp}°C`;
        weatherDescription.textContent = data.weather[0].description;
        let windSpeed = Math.round(data.wind.speed).toString();
        console.log(windSpeed);
        wind.textContent = `${windSpeed} м/с`;
        let localHumidity= Math.round(data.main.humidity);
        humidity.textContent = `${localHumidity} %`
    } catch (err) {alert("Enter correct city") }    
    if (weatherCity.value != localStorage.getItem('city')){
        localStorage.setItem('city', weatherCity.value);
    }
  }
  getWeather()  
  weatherCity.addEventListener('change', getWeather)


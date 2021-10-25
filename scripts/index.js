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
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const change_quote=document.querySelector('.change-quote');


let timeofDay;

let lang;
const quotes_en = [
    {
      "text": "I choose a lazy person to do a hard job. Because a lazy person will find an easy way to do it.",
      "author": "Bill Gates"
    },
    {
        "text": "Success is a lousy teacher. It seduces smart people into thinking they can’t lose.",
        "author": "Bill Gates"
    },
    {
        "text": "It’s fine to celebrate success but it is more important to heed the lessons of failure.",
        "author": "Bill Gates"
    },
    {
        "text": "Life is not fair; get used to it.",
        "author": "Bill Gates"
    },
    {
        "text": "Don’t compare yourself with anyone in this world…if you do so, you are insulting yourself.",
        "author": "Bill Gates"
    },
    {
        "text": "Your most unhappy customers are your greatest source of learning.",
        "author": "Bill Gates"
    },
    {
        "text": "If you give people tools, and they use their natural abilities and their curiosity, they will develop things in ways that will surprise you very much beyond what you might have expected.",
        "author": "Bill Gates"
    },
    {
        "text": "Don't let the noise of others' opinions drown out your own inner voice.",
        "author": "Steve Jobs"        
    },
    {
        "text": "If you haven't found it yet, keep looking.",
        "author": "Steve Jobs"        
    },
    {
        "text": "Innovation distinguishes between a leader and a follower.",
        "author": "Steve Jobs"        
    },
    {
        "text": "Your time is limited, so don't waste it living someone else's life.",
        "author": "Steve Jobs"        
    },
    {
        "text": "When something is important enough, you do it even if the odds are not in your favor.",
        "author": "Elon Musk"        
    },
    {
        "text": "Experience is the teacher of fools.",
        "author": "Titus Livius"        
    },
    {
        "text": "Do what you can, with what you have, where you are",
        "author": "T. Rusvelt"        
    },
    {
        "text": "We are what we repeatedly do",
        "author": "Aristotel"        
    },
    {
        "text": "Success is not final, failure is not fatal: it is the courage to continue that counts",
        "author": "W. Churchill"        
    }                               
]
 const quotes_ru = [
    {
      "text": "Пишите код так, как будто сопровождать его будет склонный к насилию психопат, который знает, где вы живете",
      "author": "Стив Макконнелл"
    },
    {
      "text": "Сложность программы растет до тех пор, пока не превысит способности программиста",
      "author": "Артур Блох. Законы Мэрфи"
    },
      {
      "text": "Ходить по воде и разрабатывать программы, следуя ТЗ, очень просто… если они заморожены",
      "author": "И. Берард"
    },
    {
        "text": "Оценивать эффективность процесса программирования количеством написанных строк кода — то же самое, что оценивать процесс создания самолёта по его весу",
        "author": "Билл Гейтс"
    },
    {
        "text": "Наслаждайтесь тем, что вы делаете и вы никогда в своей жизни не будете работать",
        "author": "Билл Гейтс"
    }, 
    {
        "text": "Когда вам в голову пришла хорошая идея, действуйте незамедлительно",
        "author": "Билл Гейтс"
    },  
    {
        "text": "Успех — плохой учитель. Он заставляет умных людей думать, что они не могут проиграть",
        "author": "Билл Гейтс"
    }, 
    {
        "text": "Прежде чем отправляться спасать леса Амазонии от уничтожения жестоким поколением твоих родителей, попробуй хотя бы навести порядок в своей комнате",
        "author": "Билл Гейтс"
    },
    {
        "text": "Не сравнивайте себя ни с кем. Это оскорбительно в первую очередь для вас",
        "author": "Билл Гейтс"
    }, 
    {
        "text": "Работать нужно не 12 часов, а головой!",
        "author": "Стив Джобс"
    },
    {
        "text": "Лучше взять и изобрести завтрашний день, чем переживать о том, что вчерашний был так себе",
        "author": "Стив Джобс"
    },  
    {
        "text": "Главное — задать правильный вопрос. Все дело в вопросах",
        "author": "Илон Маск"
    },
    {
        "text": "Если вы покажете людям правильный путь, то с мотивацией проблем не будет",
        "author": "Илон Маск"
    },
    {
        "text": "Те сумасшедшие, кто считают, что они могут изменить мир, в конце концов его и меняют",
        "author": "Стив Возняк"
    }, 
    {
        "text": "Предпринимателям нужен был не компьютер, им нужно было решение",
        "author": "Стив Возняк"
    }, 
    {
        "text": "Везде, где работают умные люди, двери не заперты",
        "author": "Стив Возняк"
    }

  ]  

const parentLang=document.querySelector('.lang');
const radios = document.querySelectorAll('input[type="radio"]');
parentLang.addEventListener('click', setLang)
getCity()
function setLang() {
	for (let radio of radios) {
		if (radio.checked) {
            lang=radio.value
        }
	}
    showGreeting();
    changeCity()
    getQuotes()
};
setLang();

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
    let greetingText
    if(lang=='ru'&& timeOfDay=='morning'){
        greetingText = 'Доброе утро, '
    } else 
    if (lang=='ru'&& timeOfDay=='afternoon'){
        greetingText = 'Добрый день, '
    } else 
    if (lang=='ru'&& timeOfDay=='evening'){
        greetingText = 'Добрый вечер, '
    } else 
    if (lang=='ru'&& timeOfDay=='night'){
        greetingText = 'Доброй ночи, '
    }
    else  greetingText = `Good ${timeOfDay}, `;
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
weatherCity.addEventListener('change', changeCity);



function getCity(){
    
    if(localStorage.getItem('city')) {
        weatherCity.value= localStorage.getItem('city')
    } else weatherCity.value = 'Minsk'
}


function changeCity(){
    
    if(weatherCity.value=='Minsk'&& lang=='ru') {weatherCity.value='Минск'}
    else if (weatherCity.value=='Минск'&& lang=='en'){weatherCity.value='Minsk'}
    else weatherCity.value
    getWeather()
    setCity()
}
function setCity(){
    
    localStorage.setItem('city', weatherCity.value);
}



async function getWeather() {
        
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherCity.value}&lang=${lang}&appid=3d1c161d6245730c86a6e03eec565af3&units=metric`;
    
    try {const res = await fetch(url);
        const data = await res.json();
        
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        let temp=Math.round(data.main.temp)
        temperature.textContent = `${temp}°C`;
        weatherDescription.textContent = data.weather[0].description;
        let windSpeed = Math.round(data.wind.speed).toString();
        if (lang=="ru"){
        wind.textContent = `${windSpeed} м/с`;
        } else wind.textContent = `${windSpeed} m/s`;
        let localHumidity= Math.round(data.main.humidity);
        humidity.textContent = `${localHumidity} %`
    } catch (err) {alert("Enter correct city") }    
    
  }
  getWeather()  
  
/*        async function getQuotes(lang){
            let quotes;
            if(lang=='ru'){quotes="data/dataRu.json"}
            else{quotes="data/dataEn.json"}
            const res = await fetch(quotes);
            const data = await res.json(); 
            console.log(data[0]);
 }*/

 
    function getQuotes(){
      console.log('запустили getQuotes')
      let arr
      if (lang=="ru"){arr=quotes_ru} else {arr=quotes_en}
      let index = Math.random()*(arr.length-1)
      index=Math.round(index)
      console.log(index)
      quote.textContent=arr[index].text;
      author.textContent=arr[index].author;
    }
    change_quote.addEventListener('click', getQuotes)

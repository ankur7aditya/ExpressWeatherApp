//JavaScript for weather
const city = document.querySelector('.js-city-name');
const submit = document.querySelector('.js-submit');

const day = document.querySelector('.day');
const date = document.querySelector('.date');
const outputCity = document.querySelector('.weather-cityCountry');
const temperature = document.querySelector('.temperature');
const tempAbout = document.querySelector('.temp-about');


function getDayName(dayIndex) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex];
}

let monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

let currentDate = new Date();
let month = currentDate.getMonth();
day.innerHTML = getDayName(currentDate.getDay());
date.innerHTML = currentDate.getDate() + ' ' + monthNames[month];

const getInfo = async function (event) {
    event.preventDefault();
    const cityName = city.value;


    if (cityName === '') {
        outputCity.innerHTML = "Please enter a City Name";
        temperature.innerHTML = ``;
        tempAbout.innerHTML = ``;

    }
    else {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b9b00bb05ad5aa518411ac29b4207dba`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            const arrData = [data];
            const tempCelcius = Math.round(arrData[0].main.temp - 273.15, 4);
            outputCity.innerHTML = `${arrData[0].name} ${arrData[0].sys.country}`;
            temperature.innerHTML = `${tempCelcius} &deg; C`;
            tempAbout.innerHTML = `${arrData[0].weather[0].main}`;

        } catch (error) {
            console.error("Error:", error);
            outputCity.innerHTML = "Please enter a valid City Name";
            temperature.innerHTML = ``;
            tempAbout.innerHTML = ``;
        }
    }
}
submit.addEventListener('click', getInfo);
city.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        getInfo(event);
    }
})
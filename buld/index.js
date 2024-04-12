var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* Global Consts */
const dadJokeContainer = document.getElementById('joke-container');
const nextJokeBtn = document.getElementById('next-joke-btn');
nextJokeBtn.addEventListener('click', () => chooseJoke());
const reportAcudits = [];
const scoreInputs = document.querySelectorAll('input[name="score"]');
/* Main Function */
function main() {
    chooseJoke();
    getIPLocationAPI();
    chooseBackground();
}
/* Get & Print Dad Joke */
function fetchDadJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('https://icanhazdadjoke.com/', {
            headers: {
                Accept: 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }
        const data = yield response.json();
        printJoke(data.joke);
    });
}
function fetchChuckNorrisJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://humor-jokes-and-memes.p.rapidapi.com/jokes/search?exclude-tags=nsfw&min-rating=7&include-tags=chuck_norris&number=1&max-length=200';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '7cfbb54073msh4210abe06eaba88p178b12jsn210a732001d6',
                'X-RapidAPI-Host': 'humor-jokes-and-memes.p.rapidapi.com'
            }
        };
        try {
            const response = yield fetch(url, options);
            const result = yield response.json();
            printJoke(result.jokes[0].joke);
        }
        catch (error) {
            console.error(error);
        }
    });
}
function chooseJoke() {
    const randomNum = Math.ceil(Math.random() * 2);
    if (randomNum === 1) {
        fetchDadJoke();
    }
    else {
        printJoke('Chuck Norris Joke');
        // fetchChuckNorrisJoke();
    }
    chooseBackground();
}
function resetRadioInput() {
    scoreInputs.forEach((radio) => {
        if (radio.checked) {
            radio.checked = false;
        }
    });
}
function printJoke(joke) {
    dadJokeContainer.innerHTML = `"${joke}"`;
    const date = new Date();
    reportAcudits.push({
        joke: joke,
        score: 'pending',
        date: date.toISOString(),
    });
    if (reportAcudits.length > 1) {
        getReports();
    }
}
/* Reports Function */
function getReports() {
    let score = null;
    scoreInputs.forEach((radio) => {
        if (radio.checked) {
            score = parseInt(radio.value);
        }
    });
    reportAcudits[reportAcudits.length - 2].score = score;
    console.log(reportAcudits);
    resetRadioInput();
}
/* IP Location and Weather APIs */
function getIPLocationAPI() {
    const requestOptions = {
        method: 'GET',
    };
    fetch('https://api.geoapify.com/v1/ipinfo?&apiKey=6c5c6384d2614998b48cdf3c76b245a2', requestOptions)
        .then((response) => response.json())
        .then((result) => {
        getWeatherAPI(result.location.latitude, result.location.longitude);
    })
        .catch((error) => console.log('error', error));
}
function getWeatherAPI(latitude, longitude) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://visual-crossing-weather.p.rapidapi.com/forecast?aggregateHours=24&location=${latitude}%2C%20${longitude}&contentType=json&unitGroup=metric&shortColumnNames=true`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '7cfbb54073msh4210abe06eaba88p178b12jsn210a732001d6',
                'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com',
            },
        };
        try {
            const response = yield fetch(url, options);
            const result = yield response.json();
            showWeather(result.locations[`${latitude}, ${longitude}`].currentConditions.temp, result.locations[`${latitude}, ${longitude}`].currentConditions.icon);
        }
        catch (error) {
            console.error(error);
        }
    });
}
function showWeather(temp, conditions) {
    const weatherIcon = document.getElementById('weather-icon');
    const weatherTemp = document.getElementById('weather-temp');
    weatherIcon.src = `/svg/weather-icons/${conditions}.svg`;
    weatherIcon.alt = conditions;
    weatherTemp.innerHTML = `${temp}ºC`;
}
function chooseBackground() {
    const randomNum = Math.ceil(Math.random() * 4);
    const backgroundSVG1 = document.getElementById('main-container');
    backgroundSVG1.style.backgroundImage = `url('/svg/svg-${randomNum}.svg')`;
}
/* Init Functions */
main();
export {};

import { dadJoke } from './interface/types';
import { reports } from './interface/types';

/* Global Consts */
const dadJokeContainer = document.getElementById(
  'joke-container'
) as HTMLDivElement;
const nextJokeBtn = document.getElementById(
  'next-joke-btn'
) as HTMLButtonElement;
nextJokeBtn.addEventListener('click', () => chooseJoke());
const reportAcudits: reports[] = [];
const scoreInputs = document.querySelectorAll<HTMLInputElement>(
  'input[name="score"]'
);

/* Main Function */
function main() {
  chooseJoke();
  getIPLocationAPI();
  chooseBackground();
}

/* Get & Print Dad Joke */
async function fetchDadJoke() {
  const response = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }

  const data: dadJoke = await response.json();

  printJoke(data.joke);
}

async function fetchChuckNorrisJoke() {
  const url = 'https://humor-jokes-and-memes.p.rapidapi.com/jokes/search?exclude-tags=nsfw&min-rating=7&include-tags=chuck_norris&number=1&max-length=200';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'Your-API-Key',
      'X-RapidAPI-Host': 'humor-jokes-and-memes.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    printJoke(result.jokes[0].joke);

  } catch (error) {
    console.error(error);
  }
}

function chooseJoke() {
  const randomNum = Math.ceil(Math.random() * 2);

  if (randomNum === 1) {
    fetchDadJoke();
  } else {
    fetchChuckNorrisJoke();
  }
  chooseBackground();
}

function resetRadioInput() {
  scoreInputs.forEach((radio: HTMLInputElement) => {
    if (radio.checked) {
      radio.checked = false;
    }
  });
}

function printJoke(joke: string): void {
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
function getReports(): void {
  let score: null | number = null;
  scoreInputs.forEach((radio: HTMLInputElement) => {
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

  fetch(
    'https://api.geoapify.com/v1/ipinfo?&apiKey=(Your-API-Key)',
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      getWeatherAPI(result.location.latitude, result.location.longitude);
    })
    .catch((error) => console.log('error', error));
}

async function getWeatherAPI(latitude: number, longitude: number) {
  const url = `https://visual-crossing-weather.p.rapidapi.com/forecast?aggregateHours=24&location=${latitude}%2C%20${longitude}&contentType=json&unitGroup=metric&shortColumnNames=true`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'Your-API-Key',
      'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    showWeather(
      result.locations[`${latitude}, ${longitude}`].currentConditions.temp,
      result.locations[`${latitude}, ${longitude}`].currentConditions.icon
    );
  } catch (error) {
    console.error(error);
  }
}

function showWeather(temp: number, conditions: string) {
  const weatherIcon = document.getElementById(
    'weather-icon'
  ) as HTMLImageElement;
  const weatherTemp = document.getElementById(
    'weather-temp'
  ) as HTMLSpanElement;

  weatherIcon.src = `/svg/weather-icons/${conditions}.svg`;
  weatherIcon.alt = conditions;

  weatherTemp.innerHTML = `${temp}ºC`
}

function chooseBackground() {
  const randomNum = Math.ceil(Math.random() * 4);

  const backgroundSVG1 = document.getElementById('main-container') as HTMLElement;
  backgroundSVG1.style.backgroundImage = `url('/svg/svg-${randomNum}.svg')`;
}

/* Init Functions */

main();
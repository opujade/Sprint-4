import { dadJoke } from './interface/types';
import { reports } from './interface/types';

/* Global Consts */
const dadJokeContainer = document.getElementById(
  'dad-joke-container'
) as HTMLDivElement;
const nextDadJokeBtn = document.getElementById(
  'next-dad-joke-btn'
) as HTMLButtonElement;
nextDadJokeBtn.addEventListener('click', () => main());
const reportAcudits: reports[] = [];
const scoreInputs = document.querySelectorAll<HTMLInputElement>('input[name="score"]');

/* Main Function */
function main() {
  fetchDadJoke();
}

/* Get & Print Dad Joke */
async function fetchDadJoke(): Promise<void> {
  const response = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }

  const data: dadJoke = await response.json();

  printDadJoke(data.joke);
}

function printDadJoke(joke: string): void {
  dadJokeContainer.innerHTML = `"${joke}"`;

  const date = new Date;

  reportAcudits.push({
    joke: joke,
    score: 'pending',
    date: date.toISOString()
  })

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
  })
  reportAcudits[reportAcudits.length - 2].score = score;

  console.log(reportAcudits);
}

/* Init Functions */
fetchDadJoke();
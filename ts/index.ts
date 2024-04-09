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
let reportAcudits: reports;

/* Main Function */
function main() {
  const date = new Date();
  reportAcudits.push({
    joke: fetchDadJoke(),
    score: null,
    date: date.toISOString()
  });

  getReports();
}

/* Get & Print Dad Joke */
async function fetchDadJoke(): Promise<string> {
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
  return data.joke;
}

function printDadJoke(joke: string): void {
  dadJokeContainer.innerHTML = `"${joke}"`;
}

/* Reports Function */
function getReports(): void {
  const checkedRadio = document.querySelector('input[name=score]:checked') as HTMLInputElement;
  const score = parseInt(checkedRadio.value);
  reportAcudits[reportAcudits.length - 1].score = score;
  console.log(reportAcudits);
}

/* Init Functions */
fetchDadJoke();
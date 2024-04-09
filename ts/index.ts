import { dadJoke } from './interface/interface';

const dadJokeContainer = document.getElementById(
  'dad-joke-container'
) as HTMLDivElement;
const nextDadJokeBtn = document.getElementById(
  'next-dad-joke-btn'
) as HTMLButtonElement;
nextDadJokeBtn.addEventListener('click', () => fetchDadJoke());

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
  printDadJoke(data);
}

function printDadJoke(data: dadJoke): void {
  dadJokeContainer.innerHTML = `"${data.joke}"`;
}

fetchDadJoke();

const dadjokeContainer = document.getElementById(
  'dadjoke'
) as HTMLParagraphElement;

function getDadJoke(): void {
  const options: object = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  };

  fetch('https://icanhazdadjoke.com/', options)
    .then((res) => res.json())
    .then((data) => printDadJoke(data));
}

type joke = { id: number; joke: string };

function printDadJoke(data: joke): void {
  dadjokeContainer.innerHTML = data.joke;
}

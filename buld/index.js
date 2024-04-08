"use strict";
const dadjokeContainer = document.getElementById('dadjoke');
function getDadJoke() {
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    };
    fetch('https://icanhazdadjoke.com/', options)
        .then((res) => res.json())
        .then((data) => printDadJoke(data));
}
function printDadJoke(data) {
    dadjokeContainer.innerHTML = data.joke;
}

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
const dadJokeContainer = document.getElementById('dad-joke-container');
const nextDadJokeBtn = document.getElementById('next-dad-joke-btn');
nextDadJokeBtn.addEventListener('click', () => main());
const reportAcudits = [];
const scoreInputs = document.querySelectorAll('input[name="score"]');
/* Main Function */
function main() {
    fetchDadJoke();
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
        printDadJoke(data.joke);
    });
}
function printDadJoke(joke) {
    dadJokeContainer.innerHTML = `"${joke}"`;
    const date = new Date;
    reportAcudits.push({
        joke: joke,
        score: 'pending',
        date: date.toISOString()
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
}
/* Init Functions */
fetchDadJoke();
export {};

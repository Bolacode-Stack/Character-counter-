import { letterCount } from "./counter.js";
import { countChar } from "./counter.js";
import { getCharacters } from "./counter.js";

let logout;
const progressWrapper = document.querySelector(".progress-wrapper");

function alphabetStats(alphabet) {
  let progressBars = document.createElement("div");
  progressBars.className = "progress-bars";

  // (1)
  let div = document.createElement("div");
  let p = document.createElement("p");
  p.textContent = alphabet.toUpperCase();
  p.className = "letter";
  div.appendChild(p);

  // (2)
  let progress = document.createElement("div");
  progress.className = "progress";
  let bar = document.createElement("div");
  bar.className = "bar";
  bar.classList.add("smooth");
  console.log(bar);

  bar.style.width = `${getPercentage(alphabet)}%`;
  console.log(bar.style.width);
  progress.appendChild(bar);

  // (3)
  let unit = letterCount(alphabet);
  let letterStats = document.createElement("div");
  letterStats.className = "letter-stats";
  letterStats.textContent = `${unit}(${getPercentage(alphabet).toFixed(2)}%)`;

  progressBars.appendChild(div);
  progressBars.appendChild(progress);
  progressBars.appendChild(letterStats);
  return progressBars;
}

function getPercentage(alphabet) {
  let amount = countChar();
  let unit = letterCount(alphabet);
  let percentage = (unit / amount) * 100;
  return percentage;
}

class Alphabet {
  constructor() {
    this.letterDensityGraph();
  }

  a(character = "h") {
    let count = countChar();
    let found = getCharacters();
    let aStats = alphabetStats(character, count);

    found.forEach((alphabet) => {
      if (alphabet.indexOf(alphabet) != -1) {
        progressWrapper.appendChild(aStats);
      } 
    });
  }

  letterDensityGraph() {
    this.a();
  }
};

const app = new Alphabet();
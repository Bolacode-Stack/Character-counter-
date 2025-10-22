import { letterCount } from "./counter.js";
import { countChar } from "./counter.js";

let logout;
const progressWrapper = document.querySelector(".progress-wrapper");

function alphabetStats(letter) {
  let progressBars = document.createElement("div");
  progressBars.className = "progress-bars";

  // (1)
  let div = document.createElement("div");
  let p = document.createElement("p");
  p.textContent = letter.toUpperCase();
  p.className = "letter";
  div.appendChild(p);

  // (2)
  let progress = document.createElement("div");
  progress.className = "progress";
  let bar = document.createElement("div");
  bar.className = "bar";
  bar.classList.add("smooth");
  console.log(bar);

  bar.style.width = `${getPercentage()}%`;
  console.log(bar.style.width);
  progress.appendChild(bar);

  // (3)
  let unit = letterCount(letter);
  let letterStats = document.createElement("div");
  letterStats.className = "letter-stats";
  letterStats.textContent = `${unit}(${getPercentage().toFixed(2)}%)`;

  progressBars.appendChild(div);
  progressBars.appendChild(progress);
  progressBars.appendChild(letterStats);
  return progressBars;
}

function getPercentage() {
  let amount = countChar();
  let unit = letterCount("a");
  let percentage = (unit / amount) * 100;
  return percentage;
}

class Alphabet {
  constructor() {
    this.letterDensityGraph();
  }

  a(character = "a") {
    let count = countChar();
    let aStats = alphabetStats(character, count);
    progressWrapper.appendChild(aStats);
  }

  letterDensityGraph() {
    this.a();
  }
}

const app = new Alphabet();

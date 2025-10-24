import { letterCount } from "./counter.js";
import { countChar } from "./counter.js";
import { getCharacters } from "./counter.js";

let logout;
const progressWrapper = document.querySelector(".progress-wrapper");

let graph = [
  { alphabet: "a", count: 0 },
  { alphabet: "b", count: 0 },
  { alphabet: "c", count: 0 },
  { alphabet: "d", count: 0 },
  { alphabet: "e", count: 0 },
  { alphabet: "f", count: 0 },
  { alphabet: "g", count: 0 },
  { alphabet: "h", count: 0 },
  { alphabet: "i", count: 0 },
  { alphabet: "j", count: 0 },
  { alphabet: "k", count: 0 },
  { alphabet: "l", count: 0 },
  { alphabet: "m", count: 0 },
  { alphabet: "n", count: 0 },
  { alphabet: "o", count: 0 },
  { alphabet: "p", count: 0 },
  { alphabet: "q", count: 0 },
  { alphabet: "r", count: 0 },
  { alphabet: "s", count: 0 },
  { alphabet: "t", count: 0 },
  { alphabet: "u", count: 0 },
  { alphabet: "v", count: 0 },
  { alphabet: "w", count: 0 },
  { alphabet: "x", count: 0 },
  { alphabet: "y", count: 0 },
  { alphabet: "z", count: 0 },
];

function alphabetStats(object) {
  let bars = [];

  let filteredGraph = object.filter((character)  => {
    return character.count !== 0;
  });

  filteredGraph.forEach((brace) => {
    let progressBars = document.createElement("div");
    progressBars.className = "progress-bars";

    let div = document.createElement("div");
    let letter = document.createElement("p");
    letter.className = "alphabet";
    letter.innerText = brace.alphabet.toUpperCase();
    // console.log(letter.innerText)
    div.appendChild(letter);

    // (2)
    let progress = document.createElement("div");
    progress.className = "progress";

    let bar = document.createElement("div");
    bar.className = "bar";
    bar.style.width = `${brace.count}%`;
    progress.appendChild(bar);

    // (3)
    let totalCount = object.reduce((combine, { count }) => {
      return combine + count;
    }, 0);

    let percentage = (brace.count / totalCount) * 100;

    let letterStats = document.createElement("div");
    letterStats.className = "letter-stats";
    letterStats.innerText = `${brace.count}(${percentage.toFixed(2)})%`;

    progressBars.appendChild(progress);
    progressBars.appendChild(letterStats);
    progressWrapper.appendChild(progressBars);
  });
}

alphabetStats(letterDensity(graph));

function letterDensity(object) {
  object.forEach((brace) => {
    brace["count"] = letterCount(brace.alphabet);
  });
  return object.sort((a, b) => a.count < b.count);
}

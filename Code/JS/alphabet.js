import { alphabetCounter } from "./counter.js";
import { icon, toggle, wrapper, statsParagraph } from "./counter.js";

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

let logout;
function alphabetStats(object) {
  let bars = [];

  let filteredGraph = object.filter((character) => {
    return character.count !== 0;
  });

  filteredGraph.forEach((brace) => {
    let progressBars = document.createElement("div");
    progressBars.className = "progress-bars";

    let div = document.createElement("div");
    let letter = document.createElement("p");
    letter.className = "alphabet";
    letter.innerText = brace.alphabet.toUpperCase();
    div.appendChild(letter);

    // (2)
    let progress = document.createElement("div");
    progress.className = "progress";

    let bar = document.createElement("div");
    bar.className = "bar";

    setTimeout(() => {
      bar.classList.add("smooth");
      bar.style.width = `${brace.count}%`;
    }, 1500);

    progress.appendChild(bar);

    // (3)
    let totalCount = object.reduce((combine, { count }) => {
      return combine + count;
    }, 0);

    let percentage = (brace.count / totalCount) * 100;

    let letterStats = document.createElement("div");
    letterStats.className = "letter-stats";

    let stats = 0;
    let timerID = setInterval(() => {
      letterStats.innerText = `${stats++}(${percentage.toFixed(2)})`;

      if (stats == brace.count) {
        clearInterval(timerID);
      }
    }, 100);

    progressBars.append(div, progress, letterStats);
    let appended = wrapper.appendChild(progressBars);

    setTimeout(() => {
      if (appended) {
        wrapper.classList.add("height-limit");
        statsParagraph.classList.add("hide");
      } else if (!appended) {
        wrapper.classList.remove("height-limit");
        statsParagraph.classList.remove("hide");
      }
    }, 3000);
  });

  if (wrapper.innerHTML == "") {
    toggle.remove();
  }
}

function letterDensity(object) {
  object.forEach((brace) => {
    brace["count"] = alphabetCounter(brace.alphabet);
  });
  return object.sort((a, b) => a.count < b.count);
}

alphabetStats(letterDensity(graph));

function toggleGraph() {
  if (parseInt(wrapper.style.height) !== wrapper.scrollHeight) {
    wrapper.style.height = wrapper.scrollHeight + "px";
    icon.classList.remove("fa-chevron-down");
    icon.classList.add("fa-chevron-up");
  } else {
    icon.classList.remove("fa-chevron-up");
    icon.classList.add("fa-chevron-down");
    wrapper.style.height = "200px";
    console.log(wrapper.style.height);
  }
}

toggle.addEventListener("click", toggleGraph);

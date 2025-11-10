import Storage from "./storage.js";

let output;
const limitInput = document.querySelector(".limit-count");
const limitReached = document.querySelector(".limit-reached");
const limitCheckbox = document.querySelector(".limit-check");
const spaces = document.querySelector(".spaces");
const sentenceCount = document.querySelector(".sentence-count");
const characterInput = document.querySelector(".character-input");
const readingTime = document.querySelector(".reading-time");
const wrapper = document.querySelector(".progress-wrapper");
const toggle = document.querySelector(".more-less");
const icon = document.querySelector(".fa-solid");
const logo = document.querySelector("#logo");
const theme = document.querySelector(".theme");
let totalCharacters = document.querySelector("#total-characters");
const statsParagraph = document.querySelector(".stats-paragraph");

let boolean = true;
let zero = 0,
  time = 50,
  second = 1000;
let string = ["Analyze your text in real-time"];
let regex = /\w+/g;

theme.addEventListener("click", (event) => {
  body.classList.toggle("light-theme");
  if (body.classList.contains("light-theme")) {
    logo.src = "/Assets/images/logo-light-theme.svg";
    theme.src = "/Assets/images/icon-moon.svg";
  } else {
    logo.src = "/Assets/images/logo-dark-theme.svg";
    theme.src = "/Assets/images/icon-sun.svg";
  }
});

function getCharacters() {
  let contents = [];
  contents.push(characterInput.value);
  return contents;
}

export function alphabetCounter(alphabet) {
  let counted = zero;
  let contents = getCharacters();
  for (let string of contents) {
    for (let i = 0; i < string.length; i++) {
      if (string[i] == alphabet) {
        counted += 1;
      }
    }
  }
  return counted;
}

class CharacterStats {
  constructor() {
    this.loadEventListeners();
    this.render();
  }

  loadEventListeners() {
    characterInput.addEventListener("input", this.totalCharacters.bind(this));
    characterInput.addEventListener("input", this.wordCount.bind(this));
    characterInput.addEventListener("input", this.sentenceCount.bind(this));

    limitCheckbox.addEventListener("change", this.setLimit.bind(this));
  }

  totalCharacters(event) {
    let totalCount = 0;
    let empty = " ",
      typing = true,
      counts = [];
    let input = event.target.value;
    totalCount += input.length;

    totalCharacters.innerText = totalCount;
    console.log("Total Count =", totalCount, this.countSpace());

    localStorage.clear();
    output = Storage.addStatsToStorage(totalCount);
    output = output.concat(totalCount);
    // console.log(output)

    spaces.addEventListener("change", (event) => {
      let isChecked = event.target.checked ? true : false;

      let excludeSpaces = totalCount - this.countSpace();
      if (!isChecked) {
        totalCharacters.innerText = totalCount;
      } else if (isChecked) {
        totalCharacters.innerText = excludeSpaces;
      }
    });

    if (totalCount >= this.setLimit(event)) {
      limitReached.classList.add("show");
      characterInput.classList.add("limit");
      console.log("Limit Reached");
    } else if (totalCount <= this.setLimit()) {
      limitReached.classList.remove("show");
      characterInput.classList.remove("limit");
    }
  }

  setLimit() {
    let limit = parseInt(limitInput.value);
    return limit;
  }

  wordCount(event) {
    let count = 0,
      contents = [],
      wordMatch;

    let input = event.target.value;
    contents.push(input);

    const wordCount = document.querySelector(".word-count");

    contents.forEach((word) => {
      if ((wordMatch = word.match(/\w+/g))) {
        count += wordMatch.length;
        wordCount.innerText = count;
      }
    });
    return (wordCount.innerText = count);
  }

  sentenceCount(event) {
    let value = 0,
      contents = [],
      sentenceMatch;

    let text = event.target.value;
    contents.push(text);

    contents.forEach((sentence) => {
      if ((sentenceMatch = sentence.match(/\.+/g))) {
        value += sentenceMatch.length;
        sentenceCount.innerText = value;
      }
    });
  }

  displayTotalCharacters() {
    let total = Storage.getStatsfromStorage();
    total.forEach((count)  => {
      totalCharacters.innerText = count;
      console.log(count);
    });
  }

  countSpace() {
    let spaces = 0,
      spaceMatch;
    let content = getCharacters();
    content.forEach((space) => {
      if ((spaceMatch = space.match(/\s+/g))) {
        spaces += spaceMatch.length;
      }
    });
    return spaces;
  }

  render()  {
    this.displayTotalCharacters()
  }
}

const stats = new CharacterStats();

let timer,
  countdown = 60;
timer = setInterval(() => {
  // readingTime.innerText = `${countdown--} seconds`;
  if (countdown == zero) {
    readingTime.innerText = "0 seconds";
    // characterInput.value = "";
    clearInterval(timer);
  }
  
}, time);

export { icon, toggle, wrapper, statsParagraph };

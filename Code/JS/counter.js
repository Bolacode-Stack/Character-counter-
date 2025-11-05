let output;
const limitCount = document.querySelector(".limit-count");
const limitReached = document.querySelector(".limit-reached");
const limitCheck = document.querySelector(".limit-check");
const spaces = document.querySelector(".spaces");
const sentenceCount = document.querySelector(".sentence-count");
const characterInput = document.querySelector(".character-input");
let totalCharacters = document.querySelector("#total-characters");
const wordCount = document.querySelector(".word-count");
const readingTime = document.querySelector(".reading-time");
const wrapper = document.querySelector(".progress-wrapper");
const contents = document.querySelector(".contents");
const toggle = document.querySelector(".more-less");
const bar = document.querySelectorAll(".bar");
const icon = document.querySelector(".fa-solid");
const themeSwitcher = document.querySelector(".theme-switcher");
const body = document.querySelector("body");
const logo = document.querySelector("#logo");
const theme = document.querySelector(".theme");
const statsParagraph = document.querySelector(".stats-paragraph");
const checkboxContents = document.querySelectorAll(".checkbox-contents");

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
    this.render()
  }

  totalCharacters(event) { 
    let totalCount = 0;
    let input = event.target.value;
    totalCount += input.length;
    totalCharacters.innerText = totalCount;
    console.log("Total Count =", totalCount, this.countSpace());

    spaces.addEventListener("change", (event) => {
      let isChecked = event.target.checked ? true : false;

      let excludeSpaces = totalCount - this.countSpace();
      if (!isChecked) {
        totalCharacters.innerText = totalCount;
      } else if (isChecked) {
        totalCharacters.innerText = excludeSpaces;
      }
    });

    if (totalCount >= this.setLimit()) {
      console.log("Limit Reached");
      limitReached.classList.add("show");
      characterInput.classList.add("limit");
    } else {
      limitReached.classList.remove("show");
      characterInput.classList.remove("limit");
    }
    this.render();
  }

  wordCount(event) {
    let count = 0,
      contents = [],
      wordMatch,
      space;
    let input = event.target.value;
    console.log(input)
    contents.push(input);

    contents.forEach((word) => {
      if ((wordMatch = word.match(/\w+/g))) {
        count += wordMatch.length;
        wordCount.innerText = count;
      }
    });
    this.render();
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
    this.render();
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

  setLimit() {
    let limit = parseInt(limitCount.value);
    return limit;
  }

  loadEventListeners()  {  
    characterInput.addEventListener("input", this.totalCharacters.bind(this));
    characterInput.addEventListener("input", this.wordCount.bind(this));
    characterInput.addEventListener("input", this.sentenceCount.bind(this));
    limitCheck.addEventListener("change", this.setLimit.bind(this));
  }

  render()  {
    this.totalCharacters();
    this.wordCount();
    this.sentenceCount();
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
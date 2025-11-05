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

limitCheck.addEventListener("change", (event) => {
  let isChecked = event.target.checked ? true : false;
  if (isChecked) {
    let limit = parseInt(limitCount.value);
    console.log(limit);
  }
});

function displayTotalCharacters(event) {
  let totalCount = 0;
  let input = event.target.value;
  totalCharacters.innerText = input.length;
  totalCount += input.length;
}

characterInput.addEventListener("input", displayTotalCharacters);

const displayWordCount = (event)  =>  {
  let count = 0,
    contents = [],
    wordMatch,
    space;
  let input = event.target.value;
  contents.push(input);

  contents.forEach((word) => {
    if ((wordMatch = word.match(/\w+/g))) {
      count += wordMatch.length;
      wordCount.innerText = count;
    } 
    });
}

characterInput.addEventListener("input", displayWordCount);

const displaySentenceCount = (event) => {
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
};

characterInput.addEventListener("input", displaySentenceCount);

function countSpace() {
  let match,
    spaces = 0,
    total = 20;
  let content = getCharacters();
  content.forEach((char) => {
    if ((match = char.match(/\s+/g))) {
      spaces += match.length;
    }
  });

  let characters = total - spaces;
  totalCharacters.innerText = characters;
}

spaces.addEventListener("change", countSpace);

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

window.onload = () => {
  // sentenceCount(".");
};

export { icon, toggle, wrapper, statsParagraph };

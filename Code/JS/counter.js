let output;
const limit = document.querySelector(".limit-count");
const spaces = document.querySelector(".spaces");
const sentence = document.querySelector(".sentence-count");
const setLimit = document.querySelector("#set-limit");
const characterInput = document.querySelector(".character-input");
const totalCharacters = document.querySelector("#total-characters");
const wordCount = document.querySelector(".word-count");
const readingTime = document.querySelector(".reading-time");
const container = document.querySelector(".contents");
const wrapper = document.querySelector(".progress-wrapper");
const toggle = document.querySelector(".more-less");
const icon = document.querySelector(".fa-solid");
const bar = document.querySelectorAll(".bar");
const themeSwitcher = document.querySelector(".theme-switcher");
const body = document.querySelector("body");
const logo = document.querySelector("#logo");
const theme = document.querySelector(".theme");

let boolean = true;
let zero = 0,
  time = 50,
  second = 1000;
let string = ["Analyze your text in real-time"];
let regex = /\w+/g;

setLimit.addEventListener("change", (event) => {
  let totalCharacters = countChar();
  if (parseInt(limit.value) >= totalCharacters) {
    characterInput.classList.add("limit");
  }
});

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

export function getCharacters() {
  let contents = [];
  contents.push(characterInput.value);
  return contents;
}

function countWords() {
  let match,
    count = zero;
  let contents = getCharacters();
  for (let content of contents) {
    if ((match = content.match(/\w+/g))) {
      count += match.length;
      let timerID,
        word = zero;
      timerID = setInterval(() => {
        wordCount.innerText = word += 1;
        if (word == count) {
          clearInterval(timerID);
        }
      }, time);
    }
  }
}

export function countChar(count) {
  let totalCount = zero;
  let contents = getCharacters();
  for (let content of contents) {
    let splitText = content.split("");
    count = splitText.length;
    let timerID;
    timerID = setInterval(() => {
      totalCharacters.innerText = totalCount += 1;
      if (totalCount == splitText.length) {
        clearInterval(timerID);
      } else if (splitText.length == zero) {
        totalCharacters.innerText = "00";
      }
    }, time);
  }
  return count;
}

function sentenceCount(char) {
  let count = 0;
  let fullStop = letterCount(char);
  let timerID = setInterval(() => {
    sentence.innerText = count += 1;
    if (count == fullStop) {
      clearInterval(timerID);

      if (fullStop == null) {
        count = 0;
        sentence.innerText = "00";
      }
    }
  });
  return fullStop;
}

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

export function letterCount(char) {
  let counted = zero;
  let contents = getCharacters();
  for (let string of contents) {
    for (let i = 0; i < string.length; i++) {
      if (string[i] == char) {
        counted += 1;
      }
    }
  }
  return counted;
}

output = letterCount(".");
// console.log(output);

function toggleGraph() {
  if (parseInt(wrapper.style.height) !== wrapper.scrollHeight) {
    wrapper.style.height = wrapper.scrollHeight + "px";
    icon.classList.remove("fa-chevron-down");
    icon.classList.add("fa-chevron-up");
  } else if ((wrapper.style.height = wrapper.scrollHeight)) {
    icon.classList.remove("fa-chevron-up");
    icon.classList.add("fa-chevron-down");
    wrapper.style.height = "200px";
    console.log(wrapper.style.height);
  } else if (wrapper.style.height === "0px") {
    wrapper.style.height = "0px";
    icon.classList.remove("fa-chevron-up");
    icon.classList.add("fa-chevron-down");
    toggle.removeEventListener("click", toggleGraph);
    console.log("No more toggling", wrapper.style.height);
  }
}

toggle.addEventListener("click", toggleGraph);

window.onload = () => {
  countChar();
  countWords();
  // sentenceCount(".");
};

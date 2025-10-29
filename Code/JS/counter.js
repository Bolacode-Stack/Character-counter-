let output;
const limit = document.querySelector(".limit-count");
const limitReached = document.querySelector(".limit-reached");
const spaces = document.querySelector(".spaces");
const sentence = document.querySelector(".sentence-count");
const limitCheckbox = document.querySelector("#limit-checkbox");
const characterInput = document.querySelector(".character-input");
let totalCharacters = document.querySelector("#total-characters");
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

function countSpace() {
  let match,
    spaces = 0;
  let content = getCharacters();
  content.forEach((char) => {
    if ((match = char.match(/\s+/g))) {
      spaces += match.length;
    }
  });
  return spaces;
}

output = countSpace();
console.log(output);

characterInput.addEventListener("input", (event) => { 

  limitCheckbox.addEventListener("change", (event)  =>  {
  console.log(event.target.checked)
})

  let count = 0;
  let characters = event.target.value;
  count = characters.length;
  totalCharacters.innerText = count;

  if (count >= parseInt(limit.value)) {
    characterInput.classList.add("limit");
    limitReached.classList.add("show");
  } else {
    characterInput.classList.remove("limit");
    limitReached.classList.remove("show");
  }
});

function sentenceCount(char) {
  let count = 0;
  let period = alphabetCounter(char);
  let timerID = setInterval(() => {
    sentence.innerText = count += 1;
    if (count == period) {
      clearInterval(timerID);

      if (period == null) {
        count = 0;
        sentence.innerText = "00";
      }
    }
  });
  return period;
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
    toggle.removeEventListener("click", toggleGraph);
  }
}

toggle.addEventListener("click", toggleGraph);

window.onload = () => {
  countWords();
  // sentenceCount(".");
};

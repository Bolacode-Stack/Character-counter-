let output;
const limit = document.querySelector(".limit-count");
const limitReached = document.querySelector(".limit-reached");
const spaces = document.querySelector(".spaces");
const sentence = document.querySelector(".sentence-count");
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

function whatsTheLimit() {
 let checked;
 spaces.addEventListener("click", (event) => {
  checked = event.target.checked;
  console.log(checked);
 });

 const limit = () => {
  console.log(checked, "True");
 };

 return limit;
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

window.onload = () => {
 countWords();
 // sentenceCount(".");
};

export { icon, toggle, wrapper, statsParagraph };

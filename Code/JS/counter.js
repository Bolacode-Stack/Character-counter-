let output;
const limit = document.querySelector(".limit-count");
const spaces = document.querySelector(".spaces");
const sentence = document.querySelector(".sentence-count");
const setLimit = document.querySelector("#set-limit")
const characterInput = document.querySelector(".character-input");
const totalCharacters = document.querySelector("#total-characters");
const wordCount = document.querySelector(".word-count"); 
const readingTime = document.querySelector(".reading-time");
const container = document.querySelector(".contents");
const wrapper = document.querySelector(".progress-wrapper");
const toggle =  document.querySelector(".more-less");
const icon = document.querySelector(".fa-solid")
const bar = document.querySelectorAll(".bar");
const themeSwitcher = document.querySelector(".theme-switcher");
const body = document.querySelector("body");
console.log(body.classList)

let boolean = true;
let zero = 0, time = 50, second = 1000;
let string = ["Analyze your text in real-time"];
let regex = /\w+/g;

setLimit.addEventListener("change", (event)  =>  {
    if (setLimit.checked)   {
        console.log(parseInt(limit.value))
    }
});

themeSwitcher.addEventListener("click", ()  =>  {
    body.classList.toggle("dark-theme")
})

export function getContents()  {
    let contents = [];
    contents.push(characterInput.value);
    return contents;
};

function countWords()  {
    let match, count = zero;
    let contents = getContents();
    for (let content of contents)  {
        if (match = content.match(/\w+/g))  {
            count += match.length;
            let timerID, word = zero
            timerID = setInterval(()  =>  {
                wordCount.innerText =  word += 1;
                if (word == count)  {
                    clearInterval(timerID)
                }
            }, time)
        }
     }
}

function countChar(count)  {
    let totalCount = zero;
    let contents = getContents();
    for (let content of contents)  {
        let splitText = content.split("");
        count = splitText.length;
        let timerID;
        timerID = setInterval(()  =>  {
            totalCharacters.innerText = totalCount += 1;
            if (totalCount == splitText.length)  {
                clearInterval(timerID);
            } else if (splitText.length == zero)  {
                totalCharacters.innerText = "00";
            }
        }, time)
    }
    return count;
}

function sentenceCount()  {
    let match, count = zero;
    let contents = getContents();
    for (let content of contents)  {
        if (match = content.match(/\.+/))  {
            count += match.length;
            console.log(count, match)
            let timerID, word = 1;
            timerID = setInterval(()  =>  {
                sentence.innerText =  word += 1;
                if (word == count)  {
                    clearInterval(timerID)
                }
            }, time)
        }
     }
};

let timer, countdown = 60;
timer = setInterval(()  =>  {
    // readingTime.innerText = `${countdown--} seconds`;
    if (countdown == zero)   {
        readingTime.innerText = "0 seconds"
        // characterInput.value = "";
        clearInterval(timer);
    }
}, time);  

export function letterCount(char)  {
    let counted = zero;
    let contents = getContents();
    for (let string of contents)  {
        for (let i = 0; i < string.length; i++)  {
            if (string[i] == char.toLowerCase())  {
                    counted += 1;
                }
            }
        }
    return counted;
}  

output = letterCount("r");
// console.log(output);

// Toggle letter density graph
toggle.addEventListener("click", ()  =>  {
        if (parseInt(wrapper.style.height) != wrapper.scrollHeight) {
            wrapper.style.height = wrapper.scrollHeight + "px";
            icon.classList.remove("fa-chevron-down")
            icon.classList.add("fa-chevron-up");
            console.log(wrapper.style.height);
        } else {
            icon.classList.remove("fa-chevron-up");
            icon.classList.add("fa-chevron-down");
            wrapper.style.height = "200px";
        }
});

window.onload = ()  =>  {
        countWords();
        countChar();
        // sentenceCount();
    };
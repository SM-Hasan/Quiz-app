// import { questions } from "./question";

let questions = [{
        numb: 1,
        question: 'What does HTML Stand For ?',
        answer: 'Hyper Text Markup Language',
        options: [
            'Hyper Text Preprocessor',
            'Hyper Text Markup Language',
            'Hyper Text Multiple Language',
            'Hyper Tool Multi Language'
        ]
    },
    {
        numb: 2,
        question: 'What does CSS Stand For ?',
        answer: 'Cascading Style Sheet',
        options: [
            'Common Style Sheet',
            'Colorful Style Sheet',
            'Computer Style Sheet',
            'Cascading Style Sheet'
        ]
    },
    {
        numb: 3,
        question: 'What does PHP Stand For ?',
        answer: 'Hypertext Preprocessor',
        options: [
            'Hypertext Preprocessor',
            'Hypertext Programming',
            'Hypertext Preprogramming',
            'HomeText Preprocessor'
        ]
    },
    {
        numb: 4,
        question: 'What does SQL Stand For ?',
        answer: 'Structured Query Language',
        options: [
            'Stylish Question  Language',
            'Stylesheet Query Language',
            'Statement Query Language',
            'Structured Query Language'
        ]
    },
    {
        numb: 5,
        question: 'What does XML Stand For ?',
        answer: 'eXtensible Markup Language',
        options: [
            'eXtensible Markup  Language',
            'eXtensible Multiple Language',
            'eXtra Multi-Program Language',
            'eXamine Multiple Language'
        ]
    }
];
const startQuiz = document.getElementById('startQuiz');
const rulesBox = document.getElementById('rulesBox');

const exitQuiz = document.getElementById('exitQuiz');
const continueBtn = document.getElementById('continue');
const questionArea = document.getElementById('questionArea');

const nextBtn = document.getElementById('nextBtn');
const questionNumber = document.getElementById('questionNumber');
const optionList = document.getElementById('optionList');
const totalQuestion = document.getElementById('totalQuestion');
const option = document.getElementsByClassName('option');
const seconds = document.getElementById('seconds');
const timeLine = document.getElementById('timeLine');

const resultBox = document.querySelector('.resultBox');
const restartBtn = document.querySelector('.restart1');
const quitBtn = document.querySelector('.quit');
const scoreText = document.querySelector('.scoreText');

let questionCount = 0;
let counter;
let timeCount = 15;

let counterLine;
let widthValue = 0;

let score = 0;

let ticIcon = `<div class="tic icon"><i class="fas fa-check-circle"></i></div>`;
let crossIcon = `<div class="cross icon"><i class="fas fa-times-circle"></div>`




startQuiz.addEventListener('click', function() {
    rulesBox.classList.add('activeInfo');
});

exitQuiz.addEventListener('click', function() {
    rulesBox.classList.remove('activeInfo');
});

continueBtn.addEventListener('click', function() {
    rulesBox.classList.remove('activeInfo');
    questionArea.classList.add('activeQuiz');
    startTimer(timeCount)
    showQuestion(0);
    startTimerLine(widthValue);
});

quitBtn.addEventListener('click', function() {
    window.location.reload();
});
restartBtn.addEventListener('click', function() {
    showQuestion(0);
    clearInterval(counter);
    startTimer(timeCount);

    clearInterval(counterLine);
    startTimerLine(widthValue);
    // nextBtn.style.display = 'none';
    questionArea.classList.add('activeQuiz');
    resultBox.classList.remove('activeResult');

});


nextBtn.addEventListener('click', function() {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestion(questionCount);
        clearInterval(counter);
        startTimer(timeCount);

        clearInterval(counterLine);
        startTimerLine(widthValue);
        nextBtn.style.display = 'none';
    } else {
        console.log('You Have Completed Your Task');
        showResult();
    }

});

function showQuestion(index) {
    let ques_tag = `<h1>${questions[index].numb}.${questions[index].question}</h1>`;
    questionNumber.innerHTML = ques_tag;

    let option_tag = `<div class="option">${questions[index].options[0]}</div><div class="option">${questions[index].options[1]}</div><div class="option">${questions[index].options[2]}</div><div class="option">${questions[index].options[3]}</div>`
    optionList.innerHTML = option_tag;

    let total_tag = `<p>${questions[index].numb} of 5 Question</p>`;
    totalQuestion.innerHTML = total_tag;

    for (let i = 0; i < option.length; i++) {
        option[i].addEventListener('click', function() {
            clearInterval(counter);
            clearInterval(counterLine);
            nextBtn.style.display = 'block';
            let user_answer = this.innerText;
            let correctAns = questions[questionCount].answer
            if (user_answer === correctAns) {
                score += 1
                option[i].classList.add('correct');
                option[i].insertAdjacentHTML('beforeend', ticIcon);
            } else {
                option[i].classList.add('incorrect');
                option[i].insertAdjacentHTML('beforeend', crossIcon)

                for (let i = 0; i < optionList.children.length; i++) {
                    if (optionList.children[i].textContent === correctAns) {
                        optionList.children[i].setAttribute('class', 'option correct');
                        optionList.children[i].insertAdjacentHTML('beforeend', ticIcon)
                    }
                }
            }
            for (let i = 0; i < optionList.children.length; i++) {
                optionList.children[i].classList.add('disable')
            }
        });

    }

}

function showResult() {
    rulesBox.classList.remove('activeInfo');
    questionArea.classList.remove('activeQuiz');
    resultBox.classList.add('activeResult');

    if (score > 1 && score <= 3) {
        let scr1 = `<p>Carry On You Got <span>${score}</span> out of<span>${questions.length}</span></p>`;
        scoreText.innerHTML = scr1
    } else if (score > 3) {
        let scr2 = `<p>Congratulation ! You are Winner <span>${score}</span> out of<span>${questions.length}</span></p>`;
        scoreText.innerHTML = scr2
    } else {
        let scr3 = `<p>Sorry! Please Try Again <span>${score}</span> out of<span>${questions.length}</span></p>`;
        scoreText.innerHTML = scr3
    }


}


function startTimer(time) {
    counter = setInterval(() => {
        seconds.textContent = time;
        time--;
        if (time < 9) {
            let addZero = seconds.textContent;
            seconds.textContent = `0${addZero}`
        }
        if (time < 0) {
            clearInterval(counter);
            seconds.textContent = '00'
        }
    }, 1000)
}

function startTimerLine(time) {

    counterLine = setInterval(() => {
        time += 1;
        timeLine.style.width = `${time}px`;
        if (time > 319) {
            clearInterval(counterLine)
        }
    }, 50);
}
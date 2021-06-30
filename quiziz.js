let question = document.querySelector('#ques');
let choices = Array.from(document.querySelectorAll('.choice-content'));
console.log(choices);
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];
let progressdisp = document.querySelector('#progress');
let scoredisp = document.querySelector('#score');
let progressbarfull = document.querySelector('#progressbarfull');
let loader=document.querySelector('#loader');
let game=document.querySelector('#game');


fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const formattedQuestion = {
                question: loadedQuestion.question,
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice;
            });

            return formattedQuestion;
        });
        
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    game.classList.remove('hidden');
        loader.classList.add('hidden');
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page

        return window.location.assign('end.html');
    }
    questionCounter++;

    progressdisp.innerText = 'Question' + ' ' + questionCounter + '/5';
    progressbarfull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        if (selectedAnswer == currentQuestion.answer) {
            score += 10;
            scoredisp.innerText = score;
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});



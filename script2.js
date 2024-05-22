const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
console.log("hello");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question:'Who is the prime minister of India?',
        choice1: 'Narendra Modi',
        choice2: 'Rahul Gandhi',
        choice3: 'Amit Shah',
        choice4: 'Manmohan Singh',
        answer: 1,
    },
    {
        question: 'What species are you?',
        choice1: 'Bird',
        choice2: 'Human',
        choice3: 'Dog',
        choice4: 'Paracetamol',
        answer: 2,
    },
    {
        question: 'Which HTML tag is used to define an inline style?',
        choice1: '<script>',
        choice2: '<css>',
        choice3: '<style>',
        choice4: '<span>',
        answer: 3,
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choice1: 'text-color',
        choice2: 'font-color',
        choice3: 'text-style',
        choice4: 'color',
        answer: 4,
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choice1: '// Comment',
        choice2: '<-- Comment -->',
        choice3: '/* Comment */',
        choice4: '<! Comment>',
        answer: 2,
    }
];
console.log(questions);
const maximum = questions.length;
console.log(maximum);
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = questions;
    getNewQuestion();
};
console.log(availableQuestions);
getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= maximum) {
        localStorage.setItem('mostRecentScore', score*10);
        return window.location.assign('index3.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${maximum}`;
    progressBarFull.style.width = `${(questionCounter / maximum) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore();
        }

        selectedChoice.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = () => {
    score= score + 1;

    scoreText.innerText = score*10;
};

startGame();

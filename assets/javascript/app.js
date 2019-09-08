// This array is collection of question objects,each object has question answer and correct answer
var qstnsArray = [{ q: "what is your name?", a: ["Swathi", "Anurag", "Uma", "Priya"], ca: "Swathi" },
{ q: "Q2", a: ["1", "2", "3", "4"], ca: "2" },
{ q: "Q3", a: ["1", "2", "3", "4"], ca: "3" },
{ q: "Q4", a: ["1", "2", "3", "4"], ca: "4" }
];

// Global variables
var timer = 5;
var question = $("#question");
var randomQstn = '';
var correct = 0;
var incorrect = 0;
var notAnswered = 0;
var askedQuestions = [];
var intervalId;

window.onload=function(){
    $(".questionWrapper").addClass("hide");
    $(".answerWrapper").addClass("hide");
};

//  This function is called when a Start button is clicked
// Functionality : It displays the question to the user
$("#start").click(function () {
    displayQstn();
    $("#start").attr("class", "hide");
});

// This function is called when any of the answer option is clicked
// Functionality: It displays if the user has answered correctly or not
$(".ans").click(function () {
    if ($(this).text() === randomQstn.ca) {
        revealAnswer("You won", '');
        correct++;
    }
    else {
        revealAnswer("You are wrong", randomQstn.ca);
        incorrect++;
    }
    resetTimer();
    setTimeout(checkIfGameOver, 2000);

});

//This function is called whenever an option from the answers list is selected
// Functionality: This reveals the user if the user has selected a correct option or not
function revealAnswer(status, answer) {
    $("#status").text(status);
    $(".answerWrapper").removeClass("hide");
    if (answer !== '') {
        $("#answer").text("The correct answer was:" + answer);
        // $("#answer").removeClass("hide");
    }
    else {
        $("#answer").addClass("hide");;
    }
    $(".questionWrapper").addClass("hide");
    // $("#imageDiv").removeClass("hide");
}

//This function is called when a user clicks on start button
// Functionality: It displays the questions to the user
function displayQstn() {

    $(".questionWrapper").removeClass("hide");
    randomQstn = generateRandom();
    // $("#status").addClass("hide");
    // $("#imageDiv").addClass("hide");
    // $("#answer").addClass("hide");
     $(".answerWrapper").addClass("hide");
    if (!askedQuestions.includes(randomQstn.q)) {
        intervalId = setInterval(decrement, 1000);
        askedQuestions.push(randomQstn.q);
        question.text(randomQstn.q);
        for (var i = 0; i < randomQstn.a.length; i++) {
            $("#answer" + (i + 1)).text(randomQstn.a[i]);
        }
    }
    else {
        displayQstn();
    }

};

//This function is called to select a random question from an array
function generateRandom() {
    var random = qstnsArray[Math.floor(Math.random() * qstnsArray.length)];
    return random;

}

// This function is used to decrease the timer
function decrement() {
    timer--;
    $("#timeRemaining").text(timer);
    if (timer === 0) {
        revealAnswer("Not answered", randomQstn.ca);
        notAnswered++;
        resetTimer();
        setTimeout(checkIfGameOver, 2000);
    }
}

// This function is used to reset the timer after each question
function resetTimer() {
    timer = 5;
    // $(".timer").addClass("Hide");
    // $("#timeRemaining").text('');
    clearInterval(intervalId);
}

// This function is used to check if the questions are completed
function checkIfGameOver() {
    if (qstnsArray.length === askedQuestions.length) {
        // $("#status").text("Game Over");
        // $("#imageDiv").addClass("hide");
        // $("#answer").addClass("hide");
        $(".answerWrapper").addClass("hide");
    }
    else {
        displayQstn();
    }
}
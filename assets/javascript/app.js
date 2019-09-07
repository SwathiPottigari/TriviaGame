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

//  This function is called when a Start button is clicked
$("#start").click(function () {
    displayQstn();
    $("#start").attr("class", "Hide");
});

// if(timer===0){

// };

// This function is called when any of the answer option is clicked
$(".ans").click(function () {
    if ($(this).text() === randomQstn.ca) {
        revealAnswer("You won");
        correct++;
    }
    else {
        revealAnswer("You are wrong");
        incorrect++;
    }
    resetTimer();
   checkIfGameOver();

});

// This function is called whenever an option from the answers list is selected
function revealAnswer(status) {
    question.text(status);
    $(".ans").addClass("Hide");
    $("#imageDiv").removeClass("Hide");
}

// This function is called when a user clicks on start button
function displayQstn() {

    randomQstn = generateRandom();
    $("#status").addClass("Hide");
    $("#imageDiv").addClass("Hide");


    if (!askedQuestions.includes(randomQstn.q)) {
        intervalId = setInterval(decrement, 1000);
        $(".ans").removeClass("Hide");
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

// This function is called to select a random question from an array
function generateRandom() {
    var random = qstnsArray[Math.floor(Math.random() * qstnsArray.length)];
    return random;

}

function decrement() {
    timer--;
    $("#timeRemaining").text(timer);
    if (timer === 0) {
        revealAnswer("Not answered");
        notAnswered++;
        resetTimer();
        checkIfGameOver();
    }
}

function resetTimer() {
    timer = 5;
    $("#timeRemaining").text('');
    clearInterval(intervalId);
}

function checkIfGameOver(){
    if (qstnsArray.length === askedQuestions.length) {
        question.text("Game Over");
        $("#imageDiv").addClass("Hide");
    }
    else {
        displayQstn();
       
    }
}
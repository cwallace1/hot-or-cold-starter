//set the variables that are accessed throughout
//and need a global scope
var goal,
    lastGuess,
    difference,
    changeDiff,
    color = "",
    guess = "",
    n = 0,
    flag = true,
    won = false,
    firstCheck = true;

//starts the deal when doc is ready
$(document).ready(function(){
    timeToGuess();
    focal();

 //leaving these as they were
/*--- Display information modal box ---*/
    $(".what").click(function(){
        $(".overlay").fadeIn(1000);
    });

    /*--- Hide information modal box ---*/
    $("a.close").click(function(){
        $(".overlay").fadeOut(1000);
    });

//this is for the new game button
    $(".new").click(function(){
        resetAll();
        timeToGuess();
    });

//these are the two methods for inputting a guess
    $("#guessButton").click(guessIt);
    $(document).keypress(keyedYa(e));
});


//this is the function that creates a new goal
//on page load/new game press
function timeToGuess() {
    if (!flag){
        return;
    }
    else {
        goal = undefined;
        flag = false;
        goalNumba();
    }
}

//this is the block that runs when a user enters a guess
function guessIt() {
    var guessCheck;
    guess = parseInt($("#userGuess").val());
    guessCheck = $.isNumeric(guess);
    changeDiff = Math.abs(goal-guess);
//this set checks if the guess is the first of the game
    if (firstCheck === true){
        lastGuess = guess;
        difference = Math.abs(goal-guess);
        if (!guessCheck) {
            suddenly("Do it again!");
            focal();
        }
        else if (guess > 100) {
            suddenly("Try to keep it under 100.");
            focal();
        }
        else if (guess === goal) {
            suddenly("You did it! Are you cheating?");
            color = "winner";
            won = true;
            increment();
        }
        else if (10> difference) {
            suddenly("Very hot!!!");
            color = "hot";
            firstStack();
        }
        else if (10< difference && 20>difference) {
            suddenly("Warm!");
            color = "warm";
            firstStack();
        }
        else if (20< difference && 50>difference) {
            suddenly("Cold.");
            color = "cold";
            firstStack();
        }
        else if (50< difference) {
            suddenly("Probably couldn't be farther.");
            color = "arctic";
            firstStack();
        }
    }
//if it isnt the first game, the alerts react appropriately
    else if (!firstCheck && !won) {
        if (!guessCheck) {
            suddenly("Do it again!");
            focal();
        }
        else if (guess > 100) {
            suddenly("Try to keep it under 100.");
            focal();
        }
        else if (guess === goal){
            suddenly("You got it!");
            color = "winner";
            won = true;
            difference = changeDiff;
            increment();
        }
        else if (changeDiff===difference && guess !== lastGuess){
            suddenly("You've shot the gap!");
            color = "static";
            otherStack();
        }
        else if (changeDiff===difference){
            suddenly("You didn't change your guess!");
            color = "same";
            otherStack();
        }
        else if (changeDiff<difference && changeDiff<5){
            suddenly("Whoa! Super hot!");
            color = "hot";
            otherStack();
        }
        else if (changeDiff>difference && changeDiff>25){
            suddenly("Brrr.... arctic...");
            color = "arctic";
            otherStack();
        }
        else if (changeDiff<difference){
            suddenly("Warmer!");
            color = "warm";
            otherStack();
        }
        else if (changeDiff>difference){
            suddenly("Colder!");
            color = "cold";
            otherStack();
        }
    }
}

//checks for enter keypress and runs the guess checker
function keyedYa(e){
    if (e.which == 13) {
        $.unbind("keypress");
        guessIt();
    }
}

//creates the random number
function goalNumba() {
    goal = Math.floor((Math.random() * 100)+1);
}

//clears the previous guess and focuses on input field
function focal() {
    $("#userGuess").val("");
    $("#userGuess").focus();
}

//increments the counter and adds the guess to the
//unordered list object in the dom
function increment() {
    n+=1;
    $("#count").text(n);
    $("#guessList").append("<li class=\"added "+color+"\">"+guess+"</li>");
}

//stack of commands for the first guess block
function firstStack() {
    focal();
    increment();
    firstCheck = false;
}

//stack of commands for the other guessing block
function otherStack() {
    difference = changeDiff;
    focal();
    increment();
    lastGuess = guess;
}

//the users notification
function suddenly(stuff) {
    $("#stuffHere").text(stuff);
}

//the "clear all" for the new game button
function resetAll() {
    flag = true;
    firstCheck = true;
    focal();
    n=0;
    changeDiff = undefined;
    lastGuess = undefined;
    guess = "";
    color = "";
    $("#count").text(n);
    $(".added").remove();
}
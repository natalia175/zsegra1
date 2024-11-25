$(document).ready(function () {
    const colors =["green", "red", "yellow", "blue"];
    let gameSequence = [];
    let userSequence = [];
    let level = 0;
    let started = false; 
});

function startGame() {
    level = 0;
    gameSequence = [];
    userSequence = [];
    started = true;
    
}
function nextSequence() {
    userSequence = []; 
    let level= 0;
    headerElement.textContent = `Poziom: ${gameLevel}`;
    $(`#${randomColor}`).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}
function playSound(color) {
    const audio = new Audio(`../dzwiek/${color}.mp3`);
    $(audio).on("error", function () {
        console.error(`Nie znaleziono pliku dzwiekowego: ${color}.mp3`);
    });
    audio.play();
    animatePress();
    $(`#${color}`).addClass("pressed");
    setTimeout(() => {
        $(`#${color}`).removeClass("pressed");
    }, 100);
}
$(".zse-kwadrat").click(function () {
    if (!started) return;
    const userChosenColor = $(this).attr("id");
    userSequence.push(userChosenColor);
    playSound(userChosenColor);
    animatePress();
    checkAnswer(userSequence.length - 1);
});
function checkAnswer(currentLevel) {
    if (userSequence[currentLevel] === gameSequence[currentLevel]) {
        if (userSequence.length === gameSequence.length) {
            setTimeout(() =>{
                nextSequence();
            }, 1000);
        }
    }
    } else {
        playSound("game-over");
        $("body").addClass("game-over");
        $("h1").text("Przegrales... zacznij od nowa");
        startOver();
        started = false;
        $("h1").text("nacisnij start, aby rozpoczac gre");
        //36 tu do zrobienia
        startOver();
        $(".zse-container").click(function (){
            if (!started) {
                startGame();
            }
    });
}
function startOver() {
    started= false;
    $("h1").text("nacisnij start, aby rozpoczac gre");
}
$(".zse-container").click(function (){
    if (!started) {
        startGame();
    }
});
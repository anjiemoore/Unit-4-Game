const MONSTER_AC_MIN = 15;
const MONSTER_AC_MAX = 30;
const DICE_VALUES = [10, 5, 7, 3];
const MAX_GUESS = 3;
const MONSTER_IMAGES = ["assets/images/AdultBlackDragon.jpeg", "assets/images/AdultBlueDragon.jpeg", "assets/images/AdultRedDragon.jpeg", "assets/images/AdultGreenDragon.jpeg"];


function newRound() {
    //Get random number for monster armor
    let ac = Math.floor(Math.random() * (MONSTER_AC_MAX - MONSTER_AC_MIN)) + MONSTER_AC_MIN;
    $("#armorClass").text(ac);

    //Get random monster
    var randomMonsterImage = MONSTER_IMAGES[Math.floor(Math.random() * MONSTER_IMAGES.length)]
    $("#monsterImage").attr("src", randomMonsterImage);

    //randomize dice value
    let randomizedDice = DICE_VALUES.sort(function() { return 0.5 - Math.random() });
    let i = 0;
    $("#dice img").each(function() {
        $(this).attr("data-value", randomizedDice[i++]);
    });
    
    //reset guesses
    $("#guessesLeft").text(MAX_GUESS);
    $("#currentRoll").text("0");
}

$(document).ready(function() {
    newRound();

    $("#dice img").click(function() {
        let guessesLeft = parseInt($("#guessesLeft").text(), 10);
        let currentRoll = parseInt($("#currentRoll").text(), 10);
        let dieValue = parseInt($(this).attr("data-value"), 10);
        let armorClass = parseInt($("#armorClass").text(), 10);
        let wins = parseInt($("#wins").text(), 10);
        let losses = parseInt($("#losses").text(), 10);

        // decrement guesses
        $("#guessesLeft").text(--guessesLeft);
        // add die value to current roll
        $("#currentRoll").text(currentRoll + dieValue);
        currentRoll = currentRoll + dieValue;
        // if greater than monster armor
        if (currentRoll >= armorClass) {
            // win
            $("#wins").text(++wins);
            // new round
            newRound();

        // else if no guesses left
        } else if (guessesLeft === 0) {
            // lose
            $("#losses").text(++losses);
            // new round
            newRound();
        }
    });
});
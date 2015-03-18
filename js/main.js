var _globals = new Globals();

function main()
{
    var pregameDiv = document.getElementById("pregame");
    var addPlayerButtonElement = document.getElementById("addplayerbutton");
    var startButtonEvent = document.getElementById("startbutton");
    var ingameDiv = document.getElementById("ingame");
    var tableElement = document.getElementById("scorecard");
    var turnElement = document.getElementById("turnindicator");
    var inputElement = document.getElementById("inputfield");
    var hintElement = document.getElementById("hint");
    var endgameDiv = document.getElementById("endgame");
    var gameOverElement = document.getElementById("gameover");

    var userInteraction = new UserInteraction(pregameDiv, ingameDiv, endgameDiv, tableElement, 
        turnElement, inputElement, hintElement, gameOverElement);

    userInteraction.setPregameElementsVisible(false);
    userInteraction.setIngameElementsVisible(false);
    userInteraction.setEndgameElementsVisible(false);

    var game = new Game();

    // Assign callback functions.
    game.onAddPlayer = function(game) 
    { 
        userInteraction.update(game);
    }
    game.onBowl = function(game) 
    { 
        userInteraction.update(game);
    }
    userInteraction.onParsedInput = function(input)
    {
        var errorMessage = game.canBowl(input);

        if (errorMessage == "")
        {
            game.bowl(input);
        }
        else
        {
            hintElement.innerHTML = errorMessage;
        }
    }
    addPlayerButtonElement.onclick = function()
    {
        game.addPlayer("kaboom");
    }

    gotoPregame(userInteraction);

    // TODO: allow user to add/remove players

    //game.addPlayer("Calvin");
    //game.addPlayer("Hobbes");

    // Test data/code
    /*
    var perfectGameData = [
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        10, 10, 10, 10];

    var sampleGameData = [
        9, 1, 3, 7, 3, 7, 10, 10, 2, 1, 
        6, 4, 2, 3, 10, 10, 10, 10, 10, 2, 
        1, 10, 3, 6, 4, 3, 7, 3, 1, 3, 7, 2];

    var sampleGameData2 = [
        0, 0, 10, 0, 0, 10, 0, 0, 10, 0, 0, 10, 0, 0, 10,
        0, 0, 10, 0, 0, 10, 0, 0, 10, 0, 0, 10, 0, 0, 10,
        10, 10];

    autoplayInterval(game, perfectGameData);
    */
};

function gotoPregame(userInteraction)
{
    userInteraction.setPregameElementsVisible(true);
    //instructionsElement.innerHTML = "Use the button to add players.";
}

function gotoIngame()
{
    userInteraction.setPregameElementsVisible(false);
    userInteraction.setIngameElementsVisible(true);
}

function gotoEndgame()
{
    userInteraction.setIngameElementsVisible(false);
    userInteraction.setEndgameElementsVisible(true);
}

function autoplayInstant(game, gameData)
{
    while (!game.gameOver)
    {
        game.bowl(gameData.shift());
    }
};

function autoplayInterval(game, gameData)
{
    function next()
    {
        game.bowl(gameData.shift());

        if (game.gameOver)
        {
            window.clearInterval(interval);
        }
    }

    var interval = window.setInterval(next, 500);
};

main();

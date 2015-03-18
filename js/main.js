var _globals = new Globals();

function main()
{
    var pregameDiv = document.getElementById("pregame");
    var inputNamesElement = document.getElementById("inputnames");
    var addPlayerButtonElement = document.getElementById("addplayerbutton");
    var startButtonElement = document.getElementById("startbutton");
    var ingameDiv = document.getElementById("ingame");
    var tableElement = document.getElementById("scorecard");
    var turnElement = document.getElementById("turnindicator");
    var inputPinsElement = document.getElementById("inputpins");
    var hintElement = document.getElementById("hint");
    var endgameDiv = document.getElementById("endgame");
    var gameOverElement = document.getElementById("gameover");

    var userInteraction = new UserInteraction(pregameDiv, ingameDiv, endgameDiv,
        tableElement, turnElement, inputPinsElement, hintElement, gameOverElement);
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

    // Assign button functions.
    addPlayerButtonElement.onclick = function()
    {
        if (game.numberOfPlayers() < _globals.maxPlayers)
        {
            var inputName = inputNamesElement.value;

            if (inputName != null
                && inputName != "")
            {
                game.addPlayer(inputName);
            }
        }
    }
    startButtonElement.onclick = function()
    {
        if (game.numberOfPlayers() >= _globals.minPlayers)
        {
            userInteraction.setPregameElementsVisible(false);
            userInteraction.setIngameElementsVisible(true);
        }
    }

    // Set interface visibility.
    userInteraction.setPregameElementsVisible(true);
    userInteraction.setIngameElementsVisible(false);
    userInteraction.setEndgameElementsVisible(false);

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
/*
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
*/
main();

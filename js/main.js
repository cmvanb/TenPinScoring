/*
    Application main entry point

    The main function serves as the entry point for our application. It looks up
    the HTML elements the game will manipulate, constructs instances of the
    UserInteraction and Game classes and links these instances via callbacks and
    C# event style functions. Finally it sets the starting state for the
    interface.
*/

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
};

main();

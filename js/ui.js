/*
    UserInteraction class

    The UI class was intended as a centralized point in the code for user
	interacting code. Unfortunately it does not have complete dominion over this
	code, as several button callbacks are defined in main. The disadvantages of
	speed-coding are clearly visible here - if I could redesign this I would
	probably try an MVC model for the user interface.

	Important functions:

		update(Game game)
*/

function UserInteraction(pregameDiv, ingameDiv, endgameDiv, tableElement,
	turnElement, inputPinsElement, hintElement, gameOverElement)
{
	this.pregameDiv = pregameDiv;
	this.ingameDiv = ingameDiv;
	this.endgameDiv = endgameDiv;

    this.scoreCard = new ScoreCard(tableElement);

	this.turnElement = turnElement;
	this.inputPinsElement = inputPinsElement;
	this.hintElement = hintElement;
	this.gameOverElement = gameOverElement;

	var _this = this;

	this.inputPinsElement.onkeypress = function(e)
	{
		if (!e)
		{
			e = window.event;
		}

		var keyCode = e.keyCode || e.which;

		// When the enter key is pressed.
		if (keyCode == "13")
		{
			_this.parseInput(this.value);

			this.value = "";
		}
	}
};

UserInteraction.prototype.update = function(game)
{
	this.scoreCard.update(game);

	if (game.gameOver)
	{
		this.setIngameElementsVisible(false);
		this.gameOverElement.innerHTML = game.getGameOverMessage();
		this.setEndgameElementsVisible(true);
	}
	else
	{
		var playerName = game.frameSets[game.playerIndex].playerName;

		this.turnElement.innerHTML = playerName + "'s turn";
	}
};

UserInteraction.prototype.parseInput = function(input)
{
	var parsedInput = parseInt(input);

	if (isNaN(parsedInput))
	{
		this.hintElement.innerHTML = "Please enter a numeric value.";
		return;
	}

	this.hintElement.innerHTML = "";

	this.onParsedInput(parsedInput);
};

UserInteraction.prototype.onParsedInput = null;

UserInteraction.prototype.setPregameElementsVisible = function(visible)
{
	var display = visible ? "block" : "none";

	this.pregameDiv.style.display = display;
};

UserInteraction.prototype.setIngameElementsVisible = function(visible)
{
	var display = visible ? "block" : "none";

	this.ingameDiv.style.display = display;
};

UserInteraction.prototype.setEndgameElementsVisible = function(visible)
{
	var display = visible ? "block" : "none";

	this.endgameDiv.style.display = display;
};

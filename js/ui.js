function UserInteraction(tableElement, turnElement, inputElement, hintElement, gameOverElement)
{
    this.scoreCard = new ScoreCard(tableElement);

	this.turnElement = turnElement;
	this.inputElement = inputElement;
	this.hintElement = hintElement;
	this.gameOverElement = gameOverElement;

	var _this = this;

	this.inputElement.onkeypress = function(e)
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
		// Hide unnecessary elements.
		this.turnElement.style.display = "none";
		this.inputElement.style.display = "none";
		this.hintElement.style.display = "none";

		// Display game over message.
		this.gameOverElement.innerHTML = game.getGameOverMessage();
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
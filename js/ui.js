function UserInteraction(turnElement, inputFieldElement, hintElement)
{
	this.turnElement = turnElement;
	this.inputFieldElement = inputFieldElement;
	this.hintElement = hintElement;

	var _this = this;

	this.inputFieldElement.onkeypress = function(e)
	{
		if (!e)
		{
			e = window.event;
		}

		var keyCode = e.keyCode || e.which;

		// When the enter key is pressed.
		if (keyCode == "13")
		{
			_this.validateInput(this.value);

			this.value = "";
		}
	}
};

UserInteraction.prototype.update = function(game)
{
	var playerName = game.frameSets[game.playerIndex].playerName;

	this.turnElement.innerHTML = playerName + "'s turn";
};

UserInteraction.prototype.validateInput = function(input)
{
	var validatedInput = parseInt(input);

	if (isNaN(validatedInput))
	{
		this.hintElement.innerHTML = "Please enter a numeric value.";
		return;
	}

	if (validatedInput < 0)
	{
		this.hintElement.innerHTML = "Please enter a positive number.";
		return;
	}

	if (validatedInput > _globals.maxPinsPerThrow)
	{
		this.hintElement.innerHTML = "Please enter a number no greater than " + _globals.maxPinsPerThrow + ".";
		return;
	}
	
	/*
	if (validatedInput > _globals.maxPinsPerThrow)
	{
		this.hintElement.innerHTML = "Please enter a number less than SIGMA.";
		return;
	}*/

	this.hintElement.innerHTML = "";

	this.onReceivedValidInput(validatedInput);
};

UserInteraction.prototype.onReceivedValidInput = null;
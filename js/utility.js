// Returns a random number between 0 (inclusive) and 1 (exclusive)
function getRandom()
{
    return Math.random();
};

// Returns a random integer between min (included) and max (excluded)
function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min)) + min;
};

function getScoreStringFromFrame(frame)
{
	if (frame.throws.length > 0)
	{
		var string = "";

		for (var i = 0; i < frame.throws.length; ++i)
		{
			if (i > 0)
			{
				string += " ";
			}

			string += getScoreStringFromThrow(frame.throws[i]);
		}

		return string;
	}

	return "";
};

function getScoreStringFromThrow(_throw)
{
	if (_throw.isStrike)
	{
		return "X";
	}
	if (_throw.isSpare)
	{
		return "/";
	}

	return _throw.pins;
};
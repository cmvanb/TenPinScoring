function Game()
{
    this.frameSets = [];
    this.frameIndex = 0;
    this.playerIndex = 0;
    this.gameStarted = false;
    this.gameOver = false;
};

Game.prototype.addPlayer = function(playerName)
{
    if (this.gameStarted)
    {
        throw "Can't add more players after game started.";
    }

    var newFrameSet = new FrameSet(playerName);

    this.frameSets.push(newFrameSet);

    this.onAddPlayer(this);
};

Game.prototype.onAddPlayer = null;

Game.prototype.canBowl = function(pins)
{
    if (this.gameOver)
    {
        return "Can't bowl, game is over.";
    }

    if (this.frameSets.length == 0)
    {
        return "Can't start game with zero players.";
    }

    if (pins < 0)
    {
        return "Can't bowl a negative number of pins.";
    }

    var frameSet = this.frameSets[this.playerIndex];
    var frame = frameSet.getFrame(this.frameIndex);
    var pinsLeft = frame.getPinsLeft();

    if (pins > pinsLeft)
    {
        return "Can't bowl " + pins + " pins, frame only contains " + pinsLeft;
    }

    return "";
};

Game.prototype.bowl = function(pins)
{
    var errorMessage = this.canBowl(pins);

    if (errorMessage != "")
    {
        throw errorMessage;
    }

    if (!this.gameStarted)
    {
        this.gameStarted = true;

        console.log("game started!");
    }

    var frameSet = this.frameSets[this.playerIndex];

    frameSet.bowl(this.frameIndex, pins);

    if (frameSet.getFrame(this.frameIndex).completed)
    {
        this.advanceGame();
    }

    this.onBowl(this);
};

Game.prototype.onBowl = null;

Game.prototype.advanceGame = function()
{
    // Last player? Goto next frame.
    if (this.playerIndex == this.numberOfPlayers() - 1)
    {
        // Last frame? Game is over!
        if (this.frameIndex == _globals.framesPerGame - 1)
        {
            this.gameOver = true;

            console.log("game over!");

            return;
        }

        ++this.frameIndex;
    }

    ++this.playerIndex;

    if (this.playerIndex > this.numberOfPlayers() - 1)
    {
        this.playerIndex = 0;
    }
};

Game.prototype.numberOfPlayers = function()
{
    return this.frameSets.length;
};

Game.prototype.getPlayerNames = function()
{
    var playerNames = [];

    for (var i = 0; i < this.frameSets.length; ++i)
    {
        playerNames.push(this.frameSets[i].playerName);
    }

    return playerNames;
};

Game.prototype.getGameOverMessage = function()
{
    if (!this.gameOver)
    {
        throw "Game is not over.";
    }

    function compare(a, b)
    {
        if (a.totalScore < b.totalScore)
        {
            return -1;
        }

        if (a.totalScore > b.totalScore)
        {
            return 1;
        }

        return 0;
    }

    this.frameSets.sort(compare).reverse();

    console.log(this.frameSets);

    // There can be multiple winners in the case of a tied score.
    var winners = [];

    for (var i = 0; i < this.frameSets.length; ++i)
    {
        if (this.frameSets[i].totalScore == this.frameSets[0].totalScore)
        {
            winners.push(this.frameSets[i].playerName);
        }
    }

    winners.sort();

    var gameOverMessage = "";

    if (winners.length == 1)
    {
        gameOverMessage = "Game over! The winner is " + winners[0] + "!";
    }
    else
    {
        var winnersString = "";

        for (var i = 0; i < winners.length; ++i)
        {
            if (i > 0)
            {
                if (i == winners.length - 1)
                {
                    winnersString += " and ";
                }
                else
                {
                    winnersString += ", ";
                }
            }

            winnersString += winners[i];
        }

        gameOverMessage = "Game over! " + winnersString + " are tied for 1st!";
    }

    return gameOverMessage;
};
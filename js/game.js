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
};

Game.prototype.bowl = function(pins)
{
    if (this.gameOver)
    {
        throw "Can't bowl, game is over.";
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
};

Game.prototype.advanceGame = function()
{
    // Last player? Goto next frame.
    if (this.playerIndex == this.numberOfPlayers() - 1)
    {
        // Last frame? Game is over!
        if (this.frameIndex == _globals.framesPerGame - 1)
        {
            console.log("game over!");

            this.gameOver = true;

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

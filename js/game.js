function Game()
{
    this.allFrames = null;
    this.currentFrame = null;
    this.previousThrow = null;
    this.totalScore = 0;

    this.setup();
};

Game.prototype.bowl = function(pins)
{
    console.log("bowling " + pins + ", frame " + this.currentFrame.number)

    // Validate throw by comparing with previous throw.
    if (this.currentFrame.throws.length > 0)
    {
        if (!this.previousThrow.isStrike
            && !this.previousThrow.isSpare
            && this.previousThrow.pins + pins > _globals.maxPinsPerThrow)
        {
            throw "Throw can't have " + pins + " pins; maxPinsPerThrow is "
                + _globals.maxPinsPerThrow + " and previousThrow has "
                + this.previousThrow.pins + " pins.";
        }
    }

    var newThrow = this.currentFrame.addThrow(pins);

    // Link throws so we can calculate the score more easily (less spaghetti code).
    if (this.previousThrow != null)
    {
        this.previousThrow.nextThrow = newThrow;
    }

    this.previousThrow = newThrow;

    // Update score.
    this.updateScore();

    // If we have used the maximum throws, the frame is complete.
    if (this.currentFrame.usedMaxThrows())
    {
        this.advanceFrame();

        return;
    }

    // If we got a strike and it's not the last frame, the frame is complete.
    if (newThrow.isStrike
        && !this.currentFrame.isLastFrame())
    {
        this.advanceFrame();

        return;
    }
};

Game.prototype.advanceFrame = function()
{
    if (this.currentFrame.nextFrame == null)
    {
        console.log("game over!");

        return;
    }

    console.log("next frame!");

    this.currentFrame = this.currentFrame.nextFrame;
};

Game.prototype.updateScore = function()
{
    this.totalScore = 0;

    for (var i = 0; i < this.allFrames.length; ++i)
    {
        this.totalScore += this.allFrames[i].updateScore();
    }

    return this.totalScore;
};

Game.prototype.setup = function()
{
    this.allFrames = [];

    for (var i = 0; i < _globals.framesPerGame; ++i)
    {
        var number = _globals.framesPerGame - i;
        var nextFrame = null;

        if (this.allFrames.length > 0)
        {
            nextFrame = this.allFrames[0];
        }

        var newFrame = new Frame(number, nextFrame);

        // unshift() inserts frames at start of list so we can build a linked
        // list while assigning nextFrame.
        this.allFrames.unshift(newFrame);
    }

    this.currentFrame = this.allFrames[0];
    this.previousThrow = null;
    this.totalScore = 0;
};

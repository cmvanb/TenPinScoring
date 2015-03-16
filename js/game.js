function Game()
{
    this.setup();
};

Game.prototype.bowl = function(pins)
{
    console.log("bowling " + pins + ", frame " + this.currentFrame.number)

    // Validate throw by comparing with previous throw.
    if (this.currentFrame.throws.length > 0)
    {
        var previousThrow = this.currentFrame.throws[this.currentFrame.throws.length - 1];

        if (!previousThrow.isStrike
            && !previousThrow.isSpare
            && previousThrow.pins + pins > _globals.maxPinsPerThrow)
        {
            throw "Throw can't have " + pins + " pins; maxPinsPerThrow is "
                + _globals.maxPinsPerThrow + " and previousThrow has "
                + previousThrow.pins + " pins.";
        }
    }

    this.currentFrame.addThrow(pins);

    if (!this.currentFrame.canAddThrow())
    {
        this.advanceFrame();

        return;
    }

    if (pins == _globals.maxPinsPerThrow
        && this.currentFrame.throws.length == 1)
    {
        // Strike!

        if (!this.currentFrame.isLastFrame())
        {
            this.advanceFrame();

            return;
        }
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

Game.prototype.score = function()
{
    return 0;
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

        // Inserting frames at start of list so we can build a linked list
        // while assigning nextFrame.
        this.allFrames.unshift(newFrame);
    }

    this.currentFrame = this.allFrames[0];
};

function FrameSet(playerName)
{
    this.playerName = playerName;
    this.frames = [];
    this.totalScore = 0;
    this.previousThrow = null;

    // Populate array.
    for (var i = 0; i < _globals.framesPerGame; ++i)
    {
        var isLastFrame = i == _globals.framesPerGame - 1;
        var newFrame = new Frame(isLastFrame);

        this.frames.push(newFrame);
    }
};

FrameSet.prototype.bowl = function(frameIndex, pins)
{
    console.log("frame " + frameIndex + ": " + this.playerName + " bowled " + pins + " pins.");

    var currentFrame = this.getFrame(frameIndex);

    // Validate throw by comparing with previous throw.
    if (currentFrame.throws.length > 0)
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

    currentFrame.addThrow(pins);
    currentFrame.checkCompleted();

    // Link throws so we can calculate the score more easily (less spaghetti code).
    var newThrow = currentFrame.getLastThrow();

    if (this.previousThrow != null)
    {
        this.previousThrow.nextThrow = newThrow;
    }

    this.previousThrow = newThrow;

    // Update score.
    this.calculateScore();
};

FrameSet.prototype.calculateScore = function()
{
    this.totalScore = 0;

    for (var i = 0; i < this.frames.length; ++i)
    {
        this.totalScore += this.frames[i].calculateScore();
    }

    return this.totalScore;
};

FrameSet.prototype.getFrame = function(frameIndex)
{
    return this.frames[frameIndex];
};

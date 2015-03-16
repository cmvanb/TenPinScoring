function Frame(number, nextFrame)
{
    this.number = number;
    this.throws = [];
    this.nextFrame = nextFrame;
    this.maxThrows = _globals.normalFrameMaxThrows;
    this.score = 0;
    this.totalScore = 0;
};

Frame.prototype.addThrow = function(pins)
{
    if (!this.canAddThrow())
    {
        throw "Can't add throw; maxThrows is " + this.maxThrows + ".";
    }

    var isStrike = pins == _globals.maxPinsPerThrow;

    var isSpare = this.throws.length > 0
        && this.throws[this.throws.length - 1].pins + pins == _globals.maxPinsPerThrow;

    var newThrow = new Throw(pins, isStrike, isSpare);

    if (isStrike)
    {
        console.log("strike!");
    }

    if (isSpare)
    {
        console.log("spare!");
    }

    // Player can be awarded an extra throw on the last frame.
    if ((isStrike || isSpare)
        && this.isLastFrame()
        && this.maxThrows < _globals.lastFrameMaxThrows)
    {
        ++this.maxThrows;
        console.log("bonus throw!");
    }

    this.throws.push(newThrow);
};

Frame.prototype.canAddThrow = function()
{
    return this.throws.length < this.maxThrows;
};

Frame.prototype.score = function()
{
    this.score = 0;
    this.totalScore = 0;

    for (var i = 0; i < throws.length; ++i)
    {
        this.score += throws[i].score();
    }
};

Frame.prototype.isLastFrame = function()
{
    return this.nextFrame == null;
};

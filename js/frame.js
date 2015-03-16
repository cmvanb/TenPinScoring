function Frame(number, nextFrame)
{
    this.number = number;
    this.throws = [];
    this.nextFrame = nextFrame;
    this.maxThrows = _globals.normalFrameMaxThrows;
    this.scoreBase = 0;
    this.scoreBonus = 0;
};

Frame.prototype.addThrow = function(pins)
{
    if (this.usedMaxThrows())
    {
        throw "Can't add throw; maxThrows is " + this.maxThrows + ".";
    }

    var isStrike = pins == _globals.maxPinsPerThrow;

    var isSpare = this.throws.length > 0
        && this.throws[this.throws.length - 1].pins + pins == _globals.maxPinsPerThrow;

    var isBonus = this.nextThrowIsBonus();

    var newThrow = new Throw(pins, isStrike, isSpare, isBonus);

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
    }

    this.throws.push(newThrow);

    return newThrow;
};

Frame.prototype.updateScore = function()
{
    this.scoreBase = 0;
    this.scoreBonus = 0;

    for (var i = 0; i < this.throws.length; ++i)
    {
        if (this.throws[i].isBonus)
        {
            continue;
        }

        this.scoreBase += this.throws[i].getScore();

        if ((this.throws[i].isStrike || this.throws[i].isSpare)
            && this.throws[i].nextThrow != null)
        {
            this.scoreBonus += this.throws[i].nextThrow.getScore();
        }

        if (this.throws[i].isStrike
            && this.throws[i].nextThrow != null
            && this.throws[i].nextThrow.nextThrow != null)
        {
            this.scoreBonus += this.throws[i].nextThrow.nextThrow.getScore();
        }
    }

    return this.scoreBase + this.scoreBonus;
};

Frame.prototype.usedMaxThrows = function()
{
    return this.throws.length >= this.maxThrows;
};

Frame.prototype.isLastFrame = function()
{
    return this.nextFrame == null;
};

Frame.prototype.nextThrowIsBonus = function()
{
    var isBonus = false;

    if (this.isLastFrame())
    {
        var twoThrowsBackWasAStrike = this.throws.length >= 2
            && this.throws[this.throws.length - 2].isStrike;

        var oneThrowBackWasAStrike = this.throws.length >= 1
            && this.throws[this.throws.length - 1].isStrike;

        var oneThrowBackWasASpare = this.throws.length >= 1
            && this.throws[this.throws.length - 1].isSpare;

        isBonus = twoThrowsBackWasAStrike
            || oneThrowBackWasAStrike
            || oneThrowBackWasASpare;

        if (isBonus)
        {
            console.log("bonus throw!");
        }
    }

    return isBonus;
};

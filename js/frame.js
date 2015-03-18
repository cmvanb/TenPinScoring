function Frame(isLastFrame)
{
    this.throws = [];
    this.isLastFrame = isLastFrame;
    this.maxThrows = _globals.normalFrameMaxThrows;
    this.score = 0;
    this.completed = false;
};

Frame.prototype.addThrow = function(pins)
{
    if (this.usedMaxThrows())
    {
        throw "Can't add throw; maxThrows is " + this.maxThrows + ".";
    }

    var isStrike = this.throwIsStrike(pins);

    var isSpare = this.throwIsSpare(pins);

    var isBonus = this.throwIsBonus();

    var newThrow = new Throw(pins, isStrike, isSpare, isBonus);

    // Player can be awarded an extra throw on the last frame.
    if ((isStrike || isSpare)
        && this.isLastFrame
        && this.maxThrows < _globals.lastFrameMaxThrows)
    {
        ++this.maxThrows;
    }

    this.throws.push(newThrow);
};

Frame.prototype.checkCompleted = function()
{
    // If we have used the maximum throws, the frame is complete.
    if (this.usedMaxThrows())
    {
        this.completed = true;
    }
    // If we got a strike and it's not the last frame, the frame is complete.
    else if (this.throws.length > 0
        && this.getLastThrow().isStrike
        && !this.isLastFrame)
    {
        this.completed = true;
    }
};

Frame.prototype.calculateScore = function()
{
    var scoreBase = 0;
    var scoreBonus = 0;

    for (var i = 0; i < this.throws.length; ++i)
    {
        if (this.throws[i].isBonus)
        {
            continue;
        }

        scoreBase += this.throws[i].getScore();

        if ((this.throws[i].isStrike || this.throws[i].isSpare)
            && this.throws[i].nextThrow != null)
        {
            scoreBonus += this.throws[i].nextThrow.getScore();
        }

        if (this.throws[i].isStrike
            && this.throws[i].nextThrow != null
            && this.throws[i].nextThrow.nextThrow != null)
        {
            scoreBonus += this.throws[i].nextThrow.nextThrow.getScore();
        }
    }

    this.score = scoreBase + scoreBonus;

    return this.score;
};

Frame.prototype.getPinsLeft = function()
{
    if (this.throws.length == 0)
    {
        return _globals.maxPinsPerThrow;
    }

    var lastThrow = this.getLastThrow();

    // All pins were knocked down, they are replaced by now.
    if (lastThrow.isStrike
        || lastThrow.isSpare)
    {
        return _globals.maxPinsPerThrow;
    }

    // Otherwise return the maximum minus the pins knocked down last throw.
    return _globals.maxPinsPerThrow - lastThrow.pins;
};

Frame.prototype.getLastThrow = function()
{
    if (this.throws.length == 0)
    {
        return null;
    }

    return this.throws[this.throws.length - 1];
};

Frame.prototype.usedMaxThrows = function()
{
    return this.throws.length >= this.maxThrows;
};

Frame.prototype.throwIsStrike = function(pins)
{
    if (pins == _globals.maxPinsPerThrow)
    {
        if (this.isLastFrame)
        {
            if (this.throws.length == 0)
            {
                return true;
            }
            else if (this.throws.length > 0
                && this.getLastThrow().pins == _globals.maxPinsPerThrow)
            {
                return true;
            }
        }
        else if (this.throws.length == 0)
        {
            return true;
        }
    }

    return false;
};

Frame.prototype.throwIsSpare = function(pins)
{
    if (this.throws.length > 0
        && this.getLastThrow().pins + pins == _globals.maxPinsPerThrow)
    {
        return true;
    }

    return false;
};

Frame.prototype.throwIsBonus = function()
{
    if (this.isLastFrame)
    {
        // Two throws back was a strike, so yes.
        if (this.throws.length >= 2
            && this.throws[this.throws.length - 2].isStrike)
        {
            return true;
        }

        // One throw back was a strike, so yes.
        if (this.throws.length >= 1
            && this.getLastThrow().isStrike)
        {
            return true;
        }

        // One throw back was a spare, so yes.
        if (this.throws.length >= 1
            && this.getLastThrow().isSpare)
        {
            return true;
        }
    }

    return false;
};

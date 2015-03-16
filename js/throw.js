function Throw(pins, isStrike, isSpare)
{
    if (pins > _globals.maxPinsPerThrow)
    {
        throw "Throw can't have " + pins + " pins; maxPinsPerThrow is "
            + _globals.maxPinsPerThrow + ".";
    }

    if (isStrike
        && isSpare)
    {
        throw "Throw can't be both a strike and a spare.";
    }

    this.pins = pins;
    this.isStrike = isStrike;
    this.isSpare = isSpare;
};

Throw.prototype.score = function()
{
    return pins;
};

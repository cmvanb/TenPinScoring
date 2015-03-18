/*
    Throw class

    A simple class representing a single ball thrown. It notes the number of
    pins knocked down and whether the throw was a strike, spare or bonus ball.
    It also has a reference to the next throw that was performed. This results
    in a linked list that makes it trivial to calculate score in the Frame class.
*/

function Throw(pins, isStrike, isSpare, isBonus)
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
    this.isBonus = isBonus;
    this.nextThrow = null;
};

Throw.prototype.getScore = function()
{
    return this.pins;
};

/*
    Globals class

    Very simple, a class for global variables. These are of course an
    anti-pattern, but tolerable for an application of this scope. The code is
    fairly robust, try playing around with these. 
*/

function Globals()
{
    this.framesPerGame = 10;
    this.maxPinsPerThrow = 10;
    this.normalFrameMaxThrows = 2;
    this.lastFrameMaxThrows = 3;
    this.minPlayers = 1;
    this.maxPlayers = 4;
};

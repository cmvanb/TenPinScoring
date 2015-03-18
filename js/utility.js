// Returns a random number between 0 (inclusive) and 1 (exclusive)
function getRandom()
{
    return Math.random();
};

// Returns a random integer between min (included) and max (excluded)
function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min)) + min;
};
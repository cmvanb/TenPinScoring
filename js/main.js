var _globals = new Globals();

function main()
{
    var tableElement = document.getElementById("scorecard");
    var scoreCard = new ScoreCard(tableElement);

    var game = new Game(
        function(game) { scoreCard.updateTable(game); },
        function(game) { scoreCard.updateTable(game); });

    game.addPlayer("Calvin");
    game.addPlayer("Hobbes");

    var perfectGameData = [
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        10, 10, 10, 10];

    var sampleGameData = [
        9, 1, 3, 7, 3, 7, 10, 10, 2, 1, 
        6, 4, 2, 3, 10, 10, 10, 10, 10, 2, 
        1, 10, 3, 6, 4, 3, 7, 3, 1, 3, 7, 2];

    autoplayInterval(game, sampleGameData);
};

function autoplayInstant(game, gameData)
{
    while (!game.gameOver)
    {
        game.bowl(gameData.shift());
    }
};

function autoplayInterval(game, gameData)
{
    function next()
    {
        game.bowl(gameData.shift());

        if (game.gameOver)
        {
            window.clearInterval(interval);
        }
    }

    var interval = window.setInterval(next, 500);
};

main();

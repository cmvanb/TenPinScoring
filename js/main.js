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

    // perfect game
    /*
    for (var p = 0; p < game.numberOfPlayers(); ++p)
    {
        for (var f = 0; f < 12; ++f)
        {
            game.bowl(10);
        }
    }
    */

    // random game
    /*
    while (!game.gameOver)
    {
        var pIndex = game.playerIndex;

        var pins1 = getRandomInt(8, 11);

        game.bowl(pins1);

        if (pIndex != game.playerIndex)
        {
            continue;
        }

        if (!game.gameOver
            && pins1 < 10)
        {
            var pins2 = getRandomInt(1, 11 - pins1);

            game.bowl(pins2);
        }
    }
    */

    // sample game 1
    /*
    game.bowl(9);
    game.bowl(1);
    game.bowl(3);
    game.bowl(7);
    game.bowl(3);
    game.bowl(7);
    game.bowl(10);
    game.bowl(10);
    game.bowl(2);
    game.bowl(1);
    game.bowl(6);
    game.bowl(4);
    game.bowl(2);
    game.bowl(3);
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    game.bowl(2);
    game.bowl(1);
    game.bowl(10);
    game.bowl(3);
    game.bowl(6);
    game.bowl(4);
    game.bowl(3);
    game.bowl(7);
    game.bowl(3);
    game.bowl(1);
    game.bowl(3);
    game.bowl(7);
    game.bowl(2);
    */

    //console.log(game.frameSets);

    // automatic game
    /*
    function autoplay()
    {
        game.bowl(10);

        if (game.gameOver)
        {
            window.clearInterval(interval);
        }
    }

    var interval = window.setInterval(autoplay, 1000);
    */
};

main();

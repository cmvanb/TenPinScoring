var _globals = new Globals();

function main()
{
    console.log("hello world");

    var newGame = new Game();

    // first frame
    /*
    newGame.bowl(6);
    newGame.bowl(4);
    */
    // inbetween frames
    // last frame -- valid
    /*
    newGame.bowl(1);
    newGame.bowl(1);
    */
    /*
    newGame.bowl(3);
    newGame.bowl(7);
    newGame.bowl(1);
    */
    /*
    newGame.bowl(3);
    newGame.bowl(7);
    newGame.bowl(10);
    */
    /*
    newGame.bowl(10);
    newGame.bowl(1);
    newGame.bowl(1);
    */
    /*
    newGame.bowl(10);
    newGame.bowl(3);
    newGame.bowl(7);
    */
    /*
    newGame.bowl(10);
    newGame.bowl(10);
    newGame.bowl(1);
    */
    /*
    newGame.bowl(10);
    newGame.bowl(10);
    newGame.bowl(10);
    */
    // last frame -- invalid
    /*
    newGame.bowl(10);
    newGame.bowl(3);
    newGame.bowl(10);
    */

    // perfect game
    newGame.bowl(10);
    newGame.bowl(10);
    newGame.bowl(10);
    newGame.bowl(10);
    newGame.bowl(10);
    newGame.bowl(10);
    newGame.bowl(10);
    newGame.bowl(10);
    newGame.bowl(10);
    newGame.bowl(10);
    newGame.bowl(10);
    newGame.bowl(10);

    var score = newGame.score();

    console.log(newGame.allFrames);

    console.log("score is " + score);
};

main();

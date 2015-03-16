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
    /*
    newGame.bowl(10);
    newGame.bowl(10);
    newGame.bowl(10);
    newGame.bowl(10);
    newGame.bowl(10);
    newGame.bowl(10);
    newGame.bowl(10);
    newGame.bowl(10);
    */
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
    /*
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
    */

    // sample game 1
    newGame.bowl(9);
    newGame.bowl(1);
    newGame.bowl(3);
    newGame.bowl(7);
    newGame.bowl(2);
    newGame.bowl(1);
    newGame.bowl(10);
    newGame.bowl(10);
    newGame.bowl(10);
    newGame.bowl(2);
    newGame.bowl(3);
    newGame.bowl(6);
    newGame.bowl(4);
    newGame.bowl(10);
    newGame.bowl(10);
    newGame.bowl(3);
    newGame.bowl(7);
    /*
    */

    var score = newGame.updateScore();

    console.log(newGame.allFrames);

    console.log("score is " + score);
};

main();

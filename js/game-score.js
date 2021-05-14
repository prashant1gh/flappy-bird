function GameScore(canvas) {
    var gameScore = this;


    gameScore.canvas = canvas;
    gameScore.context = gameScore.canvas.getContext('2d');


    gameScore.start = new Date();
    gameScore.score = 0;

    gameScore.x = 0;
    gameScore.y = 0;

    gameScore.highscore = 0;



}

GameScore.prototype.draw = function() {
    var gameScore = this;

    var draw = new Date();

    gameScore.score = parseFloat((draw - gameScore.start) / 1000).toFixed(0);

    var highscore = localStorage.getItem('highscore');
    if (!highscore) {
        highscore = 0;
    }

    gameScore.context.font = '30px verdana';
    gameScore.context.fillText('High Score :' + highscore, gameScore.x - 150, gameScore.y + 50);


    gameScore.context.font = '30px verdana';
    gameScore.context.fillText('Current Score :' + gameScore.score, gameScore.x - 150, gameScore.y);

}

GameScore.prototype.CheckHighscore = function() {
    var gameScore = this;
    var highscore = localStorage.getItem('highscore');

    if (highscore) {

        if (gameScore.score > parseInt(highscore)) {
            localStorage.setItem('highscore', gameScore.score);
        }
    } else {
        localStorage.setItem('highscore', 0);
    }

}
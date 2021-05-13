function GameScore(canvas) {
    var gameScore = this;


    gameScore.canvas = canvas;
    gameScore.context = gameScore.canvas.getContext('2d');


    gameScore.start = new Date();
    gameScore.score = 0;

    gameScore.x = 0;
    gameScore.y = 0;


}

GameScore.prototype.draw = function() {
    var gameScore = this;

    var draw = new Date();

    gameScore.score = parseFloat((draw - gameScore.start) / 1000).toFixed(0);

    gameScore.context.font = '45px verdana';
    gameScore.context.fillText(gameScore.score, gameScore.x, gameScore.y);
}
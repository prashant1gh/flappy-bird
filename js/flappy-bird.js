var INITIAL = 1;
var GAME_PLAYING = 2;
var GAME_OVER = 3;

var KEY_CODE = {
    R: 82
};


function FlappyBird(canvas) {
    var game = this;

    game.canvas = canvas;
    game.context = game.canvas.getContext('2d');

    game.currentState = INITIAL;

    //game speed
    game.velocity = 5;


    game.bindEvents();

    game.createObjects();

}

FlappyBird.prototype.createObjects = function() {
    var game = this;

    //game background
    game.background1 = new GameBackground('images/back.png', game.canvas);
    game.background2 = new GameBackground('images/back.png', game.canvas);
    game.background2.x = game.canvas.width;

    //game score
    game.gameScore = new GameScore(game.canvas);
    game.gameScore.x = game.canvas.width - 150;
    game.gameScore.y = 80;

    //pipe factory
    game.pipeFactory = new PipeFactory(game.canvas);

    //draw bird
    game.bird = new Bird('images/bird.png', game.canvas);




}

FlappyBird.prototype.start = function() {
    var game = this;

    window.requestAnimationFrame(function() {
        game.runGameLoop();
    });
}

FlappyBird.prototype.runGameLoop = function() {
    var game = this;


    //game state

    switch (game.currentState) {
        case INITIAL:
            game.drawInitialScreen();

            break;
        case GAME_PLAYING:
            game.drawGamePlayingScreen();

            break;
        case GAME_OVER:
            game.gameScore.CheckHighscore();
            game.drawGameOverScreen();
            break;
    }

    window.requestAnimationFrame(function() {
        game.runGameLoop();
    });
}

FlappyBird.prototype.bindEvents = function() {
    var game = this;
    game.canvas.addEventListener('click', function() {

        switch (game.currentState) {

            case INITIAL:
                game.reset();
                game.currentState = GAME_PLAYING;
                game.pipeFactory.generatePipes();


                break;

            case GAME_PLAYING:
                game.bird.vy = -1 * game.velocity;
                break;
        }
    });


    window.addEventListener('keydown', function(event) {

        switch (game.currentState) {

            case GAME_OVER:
                if (event.keyCode === KEY_CODE.R) {
                    game.reset();
                    game.currentState = GAME_PLAYING;

                }
                break;
        }

    });
}
FlappyBird.prototype.reset = function() {
    var game = this;
    game.gameScore.start = new Date();
    game.gameScore.score = 0;
    game.pipeFactory.pipes = [];
    game.bird.x = 115;
    game.bird.y = 115;

}


FlappyBird.prototype.drawInitialScreen = function() {
    var game = this;


    game.context.fillStyle = 'black';
    game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);
    game.context.fill();


    game.context.fillStyle = 'white';

    game.context.font = '36px arial';
    game.context.fillText('How to play', game.canvas.width / 2 - 150, game.canvas.height / 2 - 200);

    game.context.font = '25px arial';
    game.context.fillText('1. Click on screen to adjust the movement of bird.', game.canvas.width / 2 - 150, game.canvas.height / 2 - 160);
    game.context.fillText('2. Avoid pipes and keep flying.', game.canvas.width / 2 - 150, game.canvas.height / 2 - 120);
    game.context.fillText('3. Score is based on flying duration.', game.canvas.width / 2 - 150, game.canvas.height / 2 - 80);


    game.context.font = '36px arial';
    game.context.fillText('Click to start', game.canvas.width / 2 - 150, game.canvas.height / 2);

}

FlappyBird.prototype.drawGamePlayingScreen = function() {
    var game = this;

    game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);

    //animate background    
    game.animateBackground();


    //draw pipes
    game.drawPipes();

    //draw score
    game.gameScore.draw();

    //draw bird
    game.bird.draw();

    //check collisions
    game.checkCollisions();

}

FlappyBird.prototype.checkCollisions = function() {
    var game = this;

    var pipes = game.pipeFactory.pipes;

    for (var i = 0; i < pipes.length; i++) {
        if (game.isCollided(game.bird, pipes[i])) {
            game.currentState = GAME_OVER;
        }
    }

}

FlappyBird.prototype.isCollided = function(bird, pipe) {
    var game = this;
    var isNotCollided = true;

    var birdTop = game.bird.y;
    var birdBottom = game.bird.y + game.bird.h;
    var birdRight = game.bird.x + game.bird.w;
    var birdLeft = game.bird.x;

    var pipeTop = pipe.y + pipe.h + pipe.gap; //top of lower pipe
    var pipeBottom = pipe.y + pipe.h // bottom of upper pipe
    var pipeRight = pipe.x + pipe.w;
    var pipeLeft = pipe.x;

    if ((birdBottom < pipeTop && birdTop > pipeBottom) ||
        (birdLeft > pipeRight) ||
        (birdRight < pipeLeft)) {
        isNotCollided = false;

    }
    return isNotCollided;

}

FlappyBird.prototype.drawPipes = function() {
    var game = this;

    var pipes = game.pipeFactory.pipes;

    for (var i = 0; i < pipes.length; i++) {
        pipes[i].draw();
        pipes[i].x = pipes[i].x - game.velocity;
    }
    game.RemovePassedPipes();
}

FlappyBird.prototype.RemovePassedPipes = function() {
    var game = this;

    var pipes = game.pipeFactory.pipes;

    for (var i = 0; i < pipes.length; i++) {
        if (pipes[i].x + pipes[i].w < 0) {
            pipes.shift();
        }
    }
}

FlappyBird.prototype.animateBackground = function() {

    var game = this;
    game.background1.draw();

    if (Math.abs(game.background1.x) > game.canvas.width) {
        game.background1.x = game.canvas.width - game.velocity;
    }
    game.background1.x = game.background1.x - game.velocity;


    game.background2.draw();

    if (Math.abs(game.background2.x) > game.canvas.width) {
        game.background2.x = game.canvas.width - game.velocity;
    }
    game.background2.x = game.background2.x - game.velocity;
}


FlappyBird.prototype.drawGameOverScreen = function() {
    var game = this;

    game.context.fillStyle = 'black';
    game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);
    game.context.fill();


    game.context.fillStyle = 'white';

    game.context.font = '50px arial';
    game.context.fillText('Your score : ' + game.gameScore.score, game.canvas.width / 2 - 150, game.canvas.height / 2 - 100)

    var highscore = localStorage.getItem('highscore');
    if (!highscore) {
        highscore = 0;
    }

    game.context.fillText('High Score :' + highscore, game.canvas.width / 2 - 150, game.canvas.height / 2 - 150);


    game.context.font = '36px arial';
    game.context.fillText('Game Over :(', game.canvas.width / 2 - 150, game.canvas.height / 2)

    game.context.font = '30px arial';
    game.context.fillText('Press R to restart game.', game.canvas.width / 2 - 150, game.canvas.height / 2 + 50)

}
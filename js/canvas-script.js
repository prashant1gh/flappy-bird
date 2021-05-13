window.onload = function() {

    // Canvas Definition
    var canvas = document.getElementById('my-canvas');

    var flappyBird = new FlappyBird(canvas);
    flappyBird.start();

};
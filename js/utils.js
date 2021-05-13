window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

window.getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};


window.getRandomColor = function() {
    var red = getRandomInt(0, 257);
    var green = getRandomInt(0, 257);
    var blue = getRandomInt(0, 257);
    return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
};
function Pipe(canvas) {
    var pipe = this;

    pipe.canvas = canvas;
    pipe.context = pipe.canvas.getContext('2d');

    pipe.x = pipe.canvas.width;
    pipe.y = 0;
    pipe.w = 100;
    pipe.h = 0;
    pipe.gap = 0;
    pipe.color = getRandomColor();

}


Pipe.prototype.draw = function() {
    var pipe = this;

    pipe.context.fillStyle = pipe.color;

    //draw upper pipe
    pipe.context.fillRect(pipe.x, pipe.y, pipe.w, pipe.h);

    //draw lower pipe
    pipe.context.fillRect(pipe.x, pipe.h + pipe.gap, pipe.w, pipe.canvas.height);

    pipe.context.fill();

}
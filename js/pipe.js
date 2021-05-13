function Pipe(src1, src2, canvas) {
    var pipe = this;

    pipe.canvas = canvas;
    pipe.context = pipe.canvas.getContext('2d');

    pipe.x = pipe.canvas.width;
    pipe.y = 0;
    pipe.w = 100;
    pipe.h = 0;
    pipe.gap = 0;
    // pipe.color = getRandomColor();
    pipe.img1 = null;
    pipe.img2 = null;

    pipe.src1 = src1;
    pipe.src2 = src2;

    pipe.create();

}

Pipe.prototype.create = function() {
    var pipe = this;

    pipe.img1 = new Image;
    pipe.img1.src = pipe.src1;

    pipe.img2 = new Image;
    pipe.img2.src = pipe.src2;
}

Pipe.prototype.draw = function() {
    var pipe = this;

    pipe.context.fillStyle = pipe.color;

    // //draw upper pipe
    // pipe.context.fillRect(pipe.x, pipe.y, pipe.w, pipe.h);

    if (pipe.img1 != null) {
        pipe.context.drawImage(pipe.img1, pipe.x, pipe.y, pipe.w, pipe.h);


    }

    if (pipe.img2 != null) {
        pipe.context.drawImage(pipe.img2, pipe.x, pipe.h + pipe.gap, pipe.w, pipe.canvas.height);


    }

    // //draw lower pipe
    // pipe.context.fillRect(pipe.x, pipe.h + pipe.gap, pipe.w, pipe.canvas.height);

    // pipe.context.fill();

}
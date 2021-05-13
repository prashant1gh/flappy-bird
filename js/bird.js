function Bird(src, canvas) {
    var bird = this;

    bird.canvas = canvas;
    bird.context = bird.canvas.getContext('2d');


    bird.x = 115;
    bird.y = 115;
    bird.w = 115;
    bird.h = 115;
    bird.vy = 0; //velocity
    bird.g = 0.2; //gravity
    bird.src = src;
    bird.img = null;
    bird.frame = 0;

    bird.create();


}

Bird.prototype.create = function() {
    var bird = this;

    //create image
    bird.img = new Image;
    bird.img.src = bird.src;

}

Bird.prototype.draw = function() {
    var bird = this;

    if (bird.img != null) {

        //add gravity to bird
        bird.vy = bird.vy + bird.g;
        bird.y = bird.y + bird.vy;

        if (bird.y + bird.h > bird.canvas.height) {
            bird.y = bird.canvas.height - bird.h;
            bird.vy = 0;
        } else if (bird.y < 0) {
            bird.y = 0;
            bird.vy = 0;
        }

        bird.context.drawImage(bird.img, bird.frame * 115, 10, 115, 115, bird.x, bird.y, bird.w, bird.h);
        bird.frame++;
        bird.frame %= 3;
    }

}
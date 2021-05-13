function GameBackground(src, canvas) {
    var bg = this;

    bg.canvas = canvas;
    bg.context = bg.canvas.getContext('2d');


    bg.x = 0;
    bg.y = 0;
    bg.h = bg.canvas.height;
    bg.w = bg.canvas.width;
    bg.src = src;
    bg.img = null;

    bg.create();


}

GameBackground.prototype.create = function() {
    var bg = this;

    //create image
    bg.img = new Image;
    bg.img.src = bg.src;

}

GameBackground.prototype.draw = function() {
    var bg = this;

    if (bg.img != null) {
        bg.context.drawImage(bg.img, bg.x, bg.y, bg.w, bg.h);
    }

}
function PipeFactory(canvas) {

    var factory = this;

    factory.canvas = canvas;
    factory.context = factory.canvas.getContext('2d');

    factory.gap = 200;
    factory.maxGap = 300;
    factory.freq = 1500;
    factory.pipes = []



}

PipeFactory.prototype.generatePipes = function() {

    var factory = this;

    setInterval(function() {
        var gap = getRandomInt(factory.gap, factory.maxGap);
        var height = getRandomInt(0, factory.maxGap);

        var pipe = new Pipe(factory.canvas);
        pipe.gap = gap;
        pipe.h = height;
        factory.pipes.push(pipe);
    }, factory.freq);
}
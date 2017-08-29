function drawBar(analyser) {
  var canvas = document.getElementById("canvas");
  var barCanvasCtx = canvas.getContext("2d");
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);
  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;

  function draw() {

    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);

    barCanvasCtx.fillStyle = 'rgb(0, 0, 0)';
    barCanvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    var barWidth = (WIDTH / bufferLength) * 50;
    var lowBarHeight;
    var midBarHeight;
    var highBarHeight;
    var x = 0;

    for(var i = 0; i < bufferLength; i++) {
      lowBarHeight = dataArray[i] * 2;
      midBarHeight = dataArray[i] * 2.25;
      highBarHeight = dataArray[i] * 2.5;

      barCanvasCtx.fillStyle = 'rgb(255, 0, 0)';
      barCanvasCtx.fillRect(x,HEIGHT-highBarHeight/2,barWidth,highBarHeight);

      barCanvasCtx.fillStyle = 'rgb(255, 131, 0)';
      barCanvasCtx.fillRect(x,HEIGHT-midBarHeight/2,barWidth,midBarHeight);

      barCanvasCtx.fillStyle = 'rgb(0, 255, 0)';
      barCanvasCtx.fillRect(x,HEIGHT-lowBarHeight/2,barWidth,lowBarHeight);

      x += barWidth + 1;
    }
  };
  draw();
  
};

module.exports = drawBar;

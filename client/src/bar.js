function drawBar(barCanvasCtx, analyser, bufferLength, dataArray) {
  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;

  requestAnimationFrame(function() {
   analyser.getByteFrequencyData(dataArray);

   barCanvasCtx.fillStyle = 'rgb(0, 0, 0)';
   barCanvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

   var barWidth = (WIDTH / bufferLength) * 2.5;
   var barHeight;
   var x = 0;

   for(var i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];

    barCanvasCtx.fillStyle = 'rgb(' + (barHeight+80) + ', 200, 200)';
    barCanvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight);

    x += barWidth + 1;
  }
});
  
};

module.exports = drawBar;

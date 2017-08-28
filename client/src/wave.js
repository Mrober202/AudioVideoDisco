function drawWave(waveCanvasCtx, analyser, bufferLength, dataArray) {

  requestAnimationFrame(function() {

    analyser.getByteTimeDomainData(dataArray);
    waveCanvasCtx.fillStyle = 'rgb(0, 0, 0)';
    waveCanvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    waveCanvasCtx.lineWidth = 3;
    waveCanvasCtx.strokeStyle = 'rgb(200, 200, 200)';

    waveCanvasCtx.beginPath();

    var sliceWidth = canvas.width * 50.0 / bufferLength;
    var x = 0;

    for (var i = 0; i < bufferLength; i++) {

      var v = dataArray[i] / 128.0;
      var y = v * canvas.height / 2;

      if (i === 0) {
        waveCanvasCtx.moveTo(x, y);
      } else {
        waveCanvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    waveCanvasCtx.lineTo(canvas.width, canvas.height / 2);
    waveCanvasCtx.stroke();
  });


};

module.exports = drawWave;
function drawWave(analyser) {
  var canvas = document.getElementById("canvas");
  var waveCanvasCtx = canvas.getContext("2d");
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);

  function draw() {

    requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);
    waveCanvasCtx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    waveCanvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    waveCanvasCtx.lineWidth = 3;
    waveCanvasCtx.strokeStyle = 'rgb(200, 200, 200)';

    waveCanvasCtx.beginPath();

    var sliceWidth = canvas.width * 3 / bufferLength;
    var x = 0;

    for (var i = 0; i < bufferLength; i++) {

      var v = dataArray[i] / 128.0;
      var y = v * canvas.height / 2;

      if (i === 0) {
        waveCanvasCtx.moveTo(x, y);
      } else {
        waveCanvasCtx.lineTo(x, y);
      }
      if (v > 1.5){
        waveCanvasCtx.strokeStyle = 'rgb(255, 0, 0)';
      }
      // else if (v === 1.5){
      //   waveCanvasCtx.strokeStyle = 'rgb(0, 255, 0)';
      // }
      else if (v > 1.3 && v < 1.5){
        waveCanvasCtx.strokeStyle = 'rgb(30, 30, 255)';
      }
      
      x += sliceWidth ;
    }

    waveCanvasCtx.lineTo(canvas.width, canvas.height);
    waveCanvasCtx.stroke();
  };
  draw();

};

module.exports = drawWave;
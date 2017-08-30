function drawRandom(analyser) {
  var canvas = document.getElementById("canvas");
  var randomCanvasCtx = canvas.getContext("2d");
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);

  function draw() {

    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);

    randomCanvasCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    randomCanvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    var circleCircumference = (canvas.width / bufferLength) * 50;
    var x = canvas.width / 2;
    var y = canvas.height / 2;

    for(var i = 0; i< bufferLength; i++){
      var lowCircleRadius = dataArray[i] * 1.3;
      var lowMidCircleRadius = dataArray[i] * 1.6;
      var midCircleRadius = dataArray[i] * 1.9;
      var midHighCircleRadius = dataArray[i] * 2.2;
      var highCircleRadius = dataArray[i] * 2.5;

      randomCanvasCtx.beginPath();
      randomCanvasCtx.strokeStyle = 'rgb(131, 9, 11)';
      randomCanvasCtx.arc(x, y, highCircleRadius, 0, 2 * Math.PI);
      randomCanvasCtx.stroke();

      randomCanvasCtx.beginPath();
      randomCanvasCtx.strokeStyle = 'rgb(218, 165, 32)';
      randomCanvasCtx.arc(x, y, midHighCircleRadius, 0, 2 * Math.PI);
      randomCanvasCtx.stroke();

      randomCanvasCtx.beginPath();
      randomCanvasCtx.strokeStyle = 'rgb(0, 100, 0)';
      randomCanvasCtx.arc(x, y, midCircleRadius, 0, 2 * Math.PI);
      randomCanvasCtx.stroke();

      randomCanvasCtx.beginPath();
      randomCanvasCtx.strokeStyle = 'rgb(211, 211, 211)';
      randomCanvasCtx.arc(x, y, lowMidCircleRadius, 0, 2 * Math.PI);
      randomCanvasCtx.stroke();

      randomCanvasCtx.beginPath();
      randomCanvasCtx.strokeStyle = 'rgb(65, 15, 255)';
      randomCanvasCtx.arc(x, y, lowCircleRadius, 0, 2 * Math.PI);
      randomCanvasCtx.stroke();
    }
  };
  draw();
};

module.exports = drawRandom;
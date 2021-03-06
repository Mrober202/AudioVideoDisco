var drawWave = require('./wave.js');
var drawBar = require('./bar.js');
var drawRandom = require('./randomiser.js');

// Create a MediaStreamAudioSourceNode
// Feed the HTMLMediaElement into it

function draw(visual) {
  if (navigator.mediaDevices) {
    console.log('getUserMedia supported.');
    navigator.mediaDevices.getUserMedia ({audio: true})
    .then(function(stream) {
      var audioCtx = new AudioContext();
        var audio = document.getElementById("audio");
        var source = audioCtx.createMediaStreamSource(stream);
        var analyser = audioCtx.createAnalyser();
        source.connect(analyser);


        analyser.fftSize = 2048;
        return analyser;
      }).then(visual);

    var fullScreen = document.getElementById("fs-button");
    fullScreen.addEventListener("click", goFullScreen);
    document.body.appendChild(canvas);
  }
}

function goFullScreen() {
  if(canvas.requestFullScreen){
    canvas.requestFullScreen();
  }
  else if(canvas.webkitRequestFullScreen){
    canvas.webkitRequestFullScreen();
  }
  else if(canvas.mozRequestFullScreen) {
    canvas.mozRequestFullScreen();
  }
}

function makeButtons() {
  var waveButton = document.getElementById("wave-button");
  var barButton = document.getElementById("equalizer-button");
  var randomButton = document.getElementById("random-button");
  waveButton.addEventListener('click', function() {draw(drawWave)});
  barButton.addEventListener('click', function() {draw(drawBar)});
  randomButton.addEventListener('click', function() {draw(drawRandom)});
}

window.addEventListener('load', makeButtons)
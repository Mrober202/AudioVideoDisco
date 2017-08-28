// var waveDraw = require("./wave.js");
// var Bar = require("./bar.js");

// var draw = function() {
//   if (navigator.mediaDevices) {
//     console.log('getUserMedia supported.');
//     navigator.mediaDevices.getUserMedia ({audio: true})
//     .then(function(stream) {

//           // Create a MediaStreamAudioSourceNode
//           // Feed the HTMLMediaElement into it
//           var audioCtx = new AudioContext();
//           var source = audioCtx.createMediaStreamSource(stream);
//           var analyser = audioCtx.createAnalyser();
//           source.connect(analyser);

//           analyser.fftSize = 2048;
//           var bufferLength = analyser.frequencyBinCount;
//           var dataArray = new Uint8Array(bufferLength);
//           analyser.getByteTimeDomainData(dataArray);

//           var biquadFilter = audioCtx.createBiquadFilter();
//           biquadFilter.connect(analyser);
//           biquadFilter.type = "lowshelf";
//           biquadFilter.frequency.value = 1000;
//           biquadFilter.gain.value = 25;

//           // hook into canvas
//           var canvas = document.getElementById("canvas");
//           var fullScreen = document.getElementById("fs-button");
//           fullScreen.addEventListener("click", goFullScreen);
//           var canvasCtx = canvas.getContext("2d");
//           document.body.appendChild(canvas);

//         })
//   }


//   function goFullScreen() {
//     if(canvas.requestFullScreen){
//       canvas.requestFullScreen();
//     }
//     else if(canvas.webkitRequestFullScreen){
//       canvas.webkitRequestFullScreen();
//     }
//     else if(canvas.mozRequestFullScreen) {
//       canvas.mozRequestFullScreen();
//     }
//   }
// }

// var waveButtonClicked = function() {
//   var wave = document.getElementById("wave-button");
//   wave.addEventListener("click", app(waveDraw));
// };

// var barButtonClicked = function() {
//   var wave = document.getElementById("bar-button");
//   wave.addEventListener("click", app(Bar.drawBar));
// };

// window.addEventListener("load", draw)
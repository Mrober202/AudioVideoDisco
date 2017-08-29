/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var drawWave = __webpack_require__(1);
var drawBar = __webpack_require__(2);

// Create a MediaStreamAudioSourceNode
// Feed the HTMLMediaElement into it

function draw(visual) {
  if (navigator.mediaDevices) {
    console.log('getUserMedia supported.');
    navigator.mediaDevices.getUserMedia ({audio: true})
    .then(function(stream) {
        var audioCtx = new AudioContext();
        // var audio = document.getElementById("audio")
        var source = audioCtx.createMediaStreamSource(stream);
        var analyser = audioCtx.createAnalyser();
         source.connect(analyser);


          analyser.fftSize = 2048;
        return analyser;
      }).then(visual);


          // get canvas
          // get context
          // append canvas to body
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
  waveButton.addEventListener('click', function() {draw(drawWave)});
  barButton.addEventListener('click', function() {draw(drawBar)});
}

window.addEventListener('load', makeButtons)

/***/ }),
/* 1 */
/***/ (function(module, exports) {

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

/***/ }),
/* 2 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
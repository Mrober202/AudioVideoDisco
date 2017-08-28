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
        var source = audioCtx.createMediaStreamSource(stream);
        var analyser = audioCtx.createAnalyser();
         source.connect(analyser);


          analyser.fftSize = 2048;
          var bufferLength = analyser.frequencyBinCount;
          var dataArray = new Uint8Array(bufferLength);
          // analyser.getByteTimeDomainData(dataArray);
          var biquadFilter = audioCtx.createBiquadFilter();
          biquadFilter.connect(analyser);
          biquadFilter.type = "lowshelf";
          biquadFilter.frequency.value = 1000;
          biquadFilter.gain.value = 25;


          // get canvas
          // get context
          // append canvas to body
          var canvas = document.getElementById("canvas");
          var fullScreen = document.getElementById("fs-button");
          fullScreen.addEventListener("click", goFullScreen);
          var canvasCtx = canvas.getContext("2d");
          document.body.appendChild(canvas);
          visual(canvasCtx, analyser, bufferLength, dataArray);

        })
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

/***/ }),
/* 2 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
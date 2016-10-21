/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*****************************************!*\
  !*** ./src/client/app/modules/index.js ***!
  \*****************************************/
/***/ function(module, exports) {

	'use strict';
	
	(function () {
	  var startButton = document.getElementById('start-button');
	  startButton.addEventListener('click', function () {
	    getCards();
	  });
	
	  var initializeDraft = function initializeDraft() {
	    var cardSetData, cardPacks;
	    getCards();
	  };
	
	  var getCards = function getCards() {
	    var dataReady = new Promise(function (resolve, reject) {
	      var xhr = new XMLHttpRequest();
	      xhr.addEventListener('load', function (xhrResponse) {
	        resolve(xhrResponse);
	      });
	      xhr.addEventListener('fail', function (xhrResponse) {
	        reject();
	      });
	      xhr.open('GET', '/api/soi-soi-soi');
	      xhr.send();
	    }).catch(function () {
	      console.log('cards not found');
	    }).then(function (cardSetData) {
	      var cardsJSON = JSON.parse(cardSetData.currentTarget.response);
	      console.log(cardsJSON);
	      console.log(cardsJSON.cards[0].multiverseid);
	      console.log(cardsJSON.cards[0].rarity);
	    });
	  };
	})();

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
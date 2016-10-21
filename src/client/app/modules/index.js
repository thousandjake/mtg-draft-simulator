(function () {
  var startButton = document.getElementById('start-button');
  startButton.addEventListener('click', function () {
    getCards();
  });

  var initializeDraft = function () {
    var cardSetData, sortedCards, cardPacks;
    cardSetData = getCards();
    sortedCards = sortCards(cardSetData);
    draftPacks = generatePacks(sortedCards);
  };

  var getCards = function () {
    var dataReady = new Promise(
      function (resolve, reject) {
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
        generatePacks(cardsJSON);
      }
    );
  };

  var generatePacks = function (cardsJSON) {
    var sortedCards, draftPacks;
    sortedCards = sortCards(cardsJSON);

  };
})();

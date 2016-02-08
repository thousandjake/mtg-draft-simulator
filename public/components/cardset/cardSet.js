var CardSet = {
  setCache : {},
  getSet : function (args) {
    return new Promise( function (resolve, reject) {
      if(CardSet.setCache.hasOwnProperty(args.setName)) {
        resolve(CardSet.setCache[args.setName]);
      } else {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', function (xhrResponse) {
          CardSet.setCache[args.setName] = JSON.parse(xhrResponse.currentTarget.response).cards;
          resolve(CardSet.setCache[args.setName]);
        });
        xhr.addEventListener('fail', function () {
          reject();
        });
        xhr.open('GET','/'+args.setName+'.json');
        xhr.send();
      }
    }).catch(function () {
        console.error('failed to get cardset from server');
      });
  },
  sortSet : function (allCards) {
    var rares = [], commons = [], lands = [], tokens = [];
    allCards.forEach(function (currentValue, index) {
      if(
        currentValue.rarity === 'Uncommon' ||
        currentValue.rarity === 'Rare' ||
        currentValue.rarity === 'Mythic Rare'
      ) {
        rares.push(currentValue);
      } else if(
        currentValue.rarity === 'Common'
      ) {
        commons.push(currentValue);
      } else if(currentValue.rarity === 'Basic Land') {
        lands.push(currentValue);
      } else {
        tokens.push(currentValue);
      };
    });
    var sortedCards = {
      'rares' : rares,
      'commons': commons,
      'lands': lands,
      'tokens': tokens
    };
    return sortedCards;
  }
};

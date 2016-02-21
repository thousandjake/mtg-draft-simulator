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
    var mythics =[], rares = [], uncommons = [], commons = [], lands = [], tokens = [];
    allCards.forEach(function (currentValue, index) {
      if(currentValue.type === 'Land') {
        lands.push(currentValue);
      } else if(currentValue.rarity === 'Mythic Rare') {
        mythics.push(currentValue);
      } else if(currentValue.rarity === 'Rare') {
        rares.push(currentValue);
      } else if(currentValue.rarity === 'Uncommon') {
        uncommons.push(currentValue);
      } else if(currentValue.rarity === 'Common') {
        commons.push(currentValue);
      } else {
        tokens.push(currentValue);
      };
    });
    var sortedCards = {
      'mythics' : mythics,
      'rares' : rares,
      'uncommons' : uncommons,
      'commons': commons,
      'lands': lands,
      'tokens': tokens
    };
    return sortedCards;
  }
};

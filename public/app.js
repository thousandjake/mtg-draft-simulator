!(function () {
  var draftHuman = new Player();
  var draftRobot1 = new Player();
  var draftRobot2 = new Player();
  var draftRobot3 = new Player();
  var draftRobot4 = new Player();
  var draftRobot5 = new Player();
  var setsOGW, setsBFZ;
  var newRound = new CustomEvent('newRound', {});
  var choiceComplete = new CustomEvent('choiceComplete', {});

  var getData = function () {
    return new Promise (function (resolve,reject) {
      var sortedOGW, sortedBFZ;
      CardSet.getSet({'setName' : 'OGW'})
        .catch(function () {
          reject('OGW set not found');
        })
        .then(function (xhrResponse) {
           sortedOGW = CardSet.sortSet(xhrResponse);
           if(Object.keys(sortedOGW).length > 0
            && Object.keys(sortedBFZ).length > 0) {
             resolve({'OGW':sortedOGW,'BFZ':sortedBFZ});
           }
        });
      CardSet.getSet({'setName' : 'BFZ'})
        .catch(function () {
          reject('BFZ set not found');
        })
        .then(function (xhrResponse) {
           sortedBFZ = CardSet.sortSet(xhrResponse);
           if(Object.keys(sortedOGW).length > 0
            && Object.keys(sortedBFZ).length > 0) {
             resolve({'OGW':sortedOGW,'BFZ':sortedBFZ});
           }
        });
    });
  };
  var generatePacks = function (sortedCards) {
    var mythics = sortedCards.mythics;
    var rares = sortedCards.rares;
    var uncommons = sortedCards.uncommons;
    var commons = sortedCards.commons;
    var packsArray = [];
    var pack = [];
    for(var x=0;x<6;x++) {
      for(var y=0;y<1;y++) {
        if(Math.ceil(Math.random()*8)<=7) {
          pack.push(rares[Math.floor(Math.random() * rares.length)]);
        } else {
          pack.push(mythics[Math.floor(Math.random() * mythics.length)]);
          console.log('MYTHIC RARE');
        }
      };
      for(var y=0;y<3;y++) {
        pack.push(uncommons[Math.floor(Math.random() * uncommons.length)]);
      };
      for(var y=0;y<10;y++) {
        pack.push(commons[Math.floor(Math.random() * commons.length)]);
      };
      console.log(pack);
      packsArray.push(pack);
      pack = [];
    }
    return packsArray;
  };
  var choseHighestValue = function (pack, draftPlayer) {
    var reducedPack = [];
    var chosenIndex = 0;
    var chosenCard = pack.reduce(function (previousValue, currentValue, currentIndex) {
      if(previousValue.cardValue > currentValue.cardValue) {
        return previousValue;
      } else {
        chosenIndex = currentIndex;
        return currentValue;
      }
    });
    draftPlayer._chooseCard(chosenCard);
    pack.splice(chosenIndex,1);
  };
  var renderPack = function (pack) {
    document.getElementsByTagName('Pack')[0].innerHTML = '';
    pack.forEach(function (currentValue, index) {
      var card = document.createElement('img');
      card.src=
        '//gatherer.wizards.com/Handlers/Image.ashx?multiverseid='
        +currentValue.multiverseid
        +'&type=card';
      var value = document.createElement('div');
      value.innerHTML = currentValue.cardValue;
      document.getElementsByTagName('Pack')[0].appendChild(card);
      document.getElementsByTagName('Pack')[0].appendChild(value);
      card.addEventListener('click', function () {
        var chosenCard = pack.splice(index,1)[0];
        draftHuman._chooseCard(chosenCard);
        document.dispatchEvent(choiceComplete);
      });
    });
  };
  var rotatePacks = function (packsArray) {
    var pack = packsArray.splice(5,1)[0];
    packsArray.unshift(pack);
    console.log('packs rotated');
  };
  getData()
    .then(function (sets) {
      setsOGW = sets.OGW;
      setsBFZ = sets.BFZ;
      document.dispatchEvent(newRound);
    });

  var roundCount = 1;
  var packsArray = [];
  document.addEventListener('newRound', function () {
    packsArray = [];
    packsArray = generatePacks(setsOGW);
    renderPack(draftHuman._evaluatePack(packsArray[0]));
  });
  document.addEventListener('choiceComplete', function () {
    choseHighestValue(draftRobot1._evaluatePack(packsArray[1]), draftRobot1);
    choseHighestValue(draftRobot1._evaluatePack(packsArray[2]), draftRobot2);
    choseHighestValue(draftRobot1._evaluatePack(packsArray[3]), draftRobot3);
    choseHighestValue(draftRobot1._evaluatePack(packsArray[4]), draftRobot4);
    choseHighestValue(draftRobot1._evaluatePack(packsArray[5]), draftRobot5);
    if(packsArray[0].length > 0 && roundCount <= 3) {
      rotatePacks(packsArray);
      renderPack(draftHuman._evaluatePack(packsArray[0]));
    } else if(packsArray[0].length === 0 && roundCount === 3) {
      console.log('draft complete');
    } else {
      roundCount++;
      document.dispatchEvent(newRound);
    }

  });
})();

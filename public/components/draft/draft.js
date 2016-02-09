var Draft = {
  sortedOGW :[],
  sortedBFZ : [],
  packsArray : [],
  playerPool : [],
  basicLands : [
    {
    'name' : 'Plains',
    'multiverseid' : 405342
    },
    {
    'name' : 'Swamps',
    'multiverseid' : 405402
    },
    {
    'name' : 'Mountains',
    'multiverseid' : 405307
    },
    {
    'name' : 'Islands',
    'multiverseid' : 405263
    },
    {
    'name' : 'Forests',
    'multiverseid' : 405233
    },
    {
    'name' : 'Wastes',
    'multiverseid' : 407693
    },
  ],
  playerDeck : [],
  roundCount : 0,
  getSetData : function () {
    CardSet.getSet({'setName' : 'OGW'})
      .then(function (xhrResponse) {
        Draft.sortedOGW = CardSet.sortSet(xhrResponse);
        Draft.generatePacks(Draft.sortedOGW);
        Draft.renderPack();
      });
    CardSet.getSet({'setName' : 'BFZ'})
      .then(function (xhrResponse) {
        Draft.sortedBFZ = CardSet.sortSet(xhrResponse);
      });
  },
  generatePacks : function (sortedCards) {
    var mythics = sortedCards.mythics;
    var rares = sortedCards.rares;
    var uncommons = sortedCards.uncommons;
    var commons = sortedCards.commons;
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
      if(Draft.packsArray.length < 6) {
        Draft.packsArray.push(pack);
      } else {
        console.log('Too many damn packs! You broke it!')
      }
      pack = [];
    }
  },
  renderPack : function () {
    var currentPack = Draft.packsArray[0];
    document.getElementsByTagName('Pack')[0].innerHTML = '';
    currentPack.forEach(function (currentValue, index) {
      var card = document.createElement('img');
      card.src=
        'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid='
        +currentValue.multiverseid
        +'&type=card';
      document.getElementsByTagName('Pack')[0].appendChild(card);
      card.addEventListener('click', function () {
        Draft.playerPool.push(Draft.packsArray[0][index]);
        Draft.packsArray[0].splice(index,1);
        console.log(Draft.packsArray[0]);
        Draft.timeForChoosing();
      });
    });
  },
  timeForChoosing : function () {
    Draft.packsArray[1].splice(Math.floor(Math.random() * Draft.packsArray[1].length),1);
    console.log(Draft.packsArray[1]);
    Draft.packsArray[2].splice(Math.floor(Math.random() * Draft.packsArray[2].length),1);
    console.log(Draft.packsArray[2]);
    Draft.packsArray[3].splice(Math.floor(Math.random() * Draft.packsArray[3].length),1);
    console.log(Draft.packsArray[3]);
    Draft.packsArray[4].splice(Math.floor(Math.random() * Draft.packsArray[4].length),1);
    console.log(Draft.packsArray[4]);
    Draft.packsArray[5].splice(Math.floor(Math.random() * Draft.packsArray[5].length),1);
    console.log(Draft.packsArray[5]);
    if(Draft.packsArray[0].length > 0) {
      Draft.rotatePacks();
    } else {
      Draft.packsArray = [];
      document.getElementsByTagName('Pack')[0].innerHTML = '';
      if(Draft.roundCount === 0) {
        Draft.roundCount ++;
        Draft.generatePacks(Draft.sortedOGW);
        Draft.renderPack();
      } else if(Draft.roundCount === 1) {
        Draft.roundCount ++;
        Draft.generatePacks(Draft.sortedBFZ);
        Draft.renderPack();
      } else if(Draft.roundCount === 2) {
        Draft.roundCount ++;
        Draft.buildDeck();
      } else {
        console.error('Too many draft rounds, check for issues');
      }
    }
  },
  rotatePacks : function () {
    var pack = Draft.packsArray.splice(5,1)[0];
    console.log(pack);
    console.log(Draft.packsArray);
    Draft.packsArray.unshift(pack);
    console.log(Draft.packsArray);
    Draft.renderPack();
  },
  buildDeck : function () {
    Draft.renderPool();
    Draft.renderLands();
    Draft.renderDeck();
  },
  renderPool : function () {
    var pool = document.getElementsByTagName('Pool')[0];
    pool.innerHTML = '';
    var instructions = document.createElement('h3');
    instructions.innerHTML = 'Click card to add to deck and remove from Pool'
      +'<br>Total Cards'+Draft.playerPool.length;
    pool.appendChild(instructions);
    Draft.playerPool.forEach(function (currentValue, index) {
      var card = document.createElement('img');
      card.src=
        'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid='
        +currentValue.multiverseid
        +'&type=card';
      document.getElementsByTagName('Pool')[0].appendChild(card);
      card.addEventListener('click', function () {
        Draft.playerDeck.push(Draft.playerPool[index]);
        Draft.playerPool.splice(index,1);
        Draft.renderPool();
        Draft.renderDeck();
      });
    });
  },
  renderLands : function () {
    var lands = document.getElementsByTagName('Lands')[0];
    lands.innerHTML = '';
    var instructions = document.createElement('h3');
    instructions.innerHTML = 'Click card to add basic lands to deck';
    lands.appendChild(instructions);
    Draft.basicLands.forEach(function (currentValue, index) {
      var card = document.createElement('img');
      card.src=
        'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid='
        +currentValue.multiverseid
        +'&type=card';
      document.getElementsByTagName('Lands')[0].appendChild(card);
      card.addEventListener('click', function () {
        Draft.playerDeck.push(Draft.basicLands[index]);
        Draft.renderDeck();
      });
    });
  },
  renderDeck : function () {
    var deck = document.getElementsByTagName('Deck')[0];
    deck.innerHTML = '';
    var instructions = document.createElement('h3');
    instructions.innerHTML = 'Click card to remove from Deck and add back to Pool'
      +'<br>Total Cards'+Draft.playerDeck.length;
    deck.appendChild(instructions);
    Draft.playerDeck.forEach(function (currentValue, index) {
      var card = document.createElement('img');
      card.src=
        'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid='
        +currentValue.multiverseid
        +'&type=card';
      document.getElementsByTagName('Deck')[0].appendChild(card);
      card.addEventListener('click', function () {
        Draft.playerPool.push(Draft.playerDeck[index]);
        Draft.playerDeck.splice(index,1);
        Draft.renderDeck();
        Draft.renderPool();
      });
    });
  }
};

Draft.getSetData();

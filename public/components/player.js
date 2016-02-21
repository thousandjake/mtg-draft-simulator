var Player = function () {
  this.pool = [];
  this.poolColors = {
    'A' : 0,
    'B' : 0,
    'W' : 0,
    'R' : 0,
    'U' : 0,
    'G' : 0
  };
  this.poolManaCurve = {
    'noCost' : 0,
    'one' : 0,
    'two' : 0,
    'three' : 0,
    'four' :0,
    'five' : 0,
    'six' : 0,
    'highCost' : 0
  };
  this.deck = [];
  this.deckColors = {
    'A' : 0,
    'B' : 0,
    'W' : 0,
    'R' : 0,
    'U' : 0,
    'G' : 0
  };
  this.deckManaCurve = {
    'noCost' : 0,
    'one' : 0,
    'two' : 0,
    'three' : 0,
    'four' :0,
    'five' : 0,
    'six' : 0,
    'highCost' : 0
  };
};

Player.prototype._evaluatePack = function (pack) {
  var primaryColor = this._getPrimaryColor();
  var secondaryColor = this._getSecondaryColor(primaryColor);
  pack.forEach(function (currentCardObj) {
    var cmc = currentCardObj.cmc;
    var colorIdentity = typeof currentCardObj.colorIdentity ==='undefined'
      ?'A':currentCardObj.colorIdentity;
    var colorCount = colorIdentity.length;
    var rarity = currentCardObj.rarity;
    var value = 0;
    if(rarity = 'Mythic Rare') {
      value = value + 4;
    } else if (rarity = 'Rare') {
      value = value + 3;
    } else if (rarity = 'Uncommon') {
      value = value + 2;
    } else {
      value = value + 1;
    }
    if(colorCount === 1) {
      if(colorIdentity === primaryColor) {
        value = value + 5;
      } else if(colorIdentity === secondaryColor) {
        value = value + 4;
      }
    } else if(colorCount === 2) {
      if(
        (colorIdentity[0] === primaryColor || secondaryColor) &&
        (colorIdentity[1] === primaryColor || secondaryColor)
      ) {
        value = value + 5;
      }
    }
    currentCardObj.cardValue = value;
  });
  return pack;
};

Player.prototype._getPrimaryColor = function () {
  var poolColors = this.poolColors;
  var primaryColor = Object.keys(poolColors)
    .reduce(function (a, b) { return poolColors[a] > poolColors[b] ? a : b });
  return primaryColor;
};

Player.prototype._getSecondaryColor = function (primaryColor) {
  var poolColors = this.poolColors;
  var newPoolColors = {};
  for(var prop in poolColors) {
    if(poolColors.hasOwnProperty(prop)) {
      if(prop !== primaryColor) {
        newPoolColors[prop] = poolColors[prop];
      }
    }
  };
  var secondaryColor = Object.keys(newPoolColors)
    .reduce(function (a, b) { return newPoolColors[a] > newPoolColors[b] ? a : b });
  return secondaryColor;
};


Player.prototype._chooseCard = function (card) {
  var that = this;
  this.pool.push(card);
  var cmc = card.cmc;
  var colorIdentity = typeof card.colorIdentity ==='undefined'
    ?['A']:card.colorIdentity;
  console.log(card.name+" "+cmc+" "+colorIdentity);
  if(cmc < 1) {
    this.poolManaCurve.noCost++;
  } else if(cmc === 1) {
    this.poolManaCurve.one++;
  } else if(cmc === 2) {
    this.poolManaCurve.two++;
  } else if(cmc === 3) {
    this.poolManaCurve.three++;
  } else if(cmc === 4) {
    this.poolManaCurve.four++;
  } else if(cmc === 5) {
    this.poolManaCurve.five++;
  } else if(cmc === 6) {
    this.poolManaCurve.six++;
  } else if(cmc > 6) {
    this.poolManaCurve.highCost++;
  }
  colorIdentity.forEach(function(currentValue) {
    if(currentValue === 'A') {
      that.poolColors.A++;
    } else if(currentValue === 'B') {
      that.poolColors.B++;
    } else if(currentValue === 'W') {
      that.poolColors.W++;
    } else if(currentValue === 'R') {
      that.poolColors.R++;
    } else if(currentValue === 'U') {
      that.poolColors.U++;
    } else if(currentValue === 'G') {
      that.poolColors.G++;
    }
  });
};

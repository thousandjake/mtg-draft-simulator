var PackView = {
  renderPack : function (args) {
    var currentPack = args.packsArray[0];
    currentPack.forEach(function (currentValue, index) {
      var card = document.createElement('img');
      card.src=
        'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid='
        +currentValue.multiverseid
        +'&type=card';
      document.getElementsByTagName('Pack')[0].appendChild(card);
    });
  }
};

AppDispatcher.register('begin-draft', PackView.renderPack.bind(PackView));

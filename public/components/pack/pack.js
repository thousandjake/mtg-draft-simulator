var Pack = {
  packsArray : [],
  generatePacks : function (args) {
    var rares = args.sortedCards.rares;
    var commons = args.sortedCards.commons;
    var lands = args.sortedCards.lands;
    var tokens = args.sortedCards.tokens;
    var pack = [];

    for(var x=0;x<6;x++) {
      for(var y=0;y<3;y++) {
        pack.push(rares[Math.floor(Math.random() * rares.length)]);
      };
      for(var y=0;y<10;y++) {
        pack.push(commons[Math.floor(Math.random() * commons.length)]);
      };
      for(var y=0;y<2;y++) {
        pack.push(lands[Math.floor(Math.random() * lands.length)]);
      };
      console.log(pack);
      Pack.packsArray.push(pack);
      console.log(Pack.packsArray);
      if(Pack.packsArray.length === 18) {
        AppDispatcher.dispatch('begin-draft', {'packsArray': Pack.packsArray});
      } else if(Pack.packsArray.length > 18) {
        console.error('Too many packs, something went wrong. PackCount:'+Pack.packsArray.length);
        AppDispatcher.dispatch('begin-draft', {'packsArray': Pack.packsArray});
        break;
      }
      pack = [];
    };
  }
};

AppDispatcher.register('get-packs', Pack.generatePacks.bind(Pack));

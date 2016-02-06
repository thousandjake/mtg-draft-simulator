var MenuView = {
  packCount : 0,
  render : function () {
    var menuElement = document.getElementsByTagName('Menu')[0];
    var buttonOGW = document.createElement('button');
      buttonOGW.innerHTML = 'Oath of the Gatewatch';
    var buttonBFZ = document.createElement('button');
      buttonBFZ.innerHTML = 'Battle for Zendikar';
    menuElement.appendChild(buttonOGW);
    menuElement.appendChild(buttonBFZ);
    buttonOGW.addEventListener('click', function () {
      if(MenuView.packCount<3) {
        AppDispatcher.dispatch('get-set',{setName: 'OGW'});
        MenuView.packCount++;
      } else {
        console.error('Cant use more than 3 packs');
      }
    });
    buttonBFZ.addEventListener('click',function () {
      if(MenuView.packCount<3) {
        AppDispatcher.dispatch('get-set',{setName: 'BFZ'});
        MenuView.packCount++;
      } else {
        console.error('Cant use more than 3 packs');
      }
    });

  }
};

AppDispatcher.register('menu-load', MenuView.render);

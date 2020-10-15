class MapMenu extends Phaser.Scene{
  constructor(){
      super("MapMenu");
  }

  preload(){
    this.load.image('backgroundMpM', './ASSETS/MapMenu/MapMenuBackground.jpg');
  }

  create(){
    var wid = this.cameras.main.width; //ancho del canvas en el dispositivo
    var heig = this.cameras.main.height;

    var background = this.add.image(0, 0, 'backgroundMpM');
    background.setScale(2/3)
    background.setPosition(wid/2, heig/2);
  }
}

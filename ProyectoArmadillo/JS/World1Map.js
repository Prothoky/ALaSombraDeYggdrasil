class World1Map extends Phaser.Scene{
  constructor(){
      super("World1Map");
  }

  preload(){
    this.load.image('backgroundWM1M', './ASSETS/World1Menu/FondoMapaMundo1.jpeg'); //CAMBIAR
  }

  create(){
    var wid = this.cameras.main.width; //ancho del canvas en el dispositivo
    var heig = this.cameras.main.height;

    var background = this.add.image(0, 0, 'backgroundWM1M');
    //background.setScale(2/3)
    background.setPosition(wid/2, heig/2);
  }
}

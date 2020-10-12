class InitMenu extends Phaser.Scene{

  constructor(){
      super("InitMenu"); //super hace que la clase herede las caracteristicas de su predecesora
  }

  preload(){
    this.load.image('backgroundIM', './ASSETS/InitMenu/InitMenuBackground.jpg');
  }

  create(){
    var wid = this.cameras.main.width; //ancho del canvas en el dispositivo
    var heig = this.cameras.main.height;

    var fondo = this.add.image(0, 0, 'backgroundIM');
    fondo.setPosition(wid/2, heig/2);
  }
}

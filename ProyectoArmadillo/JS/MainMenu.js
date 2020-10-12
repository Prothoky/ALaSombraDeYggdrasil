class MainMenu extends Phaser.Scene{
  constructor(){
      super("MainMenu");
  }

  preload(){
    this.load.image('backgroundMM', './ASSETS/MainMenu/MainMenuBackground.jpg');
  }

  create(){
    var wid = this.cameras.main.width; //ancho del canvas en el dispositivo
    var heig = this.cameras.main.height;

    var fondo = this.add.image(0, 0, 'backgroundMM');
    fondo.setPosition(wid/2, heig/2);
  }
}

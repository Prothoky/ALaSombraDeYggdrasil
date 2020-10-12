class PauseMenu extends Phaser.Scene{
  constructor(){
      super("PauseMenu");
  }

  preload(){
    this.load.image('backgroundPM', './ASSETS/PauseMenu/PauseMenuBackground.jpg');
  }

  create(){
    var wid = this.cameras.main.width; //ancho del canvas en el dispositivo
    var heig = this.cameras.main.height;

    var background = this.add.image(0, 0, 'backgroundPM');
    background.setPosition(wid/2, heig/2);
  }
}

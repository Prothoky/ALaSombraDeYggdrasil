class OptionsMenu extends Phaser.Scene{
  constructor(){
      super("OptionsMenu");
  }

  preload(){
    this.load.image('backgroundOM', './ASSETS/OptionsMenu/OptionsMenuBackground.jpg');
  }

  create(){
    var wid = this.cameras.main.width; //ancho del canvas en el dispositivo
    var heig = this.cameras.main.height;

    var background = this.add.image(0, 0, 'backgroundOM');
    background.setScale(2/3);
    background.setPosition(wid/2, heig/2);
  }
}

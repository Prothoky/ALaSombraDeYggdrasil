class MainMenu extends Phaser.Scene{
  constructor(){
      super("MainMenu");
  }

  create(){
    this.add.text(20, 50, 'Bienvenido', {font: '25px Arial', fill: 'yellow'});
  }
}

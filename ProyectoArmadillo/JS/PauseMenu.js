class PauseMenu extends Phaser.Scene{
  constructor(){
      super("PauseMenu");
  }

  create(){
    this.add.text(20, 50, 'Pause Menu');
  }
}

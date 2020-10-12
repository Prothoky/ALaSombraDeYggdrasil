class OptionsMenu extends Phaser.Scene{
  constructor(){
      super("OptionsMenu");
  }

  create(){
    this.add.text(20, 50, 'Options Menu');
  }
}

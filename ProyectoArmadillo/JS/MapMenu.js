class MapMenu extends Phaser.Scene{
  constructor(){
      super("MapMenu");
  }

  create(){
    this.add.text(20, 50, 'Map Menu');
  }
}

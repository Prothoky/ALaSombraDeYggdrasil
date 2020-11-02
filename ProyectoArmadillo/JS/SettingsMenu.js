class SettingsMenu extends Phaser.Scene{
  constructor(){
      super("SettingsMenu");
  }

  create(){

    var backgroundSM = this.add.image(0, 0, 'backgroundSM');
    backgroundSM.setScale(2/3);
    backgroundSM.setPosition(gameWidth/2, gameHeight/2);

    //BOTON ATRAS
    this.backButtonVM = this.add.image(gameWidth*14/16, gameHeight*14/16, 'backButtonOM');
    this.backButtonVM.setScale(1.5/3);
    this.backButtonVM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.BackOptionsMenuSM());

  }

  BackOptionsMenuSM(){
    this.scene.pause('SettingsMenu');
    this.scene.start('OptionsMainMenu');
  }


}

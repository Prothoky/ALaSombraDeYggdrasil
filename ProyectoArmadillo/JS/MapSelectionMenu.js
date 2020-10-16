class MapSelectionMenu extends Phaser.Scene{
  constructor(){
      super("MapSelectionMenu");
  }

  preload(){
    this.load.image('backgroundMSM', './ASSETS/MapSelectionMenu/MapMenuBackground.jpeg');
    this.load.image('World1Button', './ASSETS/MapSelectionMenu/BotonMundo1.png');
    this.load.image('backButtonMSM', './ASSETS/MapSelectionMenu/BotonSalir.png');
  }

  create(){
    var wid = this.cameras.main.width; //ancho del canvas en el dispositivo
    var heig = this.cameras.main.height;

    var background = this.add.image(0, 0, 'backgroundMSM');
    //background.setScale(2/3)
    background.setPosition(wid/2, heig/2);

    //BOTON ATRAS
    this.backButtonMSM = this.add.image(wid*14/16, heig*14/16, 'backButtonMSM');
    this.backButtonMSM.setScale(1.5/3);
    this.backButtonMSM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.BackMainMenu());

    //BOTON JUGAR MUNDO 1
    this.botonMundo1 = this.add.image(wid*8.44/16, heig*14.05/16, 'World1Button');
    this.botonMundo1.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.World1Menu());

  }

  BackMainMenu(){
    this.scene.pause('MapSelectionMenu');
    this.scene.start('MainMenu');
  }

  World1Menu(){
    this.scene.pause('MapSelectionMenu');
    this.scene.start('World1Map');
    this.scene.bringToTop('World1Map');
  }
}

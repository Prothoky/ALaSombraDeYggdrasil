class MapSelectionMenu extends Phaser.Scene{
  constructor(){
      super("MapSelectionMenu");
  }

  preload(){

  }

  create(){

    this.backgroundMSM = this.add.image(0, 0, 'backgroundMSM');
    this.backgroundMSM.setPosition(gameWidth/2, gameHeight/2);
    this.backgroundMSM.setInteractive({ useHandCursor: false  } )
    .on('pointerdown', () => this.DesactivatePaper());

    //BOTON ATRAS
    this.backButtonMSM = this.add.image(gameWidth*14/16, gameHeight*15/16, 'backButtonMSM');
    this.backButtonMSM.setScale(1.5/3);
    this.backButtonMSM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.BackMainMenu());

    //BOTON TIENDA
    this.shopButtonW1M = this.add.image(gameWidth*14/16, gameHeight*1/16, 'shopButtonIG');
    this.shopButtonW1M.setScale(1/3);
    this.shopButtonW1M.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.ShopMenuMSM());

    //BOTON MUNDO 1
    this.botonMundo1 = this.add.image(gameWidth*5.5/16, gameHeight*5.45/16, 'World1Button');
    this.botonMundo1.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.ActivatePaper());

    //FULL SCREEN
    this.fullScreenMSM = this.add.image(gameWidth*15.5/16, gameHeight*13/14, 'buttonFullScreen');
    this.fullScreenMSM.setScale(2/60);
    this.fullScreenMSM.setInteractive({ useHandCursor: true})
		.on('pointerdown', function() {
      this.scene.scale.toggleFullscreen();
    });

    //BOTON MUNDO 4
    /*this.botonMundo4 = this.add.image(gameWidth*8.44/16, gameHeight*14.05/16, 'World4Button');
    this.botonMundo4.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.World4Menu());
    this.botonMundo4.setVisible(false);*/

    //PERGAMINO
    this.paperDescription1 = this.add.image(gameWidth*13/16, gameHeight*7/16, 'paperDesciptionMSM');
    this.paperDescription1.setVisible(false);

    //BOTON JUGAR
    this.playButtonMSM = this.add.image(gameWidth*13/16, gameHeight*11/16, 'playButtonMSM');
    this.playButtonMSM.setScale(2/3);
    this.playButtonMSM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.World1Menu());
    this.playButtonMSM.setVisible(false);

    //Texto tiempo
    this.timeText = this.add.text(gameWidth*8.2/16, gameHeight*7.5/16, "TEXTO" , {fontFamily: "Acadian_Runes", fill: "white", fontSize: 18});
    //this.timeText.setPosition(gameWidth/2, gameHeight/2);

    this.events.once("Update Date", this.updateTimeText, this);
    this.events.once("Unlock World", this.unlockWorld, this);
  }

  update(){
    this.events.emit("Update Date",this.timeText);
  }

  ActivatePaper(){
    this.paperDescription1.setVisible(true);
    this.playButtonMSM.setVisible(true);
    this.shopButtonW1M.setVisible(false);
    this.backButtonMSM.setVisible(false);
    this.timeText.setVisible(false);
  }

  DesactivatePaper(){
    this.paperDescription1.setVisible(false);
    this.playButtonMSM.setVisible(false);
    this.shopButtonW1M.setVisible(true);
    this.backButtonMSM.setVisible(true);
    this.timeText.setVisible(true);
  }

  BackMainMenu(){
    this.scene.pause('MapSelectionMenu');
    this.scene.start('MainMenu');
  }

  ShopMenuMSM(){
    prevScene = 'MapSelectionMenu';
    this.scene.stop('World1Map');
    this.scene.start('ShopMenu');
  }

  World1Menu(){
    this.scene.pause('MapSelectionMenu');
    this.scene.start('World1Map');
    this.scene.bringToTop('World1Map');
  }

/*  World4Menu(){
    this.scene.pause('MapSelectionMenu');
    this.scene.start('World1Map');
    this.scene.bringToTop('World1Map');
  }
*/

  updateTimeText() {
    var dias = Math.round((unlockDate -  new Date()) / 86400000);
    var horas =  Math.round((unlockDate -  new Date()) / 3600000)-(dias*24);
    //this.timeText.setText("Quedan " + dias + " días y \n" + horas +" horas para desbloquear el siguiente Mundo");
    //poner If english = dias + days left
    this.timeText.setText(dias + " días \n" + "restantes");
    if(unlockDate -  new Date() < 0 || unlockDate == new Date()){
      this.timeText.setText("NUEVO MUNDO DESBLOQUEADO");
      this.events.emit("Unlock World",);
    }
  }

  unlockWorld(){
    this.events.emit("Update Date");
  }

}

class MapSelectionMenu extends Phaser.Scene{
  constructor(){
      super("MapSelectionMenu");
  }

  preload(){

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

    //BOTON TIENDA
    this.shopButtonW1M = this.add.image(wid*14/16, heig*1/16, 'shopButtonMM');
    this.shopButtonW1M.setScale(1.5/3);
    this.shopButtonW1M.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.ShopMenuMSM());

    //BOTON JUGAR MUNDO 1
    this.botonMundo1 = this.add.image(wid*5.5/16, heig*5.45/16, 'World1Button');
    this.botonMundo1.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.World1Menu());

    //BOTON JUGAR MUNDO 4
    this.botonMundo4 = this.add.image(wid*8.44/16, heig*14.05/16, 'World4Button');
    this.botonMundo4.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.World4Menu());
    this.botonMundo4.setVisible(false);

    this.timeText = this.add.text(0,0, "TEXTO" , {fill: "white"});
    this.timeText.setPosition(wid/2, heig/2);

    this.events.once("Update Date", this.updateTimeText, this);
    this.events.once("Unlock World", this.unlockWorld, this);
  }

  update(){
    this.events.emit("Update Date",this.timeText);
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

  World4Menu(){
    /*this.scene.pause('MapSelectionMenu');
    this.scene.start('World1Map');
    this.scene.bringToTop('World1Map');*/
  }

  updateTimeText() {
    var dias = Math.round((unlockDate -  new Date()) / 86400000);
    var horas =  Math.round((unlockDate -  new Date()) / 3600000)-(dias*24);
    this.timeText.setText("Quedan " + dias + " días y \n" + horas +" horas para desbloquear el siguiente Mundo");
    if(unlockDate -  new Date() < 0 || unlockDate == new Date()){
      this.timeText.setText("NUEVO MUNDO DESBLOQUEADO");
      this.events.emit("Unlock World",);
    }
  }

  unlockWorld(){
    this.events.emit("Update Date");
  }

}

class MapSelectionMenu extends Phaser.Scene{
  constructor(){
      super("MapSelectionMenu");
  }

  preload(){

  }

  create(){

    this.cameras.main.fadeIn(1000, 0, 0, 0);



    //BACKGROUND
    this.backgroundMSM = this.add.image(0, 0, 'backgroundMSM');
    this.backgroundMSM.setPosition(gameWidth/2, gameHeight/2);
    this.backgroundMSM.setScale(2/3);
    this.backgroundMSM.setInteractive({useHandCursor: false}).on('pointerdown', () => this.DesactivatePaper());

    //WORLD 1 BUTTON
    this.botonMundo1 = this.add.image(gameWidth*5.85/16, gameHeight*6.95/16, 'World1Button');
    this.botonMundo1.setScale(2/3);
    this.botonMundo1.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.ActivatePaper(1));
    this.botonMundo1.alpha = (0.0001);


    //WORLD 2 BUTTON
    this.botonMundo2 = this.add.image(gameWidth*8.35/16, gameHeight*7.85/16, 'World2Button');
    this.botonMundo2.setScale(2/3);
    this.botonMundo2.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.ActivatePaper(2));
    this.botonMundo2.alpha = (0.0001);


    //BOTON ATRAS
    this.backButtonMSM = this.add.image(gameWidth*14/16, gameHeight*15/16, 'backButton');
    this.backButtonMSM.setScale(2/3);
    this.backButtonMSMSel = this.add.image(gameWidth*13.72/16, gameHeight*14.78/16, 'selSmallLeftButton');
    this.backButtonMSMSel.setScale(2/3);
    this.backButtonMSMSel.setVisible(false);
    //Texto Boton
    this.backText = this.add.text(gameWidth*13.63/16, gameHeight*14.6/16,  stringsJSON.Buttons.back, {fontFamily: "Acadian_Runes",fontSize: "20px", align: 'center', fill: "#481d18"});
    //Acciones Boton
    this.backButtonMSM.on('pointerover', function (pointer) {this.backButtonMSMSel.setVisible(true);}, this);
    this.backButtonMSM.on('pointerout', function (pointer) {this.backButtonMSMSel.setVisible(false);}, this);
    this.backButtonMSM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BackMainMenu());

    //BOTON TIENDA
    this.shopButtonW1M = this.add.image(gameWidth*14/16, gameHeight*1/16, 'shopButtonIG');
    this.shopButtonW1M.setScale(1/3);
    this.shopButtonW1M.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.ShopMenuMSM());



    //FULL SCREEN
    this.fullScreenMSM = this.add.image(gameWidth*15.5/16, gameHeight*13/14, 'buttonFullScreen');
    this.fullScreenMSM.setScale(2/60);
    this.fullScreenMSM.setInteractive({ useHandCursor: true})
		.on('pointerdown', function() {
      this.scene.scale.toggleFullscreen();
    });

    //PERGAMINO
    this.paperDescription1 = this.add.image(gameWidth*13.7/16, gameHeight*8.15/16, 'paperWorld1');
    this.paperDescription1.setScale(2/3);
    this.paperDescription1.setVisible(false);

    //BOTON JUGAR
    this.playButtonMSM = this.add.image(gameWidth*13.7/16, gameHeight*13.75/16, 'playButton');
    this.playButtonMSM.setScale(2/3);
    this.playButtonMSM.setVisible(false);
    this.playButtonMSMSel = this.add.image(gameWidth*13.7/16, gameHeight*13.75/16, 'playButtonSel');
    this.playButtonMSMSel.setScale(2/3);
    this.playButtonMSMSel.setVisible(false);
    //Acciones Boton
    this.playButtonMSM.on('pointerover', function (pointer) {this.playButtonMSMSel.setVisible(true);}, this);
    this.playButtonMSM.on('pointerout', function (pointer) {this.playButtonMSMSel.setVisible(false);}, this);
    this.playButtonMSM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.World1Menu());

    //Texto tiempo
    this.timeText = this.add.text(gameWidth*8.2/16, gameHeight*7.5/16, "TEXTO" , {fontFamily: "Acadian_Runes", fill: "white", fontSize: 18});

    this.events.once("Update Date", this.updateTimeText, this);
    this.events.once("Unlock World", this.unlockWorld, this);
  }

  update(){
    this.events.emit("Update Date",this.timeText);
  }

  ActivatePaper(level){

    if(level == 1){
      this.paperDescription1.setVisible(true);
      this.playButtonMSM.setVisible(true);
      this.shopButtonW1M.setVisible(false);
      this.backButtonMSM.setVisible(false);
      this.backText.setVisible(false);
      this.timeText.setVisible(false);
    }

  }

  DesactivatePaper(){
    this.paperDescription1.setVisible(false);
    this.playButtonMSM.setVisible(false);
    this.shopButtonW1M.setVisible(true);
    this.backButtonMSM.setVisible(true);
    this.backText.setVisible(true);
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

  updateTimeText() {
    var dias = Math.round((unlockDate -  new Date()) / 86400000)-31;
    var horas =  Math.round((unlockDate -  new Date()) / 3600000)-((dias+30)*24);
    //this.timeText.setText("Quedan " + dias + " días y \n" + horas +" horas para desbloquear el siguiente Mundo");
    //poner If english = dias + days left
    if(dias==0){
      this.timeText.setText(horas + " horas \n" + "restantes");     
    }
    else{
      this.timeText.setText(dias + " días \n" + "restantes");     
    }
    if(unlockDate -  new Date() < 0 || unlockDate == new Date()){
      this.timeText.setText("NUEVO MUNDO DESBLOQUEADO");
      this.events.emit("Unlock World",);
    }
  }

  unlockWorld(){
    this.events.emit("Update Date");
  }

}

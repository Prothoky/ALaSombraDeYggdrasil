class MapSelectionMenu extends Phaser.Scene{
  constructor(){
      super("MapSelectionMenu");
  }

  preload(){

  }

  create(){

    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.clickSound = this.sound.add('ClickButtonSound', this.EffectsConfig());

    //BACKGROUND

    if(user.world[1] == false){
      this.backgroundMSM = this.add.image(0, 0, 'backgroundMSM');
      if(userConfig.lang == "en"){
        this.backgroundMSM.setTexture('backgroundMSMEn');
      }
    }else{
      this.backgroundMSM = this.add.image(0, 0, 'backgroundMSMWolrd1Comp');
      if(userConfig.lang == "en"){
        this.backgroundMSM.setTexture('backgroundMSMWolrd1CompEn');
      }
    }

    this.backgroundMSM.setPosition(gameWidth/2, gameHeight/2);
    this.backgroundMSM.setScale(2/3);
    this.backgroundMSM.setInteractive({useHandCursor: false}).on('pointerdown', () => this.DesactivatePaper());

    //WORLD 1 BUTTON
    this.botonMundo1 = this.add.image(gameWidth*5.85/16, gameHeight*6.95/16, 'World1Button');
    this.botonMundo1.setScale(2/3);
    this.botonMundo1.alpha = (0.0001);

    this.botonMundo1BOX = this.add.image(gameWidth*5.85/16, gameHeight*6.95/16, 'boxWorld1');
    this.botonMundo1BOX.setScale(2/3);
    this.botonMundo1BOX.alpha = 0.001;

    this.nameWorld1 = this.add.image(gameWidth*5.85/16, gameHeight*5.7/16, 'NameWorld1');
    this.nameWorld1.setScale(1.5/3);
    this.nameWorld1.setVisible(false);

    if(PC){
      this.botonMundo1.on('pointerover', function (pointer) {this.nameWorld1.setVisible(true);}, this);
      this.botonMundo1.on('pointerout', function (pointer) {this.nameWorld1.setVisible(false);}, this);
      this.botonMundo1.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.ActivatePaper(1));
    }else{
      this.botonMundo1BOX.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.ActivatePaper(1));
    }



    //WORLD 2 BUTTON
    this.botonMundo2 = this.add.image(gameWidth*8.35/16, gameHeight*7.85/16, 'World2Button');
    this.botonMundo2.setScale(2/3);
    this.botonMundo2.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.ActivatePaper(2));
    this.botonMundo2.alpha = (0.0001);

    this.botonMundo2BOX = this.add.image(gameWidth*8.35/16, gameHeight*7.85/16, 'boxWorld1');
    this.botonMundo2BOX.setScale(2/3);
    this.botonMundo2BOX.alpha = 0.001;

    this.nameWorld2 = this.add.image(gameWidth*8.55/16, gameHeight*6.2/16, 'NameWorld2');
    this.nameWorld2.setScale(1.5/3);
    this.nameWorld2.setVisible(false);

    if(PC){
      if(user.world[1] == true){
        this.botonMundo2.on('pointerover', function (pointer) {this.nameWorld2.setVisible(true);this.timeText.setVisible(true);}, this);
        this.botonMundo2.on('pointerout', function (pointer) {this.nameWorld2.setVisible(false);this.timeText.setVisible(false);}, this);
      }

      this.botonMundo2.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.DesactivatePaper());
    }

    //BOTON ATRAS
    this.backButtonMSM = this.add.image(gameWidth*14.5/16, gameHeight*14.8/16, 'deselectedButtonSmall');
    this.backButtonMSM.setScale(1.5/3);
    this.backButtonMSMSel = this.add.image(gameWidth*14.3/16, gameHeight*14.8/16, 'selSmallLeftButton');
    this.backButtonMSMSel.setScale(1.5/3);
    this.backButtonMSMSel.setVisible(false);
    //Texto Boton
    this.backText = this.add.text(gameWidth*14.18/16, gameHeight*14.61/16,  stringsJSON.Buttons.back, {fontFamily: "Acadian_Runes",fontSize: "16px", align: 'center', fill: "#481d18"});
    if (userConfig.lang == "en"){
      this.backText.setX(gameWidth*14.24 /16);
    }
    //Acciones Boton
    this.backButtonMSM.on('pointerover', function (pointer) {this.backButtonMSMSel.setVisible(true);}, this);
    this.backButtonMSM.on('pointerout', function (pointer) {this.backButtonMSMSel.setVisible(false);}, this);
    this.backButtonMSM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BackMainMenu());

    //FULL SCREEN
    this.fullScreenMSM = this.add.image(gameWidth*15.5/16, gameHeight*13/14, 'buttonFullScreen');
    this.fullScreenMSM.setScale(2/60);
    this.fullScreenMSM.setInteractive({ useHandCursor: true})
		.on('pointerdown', function() {
      this.scene.scale.toggleFullscreen();
    });

    //PERGAMINO
    if(userConfig.lang == "es"){
      this.paperDescription1 = this.add.image(gameWidth*13.7/16, gameHeight*8.15/16, 'paperWorld1');
    }else{
      this.paperDescription1 = this.add.image(gameWidth*13.7/16, gameHeight*8.15/16, 'paperWorld1En');
    }

    this.paperDescription1.setScale(2/3);
    this.paperDescription1.setVisible(false);

    //PLAY BUTTON
    this.playButtonMSM = this.add.image(gameWidth*13.7/16, gameHeight*13.83/16, 'playButton');
    if(userConfig.lang == "en"){
      this.playButtonMSM.setTexture('playButtonEn');
    }
    this.playButtonMSM.setScale(2/3);
    this.playButtonMSM.setVisible(false);

    this.playButtonBOX = this.add.image(gameWidth*13.7/16, gameHeight*13.83/16, 'boxPlayArrow');
    this.playButtonBOX.setScale(2/3);
    this.playButtonBOX.alpha = 0;

    this.playButtonMSMSel = this.add.image(gameWidth*13.7/16, gameHeight*13.83/16, 'playButtonSel');
    if(userConfig.lang == "en"){
      this.playButtonMSMSel.setTexture('playButtonSelEn');
    }
    this.playButtonMSMSel.setScale(2/3);
    this.playButtonMSMSel.setVisible(false);
    //Acciones Boton
    if(PC){
      this.playButtonMSM.on('pointerover', function (pointer) {this.playButtonMSMSel.setVisible(true);}, this);
      this.playButtonMSM.on('pointerout', function (pointer) {this.playButtonMSMSel.setVisible(false);}, this);
      this.playButtonMSM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.World1Menu());
    }else{
      this.playButtonBOX.on('pointerover', function (pointer) {this.playButtonMSMSel.setVisible(true);}, this);
      this.playButtonBOX.on('pointerout', function (pointer) {this.playButtonMSMSel.setVisible(false);}, this);
      this.playButtonBOX.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.World1Menu());
    }


    //BOTON TIENDA
    this.optionsButtonMSM = this.add.image(gameWidth*14.5/16, gameHeight*1.1/16, 'deselectedButtonSmall');
    this.optionsButtonMSM.setScale(1.5/3);
    this.optionsButtonMSMSel = this.add.image(gameWidth*14.3/16, gameHeight*1.1/16, 'selSmallLeftButton');
    this.optionsButtonMSMSel.setScale(1.5/3);
    this.optionsButtonMSMSel.setVisible(false);
    this.optButtonText = this.add.text(gameWidth*14.1/16, gameHeight*0.92/16,  stringsJSON.Buttons.options, {fontFamily: "Acadian_Runes",fontSize: "15px", align: 'center', fill: "#481d18"});
    if (userConfig.lang == "en"){
      this.optButtonText.setX(gameWidth*14.1 /16);
    }
    this.optionsButtonMSM.on('pointerover', function (pointer) {this.optionsButtonMSMSel.setVisible(true);}, this);
    this.optionsButtonMSM.on('pointerout', function (pointer) {this.optionsButtonMSMSel.setVisible(false);}, this);
    this.optionsButtonMSM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.OptionsMenuMSM());

    //Texto tiempo
    this.timeText = this.add.text(gameWidth*8.1/16, gameHeight*7.5/16, "TEXTO" , {fontFamily: "Acadian_Runes", fill: "white", fontSize: 18});
    this.timeText.setVisible(false);
    if (userConfig.lang == "en"){
      this.timeText.setX(gameWidth*8.2/16);
    }

    this.events.once("Update Date", this.updateTimeText, this);
    this.events.once("Unlock World", this.unlockWorld, this);
  }

  update(){
    this.events.emit("Update Date",this.timeText);


  }

  ActivatePaper(level){
    this.clickSound.play();

    if(level == 1){
      this.paperDescription1.setVisible(true);
      this.playButtonMSM.setVisible(true);
      this.backButtonMSM.setVisible(false);
      this.backText.setVisible(false);
      this.fullScreenMSM.setVisible(false);
      this.optButtonText.setVisible(false);
      this.optionsButtonMSM.setVisible(false);
      this.playButtonBOX.alpha = 0.0001;
    }

  }

  DesactivatePaper(){
    this.paperDescription1.setVisible(false);
    this.playButtonMSM.setVisible(false);
    this.backButtonMSM.setVisible(true);
    this.backText.setVisible(true);
    this.optButtonText.setVisible(true);
    this.fullScreenMSM.setVisible(true);
    this.optionsButtonMSM.setVisible(true);
    this.playButtonBOX.alpha = 0;
  }

  BackMainMenu(){
    this.clickSound.play();
    this.scene.pause('MapSelectionMenu');
    this.scene.start('MainMenu');
  }

  ShopMenuMSM(){
    this.clickSound.play();
    prevScene = 'MapSelectionMenu';
    this.scene.stop('World1Map');
    this.scene.start('ShopMenu');
  }

  World1Menu(){
    this.clickSound.play();
    this.scene.pause('MapSelectionMenu');
    this.scene.start('World1Map');
    this.scene.bringToTop('World1Map');
  }

  OptionsMenuMSM(){
    prevScene = 'MapSelectionMenu';
    this.clickSound.play();
    this.scene.pause('MapSelectionMenu');
    this.scene.start('OptionsMainMenu');
  }

  updateTimeText() {
    var dias = Math.round((unlockDate -  new Date()) / 86400000)-31;
    var horas =  Math.round((unlockDate -  new Date()) / 3600000)-((dias+30)*24);
    //this.timeText.setText("Quedan " + dias + " días y \n" + horas +" horas para desbloquear el siguiente Mundo");
    //poner If english = dias + days left
    if(dias==0){
      if (userConfig.lang == "es"){
        this.timeText.setText(horas + " horas \n" + "restantes");
      }else{
        this.timeText.setText(horas + " hours \n" + "  left");
      }
    }
    else{
      if (userConfig.lang == "es"){
        this.timeText.setText(" " + dias + " días \n" + "restantes");
      }else{
        this.timeText.setText(dias + " days \n" + "  left");
      }

    }
    if(unlockDate -  new Date() < 0 || unlockDate == new Date()){

      if (userConfig.lang == "es"){
        this.timeText.setText("NUEVO MUNDO DESBLOQUEADO");
      }else{
        this.timeText.setText("NEW WORLD UNLOCKED");
      }
      this.events.emit("Unlock World",);
    }
  }

  unlockWorld(){
    this.events.emit("Update Date");
  }

  EffectsConfig(){
    return {
      mute: false,
      volume: userConfig.volumeEffects/10,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0
    };
  }

}

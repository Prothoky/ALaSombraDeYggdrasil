class GameOverMenu extends Phaser.Scene{
  constructor(){
      super("GameOverMenu");
  }

  create(){

    this.clickSound = this.sound.add('ClickButtonSound', this.EffectsConfig());
    this.cameras.main.fadeIn(500, 0, 0, 0);

      if(arcadeMode == false){
        if(userConfig.lang == "es"){
          this.backgroundGOM = this.add.image(gameWidth/2, gameHeight/2, 'GameOverBackgr');
        }else{
          this.backgroundGOM = this.add.image(gameWidth/2, gameHeight/2, 'GameOverBackgrEn');
        }
      }else{
        if(userConfig.lang == "es"){
          this.backgroundGOM = this.add.image(gameWidth/2, gameHeight/2, 'GameOverArcBackgr');
        }else{
          this.backgroundGOM = this.add.image(gameWidth/2, gameHeight/2, 'GameOverArcBackgrEn');
        }
      }

    this.backgroundGOM.setScale(2/3);


    //Volver a Jugar
    //Botones
    this.retryButtonGOM = this.add.image(gameWidth*6.32/16, gameHeight*11.7/16, 'deselectedButton');
    this.retryButtonGOM.setScale(2/3);
    this.retryButtonGOMSel = this.add.image(gameWidth*5.97/16, gameHeight*11.7/16, 'selLeftButton');
    this.retryButtonGOMSel.setScale(2/3);
    this.retryButtonGOMSel.setVisible(false);
    //Texto
    this.retryButtonText = this.add.text(gameWidth*5.3/16, gameHeight*11.17/16,  stringsJSON.Buttons.retry , {fontFamily: "Acadian_Runes", fill: "#481d18", fontSize: "40px"});
    if (userConfig.lang == "en"){
      this.retryButtonText.setX(gameWidth*5.65/16);
    }
    //Acciones Boton
    this.retryButtonGOM.on('pointerover', function (pointer) {this.retryButtonGOMSel.setVisible(true);}, this);
    this.retryButtonGOM.on('pointerout', function (pointer) {this.retryButtonGOMSel.setVisible(false);}, this);
    this.retryButtonGOM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.PlayAgain());


    //QUIT
    //Botones
    this.quitButtonGOM = this.add.image(gameWidth*9.67/16, gameHeight*11.7/16, 'deselectedButton');
    this.quitButtonGOM.setScale(2/3);
    this.quitButtonGOMSel = this.add.image(gameWidth*10.0/16, gameHeight*11.7/16, 'selRightButton');
    this.quitButtonGOMSel.setScale(2/3);
    this.quitButtonGOMSel.setVisible(false);
    //Texto
    this.quitButtonText = this.add.text(gameWidth*9/16, gameHeight*11.17/16,  stringsJSON.Buttons.quit , {fontFamily: "Acadian_Runes", fill: "#481d18", fontSize: "40px"});
    //Acciones Boton
    this.quitButtonGOM.on('pointerover', function (pointer) {this.quitButtonGOMSel.setVisible(true);}, this);
    this.quitButtonGOM.on('pointerout', function (pointer) {this.quitButtonGOMSel.setVisible(false);}, this);
    this.quitButtonGOM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.QuitGameGOM());

    //TEXT SHOWED

    if(arcadeMode == true){
      if(user.maxDistanceArcade==null){
        user.maxDistanceArcade=0;
      }

        if (distanceAchieved > user.maxDistanceArcade ){
          user.maxDistanceArcade = distanceAchieved;
        }

        this.DialogTextD = this.add.text(gameWidth*8.4/16, gameHeight*5.2/16,  (distanceAchieved ), {fontFamily: "Acadian_Runes",  fontSize: 24, stroke:'#450000', fill: "black", strokeThickness: 1});
        if (userConfig.lang == "en"){
          this.DialogTextD.setX(gameWidth*8/16);
        }
        this.DialogTextDM = this.add.text(gameWidth*8/16, gameHeight*6.9/16,  (user.maxDistanceArcade) , {fontFamily: "Acadian_Runes",  fontSize: 24, stroke:'#450000', fill: "black", strokeThickness: 1});


        distanceAchieved = 0;

        saveUserData();
    }

    }



  PlayAgain(){
    this.clickSound.play();
    this.scene.stop('GameOverMenu');
    this.scene.start('LevelManager');
    this.scene.bringToTop('LevelManager');
  }

  QuitGameGOM(){
    this.clickSound.play();
    if (arcadeMode == true){
      this.scene.pause('GameOverMenu');
      this.scene.sendToBack('GameOverMenu');
      this.scene.start('MainMenu');
    }else{
      this.scene.pause('GameOverMenu');
      this.scene.sendToBack('GameOverMenu');
      this.scene.start('World1Map');
    }
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

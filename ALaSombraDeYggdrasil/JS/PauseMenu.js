class PauseMenu extends Phaser.Scene{
  constructor(){
      super("PauseMenu");
  }

  preload(){

  }

  create(){

    var backgroundPM = this.add.image(0, 0, 'backgroundPM');
    backgroundPM.setScale(2/3);
    backgroundPM.setPosition(gameWidth/2, gameHeight/2);

    //BOTON ATRAS
    this.backButtonPM = this.add.image(gameWidth*8/16, gameHeight*6.7/16, 'deselectedButton');
    this.backButtonPM.setScale(2/3);
    this.backButtonPMSel = this.add.image(gameWidth*7.65/16, gameHeight*6.7/16, 'selLeftButton');
    this.backButtonPMSel.setScale(2/3);
    this.backButtonPMSel.setVisible(false);
    //Text
    this.backText = this.add.text(gameWidth*7.05/16, gameHeight*6.3/16,  stringsJSON.Buttons.back, {fontFamily: "Acadian_Runes",fontSize: "40px", align: 'center', fill: "#481d18"});
    //Actions
    this.backButtonPM.on('pointerover', function (pointer) {this.backButtonPMSel.setVisible(true);}, this);
    this.backButtonPM.on('pointerout', function (pointer) {this.backButtonPMSel.setVisible(false);}, this);
    this.backButtonPM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BackGame());

    //BOTON OPCIONES
    this.optionsButtonPM = this.add.image(gameWidth*8/16, gameHeight*9.8/16, 'deselectedButton');
    this.optionsButtonPM.setScale(2/3);
    this.optionsButtonPMSel = this.add.image(gameWidth*8.35/16, gameHeight*9.8/16, 'selRightButton');
    this.optionsButtonPMSel.setScale(2/3);
    this.optionsButtonPMSel.setVisible(false);
    //Text
    this.optionsText = this.add.text(gameWidth*7/16, gameHeight*9.3/16,  stringsJSON.Buttons.options, {fontFamily: "Acadian_Runes",fontSize: "40px", align: 'center', fill: "#481d18"});
    //Actions
    this.optionsButtonPM.on('pointerover', function (pointer) {this.optionsButtonPMSel.setVisible(true);}, this);
    this.optionsButtonPM.on('pointerout', function (pointer) {this.optionsButtonPMSel.setVisible(false);}, this);
    this.optionsButtonPM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.GoOptionsMenu());

    //BOTON ABANDONAR
    this.quitButtonPM = this.add.image(gameWidth*8/16, gameHeight*13/16, 'deselectedButton');
    this.quitButtonPM.setScale(2/3);
    this.quitButtonPMSel = this.add.image(gameWidth*7.65/16, gameHeight*13/16, 'selLeftButton');
    this.quitButtonPMSel.setScale(2/3);
    this.quitButtonPMSel.setVisible(false);
    //Text
    this.quitText = this.add.text(gameWidth*7.5/16, gameHeight*12.5/16,  stringsJSON.Buttons.quit, {fontFamily: "Acadian_Runes",fontSize: "40px", align: 'center', fill: "#481d18"});
    //Actions
    this.quitButtonPM.on('pointerover', function (pointer) {this.quitButtonPMSel.setVisible(true);}, this);
    this.quitButtonPM.on('pointerout', function (pointer) {this.quitButtonPMSel.setVisible(false);}, this);
    this.quitButtonPM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.QuitGame());

  }

  GoOptionsMenu(){
    this.scene.stop('PauseMenu');
    this.scene.start('OptionsPauseMenu');
    this.scene.bringToTop('OptionsPauseMenu');
  }

  BackGame(){
    //gamePaused = false;
    this.scene.stop('PauseMenu');
    this.scene.sendToBack('PauseMenu');
    this.scene.resume('LevelManager');
  }

  QuitGame(){
    this.scene.stop('LevelManager');
    if(arcadeMode==true){
      this.scene.start('MainMenu');
      this.scene.bringToTop('MainMenu');
    }
    else{
      this.scene.start('World1Map');
      this.scene.bringToTop('World1Map');
    }
  }
}

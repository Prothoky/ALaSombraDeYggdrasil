class MainMenu extends Phaser.Scene{
  constructor(){
      super("MainMenu");
  }


  create(){

    this.cameras.main.fadeIn(1000, 0, 0, 0);
    console.log(userConfig.lang);

    // Controlador de audio
    let config = {
      mute: false,
      volume: userConfig.volumeMusic/10,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    };

    this.clickSound = this.sound.add('ClickButtonSound', this.EffectsConfig);


    if (musicMenu == null || !musicMenu.isPlaying) {
      musicMenu = this.sound.add('music_3', config);
      musicMenu.play();
      if (musicGameplay != null && musicGameplay.isPlaying) {
        musicGameplay.stop();
      }
    }
    if (musicGameplay == null) {
      musicGameplay = this.sound.add('music_2', config);
    }

    this.backgroundMM = this.add.image(0, 0, 'backgroundMM');
    this.backgroundMM.setOrigin(0, 0);
    this.backgroundMM.setScale(2/3);


    //ARCADE
    //Botones
    this.arcadeButton = this.add.image(gameWidth*7.47/16, gameHeight*7.25/16, 'deselectedButton');
    this.arcadeButton.setScale(2/3);
    this.arcadeButtonSel = this.add.image(gameWidth*7.12/16, gameHeight*7.25/16, 'selLeftButton');
    this.arcadeButtonSel.setScale(2/3);
    this.arcadeButtonSel.setVisible(false);
    //Texto
    this.arcadeButtonText = this.add.text(gameWidth*6.6/16, gameHeight*6.72/16,  stringsJSON.Buttons.arcade , {fontFamily: "Acadian_Runes", fill: "#481d18", fontSize: "40px"});
    //Acciones Boton
    this.arcadeButton.on('pointerover', function (pointer) {this.arcadeButtonSel.setVisible(true);}, this);
    this.arcadeButton.on('pointerout', function (pointer) {this.arcadeButtonSel.setVisible(false);}, this);
    this.arcadeButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.InitArcadeGame());

    //MODO HISTORIA
    //Botones
    this.historyButton = this.add.image(gameWidth*10.3/16, gameHeight*7.25/16, 'deselectedButton');
    this.historyButton.setScale(2/3);
    this.historyButtonSel = this.add.image(gameWidth*10.65/16, gameHeight*7.25/16, 'selRightButton');
    this.historyButtonSel.setVisible(false);
    this.historyButtonSel.setScale(2/3);
    //Texto

    this.historyButtonText = this.add.text(gameWidth*9.35/16, gameHeight*6.72/16,  stringsJSON.Buttons.story , {fontFamily: "Acadian_Runes", fill: "#481d18", fontSize: "40px"});

    if (userConfig.lang == "en"){
      this.historyButtonText.setX(gameWidth*9.6/16)
    }
    //Funciones Botones
    this.historyButton.on('pointerover', function (pointer) {this.historyButtonSel.setVisible(true);}, this);
    this.historyButton.on('pointerout', function (pointer) {this.historyButtonSel.setVisible(false);}, this);
    this.historyButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.InitGame());


    //TUTORIAL MENU
    //Botones
    this.tutorialButton = this.add.image(gameWidth*8.9/16, gameHeight*9.45/16, 'deselectedButton');
    this.tutorialButton.setScale(2/3);
    this.tutorialButtonSel = this.add.image(gameWidth*8.53/16, gameHeight*9.45/16, 'selLeftButton');
    this.tutorialButtonSel.setVisible(false);
    this.tutorialButtonSel.setScale(2/3);
    //Texto
    this.tutorialButtonText = this.add.text(gameWidth*7.8/16, gameHeight*9/16,  stringsJSON.Buttons.tutorial , {fontFamily: "Acadian_Runes", fill: "#481d18", fontSize: "40px"});
    //Funciones Botones
    this.tutorialButton.on('pointerover', function (pointer) {this.tutorialButtonSel.setVisible(true);}, this);
    this.tutorialButton.on('pointerout', function (pointer) {this.tutorialButtonSel.setVisible(false);}, this);
    this.tutorialButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.TutorialMenu());


    //OPTIONS MENU
    //Botones
    this.optionsButton = this.add.image(gameWidth*8.9/16, gameHeight*11.7/16, 'deselectedButton');
    this.optionsButton.setScale(2/3);
    this.optionsButtonSel = this.add.image(gameWidth*9.25/16, gameHeight*11.7/16, 'selRightButton');
    this.optionsButtonSel.setVisible(false);
    this.optionsButtonSel.setScale(2/3);
    //Texto
    this.optionsButtonText = this.add.text(gameWidth*7.8/16, gameHeight*11.2/16,  stringsJSON.Buttons.options , {fontFamily: "Acadian_Runes", fill: "#481d18", fontSize: "40px"});
    if (userConfig.lang == "en"){
      this.optionsButtonText.setX(gameWidth*8/16)
    }
    //Acciones boton
    this.optionsButton.on('pointerover', function (pointer) {this.optionsButtonSel.setVisible(true);}, this);
    this.optionsButton.on('pointerout', function (pointer) {this.optionsButtonSel.setVisible(false);}, this);
    this.optionsButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => (this.OptionsGame()));


    //CREDITS MENU
    //Botones
    this.creditsButton = this.add.image(gameWidth*8.9/16, gameHeight*13.75/16, 'deselectedButton');
    this.creditsButton.setScale(2/3);
    this.creditsButtonSel = this.add.image(gameWidth*8.53/16, gameHeight*13.75/16, 'selLeftButton');
    this.creditsButtonSel.setScale(2/3);
    this.creditsButtonSel.setVisible(false);
    //Texto
    this.creditsButtonText = this.add.text(gameWidth*7.8/16, gameHeight*13.3/16,  stringsJSON.Buttons.credits , {fontFamily: "Acadian_Runes", fill: "#481d18", fontSize: "40px"});
    if (userConfig.lang == "en"){
      this.creditsButtonText.setX(gameWidth*8/16)
    }
    //Funciones Botones
    this.creditsButton.on('pointerover', function (pointer) {this.creditsButtonSel.setVisible(true);}, this);
    this.creditsButton.on('pointerout', function (pointer) {this.creditsButtonSel.setVisible(false);}, this);
    this.creditsButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.GameCredits());

    //FULL SCREEN
    this.fullScreen = this.add.image(gameWidth*15.5/16, gameHeight*13/14, 'buttonFullScreen');
    this.fullScreen.setScale(2/60);
    this.fullScreen.setInteractive({ useHandCursor: true})
		.on('pointerdown', function() {
      this.scene.scale.toggleFullscreen();
    });

  }

  InitGame(){
    this.clickSound.play();
    this.scene.pause('MainMenu');
    this.scene.start('MapSelectionMenu');
    arcadeMode = false;

  }

  InitArcadeGame(){
    this.clickSound.play();
    arcadeMode = true;

    this.cameras.main.fadeOut(1000, 0, 0, 0);
    this.time.delayedCall(1000, () => {
      this.scene.pause('MainMenu');
      this.scene.start('LevelManager');
    });

  }

  OptionsGame(){
    this.clickSound.play();
    this.scene.pause('MainMenu');
    this.scene.start('OptionsMainMenu');
  }

  GameCredits(){
    this.clickSound.play();
    this.scene.pause('MainMenu');
    this.scene.start('CreditsMenu');
  }

  TutorialMenu(){
    this.clickSound.play();
    this.scene.pause('MainMenu');
    this.scene.start('TutorialMenu');
    prevScene = 'MainMenu';
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

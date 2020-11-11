class MainMenu extends Phaser.Scene{
  constructor(){
      super("MainMenu");
  }


  create(){

    this.cameras.main.fadeIn(1000, 0, 0, 0);

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

    if (musicMenu == null) {
      musicMenu = this.sound.add('test', config);
      musicMenu.play();
    }
    if (musicGameplay == null) {
      musicGameplay = this.sound.add('test2', config);
    }

    this.backgroundMM = this.add.image(0, 0, 'backgroundMM');
    this.backgroundMM.setOrigin(0, 0);
    this.backgroundMM.setScale(2/3);

    //JUGAR
    this.arcadeButton = this.add.image(gameWidth*6.5/16, gameHeight*6/16, 'arcadeButton');
    this.arcadeButton.setScale(2/3);
    this.arcadeButton.on('pointerover', function (pointer) {this.arcadeButton.setScale(0.9);}, this);
    this.arcadeButton.on('pointerout', function (pointer) {this.arcadeButton.setScale(2/3);}, this);
    this.arcadeButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.InitArcadeGame());

    this.historyButton = this.add.image(gameWidth*9.5/16, gameHeight*6/16, 'historyButton');
    this.historyButton.setScale(2/3);
    this.historyButton.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => this.InitGame());

    //OPTIONS MENU
    this.optionsButton = this.add.image(gameWidth/2, gameHeight*8/16, 'optionsButton');
    this.optionsButton.setScale(2/3);
    this.optionsButton.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => (this.OptionsGame()));

    //CREDITS MENU
    this.creditsButton = this.add.image(gameWidth/2, gameHeight*10/16, 'creditsButton');
    this.creditsButton.setScale(2/3);
    this.creditsButton.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => this.GameCredits());

    //TUTORIAL MENU
    this.tutorialButton = this.add.image(gameWidth/2, gameHeight*12/16, 'tutorialButtonMM');
    this.tutorialButton.setScale(2/3);
    this.tutorialButton.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => this.TutorialMenu());

    //FULL SCREEN
    this.fullScreen = this.add.image(gameWidth*15.5/16, gameHeight*13/14, 'buttonFullScreen');
    this.fullScreen.setScale(2/60);
    this.fullScreen.setInteractive({ useHandCursor: true})
		.on('pointerdown', function() {
      this.scene.scale.toggleFullscreen();
    });

  }

  InitGame(){
    this.scene.pause('MainMenu');
    this.scene.start('MapSelectionMenu');
    arcadeMode = false;
  }

  InitArcadeGame(){
    arcadeMode = true;

    this.cameras.main.fadeOut(1000, 0, 0, 0);
    this.time.delayedCall(1000, () => {
      this.scene.pause('MainMenu');
      this.scene.start('LevelManager');
    });

  }

  OptionsGame(){
    this.scene.pause('MainMenu');
    this.scene.start('OptionsMainMenu');
  }

  GameCredits(){
    this.scene.pause('MainMenu');
    this.scene.start('CreditsMenu');
  }

  TutorialMenu(){
    this.scene.pause('MainMenu');
    this.scene.start('TutorialMenu');
    prevScene = 'MainMenu';
  }

}

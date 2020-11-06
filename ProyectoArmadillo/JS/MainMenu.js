class MainMenu extends Phaser.Scene{
  constructor(){
      super("MainMenu");
  }


  create(){
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


    var backgroundMM = this.add.image(0, 0, 'backgroundMM');
    backgroundMM.setOrigin(0, 0);
    backgroundMM.setScale(2/3);

    //JUGAR
  /*  this.playButton = this.add.image(gameWidth/2, gameHeight*6/16, 'playButton');
    this.playButton.setScale(2/3);
    this.playButton.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => this.InitGame());*/

    //JUGAR
    this.arcadeButton = this.add.image(gameWidth*6.5/16, gameHeight*6/16, 'arcadeButton');
    this.arcadeButton.setScale(2/3);
    this.arcadeButton.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => this.InitArcadeGame());

    this.historyButton = this.add.image(gameWidth*9.5/16, gameHeight*6/16, 'historyButton');
    this.historyButton.setScale(2/3);
    this.historyButton.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => this.InitGame());

    //OPTIONS MENU
    this.optionsButton = this.add.image(gameWidth/2, gameHeight*8/16, 'optionsButton');
    this.optionsButton.setScale(2/3);
    this.optionsButton.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => this.OptionsGame());

    //CREDITS MENU
    this.creditsButton = this.add.image(gameWidth/2, gameHeight*10/16, 'creditsButton');
    this.creditsButton.setScale(2/3);
    this.creditsButton.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => this.GameCredits());

    //SHOP MENU
    this.shopButton = this.add.image(gameWidth/2, gameHeight*12/16, 'shopButtonMM');
    this.shopButton.setScale(2/3);
    this.shopButton.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => this.ShopMenu());

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
    this.scene.pause('MainMenu');
    this.scene.start('LevelManager');
  }

  OptionsGame(){
    this.scene.pause('MainMenu');
    this.scene.start('OptionsMainMenu');
  }

  GameCredits(){
    this.scene.pause('MainMenu');
    this.scene.start('CreditsMenu');
  }

/*  SetFullScreen(){
    console.log ("Hola");
    //this.game.config.Phaser.scale.FIT;
    scene.scale.on('enterfullscreen', function() {});
  }*/

  ShopMenu(){
    this.scene.pause('MainMenu');
    this.scene.start('ShopMenu');
    prevScene = 'MainMenu';
  }

}

class CreditsMenu extends Phaser.Scene{
  constructor(){
      super("CreditsMenu");
  }

  create(){

    this.cameras.main.fadeIn(1500, 0, 0, 0);
    this.clickSound = this.sound.add('ClickButtonSound', this.EffectsConfig());

    //1) BACKGROUND
    this.bg_background = this.add.tileSprite(0, 0, 3772, 605, 'bg_background_ice');
    this.bg_far = this.add.tileSprite(0,0, 3772, 605, "bg_far_ice");
    this.bg_medium = this.add.tileSprite(0,0, 3772, 605, "bg_medium_ice");
    this.bg_near = this.add.tileSprite(0,-25, 3215, 515, "bg_near_ice");

    this.bg_near.depth = 2;

    this.bg_background.setOrigin(0,0);
    this.bg_far.setOrigin(0,0);
    this.bg_medium.setOrigin(0,0);
    this.bg_near.setOrigin(0,0);

    this.bg_near.setScale(1,1.25)

    // 2) CHARACTER
    this.player = this.physics.add.sprite(gameWidth*5/16, gameHeight*13.5/16, 'einar_running').setOrigin(1).setScale(0.56).setSize(70,145);
    this.player.body.setSize(this.player.width, this.player.height, true)
    this.player.depth = 1;  // Profundidad del sprie

    // FLOOR
    this.ground = this.physics.add.staticGroup();
    this.ground.create(gameWidth*2/16, gameHeight*13.75/16, 'ground').setOrigin(0, 0).setVisible(false).refreshBody();
    this.physics.add.collider(this.player, this.ground); // Permitimos colisiones entre suelo y jugador y cuenta como grounded (puede saltar)

    // 3) CREDITS
    this.credits = this.add.text(0, gameHeight + 5, stringsJSON.Credits , {fontFamily: "Acadian_Runes", fill: "white", fontSize: 18, align: 'center' ,boundsAlignH: "center", boundsAlignV: "middle"});
    this.credits.setOrigin(0,0);
    this.credits.depth=3;
    console.log(stringsJSON);
    console.log(stringsJSON.Credits);
    // 4) LOGO
    this.logo = this.add.image(0,500, 'logo');
    this.logo.setScale(0.125);
    this.logo.setOrigin(0.5,0.5);
    this.logo.depth=3;

    // 3) CAMERA
    this.cameras.main.startFollow(this.player, false, 1, 1, -250, 200); // Cámar sigue al personaje

    /*//FULL SCREEN
    this.fullScreen = this.add.image(gameWidth*15.5/16, gameHeight*13/14, 'buttonFullScreen');
    this.fullScreen.setScale(2/60);
    this.fullScreen.depth=3;
    this.fullScreen.setInteractive({ useHandCursor: true})
    .on('pointerdown', function() {
      this.scene.scale.toggleFullscreen();
    });*/

    //BACK BUTTON
    this.backButton = this.add.image(gameWidth*13.5/16, gameHeight*14.8/16,  'deselectedButtonSmall');
    this.backButton.setScale(1.5/3);
    this.backButtonSel = this.add.image(gameWidth*13.3/16, gameHeight*14.8/16, 'selSmallLeftButton');
    this.backButtonSel.setScale(1.5/3);
    this.backButtonSel.setVisible(false);

    //Texto Boton
    this.backText = this.add.text(this.cameras.main.x - 100, gameHeight*14.61/16,  stringsJSON.Buttons.back, {fontFamily: "Acadian_Runes",fontSize: "16px", align: 'center', fill: "#481d18"});
    //Acciones Boton
    this.backButton.on('pointerover', function (pointer) {this.backButtonSel.setVisible(true);}, this);
    this.backButton.on('pointerout', function (pointer) {this.backButtonSel.setVisible(false);}, this);
    this.backButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BackMainMenu());

    this.backButton.depth = 3;
    this.backButtonSel.depth = 3;
    this.backText.depth = 3;
    //PLAYER MOVEMENT
    this.player.anims.play('einar_running',true);
  }

  update(){

    this.bg_background.tilePositionX += 0.125;
    this.bg_far.tilePositionX += 0.25;
    this.bg_medium.tilePositionX += 0.75;
    this.bg_near.tilePositionX += 2;

    this.credits.setX(this.cameras.main.x+625);
    this.logo.setX(this.cameras.main.x+770);

    this.credits.setY(this.credits.y - 0.125);
    this.logo.setY(this.credits.y + this.credits.height + 150);

    this.backText.setX(this.cameras.main.x+1200);
    this.backButton.setX(this.cameras.main.x+1225);
    this.backButtonSel.setX(this.cameras.main.x+1208);
  }

  BackMainMenu(){
    this.clickSound.play();
    this.scene.pause('CreditsMenu');
    this.scene.start('MainMenu');
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

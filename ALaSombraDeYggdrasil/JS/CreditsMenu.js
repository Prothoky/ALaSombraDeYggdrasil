class CreditsMenu extends Phaser.Scene{
  constructor(){
      super("CreditsMenu");
  }

  create(){

    this.cameras.main.fadeIn(1500, 0, 0, 0);
    this.clickSound = this.sound.add('ClickButtonSound', this.EffectsConfig());

    //1) BACKGROUND
    this.bg_backgorund = this.add.tileSprite(0,0, 5715, 916, 'bg_background');
    this.bg_far = this.add.tileSprite(0,0, 5715, 916, "bg_far");
    this.bg_medium = this.add.tileSprite(0,0, 5715, 916, "bg_medium");
    this.bg_near = this.add.tileSprite(0,50, 5715, 916, "bg_near");
    this.bg_near.depth = 2;

    // 2) CHARACTER
    this.player = this.physics.add.sprite(650, 0, 'einar_running').setOrigin(1).setScale(0.56).setSize(70,145);
    this.player.body.setSize(this.player.width, this.player.height, true)
    this.player.depth = 1;  // Profundidad del sprie

    // FLOOR
    this.ground = this.physics.add.staticGroup();
    this.ground.create(400, 0 , 'ground').setOrigin(0, 0).setVisible(false).refreshBody();
    this.physics.add.collider(this.player, this.ground); // Permitimos colisiones entre suelo y jugador y cuenta como grounded (puede saltar)

    // 3) CREDITS
    this.credits = this.add.text(0, 150, stringsJSON.Credits , {fontFamily: "Acadian_Runes", fill: "white", fontSize: 18, align: 'center' ,boundsAlignH: "center", boundsAlignV: "middle"});
    this.credits.setOrigin(0,0);
    this.credits.depth=3;

    // 4) LOGO
    this.logo = this.add.image(0,500, 'logo');
    this.logo.setScale(0.125);
    this.logo.setOrigin(0.5,0.5);
    this.logo.depth=3;

    // 3) CAMERA
    this.cameras.main.startFollow(this.player, false, 1, 1, -250, 200); // Cámar sigue al personaje

    //FULL SCREEN
    this.fullScreenLM = this.add.image(gameWidth*15.5/16, gameHeight*13/14, 'buttonFullScreen');
    this.fullScreenLM.setScale(2/60);
    this.fullScreenLM.setInteractive({ useHandCursor: true})
    .on('pointerdown', function() {
      this.scene.scale.toggleFullscreen();
    });

    //BACK BUTTON
    this.backButtonCM = this.add.image((this.cameras.main.x),+50,  'deselectedButtonSmall');
    this.backButtonCM.setScale(1.5/3);
    this.backButtonCMSel = this.add.image((this.cameras.main.x), +43, 'selSmallLeftButton');
    this.backButtonCMSel.setScale(1.5/3);
    this.backButtonCMSel.setVisible(false);
    //Texto Boton
    this.backText = this.add.text(this.cameras.main.x, +38,  stringsJSON.Buttons.back, {fontFamily: "Acadian_Runes",fontSize: "16px", align: 'center', fill: "#481d18"});
    //Acciones Boton
    this.backButtonCM.on('pointerover', function (pointer) {this.backButtonCMSel.setVisible(true);}, this);
    this.backButtonCM.on('pointerout', function (pointer) {this.backButtonCMSel.setVisible(false);}, this);
    this.backButtonCM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BackMainMenu());

    this.backButtonCM.depth = 3;
    this.backButtonCMSel.depth = 3;
    this.backText.depth = 3;
    //PLAYER MOVEMENT
    this.player.anims.play('einar_running',true);

  }

  update(){

    this.bg_backgorund.tilePositionX += 0.25;
    this.bg_far.tilePositionX +=0.5;
    this.bg_medium.tilePositionX += 1.5;
    this.bg_near.tilePositionX += 2.5;
    this.credits.setX(this.cameras.main.x+800);
    this.logo.setX(this.cameras.main.x+950);
    this.credits.setY(this.credits.y-0.5);
    this.logo.setY(this.credits.y+this.credits.height+150);
    this.backButtonCM.setX(this.cameras.main.x+1345);
    this.backButtonCMSel.setX(this.cameras.main.x+1328);
    this.backText.setX(this.cameras.main.x+1313);

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

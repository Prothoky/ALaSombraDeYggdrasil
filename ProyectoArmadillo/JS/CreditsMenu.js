class CreditsMenu extends Phaser.Scene{
  constructor(){
      super("CreditsMenu");
  }

  create(){

    this.cameras.main.fadeIn(1500, 0, 0, 0);

    //1) BACKGROUND
    this.bg_backgorund = this.add.tileSprite(0,0, 5715, 916, 'bg_background');
    this.bg_far = this.add.tileSprite(0,0, 5715, 916, "bg_far");
    this.bg_medium = this.add.tileSprite(0,0, 5715, 916, "bg_medium");
    this.bg_near = this.add.tileSprite(0,0, 5715, 916, "bg_near");
    this.bg_near.depth = 2;

    // Ajusta los tileSprites
    this.bg_backgorund.setOrigin(0,0);
    this.bg_far.setOrigin(0,0);
    this.bg_medium.setOrigin(0,0);
    this.bg_near.setOrigin(0,0);
    this.bg_backgorund.setScrollFactor(0);
    this.bg_far.setScrollFactor(0);
    this.bg_medium.setScrollFactor(0);
    this.bg_near.setScrollFactor(0);
    this.bg_backgorund.setScale(0.66);
    this.bg_far.setScale(0.66);
    this.bg_medium.setScale(0.66);
    this.bg_near.setScale(0.7);

    // 2) CHARACTER
    this.player = this.physics.add.sprite(650, 0, 'einar_running').setOrigin(1).setScale(0.56).setSize(70,145);
    this.player.body.setSize(this.player.width, this.player.height, true)
    this.player.depth = 1;  // Profundidad del sprie

    // FLOOR
    this.ground = this.physics.add.staticGroup(); 
    this.ground.create(400, 0 , 'ground').setOrigin(0, 0).setVisible(false).refreshBody();
    this.physics.add.collider(this.player, this.ground); // Permitimos colisiones entre suelo y jugador y cuenta como grounded (puede saltar)

    // 3) CREDITS
    this.credits = this.add.text(0, 250, stringsJSON.Credits , {fontFamily: "Acadian_Runes", fill: "white", fontSize: 18, align: 'center' ,boundsAlignH: "center", boundsAlignV: "middle"});
    this.credits.setOrigin(0,0);
    this.credits.depth=3;

    // 4) LOGO
    this.logo = this.add.image(1425,-395, 'logo');
    this.logo.setScale(0.125)

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
    this.backButton = this.add.image(this.cameras.main.x,0, 'backButton');
    this.backButton.setScale(1.5/3);
    this.backButton.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.BackMainMenu());
    this.backButton.depth = 3;

    //PLAYER MOVEMENT
    this.player.anims.play('einar_running',true);
    //this.player.setVelocityX(400);
    //this.credits.setVelocityY(10);

  }

  update(){

    this.bg_backgorund.tilePositionX += 0.5;
    this.bg_far.tilePositionX +=1;
    this.bg_medium.tilePositionX += 3;
    this.bg_near.tilePositionX += 5;
    this.credits.setX(this.cameras.main.x+800);
    this.credits.setY(this.credits.y-0.5);
    this.backButton.setX(this.cameras.main.x+1350);
    if(this.credits.y<=-1500){
      this.credits.y=100;
    }
  }

  BackMainMenu(){
    this.scene.pause('CreditsMenu');
    this.scene.start('MainMenu');
  }

}

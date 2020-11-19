class PreloadMenu extends Phaser.Scene{

  constructor(){
      super("PreloadMenu"); //super hace que la clase herede las caracteristicas de su predecesora
  }

  preload(){

    this.load.json('Data',"./lib/Data.json");

    //Cargamos mapas desbloqueados y dinero del jugador

    //Checkeamos que estemos en movil o PC
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      PC=false;
    }
    //BARRA DE CARGA DE PROGRESO

      var progressBar = this.add.graphics();
      var progressBox = this.add.graphics();

      progressBox.fillStyle(0xffffff, 0.2);
      progressBox.fillRect(100,275, gameWidth-200, 50);

      progressBox.setDepth(2);
      progressBar.setDepth(2);

      var percentText = this.make.text({
          x: 635,
          y: 300,
          text: "0 %",
          style: {
              fontSize: '25px',
              fontFamily: 'Acadian_Runes',
              fontStyle: 'bold',
              align: 'center',
              fill: '#ffffff'
          }
      });

      percentText.setOrigin(0.5, 0.5);
      percentText.setDepth(2);

      this.load.on("progress", function(value){
          percentText.setText(parseInt(value * 100) + ' %');
          progressBar.clear();
          progressBar.fillStyle(0xffbc00, 1);
          progressBar.fillRect(110, 285, (gameWidth-220) * value, 30);

          if(value*100>99){
            progressBox.setVisible(false);
            progressBar.setVisible(false);
            percentText.setVisible(false);
          }
      });

    //CARGA DE ASSETS

    this.load.pack('resources', './lib/Resources.json');

  if(PC){
    this.load.spritesheet('einar_running', 'ASSETS/Gameplay/animacion_correrPC.png', { frameWidth: 400, frameHeight: 350 });
    this.load.spritesheet('einar_jumping', 'ASSETS/Gameplay/animacion_saltarPC.png', { frameWidth: 400, frameHeight: 350 });
    this.load.spritesheet('einar_attack', 'ASSETS/Gameplay/animacion_atacarPC.png', { frameWidth: 400, frameHeight: 350 });

    //this.load.spritesheet('eagle_attacking', 'ASSETS/Gameplay/eagle_attackingPC.png', { frameWidth: 650, frameHeight: 550 });
    this.load.spritesheet('eagle_attacking', 'ASSETS/Gameplay/eagle_attacking.png', { frameWidth: 364, frameHeight: 308 });

    this.load.spritesheet('draugr_attacking', 'ASSETS/Gameplay/animacion_atacar_draugrPC.png', { frameWidth: 450, frameHeight: 350 });

  }else{
    this.load.spritesheet('einar_running', 'ASSETS/Gameplay/animacion_correr.png', { frameWidth: 224, frameHeight: 196 });
    //this.load.spritesheet('einar_jumping', 'ASSETS/Gameplay/animacion_saltar.png', { frameWidth: 224, frameHeight: 196 });
    this.load.spritesheet('einar_attack', 'ASSETS/Gameplay/animacion_atacar.png', { frameWidth: 224, frameHeight: 196 });
    this.load.spritesheet('eagle_attacking', 'ASSETS/Gameplay/eagle_attacking.png', { frameWidth: 364, frameHeight: 308 });
    //this.load.spritesheet('draugr_attacking', 'ASSETS/Gameplay/animacion_atacar_draugr.png', { frameWidth: 252, frameHeight: 196 });

  }

    this.load.on("complete", () => {
      percentText.destroy();
      progressBar.destroy();
      progressBox.destroy();
	  });

  }

  create(){

    phaserJSON = this.cache.json.get('Data');

    loadUserData();

    updateLanguage();

    this.soundStart = this.sound.add('soundStart', {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0});

    // Animaciones
    this.anims.create({
        key: 'einar_running',
        frames: this.anims.generateFrameNumbers('einar_running', { start: 0, end: 17}),
        frameRate: 24,
        repeat: -1
    })

    this.anims.create({
        key: 'einar_jumping',
        frames: this.anims.generateFrameNumbers('einar_jumping', { start: 0, end: 29}),
        frameRate: 24,
        repeat: 0
    })

    this.anims.create ({
      key: 'einar_attacking',
      frames: this.anims.generateFrameNumbers('einar_attack', { start: 8, end: 17}),
      frameRate: 30,
      repeat: 0
    })

    this.anims.create ({
      key: 'eagle_attacking',
      frames: this.anims.generateFrameNumbers('eagle_attacking', { start: 0, end: 11}),
      frameRate: 24,
      repeat: -1
    })

    this.anims.create ({
      key: 'draugr_attacking',
      frames: this.anims.generateFrameNumbers('draugr_attacking', { start: 0, end: 11}),
      frameRate: 32,
      repeat: 0
    })


    this.logo = this.add.sprite(gameWidth*8/16, gameHeight*8/16, 'logo');
    this.logo.setScale(2/3);
    this.logo.alpha = 0;

    this.tweens.add({
      targets:this.logo,
      duration: 2000,
      alpha: 1,
      yoyo: true,
      hold: 2000,
      completeDelay: 500,
      onComplete:()=>this.scene.start('MainMenu')
    })

    let logosound=0;
    this.logo.setInteractive({ useHandCursor: true});
    this.logo.on('pointerdown', () => {
      if(logosound <= 0){
        logosound++;
        let context = new AudioContext();
        context.resume();
        this.soundStart.play();
      }

    });

  }

}

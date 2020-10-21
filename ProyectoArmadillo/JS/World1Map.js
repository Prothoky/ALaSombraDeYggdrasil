class World1Map extends Phaser.Scene{
  constructor(){
      super("World1Map");
  }

  preload(){
    this.load.image('backgroundWM1M', './ASSETS/World1Menu/FondoMapaMundo1.jpeg'); //CAMBIAR
    this.load.image('ButtonNode1', './ASSETS/World1Menu/NodoPrincipal.png'); //CAMBIAR
    this.load.image('ButtonSubode1', './ASSETS/World1Menu/NodoSecundario.png'); //CAMBIAR
    this.load.image('ButtonPlayLevel', './ASSETS/World1Menu/BotonJugar.png'); //CAMBIAR
    this.load.image('BackgrAcessToLevel1_1', './ASSETS/World1Menu/FondoAccesoANivel.png'); //CAMBIAR
    this.load.image('BackgrAcessToLevel1_2', './ASSETS/World1Menu/FondoAccesoANivel_1_2.png'); //CAMBIAR
  }

  create(){
    var wid = this.cameras.main.width; //ancho del canvas en el dispositivo
    var heig = this.cameras.main.height;

    var background = this.add.image(0, 0, 'backgroundWM1M');
    //background.setScale(2/3)
    background.setPosition(wid/2, heig/2);

/*
//PRUEBAS BOTON PAUSE
    //BOTON Nivel 1
    this.ButtonNode1 = this.add.image(wid*14/16, heig*14/16, 'ButtonNode1');
    this.ButtonNode1.setScale(1.5/3);
    this.ButtonNode1.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.GoWorld1_1());
  }

  GoWorld1_1(){
    this.scene.pause('World1Map');
    this.scene.start('MapOne');
*/
    // (TESTEO) botón de iniciar partida
    this.botonNivel0 = this.add.image(wid*8.44/16, heig*14.05/16, 'ButtonNode1');
    this.botonNivel0.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(wid*8.44/16, heig*14.05/16, 0));

    this.botonNivel0_1 = this.add.image(wid*6.44/16, heig*14.05/16, 'ButtonSubode1');
    this.botonNivel0_1.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(wid*6.44/16, heig*14.05/16));
    this.botonNivel0_1.setVisible(false);

    this.botonNivel0_2 = this.add.image(wid*10.44/16, heig*14.05/16, 'ButtonSubode1');
    this.botonNivel0_2.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.scene.start('LevelManager'));
    this.botonNivel0_2.setVisible(false);

    this.botonNivel1 = this.add.image(wid*8.44/16, heig*10.05/16, 'ButtonNode1');
    this.botonNivel1.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(wid*8.44/16, heig*10.05/16, 1));
    this.botonNivel1.setVisible(false);

    this.botonNivel1_1 = this.add.image(wid*6.44/16, heig*10.05/16, 'ButtonSubode1');
    this.botonNivel1_1.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.scene.start('LevelManager'));
    this.botonNivel1_1.setVisible(false);

    this.botonNivel1_2 = this.add.image(wid*10.44/16, heig*10.05/16, 'ButtonSubode1');
    this.botonNivel1_2.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.scene.start('LevelManager'));
    this.botonNivel1_2.setVisible(false);

    this.botonNivel2 = this.add.image(wid*8.44/16, heig*6.05/16, 'ButtonNode1');
    this.botonNivel2.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.scene.start('LevelManager'));
    this.botonNivel2.setVisible(false);

    this.botonNivel3 = this.add.image(wid*8.44/16, heig*2.05/16, 'ButtonNode1');
    this.botonNivel3.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.scene.start('LevelManager'));
    this.botonNivel3.setVisible(false);

  /*  this.botonNivel4 = this.add.image(wid*8.44/16, heig*8.05/16, 'ButtonNode1');
    this.botonNivel4.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.scene.start('LevelManager'));
    this.botonNivel4.setVisible(false);*/

  }

  update(){
    if (user.map[0] == true){
      this.botonNivel1.setVisible(true);
      this.botonNivel0_1.setVisible(true);
      this.botonNivel0_2.setVisible(true);
      levelIndex = 1;
    }
    if (user.map[1] == true){
      this.botonNivel2.setVisible(true);
      this.botonNivel1_1.setVisible(true);
      this.botonNivel1_2.setVisible(true);
      levelIndex = 2;
    }
    if (user.map[2] == true){
      this.botonNivel3.setVisible(true);
    }
    if (user.map[3] == true){
      this.botonNivel4.setVisible(true);
    }
  }

  AccessToLevel(width_, height_, level){
    if (level== 0){
      this.FondoAccesoNivel1 = this.add.image(width_, height_, 'BackgrAcessToLevel1_1');
      this.BotonAccesoNivel1 = this.add.image(width_, height_, 'ButtonPlayLevel');
      this.BotonAccesoNivel1.setInteractive({ useHandCursor: true  } )
      .on('pointerdown', () => this.scene.start('LevelManager'));
    }

    if (level== 1){
      this.FondoAccesoNivel2 = this.add.image(width_, height_, 'BackgrAcessToLevel1_2');
      this.BotonAccesoNivel2 = this.add.image(width_, height_, 'ButtonPlayLevel');
      this.BotonAccesoNivel2.setInteractive({ useHandCursor: true  } )
      .on('pointerdown', () => this.scene.start('LevelManager'));
    }

    if (level == 2){
      this.FondoAccesoNivel1 = this.add.image(width_, height_, 'BackgrAcessToLevel1_1');
      this.BotonAccesoNivel1 = this.add.image(width_, height_, 'ButtonPlayLevel');
      this.BotonAccesoNivel1.setInteractive({ useHandCursor: true  } )
      .on('pointerdown', () => this.scene.start('LevelManager'));
    }

  }


}

class World1Map extends Phaser.Scene{
  constructor(){
      super("World1Map");
  }

  preload(){


  }

  create(){
    var wid = this.cameras.main.width; //ancho del canvas en el dispositivo
    var heig = this.cameras.main.height;

    var background = this.add.image(0, 0, 'backgroundWM1M');
    background.setScale(5/6.2);
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
    this.botonNivel0 = this.add.image(wid*15.4/16, heig*13.05/16, 'ButtonNode1');
    this.botonNivel0.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(wid*8.44/16, heig*14.05/16, 0));

    this.botonNivel0_1 = this.add.image(wid*6.44/16, heig*14.05/16, 'ButtonSubode1');
    this.botonNivel0_1.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(wid*6.44/16, heig*14.05/16));
    this.botonNivel0_1.setVisible(false);

    this.botonNivel0_2 = this.add.image(wid*10.44/16, heig*14.05/16, 'ButtonSubode1');
    this.botonNivel0_2.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.scene.start('LevelManager'));
    //.on('pointerdown', () => this.AccessToLevel(wid*10.44/16, heig*14.05/16, 0));
    this.botonNivel0_2.setVisible(false);

    this.botonNivel1 = this.add.image(wid*8.44/16, heig*10.05/16, 'ButtonNode1');
    this.botonNivel1.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(wid*8.44/16, heig*10.05/16, 1));
    this.botonNivel1.setVisible(false);

    this.botonNivel1_1 = this.add.image(wid*6.44/16, heig*10.05/16, 'ButtonSubode1');
    this.botonNivel1_1.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.scene.start('LevelManager'));
    //.on('pointerdown', () => this.AccessToLevel(wid*6.44/16, heig*10.05/16, 1));
    this.botonNivel1_1.setVisible(false);

    this.botonNivel1_2 = this.add.image(wid*10.44/16, heig*10.05/16, 'ButtonSubode1');
    this.botonNivel1_2.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.scene.start('LevelManager'));
    //.on('pointerdown', () => this.AccessToLevel(wid*10.44/16, heig*10.05/16, 1));
    this.botonNivel1_2.setVisible(false);

    this.botonNivel2 = this.add.image(wid*8.44/16, heig*6.05/16, 'ButtonNode1');
    this.botonNivel2.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(wid*8.44/16, heig*6.05/16, 2));
    this.botonNivel2.setVisible(false);

    this.botonNivel3 = this.add.image(wid*8.44/16, heig*2.05/16, 'ButtonNode1');
    this.botonNivel3.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(wid*8.44/16, heig*2.05/16, 3));
    this.botonNivel3.setVisible(false);

  /*  this.botonNivel4 = this.add.image(wid*8.44/16, heig*8.05/16, 'ButtonNode1');
    this.botonNivel4.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.scene.start('LevelManager'));
    this.botonNivel4.setVisible(false);*/


    //this.events.on("Unlock buttons", this.unlockButtons, this);
  }

  update(){
    if (user.map[0] == true){
      this.botonNivel1.setVisible(true);
      this.botonNivel0_1.setVisible(true);
      this.botonNivel0_2.setVisible(true);
      //levelIndex = 1;
      //console.log("has pasado el nivel " + (levelIndex - 1));
    }
    if (user.map[1] == true){
      this.botonNivel2.setVisible(true);
      this.botonNivel1_1.setVisible(true);
      this.botonNivel1_2.setVisible(true);
      //levelIndex = 2;
      //console.log("has pasado el nivel " + (levelIndex - 1));
    }
    if (user.map[2] == true){
      this.botonNivel3.setVisible(true);
      //console.log("has pasado el nivel " + (levelIndex - 1));
    }
    if (user.map[3] == true){
      //this.botonNivel4.setVisible(true);
       console.log("oleeee ");
    }

  /*  if (botonActivo == 0){
      this.BotonAccesoNivel1.setVisible(false);
      this.BotonAccesoNivel2.setVisible(false);
    }*/
  }

  AccessToLevel(width_, height_, level){
    if (level== 0){
      this.FondoAccesoNivel0 = this.add.image(width_, height_, 'BackgrAcessToLevel');
      this.BotonAccesoNivel0 = this.add.image(width_, height_, 'ButtonPlayLevel');
      this.BotonAccesoNivel0.setInteractive({ useHandCursor: true  } )
      .on('pointerdown', () => this.scene.start('LevelManager'));
    //  botonActivo = 0;
      levelIndex = 0;
      console.log("a jugar el " + level);
    }

    if (level== 1){
      this.FondoAccesoNivel1 = this.add.image(width_, height_, 'BackgrAcessToLevel');
      this.BotonAccesoNivel1 = this.add.image(width_, height_, 'ButtonPlayLevel');
      this.BotonAccesoNivel1.setInteractive({ useHandCursor: true  } )
      .on('pointerdown', () => this.scene.start('LevelManager'));
      levelIndex = 1;
      console.log("a jugar el " + level);
    }

    if (level == 2){
      this.FondoAccesoNivel2 = this.add.image(width_, height_, 'BackgrAcessToLevel');
      this.BotonAccesoNivel2 = this.add.image(width_, height_, 'ButtonPlayLevel');
      this.BotonAccesoNivel2.setInteractive({ useHandCursor: true  } )
      .on('pointerdown', () => this.scene.start('LevelManager'));
      levelIndex = 2;
      console.log("a jugar el " + level);
    }

    if (level == 3){
      this.FondoAccesoNivel3 = this.add.image(width_, height_, 'BackgrAcessToLevel');
      this.BotonAccesoNivel3 = this.add.image(width_, height_, 'ButtonPlayLevel');
      this.BotonAccesoNivel3.setInteractive({ useHandCursor: true  } )
      .on('pointerdown', () => this.scene.start('LevelManager'));
      levelIndex = 3;
      console.log("a jugar el " + level);
    }

  }

  unlockButtons(){

  }

}

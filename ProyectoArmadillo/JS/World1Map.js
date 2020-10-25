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
    background.setScale(2/3);
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
    this.botonNivel0 = this.add.image(wid*14.6/16, heig*10.05/16, 'ButtonNodePrinc');
    this.botonNivel0.setScale(2/3);
    this.botonNivel0.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(wid*14.6/16, heig*10.05/16, 0));

  /*  this.botonNivel0_1 = this.add.image(wid*6.44/16, heig*14.05/16, 'ButtonSubode1');
    this.botonNivel0_1.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(wid*6.44/16, heig*14.05/16));
    this.botonNivel0_1.setVisible(false);

    this.botonNivel0_2 = this.add.image(wid*10.44/16, heig*14.05/16, 'ButtonSubode1');
    this.botonNivel0_2.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.scene.start('LevelManager'));
    //.on('pointerdown', () => this.AccessToLevel(wid*10.44/16, heig*14.05/16, 0));
    this.botonNivel0_2.setVisible(false);*/

    this.botonNivel1 = this.add.image(wid*11.41/16, heig*13.15/16, 'ButtonNodePrinc');
    this.botonNivel1.setScale(2/3);
    this.botonNivel1.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(wid*11.41/16, heig*13.15/16, 1));
    this.botonNivel1.setVisible(false);

/*    this.botonNivel1_1 = this.add.image(wid*6.44/16, heig*10.05/16, 'ButtonSubode1');
    this.botonNivel1_1.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.scene.start('LevelManager'));
    //.on('pointerdown', () => this.AccessToLevel(wid*6.44/16, heig*10.05/16, 1));
    this.botonNivel1_1.setVisible(false);

    this.botonNivel1_2 = this.add.image(wid*10.44/16, heig*10.05/16, 'ButtonSubode1');
    this.botonNivel1_2.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.scene.start('LevelManager'));
    //.on('pointerdown', () => this.AccessToLevel(wid*10.44/16, heig*10.05/16, 1));
    this.botonNivel1_2.setVisible(false);
*/
    this.botonNivel2 = this.add.image(wid*10.18/16, heig*11.75/16, 'ButtonNodePrinc');
    this.botonNivel2.setScale(2/3);
    this.botonNivel2.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(wid*10.18/16, heig*11.75/16, 2));
    this.botonNivel2.setVisible(false);

    this.botonNivel3 = this.add.image(wid*7.4/16, heig*14.15/16, 'ButtonNodePrinc');
    this.botonNivel3.setScale(2/3);
    this.botonNivel3.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(wid*7.4/16, heig*14.15/16, 3));
    this.botonNivel3.setVisible(false);

    this.botonNivel4 = this.add.image(wid*3.025/16, heig*11.55/16, 'ButtonNodePrinc');
    this.botonNivel4.setScale(2/3);
    this.botonNivel4.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () =>  this.AccessToLevel(wid*3.025/16, heig*11.55/16, 4));
    this.botonNivel4.setVisible(false);

    this.botonNivel5 = this.add.image(wid*3.41/16, heig*4.525/16, 'ButtonNodePrincSnow');
    this.botonNivel5.setScale(2/3);
    this.botonNivel5.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () =>  this.AccessToLevel(wid*3.41/16, heig*4.525/16, 5));
    this.botonNivel5.setVisible(false);

    this.botonNivel6 = this.add.image(wid*6.41/16, heig*1.5/16, 'ButtonNodePrincSnow');
    this.botonNivel6.setScale(2/3);
    this.botonNivel6.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () =>  this.AccessToLevel(wid*6.41/16, heig*1.5/16, 6));
    this.botonNivel6.setVisible(false);

    this.botonNivel7 = this.add.image(wid*6.79/16, heig*5.61/16, 'ButtonNodePrincSnow');
    this.botonNivel7.setScale(2/3);
    this.botonNivel7.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () =>  this.AccessToLevel(wid*6.79/16, heig*5.61/16, 7));
    this.botonNivel7.setVisible(false);

    this.botonNivel8 = this.add.image(wid*9.845/16, heig*4.75/16, 'ButtonNodePrincSnow');
    this.botonNivel8.setScale(2/3);
    this.botonNivel8.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () =>  this.AccessToLevel(wid*9.845/16, heig*4.75/16, 8));
    this.botonNivel8.setVisible(false);

    this.botonNivel9 = this.add.image(wid*12.6/16, heig*5.1/16, 'ButtonNodePrincSnow');
    this.botonNivel9.setScale(2/3);
    this.botonNivel9.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () =>  this.AccessToLevel(wid*12.6/16, heig*5.1/16, 9));
    this.botonNivel9.setVisible(false);


    //this.events.on("Unlock buttons", this.unlockButtons, this);
  }

  update(){
    if (user.map[0] == true){
      this.botonNivel1.setVisible(true);
    //  this.botonNivel0_1.setVisible(true);
    //  this.botonNivel0_2.setVisible(true);
      //levelIndex = 1;
      //console.log("has pasado el nivel " + (levelIndex - 1));
    }
    if (user.map[1] == true){
      this.botonNivel2.setVisible(true);
    //  this.botonNivel1_1.setVisible(true);
    //  this.botonNivel1_2.setVisible(true);
      //levelIndex = 2;
      //console.log("has pasado el nivel " + (levelIndex - 1));
    }
    if (user.map[2] == true){
      this.botonNivel3.setVisible(true);
      //console.log("has pasado el nivel " + (levelIndex - 1));
    }
    if (user.map[3] == true){
      this.botonNivel4.setVisible(true);
      // console.log("oleeee ");
    }
    if (user.map[4] == true){
      this.botonNivel5.setVisible(true);
      // console.log("oleeee ");
    }
    if (user.map[5] == true){
      this.botonNivel6.setVisible(true);
      // console.log("oleeee ");
    }
    if (user.map[6] == true){
      this.botonNivel7.setVisible(true);
      // console.log("oleeee ");
    }
    if (user.map[7] == true){
      this.botonNivel8.setVisible(true);
      // console.log("oleeee ");
    }
    if (user.map[8] == true){
      this.botonNivel9.setVisible(true);
      // console.log("oleeee ");
    }
    if (user.map[9] == true){
      //this.botonNivel4.setVisible(true);
     console.log("Debloquear mundo 2");
    }

  /*  if (botonActivo == 0){
      this.BotonAccesoNivel1.setVisible(false);
      this.BotonAccesoNivel2.setVisible(false);
    }*/
  }

  AccessToLevel(width_, height_, level){
    if (level== 0){
      //this.FondoAccesoNivel0 = this.add.image(width_, height_, 'BackgrAcessToLevel');
      this.BotonNodo0Sel = this.add.image(width_, height_, 'ButtonNodePrincSel');
      this.BotonNodo0Sel.setScale(2/3);
      /*this.BotonAccesoNivel0 = this.add.image(width_, height_, 'ButtonPlayLevel');
      this.BotonAccesoNivel0.setInteractive({ useHandCursor: true  } )
      .on('pointerdown', () => this.scene.start('LevelManager'));*/
    //  botonActivo = 0;
      this.BotonNodo0Sel.setInteractive({ useHandCursor: true  } )
      .on('pointerdown', () => this.scene.start('LevelManager'));

      levelIndex = 0;
      console.log("a jugar el " + level);
    }

    if (level== 1){
      //this.FondoAccesoNivel1 = this.add.image(width_, height_, 'BackgrAcessToLevel');
      /*this.BotonAccesoNivel1 = this.add.image(width_, height_, 'ButtonPlayLevel');
      this.BotonAccesoNivel1.setInteractive({ useHandCursor: true  } )
      .on('pointerdown', () => this.scene.start('LevelManager'));*/

      this.BotonNodo1Sel = this.add.image(width_, height_, 'ButtonNodePrincSel');
      this.BotonNodo1Sel.setScale(2/3);
      this.BotonNodo1Sel.setInteractive({ useHandCursor: true  } )
      .on('pointerdown', () => this.scene.start('LevelManager'));
      levelIndex = 1;
      console.log("a jugar el " + level);
    }

    if (level == 2){
      /*this.FondoAccesoNivel2 = this.add.image(width_, height_, 'BackgrAcessToLevel');
      this.BotonAccesoNivel2 = this.add.image(width_, height_, 'ButtonPlayLevel');
      this.BotonAccesoNivel2.setInteractive({ useHandCursor: true  } )
      .on('pointerdown', () => this.scene.start('LevelManager'));*/
      this.BotonNodo2Sel = this.add.image(width_, height_, 'ButtonNodePrincSel');
      this.BotonNodo2Sel.setScale(2/3);
      this.BotonNodo2Sel.setInteractive({ useHandCursor: true  } )
      .on('pointerdown', () => this.scene.start('LevelManager'));
      levelIndex = 2;
      console.log("a jugar el " + level);
    }

    if (level == 3){
      /*this.FondoAccesoNivel3 = this.add.image(width_, height_, 'BackgrAcessToLevel');
      this.BotonAccesoNivel3 = this.add.image(width_, height_, 'ButtonPlayLevel');
      this.BotonAccesoNivel3.setInteractive({ useHandCursor: true  } )
      .on('pointerdown', () => this.scene.start('LevelManager'));*/
      this.BotonNodo3Sel = this.add.image(width_, height_, 'ButtonNodePrincSel');
      this.BotonNodo3Sel.setScale(2/3);
      this.BotonNodo3Sel.setInteractive({ useHandCursor: true  } )
      .on('pointerdown', () => this.scene.start('LevelManager'));
      levelIndex = 3;
      console.log("a jugar el " + level);
    }

    if (level == 4){
      //this.FondoAccesoNivel3 = this.add.image(width_, height_, 'BackgrAcessToLevel');
      /*this.ButtonNode3Active = this.add.image(width_, height_, 'ButtonPlayLevel');
      this.BotonAccesoNivel3 = this.add.image(width_, height_, 'ButtonPlayLevel');
      this.BotonAccesoNivel3.setInteractive({ useHandCursor: true  } )
      .on('pointerdown', () => this.scene.start('LevelManager'));*/
      this.BotonNodo4Sel = this.add.image(width_, height_, 'ButtonNodePrincSel');
      this.BotonNodo4Sel.setScale(2/3);
      this.BotonNodo4Sel.setInteractive({ useHandCursor: true  } )
      .on('pointerdown', () => this.scene.start('LevelManager'));
      levelIndex = 4;
      console.log("a jugar el " + level);
    }

    if (level == 5){
      /*this.FondoAccesoNivel3 = this.add.image(width_, height_, 'BackgrAcessToLevel');
      this.BotonAccesoNivel3 = this.add.image(width_, height_, 'ButtonPlayLevel');
      this.BotonAccesoNivel3.setInteractive({ useHandCursor: true  } )
      .on('pointerdown', () => this.scene.start('LevelManager'));*/
      this.BotonNodo5Sel = this.add.image(width_, height_, 'ButtonNodePrincSnowSel');
      this.BotonNodo5Sel.setScale(2/3);
      this.BotonNodo5Sel.setInteractive({ useHandCursor: true  } )
      .on('pointerdown', () => this.scene.start('LevelManager'));
      levelIndex = 5;
      console.log("a jugar el " + level);
    }

    if (level == 6){
      /*this.FondoAccesoNivel3 = this.add.image(width_, height_, 'BackgrAcessToLevel');
      this.BotonAccesoNivel3 = this.add.image(width_, height_, 'ButtonPlayLevel');
      this.BotonAccesoNivel3.setInteractive({ useHandCursor: true  } )
      .on('pointerdown', () => this.scene.start('LevelManager'));*/
      this.BotonNodo6Sel = this.add.image(width_, height_, 'ButtonNodePrincSnowSel');
      this.BotonNodo6Sel.setScale(2/3);
      this.BotonNodo6Sel.setInteractive({ useHandCursor: true  } )
      .on('pointerdown', () => this.scene.start('LevelManager'));
      levelIndex = 6;
      console.log("a jugar el " + level);
    }

    if (level == 7){
      /*this.FondoAccesoNivel3 = this.add.image(width_, height_, 'BackgrAcessToLevel');
      this.BotonAccesoNivel3 = this.add.image(width_, height_, 'ButtonPlayLevel');
      this.BotonAccesoNivel3.setInteractive({ useHandCursor: true  } )
      .on('pointerdown', () => this.scene.start('LevelManager'));*/
      this.BotonNodo7Sel = this.add.image(width_, height_, 'ButtonNodePrincSnowSel');
      this.BotonNodo7Sel.setScale(2/3);
      this.BotonNodo7Sel.setInteractive({ useHandCursor: true  } )
      .on('pointerdown', () => this.scene.start('LevelManager'));
      levelIndex = 7;
      console.log("a jugar el " + level);
    }

    if (level == 8){
      /*this.FondoAccesoNivel3 = this.add.image(width_, height_, 'BackgrAcessToLevel');
      this.BotonAccesoNivel3 = this.add.image(width_, height_, 'ButtonPlayLevel');
      this.BotonAccesoNivel3.setInteractive({ useHandCursor: true  } )
      .on('pointerdown', () => this.scene.start('LevelManager'));*/
      this.BotonNodo8Sel = this.add.image(width_, height_, 'ButtonNodePrincSnowSel');
      this.BotonNodo8Sel.setScale(2/3);
      this.BotonNodo8Sel.setInteractive({ useHandCursor: true  } )
      .on('pointerdown', () => this.scene.start('LevelManager'));
      levelIndex = 8;
      console.log("a jugar el " + level);
    }

    if (level == 9){
      /*this.FondoAccesoNivel3 = this.add.image(width_, height_, 'BackgrAcessToLevel');
      this.BotonAccesoNivel3 = this.add.image(width_, height_, 'ButtonPlayLevel');
      this.BotonAccesoNivel3.setInteractive({ useHandCursor: true  } )
      .on('pointerdown', () => this.scene.start('LevelManager'));*/
      this.BotonNodo9Sel = this.add.image(width_, height_, 'ButtonNodePrincSnowSel');
      this.BotonNodo9Sel.setScale(2/3);
      this.BotonNodo9Sel.setInteractive({ useHandCursor: true  } )
      .on('pointerdown', () => this.scene.start('LevelManager'));
      levelIndex = 9;
      console.log("a jugar el " + level);
    }

  }

  unlockButtons(){

  }

}

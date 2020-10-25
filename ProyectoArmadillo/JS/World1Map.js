class World1Map extends Phaser.Scene{
  constructor(){
      super("World1Map");
  }

  preload(){

    this.BotonNodo0Sel;   this.NombreNivel0;
    this.BotonNodo1Sel;   this.NombreNivel1;
    this.BotonNodo2Sel;   this.NombreNivel2;
    this.BotonNodo3Sel;   this.NombreNivel3;
    this.BotonNodo4Sel;   this.NombreNivel4;
    this.BotonNodo5Sel;   this.NombreNivel5;
    this.BotonNodo6Sel;   this.NombreNivel6;
    this.BotonNodo7Sel;   this.NombreNivel7;
    this.BotonNodo8Sel;   this.NombreNivel8;
    this.BotonNodo9Sel;   this.NombreNivel9;
    this.nodoActivo;
    this.nombreNodoActivo;
    this.nodosActivos = 0;

  }



  create(){
    var wid = this.cameras.main.width; //ancho del canvas en el dispositivo
    var heig = this.cameras.main.height;

    var background = this.add.image(0, 0, 'backgroundWM1M');
    background.setScale(2/3);
    background.setPosition(wid/2, heig/2);

    //var nodosActivos = 0;

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

    //Boton Desbloqueado
    this.botonNivel0 = this.add.image(wid*14.6/16, heig*10.05/16, 'ButtonNodePrinc');
    this.botonNivel0.setScale(2/3);
    this.botonNivel0.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(wid*14.6/16, heig*10.05/16, 0));
    //Boton Seleccionado
    this.BotonNodo0Sel = this.add.image(wid*14.6/16, heig*10.05/16, 'ButtonNodePrincSel');
    this.BotonNodo0Sel.setScale(2/3);
    this.BotonNodo0Sel.setVisible(false);
    //Fondo con nombre y boton JUGAR
    this.NombreNivel0 = this.add.image(wid*14.6/16, heig*9.05/16, 'Level0Name');
    this.NombreNivel0.setScale(2/3);
    this.NombreNivel0.setVisible(false);

  /*  this.botonNivel0_1 = this.add.image(wid*6.44/16, heig*14.05/16, 'ButtonSubode1');
    this.botonNivel0_1.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(wid*6.44/16, heig*14.05/16));
    this.botonNivel0_1.setVisible(false);

    this.botonNivel0_2 = this.add.image(wid*10.44/16, heig*14.05/16, 'ButtonSubode1');
    this.botonNivel0_2.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.scene.start('LevelManager'));
    //.on('pointerdown', () => this.AccessToLevel(wid*10.44/16, heig*14.05/16, 0));
    this.botonNivel0_2.setVisible(false);*/

    //Boton Desbloqueado
    this.botonNivel1 = this.add.image(wid*11.41/16, heig*13.15/16, 'ButtonNodePrinc');
    this.botonNivel1.setScale(2/3);
    this.botonNivel1.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(wid*11.41/16, heig*13.15/16, 1));
    this.botonNivel1.setVisible(false);
    //Botón Seleccionado
    this.BotonNodo1Sel = this.add.image(wid*11.41/16, heig*13.15/16, 'ButtonNodePrincSel');
    this.BotonNodo1Sel.setScale(2/3);
    this.BotonNodo1Sel.setVisible(false);
    //Fondo con nombre y boton JUGAR
    this.NombreNivel1 = this.add.image(wid*11.41/16, heig*12.15/16, 'Level0Name');
    this.NombreNivel1.setScale(2/3);
    this.NombreNivel1.setVisible(false);

/*  this.botonNivel1_1 = this.add.image(wid*6.44/16, heig*10.05/16, 'ButtonSubode1');
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

    //Botón Desbloqueado
    this.botonNivel2 = this.add.image(wid*10.18/16, heig*11.75/16, 'ButtonNodePrinc');
    this.botonNivel2.setScale(2/3);
    this.botonNivel2.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(wid*10.18/16, heig*11.75/16, 2));
    this.botonNivel2.setVisible(false);
    //Botón Seleccionado
    this.BotonNodo2Sel = this.add.image(wid*10.18/16, heig*11.75/16, 'ButtonNodePrincSel');
    this.BotonNodo2Sel.setScale(2/3);
    this.BotonNodo2Sel.setVisible(false);
    //Fondo con nombre y boton JUGAR
    this.NombreNivel2 = this.add.image(wid*10.18/16, heig*10.75/16, 'Level0Name');
    this.NombreNivel2.setScale(2/3);
    this.NombreNivel2.setVisible(false);

    //this.BotonJugarNivel0 = this.add.image(width_, height_, 'ButtonPlayLevel');
      /*this.BotonJugarNivel0.setInteractive({ useHandCursor: true  } )
      .on('pointerdown', () => this.scene.start('LevelManager'));*/

    //Botón Desbloqueado
    this.botonNivel3 = this.add.image(wid*7.4/16, heig*14.15/16, 'ButtonNodePrinc');
    this.botonNivel3.setScale(2/3);
    this.botonNivel3.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(wid*7.4/16, heig*14.15/16, 3));
    this.botonNivel3.setVisible(false);
    //Botón Seleccionado
    this.BotonNodo3Sel = this.add.image(wid*7.4/16, heig*14.15/16, 'ButtonNodePrincSel');
    this.BotonNodo3Sel.setScale(2/3);
    this.BotonNodo3Sel.setVisible(false);
    //Fondo con nombre y boton JUGAR
    this.NombreNivel3 = this.add.image(wid*7.4/16, heig*13.15/16, 'Level0Name');
    this.NombreNivel3.setScale(2/3);
    this.NombreNivel3.setVisible(false);

    //Botón Desbloqueado
    this.botonNivel4 = this.add.image(wid*3.025/16, heig*11.55/16, 'ButtonNodePrinc');
    this.botonNivel4.setScale(2/3);
    this.botonNivel4.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () =>  this.AccessToLevel(wid*3.025/16, heig*11.55/16, 4));
    this.botonNivel4.setVisible(false);
    //Botón Seleccionado
    this.BotonNodo4Sel = this.add.image(wid*3.025/16, heig*11.55/16, 'ButtonNodePrincSel');
    this.BotonNodo4Sel.setScale(2/3);
    this.BotonNodo4Sel.setVisible(false);
    //Fondo con nombre y boton JUGAR
    this.NombreNivel4 = this.add.image(wid*3.025/16, heig*10.55/16, 'Level0Name');
    this.NombreNivel4.setScale(2/3);
    this.NombreNivel4.setVisible(false);

    //Botón Desbloqueado
    this.botonNivel5 = this.add.image(wid*3.41/16, heig*4.525/16, 'ButtonNodePrincSnow');
    this.botonNivel5.setScale(2/3);
    this.botonNivel5.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () =>  this.AccessToLevel(wid*3.41/16, heig*4.525/16, 5));
    this.botonNivel5.setVisible(false);
    //Botón Seleccionado
    this.BotonNodo5Sel = this.add.image(wid*3.41/16, heig*4.525/16, 'ButtonNodePrincSnowSel');
    this.BotonNodo5Sel.setScale(2/3);
    this.BotonNodo5Sel.setVisible(false);
    //Fondo con nombre y boton JUGAR
    this.NombreNivel5 = this.add.image(wid*3.41/16, heig*3.525/16, 'Level0Name');
    this.NombreNivel5.setScale(2/3);
    this.NombreNivel5.setVisible(false);

    //Botón Desbloqueado
    this.botonNivel6 = this.add.image(wid*6.41/16, heig*1.5/16, 'ButtonNodePrincSnow');
    this.botonNivel6.setScale(2/3);
    this.botonNivel6.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () =>  this.AccessToLevel(wid*6.41/16, heig*1.5/16, 6));
    this.botonNivel6.setVisible(false);
    //Botón Seleccionado
    this.BotonNodo6Sel = this.add.image(wid*6.41/16, heig*1.5/16, 'ButtonNodePrincSnowSel');
    this.BotonNodo6Sel.setScale(2/3);
    this.BotonNodo6Sel.setVisible(false);
    //Fondo con nombre y boton JUGAR
    this.NombreNivel6 = this.add.image(wid*7.41/16, heig*1.5/16, 'Level0Name');
    this.NombreNivel6.setScale(2/3);
    this.NombreNivel6.setVisible(false);


    //Botón Desbloqueado
    this.botonNivel7 = this.add.image(wid*6.79/16, heig*5.61/16, 'ButtonNodePrincSnow');
    this.botonNivel7.setScale(2/3);
    this.botonNivel7.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () =>  this.AccessToLevel(wid*6.79/16, heig*5.61/16, 7));
    this.botonNivel7.setVisible(false);
    //Botón Seleccionado
    this.BotonNodo7Sel = this.add.image(wid*6.79/16, heig*5.61/16, 'ButtonNodePrincSnowSel');
    this.BotonNodo7Sel.setScale(2/3);
    this.BotonNodo7Sel.setVisible(false);
    //Fondo con nombre y boton JUGAR
    this.NombreNivel7 = this.add.image(wid*6.79/16, heig*4.61/16, 'Level0Name');
    this.NombreNivel7.setScale(2/3);
    this.NombreNivel7.setVisible(false);

    //Botón Desbloqueado
    this.botonNivel8 = this.add.image(wid*9.845/16, heig*4.75/16, 'ButtonNodePrincSnow');
    this.botonNivel8.setScale(2/3);
    this.botonNivel8.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () =>  this.AccessToLevel(wid*9.845/16, heig*4.75/16, 8));
    this.botonNivel8.setVisible(false);
    //Botón Seleccionado
    this.BotonNodo8Sel = this.add.image(wid*9.845/16, heig*4.75/16, 'ButtonNodePrincSnowSel');
    this.BotonNodo8Sel.setScale(2/3);
    this.BotonNodo8Sel.setVisible(false);
    //Fondo con nombre y boton JUGAR
    this.NombreNivel8 = this.add.image(wid*9.845/16, heig*3.75/16, 'Level0Name');
    this.NombreNivel8.setScale(2/3);
    this.NombreNivel8.setVisible(false);

    //Botón Desbloqueado
    this.botonNivel9 = this.add.image(wid*12.6/16, heig*5.1/16, 'ButtonNodePrincSnow');
    this.botonNivel9.setScale(2/3);
    this.botonNivel9.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () =>  this.AccessToLevel(wid*12.6/16, heig*5.1/16, 9));
    this.botonNivel9.setVisible(false);
    //Botón Seleccionado
    this.BotonNodo9Sel = this.add.image(wid*12.6/16, heig*5.1/16, 'ButtonNodePrincSnowSel');
    this.BotonNodo9Sel.setScale(2/3);
    this.BotonNodo9Sel.setVisible(false);
    //Fondo con nombre y boton JUGAR
    this.NombreNivel9 = this.add.image(wid*12.6/16, heig*4.1/16, 'Level0Name');
    this.NombreNivel9.setScale(2/3);
    this.NombreNivel9.setVisible(false);


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
    }
    if (user.map[3] == true){
      this.botonNivel4.setVisible(true);
    }
    if (user.map[4] == true){
      this.botonNivel5.setVisible(true);
    }
    if (user.map[5] == true){
      this.botonNivel6.setVisible(true);
    }
    if (user.map[6] == true){
      this.botonNivel7.setVisible(true);
    }
    if (user.map[7] == true){
      this.botonNivel8.setVisible(true);
    }
    if (user.map[8] == true){
      this.botonNivel9.setVisible(true);
    }
    if (user.map[9] == true){
     console.log("Debloquear mundo 2");
    }

  /*  if (botonActivo == 0){
      this.BotonAccesoNivel1.setVisible(false);
      this.BotonAccesoNivel2.setVisible(false);
    }*/
  }

  AccessToLevel(width_, height_, level){

  //  var nodoActivo;
  //  var nodosActivos;

    switch (level){

       case 0:

       if (this.nodosActivos == 0){
         this.nodoActivo =  this.BotonNodo0Sel;
         this.nombreNodoActivo = this.NombreNivel0;
         this.nodosActivos ++;
         this.BotonNodo0Sel.setVisible(true);
         this.NombreNivel0.setVisible(true);
         this.BotonNodo0Sel.setInteractive({ useHandCursor: true  } )
         .on('pointerdown', () => this.scene.start('LevelManager'));
         levelIndex = level;
         console.log("a jugar el " + level);
       }
       else {
         console.log("nodos activos " + this.nodosActivos);
         this.nombreNodoActivo.setVisible(false);
         this.nodoActivo.setVisible(false);
         this.nodosActivos = 0;
       }
       break;

      case 1:

      if(this.nodosActivos == 0){
        this.nodoActivo = this.BotonNodo1Sel;
        this.nombreNodoActivo = this.NombreNivel1;
        this.nodosActivos ++;
        this.BotonNodo1Sel.setVisible(true);
        this.NombreNivel1.setVisible(true);
        this.BotonNodo1Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.scene.start('LevelManager'));
        levelIndex = level;
        console.log("a jugar el " + level);
      }
      else{
        console.log("nodos activos " + this.nodosActivos);
        this.nombreNodoActivo.setVisible(false);
        this.nodoActivo.setVisible(false);
        this.nodosActivos = 0;
      }
      break;

      case 2:

      if(this.nodosActivos == 0){
        this.nodoActivo = this.BotonNodo2Sel;
        this.nombreNodoActivo = this.NombreNivel2;
        this.nodosActivos ++;
        this.BotonNodo2Sel.setVisible(true);
        this.NombreNivel2.setVisible(true);
        this.BotonNodo2Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.scene.start('LevelManager'));
        levelIndex = level;
        console.log("a jugar el " + level);
      }
      else{
        console.log("nodos activos " + this.nodosActivos);
        this.nombreNodoActivo.setVisible(false);
        this.nodoActivo.setVisible(false);
        this.nodosActivos = 0;
      }
      break;

      case 3:

      if(this.nodosActivos == 0){
        this.nodoActivo = this.BotonNodo3Sel;
        this.nombreNodoActivo = this.NombreNivel3;
        this.NombreNivel3.setVisible(true);
        this.nodosActivos ++;
        this.BotonNodo3Sel.setVisible(true);
        this.BotonNodo3Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.scene.start('LevelManager'));
        levelIndex = level;
        console.log("a jugar el " + level);
      }
      else{
        console.log("nodos activos " + this.nodosActivos);
        this.nombreNodoActivo.setVisible(false);
        this.nodoActivo.setVisible(false);
        this.nodosActivos = 0;
      }
      break;

      case 4:

      if(this.nodosActivos == 0){
        this.nodoActivo = this.BotonNodo4Sel;
        this.nombreNodoActivo = this.NombreNivel4;
        this.nodosActivos ++;
        this.NombreNivel4.setVisible(true);
        this.BotonNodo4Sel.setVisible(true);
        this.BotonNodo4Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.scene.start('LevelManager'));
        levelIndex = level;
        console.log("a jugar el " + level);
      }
      else{
        console.log("nodos activos " + this.nodosActivos);
        this.nombreNodoActivo.setVisible(false);
        this.nodoActivo.setVisible(false);
        this.nodosActivos = 0;
      }
      break;

      case 5:

      if(this.nodosActivos == 0){
        this.nodoActivo = this.BotonNodo5Sel;
        this.nombreNodoActivo = this.NombreNivel5;
        this.nodosActivos ++;
        this.BotonNodo5Sel.setVisible(true);
        this.NombreNivel5.setVisible(true);
        this.BotonNodo5Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.scene.start('LevelManager'));
        levelIndex = level;
        console.log("a jugar el " + level);
      }
      else{
        console.log("nodos activos " + this.nodosActivos);
        this.nombreNodoActivo.setVisible(false);
        this.nodoActivo.setVisible(false);
        this.nodosActivos = 0;
      }
      break;

      case 6:

      if(this.nodosActivos == 0){
        this.nodoActivo = this.BotonNodo6Sel;
        this.nombreNodoActivo = this.NombreNivel6;
        this.nodosActivos ++;
        this.NombreNivel6.setVisible(true);
        this.BotonNodo6Sel.setVisible(true);
        this.BotonNodo6Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.scene.start('LevelManager'));
        levelIndex = level;
        console.log("a jugar el " + level);
      }
      else{
        console.log("nodos activos " + this.nodosActivos);
        this.nombreNodoActivo.setVisible(false);
        this.nodoActivo.setVisible(false);
        this.nodosActivos = 0;
      }
      break;

      case 7:

      if(this.nodosActivos == 0){
        this.nodoActivo = this.BotonNodo7Sel;
        this.nombreNodoActivo = this.NombreNivel7;
        this.nodosActivos ++;
        this.NombreNivel7.setVisible(true);
        this.BotonNodo7Sel.setVisible(true);
        this.BotonNodo7Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.scene.start('LevelManager'));
        levelIndex = level;
        console.log("a jugar el " + level);
      }
      else{
        console.log("nodos activos " + this.nodosActivos);
        this.nombreNodoActivo.setVisible(false);
        this.nodoActivo.setVisible(false);
        this.nodosActivos = 0;
      }
      break;

      case 8:

      if(this.nodosActivos == 0){
        this.nodoActivo = this.BotonNodo8Sel;
        this.nombreNodoActivo = this.NombreNivel8;
        this.nodosActivos ++;
        this.NombreNivel8.setVisible(true);
        this.BotonNodo8Sel.setVisible(true);
        this.BotonNodo8Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.scene.start('LevelManager'));
        levelIndex = level;
        console.log("a jugar el " + level);
      }
      else{
        console.log("nodos activos " + this.nodosActivos);
        this.nombreNodoActivo.setVisible(false);
        this.nodoActivo.setVisible(false);
        this.nodosActivos = 0;
      }
      break;

      case 9:

      if(this.nodosActivos == 0){
        this.nodoActivo = this.BotonNodo9Sel;
        this.nombreNodoActivo = this.NombreNivel9;
        this.nodosActivos ++;
        this.NombreNivel9.setVisible(true);
        this.BotonNodo9Sel.setVisible(true);
        this.BotonNodo9Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.scene.start('LevelManager'));
        levelIndex = level;
        console.log("a jugar el " + level);
      }
      else{
        console.log("nodos activos " + this.nodosActivos);
        this.nombreNodoActivo.setVisible(false);
        this.nodoActivo.setVisible(false);
        this.nodosActivos = 0;
      }
      break;

     }
   }

}

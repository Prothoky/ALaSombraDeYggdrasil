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
    this.backgroundW1;

    this.load.image('FONDOGUIA', './ASSETS/World1Menu/FondoGuia.jpg');

  }

  create(){
    // Controlador de audio
    // Paramos música gameplay
    if (musicGameplay != null && musicGameplay.isPlaying) {
      musicGameplay.stop();
    }
    // Ponemos música menú
    if (!musicMenu.isPlaying) {
      musicMenu.play();
    }

    this.backgroundW1 = this.add.image(0, 0, 'FONDOGUIA');
    //this.backgroundW1 = this.add.image(0, 0, 'backgroundWM1M');
    this.backgroundW1.setScale(2/3);
    this.backgroundW1.setPosition(gameWidth/2, gameHeight/2);

    //BOTON ATRAS
    this.backButtonW1M = this.add.image(gameWidth*14/16, gameHeight*14/16, 'BackButtonW1M');
    this.backButtonW1M.setScale(1.5/3);
    this.backButtonW1M.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.BackMapSelectionMenu());

    //BOTON TIENDA
    this.shopButtonW1M = this.add.image(gameWidth*14/16, gameHeight*1/16, 'shopButtonMM');
    this.shopButtonW1M.setScale(1.5/3);
    this.shopButtonW1M.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.ShopMenuW1M());


    // (TESTEO) botón de iniciar partida

    //NIVEL 0
    //Boton Desbloqueado
    this.botonNivel0 = this.add.image(gameWidth*14.6/16, gameHeight*10.05/16, 'ButtonNodePrinc');
    this.botonNivel0.setScale(2/3);
    this.botonNivel0.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(gameWidth*14.6/16, gameHeight*10.05/16, 0));
    //Boton Seleccionado
    this.BotonNodo0Sel = this.add.image(gameWidth*14.6/16, gameHeight*10.05/16, 'ButtonNodePrincSel');
    this.BotonNodo0Sel.setScale(2/3);
    this.BotonNodo0Sel.setVisible(false);
    //Fondo con nombre y boton JUGAR
    //this.NombreNivel0 = this.add.text(wid*14.6/16, heig*9.05/16, strings.Map_Menu.map_1, {fill: "white"});
    this.NombreNivel0 = this.add.text(gameWidth*13.9/16, gameHeight*8.6/16, 'Nombre Nivel 0', {fill: "white"});
    //this.NombreNivel0.setScale(2/3);
    this.NombreNivel0.setVisible(false);

    //NIVEL 1
    //Boton Desbloqueado
    this.botonNivel1 = this.add.image(gameWidth*11.41/16, gameHeight*13.15/16, 'ButtonNodePrinc');
    this.botonNivel1.setScale(2/3);
    this.botonNivel1.setDepth(1);
    this.botonNivel1.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(gameWidth*11.41/16, gameHeight*13.15/16, 1));
    this.botonNivel1.setVisible(false);
    //Botón Seleccionado
    this.BotonNodo1Sel = this.add.image(gameWidth*11.41/16, gameHeight*13.15/16, 'ButtonNodePrincSel');
    this.BotonNodo1Sel.setScale(2/3);
    this.BotonNodo1Sel.setDepth(2);
    this.BotonNodo1Sel.setVisible(false);
    //Fondo con nombre
    this.NombreNivel1 = this.add.image(gameWidth*11.41/16, gameHeight*11.8/16, 'Level0Name');
    this.NombreNivel1.setScale(2/3);
    this.NombreNivel1.setVisible(false);

    //SUBNIVEL 1.1
    //Boton Desbloqueado
    this.buttonSubnode1 = this.add.image(gameWidth*12.55/16, gameHeight*14.22/16, 'ButtonSubNode1');
    this.buttonSubnode1.setScale(2/3);
    this.buttonSubnode1.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(gameWidth*12.55/16, gameHeight*14.22/16, 1));
    //this.buttonSubnode1.setVisible(false);
    //Botón Seleccionado
    /*this.buttonSubnode1Sel = this.add.image(gameWidth*13.6/16, gameHeight*13.15/16, 'ButtonSubNodeSel');
    this.buttonSubnode1Sel.setScale(2/3);
    this.buttonSubnode1Sel.setVisible(false);
    //Fondo con nombre
    this.nameSubnode1 = this.add.image(gameWidth*11.41/16, gameHeight*11.8/16, 'Level0Name');
    this.nameSubnode1.setScale(2/3);
    this.nameSubnode1.setVisible(false);*/

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
    this.botonNivel2 = this.add.image(gameWidth*10.18/16, gameHeight*11.75/16, 'ButtonNodePrinc');
    this.botonNivel2.setScale(2/3);
    this.botonNivel2.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(gameWidth*10.18/16, gameHeight*11.75/16, 2));
    this.botonNivel2.setVisible(false);
    //Botón Seleccionado
    this.BotonNodo2Sel = this.add.image(gameWidth*10.18/16, gameHeight*11.75/16, 'ButtonNodePrincSel');
    this.BotonNodo2Sel.setScale(2/3);
    this.BotonNodo2Sel.setVisible(false);
    //Fondo con nombre y boton JUGAR
    this.NombreNivel2 = this.add.image(gameWidth*10.18/16, gameHeight*10.75/16, 'Level0Name');
    this.NombreNivel2.setScale(2/3);
    this.NombreNivel2.setVisible(false);

    //this.BotonJugarNivel0 = this.add.image(width_, height_, 'ButtonPlayLevel');
      /*this.BotonJugarNivel0.setInteractive({ useHandCursor: true  } )
      .on('pointerdown', () => this.scene.start('LevelManager'));*/

    //Botón Desbloqueado
    this.botonNivel3 = this.add.image(gameWidth*7.4/16, gameHeight*14.15/16, 'ButtonNodePrinc');
    this.botonNivel3.setScale(2/3);
    this.botonNivel3.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(gameWidth*7.4/16, gameHeight*14.15/16, 3));
    this.botonNivel3.setVisible(false);
    //Botón Seleccionado
    this.BotonNodo3Sel = this.add.image(gameWidth*7.4/16, gameHeight*14.15/16, 'ButtonNodePrincSel');
    this.BotonNodo3Sel.setScale(2/3);
    this.BotonNodo3Sel.setVisible(false);
    //Fondo con nombre y boton JUGAR
    this.NombreNivel3 = this.add.image(gameWidth*7.4/16, gameHeight*13.15/16, 'Level0Name');
    this.NombreNivel3.setScale(2/3);
    this.NombreNivel3.setVisible(false);

    //Botón Desbloqueado
    this.botonNivel4 = this.add.image(gameWidth*3.025/16, gameHeight*11.55/16, 'ButtonNodePrinc');
    this.botonNivel4.setScale(2/3);
    this.botonNivel4.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () =>  this.AccessToLevel(gameWidth*3.025/16, gameHeight*11.55/16, 4));
    this.botonNivel4.setVisible(false);
    //Botón Seleccionado
    this.BotonNodo4Sel = this.add.image(gameWidth*3.025/16, gameHeight*11.55/16, 'ButtonNodePrincSel');
    this.BotonNodo4Sel.setScale(2/3);
    this.BotonNodo4Sel.setVisible(false);
    //Fondo con nombre y boton JUGAR
    this.NombreNivel4 = this.add.image(gameWidth*3.025/16, gameHeight*10.55/16, 'Level0Name');
    this.NombreNivel4.setScale(2/3);
    this.NombreNivel4.setVisible(false);

    //Botón Desbloqueado
    this.botonNivel5 = this.add.image(gameWidth*3.41/16, gameHeight*4.525/16, 'ButtonNodePrincSnow');
    this.botonNivel5.setScale(2/3);
    this.botonNivel5.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () =>  this.AccessToLevel(gameWidth*3.41/16, gameHeight*4.525/16, 5));
    this.botonNivel5.setVisible(false);
    //Botón Seleccionado
    this.BotonNodo5Sel = this.add.image(gameWidth*3.41/16, gameHeight*4.525/16, 'ButtonNodePrincSnowSel');
    this.BotonNodo5Sel.setScale(2/3);
    this.BotonNodo5Sel.setVisible(false);
    //Fondo con nombre y boton JUGAR
    this.NombreNivel5 = this.add.image(gameWidth*3.41/16, gameHeight*3.525/16, 'Level0Name');
    this.NombreNivel5.setScale(2/3);
    this.NombreNivel5.setVisible(false);

    //Botón Desbloqueado
    this.botonNivel6 = this.add.image(gameWidth*6.41/16, gameHeight*1.5/16, 'ButtonNodePrincSnow');
    this.botonNivel6.setScale(2/3);
    this.botonNivel6.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () =>  this.AccessToLevel(gameWidth*6.41/16, gameHeight*1.5/16, 6));
    this.botonNivel6.setVisible(false);
    //Botón Seleccionado
    this.BotonNodo6Sel = this.add.image(gameWidth*6.41/16, gameHeight*1.5/16, 'ButtonNodePrincSnowSel');
    this.BotonNodo6Sel.setScale(2/3);
    this.BotonNodo6Sel.setVisible(false);
    //Fondo con nombre y boton JUGAR
    this.NombreNivel6 = this.add.image(gameWidth*7.41/16, gameHeight*1.5/16, 'Level0Name');
    this.NombreNivel6.setScale(2/3);
    this.NombreNivel6.setVisible(false);


    //Botón Desbloqueado
    this.botonNivel7 = this.add.image(gameWidth*6.79/16, gameHeight*5.61/16, 'ButtonNodePrincSnow');
    this.botonNivel7.setScale(2/3);
    this.botonNivel7.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () =>  this.AccessToLevel(gameWidth*6.79/16, gameHeight*5.61/16, 7));
    this.botonNivel7.setVisible(false);
    //Botón Seleccionado
    this.BotonNodo7Sel = this.add.image(gameWidth*6.79/16, gameHeight*5.61/16, 'ButtonNodePrincSnowSel');
    this.BotonNodo7Sel.setScale(2/3);
    this.BotonNodo7Sel.setVisible(false);
    //Fondo con nombre y boton JUGAR
    this.NombreNivel7 = this.add.image(gameWidth*6.79/16, gameHeight*4.61/16, 'Level0Name');
    this.NombreNivel7.setScale(2/3);
    this.NombreNivel7.setVisible(false);

    //Botón Desbloqueado
    this.botonNivel8 = this.add.image(gameWidth*9.845/16, gameHeight*4.75/16, 'ButtonNodePrincSnow');
    this.botonNivel8.setScale(2/3);
    this.botonNivel8.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () =>  this.AccessToLevel(gameWidth*9.845/16, gameHeight*4.75/16, 8));
    this.botonNivel8.setVisible(false);
    //Botón Seleccionado
    this.BotonNodo8Sel = this.add.image(gameWidth*9.845/16, gameHeight*4.75/16, 'ButtonNodePrincSnowSel');
    this.BotonNodo8Sel.setScale(2/3);
    this.BotonNodo8Sel.setVisible(false);
    //Fondo con nombre y boton JUGAR
    this.NombreNivel8 = this.add.image(gameWidth*9.845/16, gameHeight*3.75/16, 'Level0Name');
    this.NombreNivel8.setScale(2/3);
    this.NombreNivel8.setVisible(false);

    //Botón Desbloqueado
    this.botonNivel9 = this.add.image(gameWidth*12.6/16, gameHeight*5.1/16, 'ButtonNodePrincSnow');
    this.botonNivel9.setScale(2/3);
    this.botonNivel9.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () =>  this.AccessToLevel(gameWidth*12.6/16, gameHeight*5.1/16, 9));
    this.botonNivel9.setVisible(false);
    //Botón Seleccionado
    this.BotonNodo9Sel = this.add.image(gameWidth*12.6/16, gameHeight*5.1/16, 'ButtonNodePrincSnowSel');
    this.BotonNodo9Sel.setScale(2/3);
    this.BotonNodo9Sel.setVisible(false);
    //Fondo con nombre y boton JUGAR
    this.NombreNivel9 = this.add.image(gameWidth*12.6/16, gameHeight*4.1/16, 'Level0Name');
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
     console.log("Desbloquear mundo 2");
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

     this.backgroundW1.setInteractive({ useHandCursor: true  } )
     .on('pointerdown', () => (this.nombreNodoActivo.setVisible(false), this.nodoActivo.setVisible(false), this.nodosActivos = 0));

   }

   BackMapSelectionMenu(){
     this.scene.pause('World1Map');
     this.scene.start('MapSelectionMenu');
   }

   ShopMenuW1M(){
     prevScene = 'World1Map';
     this.scene.stop('World1Map');
     this.scene.start('ShopMenu');
   }

}

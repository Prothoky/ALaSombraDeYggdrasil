class World1Map extends Phaser.Scene{
  constructor(){
      super("World1Map");
  }

  preload(){

    //Nodos
    this.buttonNode0Sel;   this.level0Name;
    this.buttonNode1Sel;   this.level1Name;
    this.buttonNode2Sel;   this.level2Name;
    this.buttonNode3Sel;   this.level3Name;
    this.buttonNode4Sel;   this.level4Name;
    this.buttonNode5Sel;   this.level5Name;
    this.buttonNode6Sel;   this.level6Name;
    this.buttonNode7Sel;   this.level7Name;
    this.buttonNode8Sel;   this.level8Name;
    this.buttonNode9Sel;   this.level9Name;

    //Subnodos
    this.buttonSubnode1_1;  this.buttonSubnode1_1Sel;
    this.buttonSubnode2_1;  this.buttonSubnode2_1Sel;
    this.buttonSubnode4_1;  this.buttonSubnode4_1Sel;
    this.buttonSubnode4_2;  this.buttonSubnode4_2Sel;
    this.buttonSubnode5_1;  this.buttonSubnode5_1Sel;
    this.buttonSubnode5_2;  this.buttonSubnode5_2Sel;
    this.buttonSubnode6_1;  this.buttonSubnode6_1Sel;
    this.buttonSubnode5_2;  this.buttonSubnode6_2Sel;

    //Variables
    this.activeNode;
    this.nameActiveNode;
    this.numActiveNodes = 0;
    this.backgroundW1;

    //this.load.image('FONDOGUIA', './ASSETS/World1Menu/FondoGuia.jpg');
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

    //this.backgroundW1 = this.add.image(0, 0, 'FONDOGUIA');
    this.backgroundW1 = this.add.image(0, 0, 'backgroundWM1M');
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


    //NIVEL 0
    //Boton Desbloqueado
    this.buttonNode0 = this.add.image(gameWidth*14.6/16, gameHeight*10.05/16, 'ButtonNodePrinc');
    this.buttonNode0.setScale(2/3);
    this.buttonNode0.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(0));
    //Boton Seleccionado
    this.buttonNode0Sel = this.add.image(gameWidth*14.6/16, gameHeight*10.05/16, 'ButtonNodePrincSel');
    this.buttonNode0Sel.setScale(2/3);
    this.buttonNode0Sel.setVisible(false);
    //Fondo con nombre y boton JUGAR
    //this.level0Name = this.add.text(wid*14.6/16, heig*9.05/16, strings.Map_Menu.map_1, {fill: "white"});
    this.level0Name = this.add.text(gameWidth*13.9/16, gameHeight*8.6/16, 'Nombre Nivel 0', {fill: "white"});
    //this.level0Name.setScale(2/3);
    this.level0Name.setVisible(false);

    //NIVEL 1
    //Boton Desbloqueado
    this.botonNivel1 = this.add.image(gameWidth*11.41/16, gameHeight*13.15/16, 'ButtonNodePrinc');
    this.botonNivel1.setScale(2/3);
    this.botonNivel1.setDepth(1);
    this.botonNivel1.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(1));
    this.botonNivel1.setVisible(false);
    //Botón Seleccionado
    this.buttonNode1Sel = this.add.image(gameWidth*11.41/16, gameHeight*13.15/16, 'ButtonNodePrincSel');
    this.buttonNode1Sel.setScale(2/3);
    this.buttonNode1Sel.setDepth(2);
    this.buttonNode1Sel.setVisible(false);
    //Fondo con nombre
    this.level1Name = this.add.image(gameWidth*11.41/16, gameHeight*11.8/16, 'Level0Name');
    this.level1Name.setScale(2/3);
    this.level1Name.setVisible(false);

    //SUBNIVEL 1.1
    //Boton Desbloqueado
    this.buttonSubnode1_1 = this.add.image(gameWidth*12.6/16, gameHeight*14.50/16, 'ButtonSubNode1');
    this.buttonSubnode1_1.setScale(2/3);
    this.buttonSubnode1_1.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(11));
    this.buttonSubnode1_1.setVisible(false);
    //Botón Seleccionado
    this.buttonSubnode1_1Sel = this.add.image(gameWidth*13.45/16, gameHeight*13.65/16, 'ButtonSubNodeSel');
    this.buttonSubnode1_1Sel.setScale(2/3);
    this.buttonSubnode1_1Sel.setVisible(false);
    //Fondo con nombre
    /*this.nameSubnode1 = this.add.image(gameWidth*11.41/16, gameHeight*11.8/16, 'Level0Name');
    this.nameSubnode1.setScale(2/3);
    this.nameSubnode1.setVisible(false);*/

    //NIVEL 2
    //Botón Desbloqueado
    this.botonNivel2 = this.add.image(gameWidth*10.18/16, gameHeight*11.75/16, 'ButtonNodePrinc');
    this.botonNivel2.setScale(2/3);
    this.botonNivel2.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(2));
    this.botonNivel2.setVisible(false);
    //Botón Seleccionado
    this.buttonNode2Sel = this.add.image(gameWidth*10.18/16, gameHeight*11.75/16, 'ButtonNodePrincSel');
    this.buttonNode2Sel.setScale(2/3);
    this.buttonNode2Sel.setVisible(false);
    //Fondo con nombre y boton JUGAR
    this.level2Name = this.add.image(gameWidth*10.18/16, gameHeight*10.75/16, 'Level0Name');
    this.level2Name.setScale(2/3);
    this.level2Name.setVisible(false);

    //SUBNIVEL 2.1
    //Boton Desbloqueado
    this.buttonSubnode2_1 = this.add.image(gameWidth*8.97/16, gameHeight*12.32/16, 'ButtonSubNode2');
    this.buttonSubnode2_1.setScale(2/3);
    this.buttonSubnode2_1.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(21));
    this.buttonSubnode2_1.setVisible(false);
    //Botón Seleccionado
    this.buttonSubnode2_1Sel = this.add.image(gameWidth*8.33/16, gameHeight*11.89/16, 'ButtonSubNodeSel');
    this.buttonSubnode2_1Sel.setScale(2/3);
    this.buttonSubnode2_1Sel.setVisible(false);
    //Fondo con nombre
    /*this.nameSubnode2_1 = this.add.image(gameWidth*11.41/16, gameHeight*11.8/16, 'Level0Name');
    this.nameSubnode2_1.setScale(2/3);
    this.nameSubnode2_1.setVisible(false);*/

    //NIVEL 3
    //Botón Desbloqueado
    this.botonNivel3 = this.add.image(gameWidth*7.4/16, gameHeight*14.15/16, 'ButtonNodePrinc');
    this.botonNivel3.setScale(2/3);
    this.botonNivel3.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(3));
    this.botonNivel3.setVisible(false);
    //Botón Seleccionado
    this.buttonNode3Sel = this.add.image(gameWidth*7.4/16, gameHeight*14.15/16, 'ButtonNodePrincSel');
    this.buttonNode3Sel.setScale(2/3);
    this.buttonNode3Sel.setVisible(false);
    //Fondo con nombre y boton JUGAR
    this.level3Name = this.add.image(gameWidth*7.4/16, gameHeight*13.15/16, 'Level0Name');
    this.level3Name.setScale(2/3);
    this.level3Name.setVisible(false);

    //NIVEL 4
    //Botón Desbloqueado
    this.botonNivel4 = this.add.image(gameWidth*3.025/16, gameHeight*11.55/16, 'ButtonNodePrinc');
    this.botonNivel4.setScale(2/3);
    this.botonNivel4.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () =>  this.AccessToLevel(4));
    this.botonNivel4.setVisible(false);
    //Botón Seleccionado
    this.buttonNode4Sel = this.add.image(gameWidth*3.025/16, gameHeight*11.55/16, 'ButtonNodePrincSel');
    this.buttonNode4Sel.setScale(2/3);
    this.buttonNode4Sel.setVisible(false);
    //Fondo con nombre y boton JUGAR
    this.level4Name = this.add.image(gameWidth*3.025/16, gameHeight*10.55/16, 'Level0Name');
    this.level4Name.setScale(2/3);
    this.level4Name.setVisible(false);

    //SUBNIVEL 4.1
    //Boton Desbloqueado
    this.buttonSubnode4_1 = this.add.image(gameWidth*2.28/16, gameHeight*9.15/16, 'ButtonSubNode4_1');
    this.buttonSubnode4_1.setScale(2/3);
    this.buttonSubnode4_1.setDepth(1);
    this.buttonSubnode4_1.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(41));
    this.buttonSubnode4_1.setVisible(false);
    //Botón Seleccionado
    this.buttonSubnode4_1Sel = this.add.image(gameWidth*2.53/16, gameHeight*7.0/16, 'ButtonSubNodeSel');
    this.buttonSubnode4_1Sel.setScale(2/3);
    this.buttonSubnode4_1Sel.setDepth(1);
    this.buttonSubnode4_1Sel.setVisible(false);
    //Fondo con nombre
    /*this.nameSubnode4_1 = this.add.image(gameWidth*11.41/16, gameHeight*11.8/16, 'Level0Name');
    this.nameSubnode4_1.setScale(2/3);
    this.nameSubnode4_1.setVisible(false);*/

    //SUBNIVEL 4.2
    //Boton Desbloqueado
    this.buttonSubnode4_2 = this.add.image(gameWidth*3.75/16, gameHeight*8.7/16, 'ButtonSubNode4_2');
    this.buttonSubnode4_2.setScale(2/3);
    this.buttonSubnode4_2.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(42));
    this.buttonSubnode4_2.setVisible(false);
    //Botón Seleccionado
    this.buttonSubnode4_2Sel = this.add.image(gameWidth*4.68/16, gameHeight*8.8/16, 'ButtonSubNodeSel');
    this.buttonSubnode4_2Sel.setScale(2/3);
    this.buttonSubnode4_2Sel.setVisible(false);
    //Fondo con nombre
    /*this.nameSubnode4_2 = this.add.image(gameWidth*11.41/16, gameHeight*11.8/16, 'Level0Name');
    this.nameSubnode4_2.setScale(2/3);
    this.nameSubnode4_2.setVisible(false);*/

    //NIVEL 5
    //Botón Desbloqueado
    this.botonNivel5 = this.add.image(gameWidth*3.41/16, gameHeight*4.525/16, 'ButtonNodePrincSnow');
    this.botonNivel5.setScale(2/3);
    this.botonNivel5.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () =>  this.AccessToLevel(5));
    this.botonNivel5.setVisible(false);
    //Botón Seleccionado
    this.buttonNode5Sel = this.add.image(gameWidth*3.41/16, gameHeight*4.525/16, 'ButtonNodePrincSnowSel');
    this.buttonNode5Sel.setScale(2/3);
    this.buttonNode5Sel.setVisible(false);
    //Fondo con nombre y boton JUGAR
    this.level5Name = this.add.image(gameWidth*3.41/16, gameHeight*3.525/16, 'Level0Name');
    this.level5Name.setScale(2/3);
    this.level5Name.setVisible(false);

    //SUBNIVEL 5.1
    //Boton Desbloqueado
    this.buttonSubnode5_1 = this.add.image(gameWidth*3.05/16, gameHeight*3.3/16, 'ButtonSubNode5_1');
    this.buttonSubnode5_1.setScale(2/3);
    this.buttonSubnode5_1.setDepth(2);
    this.buttonSubnode5_1.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(51));
    this.buttonSubnode5_1.setVisible(false);
    //Botón Seleccionado
    this.buttonSubnode5_1Sel = this.add.image(gameWidth*3.2/16, gameHeight*1.9/16, 'ButtonSubNodeSel');
    this.buttonSubnode5_1Sel.setScale(2/3);
    this.buttonSubnode5_1Sel.setDepth(2);
    this.buttonSubnode5_1Sel.setVisible(false);
    //Fondo con nombre
    /*this.nameSubnode5_1 = this.add.image(gameWidth*11.41/16, gameHeight*11.8/16, 'Level0Name');
    this.nameSubnode5_1.setScale(2/3);
    this.nameSubnode5_1.setVisible(false);*/

    //SUBNIVEL 5.2
    //Boton Desbloqueado
    this.buttonSubnode5_2 = this.add.image(gameWidth*1.95/16, gameHeight*1.95/16, 'ButtonSubNode5_2');
    this.buttonSubnode5_2.setScale(2/3);
    this.buttonSubnode5_2.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(52));
    this.buttonSubnode5_2.setVisible(false);
    //Botón Seleccionado
    this.buttonSubnode5_2Sel = this.add.image(gameWidth*1.0/16, gameHeight*1.35/16, 'ButtonSubNodeSel');
    this.buttonSubnode5_2Sel.setScale(2/3);
    this.buttonSubnode5_2Sel.setVisible(false);
    //Fondo con nombre
    /*this.nameSubnode5_1 = this.add.image(gameWidth*11.41/16, gameHeight*11.8/16, 'Level0Name');
    this.nameSubnode5_1.setScale(2/3);
    this.nameSubnode5_1.setVisible(false);*/

    //NIVEL 6
    //Botón Desbloqueado
    this.botonNivel6 = this.add.image(gameWidth*6.41/16, gameHeight*1.5/16, 'ButtonNodePrincSnow');
    this.botonNivel6.setScale(2/3);
    this.botonNivel6.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () =>  this.AccessToLevel(6));
    this.botonNivel6.setVisible(false);
    //Botón Seleccionado
    this.buttonNode6Sel = this.add.image(gameWidth*6.41/16, gameHeight*1.5/16, 'ButtonNodePrincSnowSel');
    this.buttonNode6Sel.setScale(2/3);
    this.buttonNode6Sel.setVisible(false);
    //Fondo con nombre y boton JUGAR
    this.level6Name = this.add.image(gameWidth*7.41/16, gameHeight*1.5/16, 'Level0Name');
    this.level6Name.setScale(2/3);
    this.level6Name.setVisible(false);

    //NIVEL 7
    //Botón Desbloqueado
    this.botonNivel7 = this.add.image(gameWidth*6.79/16, gameHeight*5.61/16, 'ButtonNodePrincSnow');
    this.botonNivel7.setScale(2/3);
    this.botonNivel7.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () =>  this.AccessToLevel(7));
    this.botonNivel7.setVisible(false);
    //Botón Seleccionado
    this.buttonNode7Sel = this.add.image(gameWidth*6.79/16, gameHeight*5.61/16, 'ButtonNodePrincSnowSel');
    this.buttonNode7Sel.setScale(2/3);
    this.buttonNode7Sel.setVisible(false);
    //Fondo con nombre y boton JUGAR
    this.level7Name = this.add.image(gameWidth*6.79/16, gameHeight*4.61/16, 'Level0Name');
    this.level7Name.setScale(2/3);
    this.level7Name.setVisible(false);

    //SUBNIVEL 7.1
    //Boton Desbloqueado
    this.buttonSubnode7_1 = this.add.image(gameWidth*7.86/16, gameHeight*7.85/16, 'ButtonSubNode7_1');
    this.buttonSubnode7_1.setScale(2/3);
    this.buttonSubnode7_1.setDepth(2);
    this.buttonSubnode7_1.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(71));
    this.buttonSubnode7_1.setVisible(false);
    //Botón Seleccionado
    this.buttonSubnode7_1Sel = this.add.image(gameWidth*8.33/16, gameHeight*7.87/16, 'ButtonSubNodeSel');
    this.buttonSubnode7_1Sel.setScale(2/3);
    this.buttonSubnode7_1Sel.setDepth(2);
    this.buttonSubnode7_1Sel.setVisible(false);
    //Fondo con nombre
    /*this.nameSubnode5_1 = this.add.image(gameWidth*11.41/16, gameHeight*11.8/16, 'Level0Name');
    this.nameSubnode5_1.setScale(2/3);
    this.nameSubnode5_1.setVisible(false);*/

    //SUBNIVEL 7.2
    //Boton Desbloqueado
    this.buttonSubnode7_2 = this.add.image(gameWidth*9.35/16, gameHeight*8.55/16, 'ButtonSubNode7_2');
    this.buttonSubnode7_2.setScale(2/3);
    this.buttonSubnode7_2.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AccessToLevel(72));
    this.buttonSubnode7_2.setVisible(false);
    //Botón Seleccionado
    this.buttonSubnode7_2Sel = this.add.image(gameWidth*9.95/16, gameHeight*8/16, 'ButtonSubNodeSel');
    this.buttonSubnode7_2Sel.setScale(2/3);
    this.buttonSubnode7_2Sel.setVisible(false);
    //Fondo con nombre
    /*this.nameSubnode5_1 = this.add.image(gameWidth*11.41/16, gameHeight*11.8/16, 'Level0Name');
    this.nameSubnode5_1.setScale(2/3);
    this.nameSubnode5_1.setVisible(false);*/

    //NIVEL 8
    //Botón Desbloqueado
    this.botonNivel8 = this.add.image(gameWidth*9.845/16, gameHeight*4.75/16, 'ButtonNodePrincSnow');
    this.botonNivel8.setScale(2/3);
    this.botonNivel8.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () =>  this.AccessToLevel(8));
    this.botonNivel8.setVisible(false);
    //Botón Seleccionado
    this.buttonNode8Sel = this.add.image(gameWidth*9.845/16, gameHeight*4.75/16, 'ButtonNodePrincSnowSel');
    this.buttonNode8Sel.setScale(2/3);
    this.buttonNode8Sel.setVisible(false);
    //Fondo con nombre y boton JUGAR
    this.level8Name = this.add.image(gameWidth*9.845/16, gameHeight*3.75/16, 'Level0Name');
    this.level8Name.setScale(2/3);
    this.level8Name.setVisible(false);

    //NIVEL 9
    //Botón Desbloqueado
    this.botonNivel9 = this.add.image(gameWidth*12.6/16, gameHeight*5.1/16, 'ButtonNodePrincSnow');
    this.botonNivel9.setScale(2/3);
    this.botonNivel9.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () =>  this.AccessToLevel(9));
    this.botonNivel9.setVisible(false);
    //Botón Seleccionado
    this.buttonNode9Sel = this.add.image(gameWidth*12.6/16, gameHeight*5.1/16, 'ButtonNodePrincSnowSel');
    this.buttonNode9Sel.setScale(2/3);
    this.buttonNode9Sel.setVisible(false);
    //Fondo con nombre y boton JUGAR
    this.level9Name = this.add.image(gameWidth*12.6/16, gameHeight*4.1/16, 'Level0Name');
    this.level9Name.setScale(2/3);
    this.level9Name.setVisible(false);


    //this.events.on("Unlock buttons", this.unlockButtons, this);
  }

  update(){

    if (user.map[0] == true){
      this.botonNivel1.setVisible(true);
      //levelIndex = 1;
      //console.log("has pasado el nivel " + (levelIndex - 1));
    }
    if (user.map[1] == true){
      this.botonNivel2.setVisible(true);
      this.buttonSubnode1_1.setVisible(true);
    //  this.botonNivel1_1.setVisible(true);
    //  this.botonNivel1_2.setVisible(true);
      //levelIndex = 2;
      //console.log("has pasado el nivel " + (levelIndex - 1));
    }
    if (user.map[2] == true){
      this.botonNivel3.setVisible(true);
      this.buttonSubnode2_1.setVisible(true);
    }
    if (user.map[3] == true){
      this.botonNivel4.setVisible(true);
    }
    if (user.map[4] == true){
      this.botonNivel5.setVisible(true);
      this.buttonSubnode4_1.setVisible(true);
      //this.buttonSubnode4_2.setVisible(true);
    }
    if (user.map[5] == true){
      this.botonNivel6.setVisible(true);
      this.buttonSubnode5_1.setVisible(true);
      //this.buttonSubnode5_2.setVisible(true);
    }
    if (user.map[6] == true){
      this.botonNivel7.setVisible(true);
    }
    if (user.map[7] == true){
      this.botonNivel8.setVisible(true);
      this.buttonSubnode7_1.setVisible(true);
      //this.buttonSubnode7_2.setVisible(true);
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

  AccessToLevel(level){

    switch (level){

       case 0:

       if (this.numActiveNodes == 0){
         this.activeNode =  this.buttonNode0Sel;
         this.nameActiveNode = this.level0Name;
         this.numActiveNodes ++;
         this.buttonNode0Sel.setVisible(true);
         this.level0Name.setVisible(true);
         this.buttonNode0Sel.setInteractive({ useHandCursor: true  } )
         .on('pointerdown', () => this.scene.start('LevelManager'));
         levelIndex = level;
         console.log("a jugar el " + level);
       }
       else {
         console.log("nodos activos " + this.numActiveNodes);
         this.nameActiveNode.setVisible(false);
         this.activeNode.setVisible(false);
         this.numActiveNodes = 0;
       }
       break;

      case 1:

      if(this.numActiveNodes == 0){
        this.activeNode = this.buttonNode1Sel;
        this.nameActiveNode = this.level1Name;
        this.numActiveNodes ++;
        this.buttonNode1Sel.setVisible(true);
        this.level1Name.setVisible(true);
        this.buttonNode1Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.scene.start('LevelManager'));
        levelIndex = level;
        console.log("a jugar el " + level);
      }
      else{
        console.log("nodos activos " + this.numActiveNodes);
        this.nameActiveNode.setVisible(false);
        this.activeNode.setVisible(false);
        this.numActiveNodes = 0;
      }
      break;

      case 2:

      if(this.numActiveNodes == 0){
        this.activeNode = this.buttonNode2Sel;
        this.nameActiveNode = this.level2Name;
        this.numActiveNodes ++;
        this.buttonNode2Sel.setVisible(true);
        this.level2Name.setVisible(true);
        this.buttonNode2Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.scene.start('LevelManager'));
        levelIndex = level;
        console.log("a jugar el " + level);
      }
      else{
        console.log("nodos activos " + this.numActiveNodes);
        this.nameActiveNode.setVisible(false);
        this.activeNode.setVisible(false);
        this.numActiveNodes = 0;
      }
      break;

      case 3:

      if(this.numActiveNodes == 0){
        this.activeNode = this.buttonNode3Sel;
        this.nameActiveNode = this.level3Name;
        this.level3Name.setVisible(true);
        this.numActiveNodes ++;
        this.buttonNode3Sel.setVisible(true);
        this.buttonNode3Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.scene.start('LevelManager'));
        levelIndex = level;
        console.log("a jugar el " + level);
      }
      else{
        console.log("nodos activos " + this.numActiveNodes);
        this.nameActiveNode.setVisible(false);
        this.activeNode.setVisible(false);
        this.numActiveNodes = 0;
      }
      break;

      case 4:

      if(this.numActiveNodes == 0){
        this.activeNode = this.buttonNode4Sel;
        this.nameActiveNode = this.level4Name;
        this.numActiveNodes ++;
        this.level4Name.setVisible(true);
        this.buttonNode4Sel.setVisible(true);
        this.buttonNode4Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.scene.start('LevelManager'));
        levelIndex = level;
        console.log("a jugar el " + level);
      }
      else{
        console.log("nodos activos " + this.numActiveNodes);
        this.nameActiveNode.setVisible(false);
        this.activeNode.setVisible(false);
        this.numActiveNodes = 0;
      }
      break;

      case 5:

      if(this.numActiveNodes == 0){
        this.activeNode = this.buttonNode5Sel;
        this.nameActiveNode = this.level5Name;
        this.numActiveNodes ++;
        this.buttonNode5Sel.setVisible(true);
        this.level5Name.setVisible(true);
        this.buttonNode5Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.scene.start('LevelManager'));
        levelIndex = level;
        console.log("a jugar el " + level);
      }
      else{
        console.log("nodos activos " + this.numActiveNodes);
        this.nameActiveNode.setVisible(false);
        this.activeNode.setVisible(false);
        this.numActiveNodes = 0;
      }
      break;

      case 6:

      if(this.numActiveNodes == 0){
        this.activeNode = this.buttonNode6Sel;
        this.nameActiveNode = this.level6Name;
        this.numActiveNodes ++;
        this.level6Name.setVisible(true);
        this.buttonNode6Sel.setVisible(true);
        this.buttonNode6Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.scene.start('LevelManager'));
        levelIndex = level;
        console.log("a jugar el " + level);
      }
      else{
        console.log("nodos activos " + this.numActiveNodes);
        this.nameActiveNode.setVisible(false);
        this.activeNode.setVisible(false);
        this.numActiveNodes = 0;
      }
      break;

      case 7:

      if(this.numActiveNodes == 0){
        this.activeNode = this.buttonNode7Sel;
        this.nameActiveNode = this.level7Name;
        this.numActiveNodes ++;
        this.level7Name.setVisible(true);
        this.buttonNode7Sel.setVisible(true);
        this.buttonNode7Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.scene.start('LevelManager'));
        levelIndex = level;
        console.log("a jugar el " + level);
      }
      else{
        console.log("nodos activos " + this.numActiveNodes);
        this.nameActiveNode.setVisible(false);
        this.activeNode.setVisible(false);
        this.numActiveNodes = 0;
      }
      break;

      case 8:

      if(this.numActiveNodes == 0){
        this.activeNode = this.buttonNode8Sel;
        this.nameActiveNode = this.level8Name;
        this.numActiveNodes ++;
        this.level8Name.setVisible(true);
        this.buttonNode8Sel.setVisible(true);
        this.buttonNode8Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.scene.start('LevelManager'));
        levelIndex = level;
        console.log("a jugar el " + level);
      }
      else{
        console.log("nodos activos " + this.numActiveNodes);
        this.nameActiveNode.setVisible(false);
        this.activeNode.setVisible(false);
        this.numActiveNodes = 0;
      }
      break;

      case 9:

      if(this.numActiveNodes == 0){
        this.activeNode = this.buttonNode9Sel;
        this.nameActiveNode = this.level9Name;
        this.numActiveNodes ++;
        this.level9Name.setVisible(true);
        this.buttonNode9Sel.setVisible(true);
        this.buttonNode9Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.scene.start('LevelManager'));
        levelIndex = level;
        console.log("a jugar el " + level);
      }
      else{
        console.log("nodos activos " + this.numActiveNodes);
        this.nameActiveNode.setVisible(false);
        this.activeNode.setVisible(false);
        this.numActiveNodes = 0;
      }
      break;

      case 11:

      if (this.numActiveNodes == 0){
        this.activeNode =  this.buttonSubnode1_1Sel;
        this.nameActiveNode = this.level0Name;
        this.numActiveNodes ++;
        this.buttonSubnode1_1Sel.setVisible(true);
        this.level0Name.setVisible(true);
        this.buttonSubnode1_1Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.scene.start('LevelManager'));
        levelIndex = 1;
        console.log("a jugar el " + level);
      }
      else {
        console.log("nodos activos " + this.numActiveNodes);
        this.nameActiveNode.setVisible(false);
        this.activeNode.setVisible(false);
        this.numActiveNodes = 0;
      }
      break;

      case 21:

      if (this.numActiveNodes == 0){
        this.activeNode =  this.buttonSubnode2_1Sel;
        this.nameActiveNode = this.level0Name;
        this.numActiveNodes ++;
        this.buttonSubnode2_1Sel.setVisible(true);
        this.level0Name.setVisible(true);
        this.buttonSubnode2_1Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.scene.start('LevelManager'));
        levelIndex = 2;
        console.log("a jugar el " + level);
      }
      else {
        console.log("nodos activos " + this.numActiveNodes);
        this.nameActiveNode.setVisible(false);
        this.activeNode.setVisible(false);
        this.numActiveNodes = 0;
      }
      break;

      case 41:

      if (this.numActiveNodes == 0){
        this.activeNode =  this.buttonSubnode4_1Sel;
        this.nameActiveNode = this.level0Name;
        this.numActiveNodes ++;
        this.buttonSubnode4_1Sel.setVisible(true);
        this.level0Name.setVisible(true);
        this.buttonSubnode4_1Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.scene.start('LevelManager'));
        levelIndex = 4;
        console.log("a jugar el " + level);
      }
      else {
        console.log("nodos activos " + this.numActiveNodes);
        this.nameActiveNode.setVisible(false);
        this.activeNode.setVisible(false);
        this.numActiveNodes = 0;
      }
      break;

      case 42:

      if (this.numActiveNodes == 0){
        this.activeNode =  this.buttonSubnode4_2Sel;
        this.nameActiveNode = this.level0Name;
        this.numActiveNodes ++;
        this.buttonSubnode4_2Sel.setVisible(true);
        this.level0Name.setVisible(true);
        this.buttonSubnode4_2Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.scene.start('LevelManager'));
        levelIndex = 4;
        console.log("a jugar el " + level);
      }
      else {
        console.log("nodos activos " + this.numActiveNodes);
        this.nameActiveNode.setVisible(false);
        this.activeNode.setVisible(false);
        this.numActiveNodes = 0;
      }
      break;

      case 51:

      if (this.numActiveNodes == 0){
        this.activeNode =  this.buttonSubnode5_1Sel;
        this.nameActiveNode = this.level0Name;
        this.numActiveNodes ++;
        this.buttonSubnode5_1Sel.setVisible(true);
        this.level0Name.setVisible(true);
        this.buttonSubnode5_1Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.scene.start('LevelManager'));
        levelIndex = 5;
        console.log("a jugar el " + level);
      }
      else {
        console.log("nodos activos " + this.numActiveNodes);
        this.nameActiveNode.setVisible(false);
        this.activeNode.setVisible(false);
        this.numActiveNodes = 0;
      }
      break;

      case 52:

      if (this.numActiveNodes == 0){
        this.activeNode =  this.buttonSubnode5_2Sel;
        this.nameActiveNode = this.level0Name;
        this.numActiveNodes ++;
        this.buttonSubnode5_2Sel.setVisible(true);
        this.level0Name.setVisible(true);
        this.buttonSubnode5_2Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.scene.start('LevelManager'));
        levelIndex = 5;
        console.log("a jugar el " + level);
      }
      else {
        console.log("nodos activos " + this.numActiveNodes);
        this.nameActiveNode.setVisible(false);
        this.activeNode.setVisible(false);
        this.numActiveNodes = 0;
      }
      break;

      case 71:

      if (this.numActiveNodes == 0){
        this.activeNode =  this.buttonSubnode7_1Sel;
        this.nameActiveNode = this.level0Name;
        this.numActiveNodes ++;
        this.buttonSubnode7_1Sel.setVisible(true);
        this.level0Name.setVisible(true);
        this.buttonSubnode7_1Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.scene.start('LevelManager'));
        levelIndex = 7;
        console.log("a jugar el " + level);
      }
      else {
        console.log("nodos activos " + this.numActiveNodes);
        this.nameActiveNode.setVisible(false);
        this.activeNode.setVisible(false);
        this.numActiveNodes = 0;
      }
      break;

      case 72:

      if (this.numActiveNodes == 0){
        this.activeNode =  this.buttonSubnode7_2Sel;
        this.nameActiveNode = this.level0Name;
        this.numActiveNodes ++;
        this.buttonSubnode7_2Sel.setVisible(true);
        this.level0Name.setVisible(true);
        this.buttonSubnode7_2Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.scene.start('LevelManager'));
        levelIndex = 7;
        console.log("a jugar el " + level);
      }
      else {
        console.log("nodos activos " + this.numActiveNodes);
        this.nameActiveNode.setVisible(false);
        this.activeNode.setVisible(false);
        this.numActiveNodes = 0;
      }
      break;

     }

     this.backgroundW1.setInteractive({ useHandCursor: true  } )
     .on('pointerdown', () => (this.nameActiveNode.setVisible(false), this.activeNode.setVisible(false), this.numActiveNodes = 0));

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

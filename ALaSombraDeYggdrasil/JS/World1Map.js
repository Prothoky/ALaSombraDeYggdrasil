class World1Map extends Phaser.Scene{
  constructor(){
      super("World1Map");
  }

  preload(){

    //Nodos
    this.buttonNode0Sel;   this.level0NameEs;   this.level0NameEn;
    this.buttonNode1Sel;   this.level1NameEs;   this.level1NameEn;
    this.buttonNode2Sel;   this.level2NameEs;   this.level2NameEn;
    this.buttonNode3Sel;   this.level3NameEs;   this.level3NameEn;
    this.buttonNode4Sel;   this.level4NameEs;   this.level4NameEn;
    this.buttonNode5Sel;   this.level5NameEs;   this.level5NameEn;
    this.buttonNode6Sel;   this.level6NameEs;   this.level6NameEn;
    this.buttonNode7Sel;   this.level7NameEs;   this.level7NameEn;
    this.buttonNode8Sel;   this.level8NameEs;   this.level8NameEn;
    this.buttonNode9Sel;   this.level9NameEs;   this.level9NameEn;

    //Subnodos
    this.buttonSubnode1_1;  this.buttonSubnode1_1Sel;   this.level1_1Name;
    this.buttonSubnode2_1;  this.buttonSubnode2_1Sel;   this.level2_1Name;
    this.buttonSubnode4_1;  this.buttonSubnode4_1Sel;   this.level4_1Name;
    this.buttonSubnode4_2;  this.buttonSubnode4_2Sel;   this.level4_2Name;
    this.buttonSubnode5_1;  this.buttonSubnode5_1Sel;   this.level5_1Name;
    this.buttonSubnode5_2;  this.buttonSubnode5_2Sel;   this.level5_2Name;
    this.buttonSubnode6_1;  this.buttonSubnode6_1Sel;   this.level6_1Name;
    this.buttonSubnode5_2;  this.buttonSubnode6_2Sel;   this.level6_2Name;

    //Variables
    this.activeNode;
    this.nameActiveNode;
    this.numActiveNodes = 0;
    this.backgroundW1;

    this.MoneyW1M;

    //this.load.image('FONDOGUIA', './ASSETS/World1Menu/FondoGuia.jpg');
  }

  create(){

    this.clickSound = this.sound.add('ClickButtonSound', this.EffectsConfig());
    this.cameras.main.fadeIn(1000, 0, 0, 0);

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
    this.backgroundW1.setInteractive({ useHandCursor: false  } )
    .on('pointerdown', () => {
        if(this.nameActiveNode!=null)
            this.nameActiveNode.setVisible(false);
        if(this.activeNode!=null)  
            this.activeNode.setVisible(false);
        this.numActiveNodes = 0;
    });

    //MONEY
    this.backgroundMoneyW1M = this.add.image(gameWidth*13/16, gameHeight*1.1/16, 'deselectedButtonSmall');
    this.backgroundMoneyW1M.setScale(1.5/3);
    this.MoneyW1M = this.add.text(gameWidth*14/16, gameHeight*0.92/16,  user.money, {fontFamily: "Acadian_Runes",fontSize: "20px", align: 'center', fill: "#481d18"});

    this.SetTextPos();


    //BOTON TIENDA
    this.shopButtonW1M = this.add.image(gameWidth*14.5/16, gameHeight*1.1/16, 'deselectedButtonSmall');
    this.shopButtonW1M.setScale(1.5/3);
    this.shopButtonW1MSel = this.add.image(gameWidth*14.7/16, gameHeight*1.1/16, 'selSmallRightButton');
    this.shopButtonW1MSel.setScale(1.5/3);
    this.shopButtonW1MSel.setVisible(false);
    this.shopButtonText = this.add.text(gameWidth*14.1/16, gameHeight*0.92/16,  stringsJSON.Buttons.shop, {fontFamily: "Acadian_Runes",fontSize: "20px", align: 'center', fill: "#481d18"});
    if (userConfig.lang == "en"){
      this.shopButtonText.setX(gameWidth*14.25 /16);
    }
    this.shopButtonW1M.on('pointerover', function (pointer) {this.shopButtonW1MSel.setVisible(true);}, this);
    this.shopButtonW1M.on('pointerout', function (pointer) {this.shopButtonW1MSel.setVisible(false);}, this);
    this.shopButtonW1M.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.ShopMenuW1M());



    //BOTON ATRAS
    this.backButtonW1M = this.add.image(gameWidth*14.5/16, gameHeight*15/16, 'deselectedButtonSmall');
    this.backButtonW1M.setScale(1.5/3);
    this.backButtonW1MSel = this.add.image(gameWidth*14.3/16, gameHeight*14.8/16, 'selSmallLeftButton');
    this.backButtonW1MSel.setScale(1.5/3);
    this.backButtonW1MSel.setVisible(false);
    //Texto Boton
    this.backText = this.add.text(gameWidth*14.18/16, gameHeight*14.61/16,  stringsJSON.Buttons.back, {fontFamily: "Acadian_Runes",fontSize: "16px", align: 'center', fill: "#481d18"});
    if (userConfig.lang == "en"){
      this.backText.setX(gameWidth*14.3 /16);
    }
    //Acciones Boton
    this.backButtonW1M.on('pointerover', function (pointer) {this.backButtonW1MSel.setVisible(true);}, this);
    this.backButtonW1M.on('pointerout', function (pointer) {this.backButtonW1MSel.setVisible(false);}, this);
    this.backButtonW1M.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BackMapSelectionMenu());



    //FULL SCREEN
    this.fullScreenW1M = this.add.image(gameWidth*15.5/16, gameHeight*13/14, 'buttonFullScreen');
    this.fullScreenW1M.setScale(2/60);
    this.fullScreenW1M.setInteractive({ useHandCursor: true})
		.on('pointerdown', function() {
      this.scene.scale.toggleFullscreen();
    });


    //NIVEL 0
    this.buttonNode0SelClick = this.add.image(gameWidth*14.6/16, gameHeight*10.05/16, 'ButtonNodePrincSel');
    this.buttonNode0SelClick.setVisible(false);
    this.buttonNode0SelClick.setScale(2/3);

    //Boton Desbloqueado
    this.buttonNode0 = this.add.image(gameWidth*14.6/16, gameHeight*10.05/16, 'ButtonNodePrinc');
    this.buttonNode0.setScale(2/3);
    this.buttonNode0.on('pointerover', function (pointer) {this.buttonNode0SelClick.setVisible(true);}, this);
    this.buttonNode0.on('pointerout', function (pointer) {this.buttonNode0SelClick.setVisible(false);}, this);
    this.buttonNode0.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.AccessToLevel(0));

    //Boton Seleccionado
    this.buttonNode0Sel = this.add.image(gameWidth*14.6/16, gameHeight*10.05/16, 'ButtonNodePrincSel');
    this.buttonNode0Sel.setScale(2/3);
    this.buttonNode0Sel.setVisible(false);

    //Fondo con nombre y boton JUGAR
    if(userConfig.lang == "es"){
      this.level0Name = this.add.image(gameWidth*14.6/16, gameHeight*8.65/16, 'Nivel0Name');
    }else{
      this.level0Name = this.add.image(gameWidth*14.6/16, gameHeight*8.65/16, 'Level0Name');
    }
    this.level0Name.setScale(1.8/3);
    this.level0Name.setVisible(false);

    //NIVEL 1
    //Iluminacion Boton
    this.buttonNode1SelClick = this.add.image(gameWidth*11.41/16, gameHeight*13.15/16, 'ButtonNodePrincSel');
    this.buttonNode1SelClick.setVisible(false);
    this.buttonNode1SelClick.setScale(2/3);
    //Boton Desbloqueado
    this.buttonNode1 = this.add.image(gameWidth*11.41/16, gameHeight*13.15/16, 'ButtonNodePrinc');
    this.buttonNode1.setScale(2/3);
    this.buttonNode1.setDepth(1);
    this.buttonNode1.setVisible(false);
    //Botón Seleccionado
    this.buttonNode1Sel = this.add.image(gameWidth*11.41/16, gameHeight*13.15/16, 'ButtonNodePrincSel');
    this.buttonNode1Sel.setScale(2/3);
    this.buttonNode1Sel.setDepth(2);
    this.buttonNode1Sel.setVisible(false);
    //Funciones Boton
    this.buttonNode1.on('pointerover', function (pointer) {this.buttonNode1SelClick.setVisible(true);}, this);
    this.buttonNode1.on('pointerout', function (pointer) {this.buttonNode1SelClick.setVisible(false);}, this);
    this.buttonNode1.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.AccessToLevel(1));
    //Fondo con nombre
    if(userConfig.lang == "es"){
      this.level1Name = this.add.image(gameWidth*11.41/16, gameHeight*11.8/16, 'Nivel1Name');
    }else{
      this.level1Name = this.add.image(gameWidth*11.41/16, gameHeight*11.8/16, 'Level1Name');
    }
    this.level1Name.setScale(1.8/3);
    this.level1Name.setVisible(false);

    //SUBNIVEL 1.1
    //Iluminacion Boton
    this.buttonSubode11SelClick = this.add.image(gameWidth*13.45/16, gameHeight*13.65/16, 'ButtonSubNodeSel');
    this.buttonSubode11SelClick.setVisible(false);
    this.buttonSubode11SelClick.setScale(2/3);
    //Boton Desbloqueado
    this.subnode1_1 = this.add.image(gameWidth*12.6/16, gameHeight*14.50/16, 'ButtonSubNode1');
    this.subnode1_1.setScale(2/3);
    this.subnode1_1.setVisible(false);
    //Boton Desbloqueado
    this.buttonSubnode1_1 = this.add.image(gameWidth*13.5/16, gameHeight*13.65/16, 'NodeDeselected');
    this.buttonSubnode1_1.setScale(2/3);
    this.buttonSubnode1_1.setVisible(false);
    //Botón Seleccionado
    this.buttonSubnode1_1Sel = this.add.image(gameWidth*13.49/16, gameHeight*13.65/16, 'ButtonSubNodeSel');
    this.buttonSubnode1_1Sel.setScale(2/3);
    this.buttonSubnode1_1Sel.setVisible(false);
    //Funciones Boton
    this.buttonSubnode1_1.on('pointerover', function (pointer) {this.buttonSubode11SelClick.setVisible(true);}, this);
    this.buttonSubnode1_1.on('pointerout', function (pointer) {this.buttonSubode11SelClick.setVisible(false);}, this);
    this.buttonSubnode1_1.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.AccessToLevel(10));
    //Fondo con nombre
    /*if(userLang == "es"){
      this.level1_1Name = this.add.image(gameWidth*13.4/16, gameHeight*13.6/16, 'Nivel1_1Name');
    }else{
      this.level1_1Name = this.add.image(gameWidth*13.4/16, gameHeight*13.6/16, 'Level1_1Name');
    }*/
    this.level1_1Name = this.add.image(gameWidth*13.4/16, gameHeight*12.3/16, 'Nivel1_1Name');
    this.level1_1Name.setScale(1.7/3);
    this.level1_1Name.setVisible(false);
    /*this.nameSubnode1 = this.add.image(gameWidth*11.41/16, gameHeight*11.8/16, 'Level0Name');
    this.nameSubnode1.setScale(2/3);
    this.nameSubnode1.setVisible(false);*/

    //NIVEL 2
    //Boton Iluminado
    this.buttonNode2SelClick = this.add.image(gameWidth*10.18/16, gameHeight*11.75/16, 'ButtonNodePrincSel');
    this.buttonNode2SelClick.setVisible(false);
    this.buttonNode2SelClick.setScale(2/3);
    //Botón Desbloqueado
    this.buttonNode2 = this.add.image(gameWidth*10.18/16, gameHeight*11.75/16, 'ButtonNodePrinc');
    this.buttonNode2.setScale(2/3);
    this.buttonNode2.setVisible(false);
    //Botón Seleccionado
    this.buttonNode2Sel = this.add.image(gameWidth*10.18/16, gameHeight*11.75/16, 'ButtonNodePrincSel');
    this.buttonNode2Sel.setScale(2/3);
    this.buttonNode2Sel.setVisible(false);
    //Funciones Boton
    this.buttonNode2.on('pointerover', function (pointer) {this.buttonNode2SelClick.setVisible(true);}, this);
    this.buttonNode2.on('pointerout', function (pointer) {this.buttonNode2SelClick.setVisible(false);}, this);
    this.buttonNode2.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.AccessToLevel(2));
    //Fondo con nombre y boton JUGAR
    if(userConfig.lang == "es"){
      this.level2Name = this.add.image(gameWidth*10.18/16, gameHeight*10.1/16, 'Nivel2Name');
    }else{
      this.level2Name = this.add.image(gameWidth*10.18/16, gameHeight*10.1/16, 'Level2Name');
    }
    if (userConfig.lang == "en"){
      this.level2Name.setScale(1.8/3);
    }else{
      this.level2Name.setScale(2.1/3);
    }
    this.level2Name.setVisible(false);

    //SUBNIVEL 2.1
    //Iluminacion Boton
    this.buttonSubode21SelClick = this.add.image(gameWidth*8.33/16, gameHeight*11.89/16, 'ButtonSubNodeSel');
    this.buttonSubode21SelClick.setVisible(false);
    this.buttonSubode21SelClick.setScale(2/3);
    //Boton Desbloqueado +  camino
    this.subnode2_1 = this.add.image(gameWidth*8.97/16, gameHeight*12.32/16, 'ButtonSubNode2');
    this.subnode2_1.setScale(2/3);
    this.subnode2_1.setVisible(false);
    //Botón Seleccionado
    this.buttonSubnode2_1Sel = this.add.image(gameWidth*8.33/16, gameHeight*11.89/16, 'ButtonSubNodeSel');
    this.buttonSubnode2_1Sel.setScale(2/3);
    this.buttonSubnode2_1Sel.setVisible(false);
    //Boton Deseleccionado
    this.buttonSubnode2_1 = this.add.image(gameWidth*8.3/16, gameHeight*11.92/16, 'NodeDeselected');
    this.buttonSubnode2_1.setScale(2/3);
    this.buttonSubnode2_1.setVisible(false);
    //Funciones Boton
    this.buttonSubnode2_1.on('pointerover', function (pointer) {this.buttonSubode21SelClick.setVisible(true);}, this);
    this.buttonSubnode2_1.on('pointerout', function (pointer) {this.buttonSubode21SelClick.setVisible(false);}, this);
    this.buttonSubnode2_1.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.AccessToLevel(11));
    //Fondo con nombre
    if(userConfig.lang == "es"){
      this.level2_1Name = this.add.image(gameWidth*8.3/16, gameHeight*10.5/16, 'Nivel2_1Name');
    }else{
      this.level2_1Name = this.add.image(gameWidth*8.3/16, gameHeight*10.5/16, 'Level2_1Name');
    }
    this.level2_1Name.setScale(1.8/3);
    this.level2_1Name.setVisible(false);

    //NIVEL 3
    //Boton Iluminado
    this.buttonNode3SelClick = this.add.image(gameWidth*7.4/16, gameHeight*14.15/16, 'ButtonNodePrincSel');
    this.buttonNode3SelClick.setVisible(false);
    this.buttonNode3SelClick.setScale(2/3);
    //Botón Desbloqueado
    this.buttonNode3 = this.add.image(gameWidth*7.4/16, gameHeight*14.15/16, 'ButtonNodePrinc');
    this.buttonNode3.setScale(2/3);
    this.buttonNode3.setVisible(false);
    //Botón Seleccionado
    this.buttonNode3Sel = this.add.image(gameWidth*7.4/16, gameHeight*14.15/16, 'ButtonNodePrincSel');
    this.buttonNode3Sel.setScale(2/3);
    this.buttonNode3Sel.setVisible(false);
    //Funciones BOTON
    this.buttonNode3.on('pointerover', function (pointer) {this.buttonNode3SelClick.setVisible(true);}, this);
    this.buttonNode3.on('pointerout', function (pointer) {this.buttonNode3SelClick.setVisible(false);}, this);
    this.buttonNode3.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.AccessToLevel(3));
    //Fondo con nombre y boton JUGAR
    if(userConfig.lang == "es"){
      this.level3Name = this.add.image(gameWidth*7.4/16, gameHeight*12.7/16, 'Nivel3Name');
    }else{
      this.level3Name = this.add.image(gameWidth*7.4/16, gameHeight*12.7/16, 'Level3Name');
    }
    this.level3Name.setScale(1.8/3);
    this.level3Name.setVisible(false);

    //NIVEL 4
    //Boton Iluminado
    this.buttonNode4SelClick = this.add.image(gameWidth*3.025/16, gameHeight*11.55/16, 'ButtonNodePrincSel');
    this.buttonNode4SelClick.setVisible(false);
    this.buttonNode4SelClick.setScale(2/3);
    //Botón Desbloqueado
    this.buttonNode4 = this.add.image(gameWidth*3.025/16, gameHeight*11.55/16, 'ButtonNodePrinc');
    this.buttonNode4.setScale(2/3);
    this.buttonNode4.setVisible(false);
    //Botón Seleccionado
    this.buttonNode4Sel = this.add.image(gameWidth*3.025/16, gameHeight*11.55/16, 'ButtonNodePrincSel');
    this.buttonNode4Sel.setScale(2/3);
    this.buttonNode4Sel.setVisible(false);
    //Funciones BOTON
    this.buttonNode4.on('pointerover', function (pointer) {this.buttonNode4SelClick.setVisible(true);}, this);
    this.buttonNode4.on('pointerout', function (pointer) {this.buttonNode4SelClick.setVisible(false);}, this);
    this.buttonNode4.setInteractive({ useHandCursor: true}).on('pointerdown', () =>  this.AccessToLevel(4));
    //Fondo con nombre y boton JUGAR
    if(userConfig.lang == "es"){
      this.level4Name = this.add.image(gameWidth*3.025/16, gameHeight*9.95/16, 'Nivel4Name');
    }else{
      this.level4Name = this.add.image(gameWidth*3.025/16, gameHeight*9.95/16, 'Level4Name');
    }
    this.level4Name.setScale(2/3);
    this.level4Name.setDepth(2);
    this.level4Name.setVisible(false);

    //SUBNIVEL 4.1
    //Iluminacion Boton
    this.buttonSubode41SelClick = this.add.image(gameWidth*2.53/16, gameHeight*7.0/16, 'ButtonSubNodeSel');
    this.buttonSubode41SelClick.setVisible(false);
    this.buttonSubode41SelClick.setScale(2/3);
    //Boton Desbloqueado + camino
    this.subnode4_1 = this.add.image(gameWidth*2.28/16, gameHeight*9.15/16, 'ButtonSubNode4_1');
    this.subnode4_1.setScale(2/3);
    this.subnode4_1.setDepth(1);
    this.subnode4_1.setVisible(false);
    //Boton Deseleccionado
    this.buttonSubnode4_1 = this.add.image(gameWidth*2.50/16, gameHeight*7.05/16, 'NodeDeselected');
    this.buttonSubnode4_1.setScale(2/3);
    this.buttonSubnode4_1.setDepth(1);
    this.buttonSubnode4_1.setVisible(false);
    //Botón Seleccionado
    this.buttonSubnode4_1Sel = this.add.image(gameWidth*2.53/16, gameHeight*7.0/16, 'ButtonSubNodeSel');
    this.buttonSubnode4_1Sel.setScale(2/3);
    this.buttonSubnode4_1Sel.setDepth(1);
    this.buttonSubnode4_1Sel.setVisible(false);
    //Funciones Boton
    this.buttonSubnode4_1.on('pointerover', function (pointer) {this.buttonSubode41SelClick.setVisible(true);}, this);
    this.buttonSubnode4_1.on('pointerout', function (pointer) {this.buttonSubode41SelClick.setVisible(false);}, this);
    this.buttonSubnode4_1.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.AccessToLevel(12));

    //Fondo con nombre
    /*if(userLang == "es"){
      this.level4_1Name = this.add.image(gameWidth*2.53/16, gameHeight*7/16, 'Level4_1NameEs');
    }else{
      this.level4_1Name = this.add.image(gameWidth*2.53/16, gameHeight*7/16, 'Level4_1NameEn');
    }*/
    this.level4_1Name = this.add.image(gameWidth*2.53/16, gameHeight*5.9/16, 'Nivel4_1Name');
    this.level4_1Name.setScale(1.8/3);
    this.level4_1Name.setVisible(false);

    //SUBNIVEL 4.2
    //Iluminacion Boton
    this.buttonSubode42SelClick = this.add.image(gameWidth*4.68/16, gameHeight*8.78/16, 'ButtonSubNodeSel');
    this.buttonSubode42SelClick.setVisible(false);
    this.buttonSubode42SelClick.setScale(2/3);
    //Boton Desbloqueado + camino
    this.subnode4_2 = this.add.image(gameWidth*3.75/16, gameHeight*8.7/16, 'ButtonSubNode4_2');
    this.subnode4_2.setScale(2/3);
    this.subnode4_2.setVisible(false);
    //Boton Deseleccionado
    this.buttonSubnode4_2 = this.add.image(gameWidth*4.65/16, gameHeight*8.75/16, 'NodeDeselected');
    this.buttonSubnode4_2.setScale(2/3);
    this.buttonSubnode4_2.setVisible(false);
    //Botón Seleccionado
    this.buttonSubnode4_2Sel = this.add.image(gameWidth*4.68/16, gameHeight*8.75/16, 'ButtonSubNodeSel');
    this.buttonSubnode4_2Sel.setScale(2/3);
    this.buttonSubnode4_2Sel.setVisible(false);
    //Funciones Boton
    this.buttonSubnode4_2.on('pointerover', function (pointer) {this.buttonSubode42SelClick.setVisible(true);}, this);
    this.buttonSubnode4_2.on('pointerout', function (pointer) {this.buttonSubode42SelClick.setVisible(false);}, this);
    this.buttonSubnode4_2.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.AccessToLevel(13));

    //Fondo con nombre
    /*if(userLang == "es"){
      this.level4_2Name = this.add.image(gameWidth*4.7/16, gameHeight*8/16, 'Level4_2NameEs');
    }else{
      this.level4_2Name = this.add.image(gameWidth*4.7/16, gameHeight*8/16, 'Level4_2NameEn');
    }*/
    this.level4_2Name = this.add.image(gameWidth*4.7/16, gameHeight*7.3/16, 'Nivel4_2Name');
    this.level4_2Name.setScale(1.8/3);
    this.level4_2Name.setVisible(false);

    //NIVEL 5
    //Boton Iluminado
    this.buttonNode5SelClick = this.add.image(gameWidth*3.41/16, gameHeight*4.53/16, 'ButtonNodePrincSnowSel');
    this.buttonNode5SelClick.setVisible(false);
    this.buttonNode5SelClick.setScale(2/3);
    //Botón Desbloqueado
    this.buttonNode5 = this.add.image(gameWidth*3.41/16, gameHeight*4.525/16, 'ButtonNodePrincSnow');
    this.buttonNode5.setScale(2/3);
    this.buttonNode5.setVisible(false);
    //Botón Seleccionado
    this.buttonNode5Sel = this.add.image(gameWidth*3.41/16, gameHeight*4.56/16, 'ButtonNodePrincSnowSel');
    this.buttonNode5Sel.setScale(2/3);
    this.buttonNode5Sel.setVisible(false);
    //Funciones BOTON
    this.buttonNode5.on('pointerover', function (pointer) {this.buttonNode5SelClick.setVisible(true);}, this);
    this.buttonNode5.on('pointerout', function (pointer) {this.buttonNode5SelClick.setVisible(false);}, this);
    this.buttonNode5.setInteractive({ useHandCursor: true}).on('pointerdown', () =>  this.AccessToLevel(5));
    //Fondo con nombre y boton JUGAR
    if(userConfig.lang == "es"){
      this.level5Name = this.add.image(gameWidth*3.41/16, gameHeight*3.05/16, 'Nivel5Name');
    }else{
      this.level5Name = this.add.image(gameWidth*3.41/16, gameHeight*3.05/16, 'Level5Name');
    }
    this.level5Name.setScale(2/3);
    this.level5Name.setDepth(3);
    this.level5Name.setVisible(false);

    //SUBNIVEL 5.1
    //Iluminacion Boton
    this.buttonSubode51SelClick = this.add.image(gameWidth*3.2/16, gameHeight*1.9/16, 'ButtonSubNodeSel');
    this.buttonSubode51SelClick.setVisible(false);
    this.buttonSubode51SelClick.setScale(2/3);
    //Boton Desbloqueado
    this.subnode5_1 = this.add.image(gameWidth*3.05/16, gameHeight*3.3/16, 'ButtonSubNode5_1');
    this.subnode5_1.setScale(2/3);
    this.subnode5_1.setDepth(2);
    this.subnode5_1.setVisible(false);
    //Boton Deseleccionado
    this.buttonSubnode5_1 = this.add.image(gameWidth*3.2/16, gameHeight*1.9/16, 'NodeDeselected');
    this.buttonSubnode5_1.setScale(2/3);
    this.buttonSubnode5_1.setDepth(2);
    this.buttonSubnode5_1.setVisible(false);
    //Botón Seleccionado
    this.buttonSubnode5_1Sel = this.add.image(gameWidth*3.2/16, gameHeight*1.9/16, 'ButtonSubNodeSel');
    this.buttonSubnode5_1Sel.setScale(2/3);
    this.buttonSubnode5_1Sel.setDepth(2);
    this.buttonSubnode5_1Sel.setVisible(false);
    //Funciones Botones
    this.buttonSubnode5_1.on('pointerover', function (pointer) {this.buttonSubode51SelClick.setVisible(true);}, this);
    this.buttonSubnode5_1.on('pointerout', function (pointer) {this.buttonSubode51SelClick.setVisible(false);}, this);
    this.buttonSubnode5_1.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.AccessToLevel(14));
    //Fondo con nombre
    if(userConfig.lang == "es"){
      this.level5_1Name = this.add.image(gameWidth*3.2/16, gameHeight*0.7/16, 'Nivel5_1Name');
    }else{
      this.level5_1Name = this.add.image(gameWidth*3.2/16, gameHeight*0.7/16, 'Level5_1Name');
    }
    this.level5_1Name.setScale(1.8/3);
    this.level5_1Name.setVisible(false);

    //SUBNIVEL 5.2
    //Iluminacion Boton
    this.buttonSubode52SelClick = this.add.image(gameWidth*1.0/16, gameHeight*1.35/16, 'ButtonSubNodeSel');
    this.buttonSubode52SelClick.setVisible(false);
    this.buttonSubode52SelClick.setScale(2/3);
    //Boton Desbloqueado + camino
    this.subnode5_2 = this.add.image(gameWidth*1.95/16, gameHeight*1.95/16, 'ButtonSubNode5_2');
    this.subnode5_2.setScale(2/3);
    this.subnode5_2.setVisible(false);
    //Boton Deseleccionado
    this.buttonSubnode5_2 = this.add.image(gameWidth*1/16, gameHeight*1.45/16, 'NodeDeselected');
    this.buttonSubnode5_2.setScale(2/3);
    this.buttonSubnode5_2.setVisible(false);
    //Botón Seleccionado
    this.buttonSubnode5_2Sel = this.add.image(gameWidth*1.0/16, gameHeight*1.38/16, 'ButtonSubNodeSel');
    this.buttonSubnode5_2Sel.setScale(2/3);
    this.buttonSubnode5_2Sel.setVisible(false);
    //Funciones Boton
    this.buttonSubnode5_2.on('pointerover', function (pointer) {this.buttonSubode52SelClick.setVisible(true);}, this);
    this.buttonSubnode5_2.on('pointerout', function (pointer) {this.buttonSubode52SelClick.setVisible(false);}, this);
    this.buttonSubnode5_2.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.AccessToLevel(15));

    //Fondo con nombre
    if(userConfig.lang == "es"){
      this.level5_2Name = this.add.image(gameWidth*1/16, gameHeight*2.6/16, 'Nivel5_2Name');
    }else{
      this.level5_2Name = this.add.image(gameWidth*1/16, gameHeight*2.6/16, 'Level5_2Name');
    }
    this.level5_2Name.setScale(1.8/3);
    this.level5_2Name.setVisible(false);

    //NIVEL 6
    //Boton Iluminado
    this.buttonNode6SelClick = this.add.image(gameWidth*6.41/16, gameHeight*1.5/16, 'ButtonNodePrincSnowSel');
    this.buttonNode6SelClick.setVisible(false);
    this.buttonNode6SelClick.setScale(2/3);
    //Botón Desbloqueado
    this.buttonNode6 = this.add.image(gameWidth*6.41/16, gameHeight*1.5/16, 'ButtonNodePrincSnow');
    this.buttonNode6.setScale(2/3);
    this.buttonNode6.setVisible(false);
    //Botón Seleccionado
    this.buttonNode6Sel = this.add.image(gameWidth*6.41/16, gameHeight*1.53/16, 'ButtonNodePrincSnowSel');
    this.buttonNode6Sel.setScale(2/3);
    this.buttonNode6Sel.setVisible(false);
    //Funciones BOTON
    this.buttonNode6.on('pointerover', function (pointer) {this.buttonNode6SelClick.setVisible(true);}, this);
    this.buttonNode6.on('pointerout', function (pointer) {this.buttonNode6SelClick.setVisible(false);}, this);
    this.buttonNode6.setInteractive({ useHandCursor: true}).on('pointerdown', () =>  this.AccessToLevel(6));
    //Fondo con nombre y boton JUGAR
    if(userConfig.lang == "es"){
      this.level6Name = this.add.image(gameWidth*7.8/16, gameHeight*1.5/16, 'Nivel6Name');
    }else{
      this.level6Name = this.add.image(gameWidth*7.8/16, gameHeight*1.5/16, 'Level6Name');
    }
    this.level6Name.setScale(1.8/3);
    this.level6Name.setVisible(false);

    //NIVEL 7
    //Boton Iluminado
    this.buttonNode7SelClick = this.add.image(gameWidth*6.79/16, gameHeight*5.61/16, 'ButtonNodePrincSnowSel');
    this.buttonNode7SelClick.setVisible(false);
    this.buttonNode7SelClick.setScale(2/3);
    //Botón Desbloqueado
    this.buttonNode7 = this.add.image(gameWidth*6.79/16, gameHeight*5.61/16, 'ButtonNodePrincSnow');
    this.buttonNode7.setScale(2/3);
    this.buttonNode7.setVisible(false);
    //Botón Seleccionado
    this.buttonNode7Sel = this.add.image(gameWidth*6.79/16, gameHeight*5.64/16, 'ButtonNodePrincSnowSel');
    this.buttonNode7Sel.setScale(2/3);
    this.buttonNode7Sel.setVisible(false);
    //Funciones BOTON
    this.buttonNode7.on('pointerover', function (pointer) {this.buttonNode7SelClick.setVisible(true);}, this);
    this.buttonNode7.on('pointerout', function (pointer) {this.buttonNode7SelClick.setVisible(false);}, this);
    this.buttonNode7.setInteractive({ useHandCursor: true}).on('pointerdown', () =>  this.AccessToLevel(7));
    //Fondo con nombre y boton JUGAR
    if(userConfig.lang == "es"){
      this.level7Name = this.add.image(gameWidth*6.79/16, gameHeight*4.21/16, 'Nivel7Name');
    }else{
      this.level7Name = this.add.image(gameWidth*6.79/16, gameHeight*4.21/16, 'Level7Name');
    }
    this.level7Name.setScale(1.8/3);
    this.level7Name.setVisible(false);

    //SUBNIVEL 7.1
    //Iluminacion Boton
    this.buttonSubode71SelClick = this.add.image(gameWidth*8.33/16, gameHeight*7.87/16, 'ButtonSubNodeSel');
    this.buttonSubode71SelClick.setVisible(false);
    this.buttonSubode71SelClick.setScale(2/3);
    //Boton Desbloqueado + camino
    this.subnode7_1 = this.add.image(gameWidth*7.86/16, gameHeight*7.85/16, 'ButtonSubNode7_1');
    this.subnode7_1.setScale(2/3);
    this.subnode7_1.setDepth(2);
    this.subnode7_1.setVisible(false)
    //Boton Deseleccionado
    this.buttonSubnode7_1 = this.add.image(gameWidth*8.33/16, gameHeight*7.87/16, 'NodeDeselected');
    this.buttonSubnode7_1.setScale(2/3);
    this.buttonSubnode7_1.setDepth(2);
    this.buttonSubnode7_1.setVisible(false);
    //Botón Seleccionado
    this.buttonSubnode7_1Sel = this.add.image(gameWidth*8.33/16, gameHeight*7.87/16, 'ButtonSubNodeSel');
    this.buttonSubnode7_1Sel.setScale(2/3);
    this.buttonSubnode7_1Sel.setDepth(2);
    this.buttonSubnode7_1Sel.setVisible(false);
    //Funciones boton
    this.buttonSubnode7_1.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.AccessToLevel(16));
    this.buttonSubnode7_1.on('pointerover', function (pointer) {this.buttonSubode71SelClick.setVisible(true);}, this);
    this.buttonSubnode7_1.on('pointerout', function (pointer) {this.buttonSubode71SelClick.setVisible(false);}, this);

    //Fondo con nombre
    /*if(userLang == "es"){
      this.level7_1Name = this.add.image(gameWidth*8.7/16, gameHeight*7.8/16, 'Level7_1NameEs');
    }else{
      this.level7_1Name = this.add.image(gameWidth*8.76/16, gameHeight*7.8/16, 'Level7_1NameEn');
    }*/
    this.level7_1Name = this.add.image(gameWidth*8.3/16, gameHeight*6.7/16, 'Nivel7_1Name');
    this.level7_1Name.setScale(1.8/3);
    this.level7_1Name.setVisible(false);

    //SUBNIVEL 7.2
    //Iluminacion Boton
    this.buttonSubode72SelClick = this.add.image(gameWidth*9.95/16, gameHeight*8/16, 'ButtonSubNodeSel');
    this.buttonSubode72SelClick.setVisible(false);
    this.buttonSubode72SelClick.setScale(2/3);
    //Boton Desbloqueado + camino
    this.subnode7_2 = this.add.image(gameWidth*9.35/16, gameHeight*8.55/16, 'ButtonSubNode7_2');
    this.subnode7_2.setScale(2/3);
    this.subnode7_2.setVisible(false);
    //Boton Deseleccionado
    this.buttonSubnode7_2 = this.add.image(gameWidth*9.95/16, gameHeight*8/16, 'NodeDeselected');
    this.buttonSubnode7_2.setScale(2/3);
    this.buttonSubnode7_2.setVisible(false);
    //Botón Seleccionado
    this.buttonSubnode7_2Sel = this.add.image(gameWidth*9.95/16, gameHeight*8/16, 'ButtonSubNodeSel');
    this.buttonSubnode7_2Sel.setScale(2/3);
    this.buttonSubnode7_2Sel.setVisible(false);
    //Funciones Boton
    this.buttonSubnode7_2.on('pointerover', function (pointer) {this.buttonSubode72SelClick.setVisible(true);}, this);
    this.buttonSubnode7_2.on('pointerout', function (pointer) {this.buttonSubode72SelClick.setVisible(false);}, this);
    this.buttonSubnode7_2.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.AccessToLevel(17));

    this.level7_2Name = this.add.image(gameWidth*9.95/16, gameHeight*6.8/16, 'Nivel7_2Name');
    this.level7_2Name.setScale(1.8/3);
    this.level7_2Name.setVisible(false);

    //NIVEL 8
    //Boton Iluminado
    this.buttonNode8SelClick = this.add.image(gameWidth*9.845/16, gameHeight*4.75/16, 'ButtonNodePrincSnowSel');
    this.buttonNode8SelClick.setVisible(false);
    this.buttonNode8SelClick.setScale(2/3);
    //Botón Desbloqueado
    this.buttonNode8 = this.add.image(gameWidth*9.845/16, gameHeight*4.75/16, 'ButtonNodePrincSnow');
    this.buttonNode8.setScale(2/3);
    this.buttonNode8.setVisible(false);
    //Botón Seleccionado
    this.buttonNode8Sel = this.add.image(gameWidth*9.845/16, gameHeight*4.78/16, 'ButtonNodePrincSnowSel');
    this.buttonNode8Sel.setScale(2/3);
    this.buttonNode8Sel.setVisible(false);
    //Funciones BOTON
    this.buttonNode8.on('pointerover', function (pointer) {this.buttonNode8SelClick.setVisible(true);}, this);
    this.buttonNode8.on('pointerout', function (pointer) {this.buttonNode8SelClick.setVisible(false);}, this);
    this.buttonNode8.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.AccessToLevel(8));
    //Fondo con nombre y boton JUGAR
    if(userConfig.lang == "es"){
      this.level8Name = this.add.image(gameWidth*9.845/16, gameHeight*3.35/16, 'Nivel8Name');
    }else{
      this.level8Name = this.add.image(gameWidth*9.845/16, gameHeight*3.35/16, 'Level8Name');
    }
    this.level8Name.setScale(1.8/3);
    this.level8Name.setVisible(false);

    //NIVEL 9
    //Boton Iluminado
    this.buttonNode9SelClick = this.add.image(gameWidth*12.6/16, gameHeight*5.1/16, 'ButtonNodePrincSnowSel');
    this.buttonNode9SelClick.setVisible(false);
    this.buttonNode9SelClick.setScale(2/3);
    //Botón Desbloqueado
    this.buttonNode9 = this.add.image(gameWidth*12.6/16, gameHeight*5.1/16, 'ButtonNodePrincSnow');
    this.buttonNode9.setScale(2/3);
    this.buttonNode9.setVisible(false);
    //Botón Seleccionado
    this.buttonNode9Sel = this.add.image(gameWidth*12.6/16, gameHeight*5.13/16, 'ButtonNodePrincSnowSel');
    this.buttonNode9Sel.setScale(2/3);
    this.buttonNode9Sel.setVisible(false);
    //Funciones BOTON
    this.buttonNode9.on('pointerover', function (pointer) {this.buttonNode9SelClick.setVisible(true);}, this);
    this.buttonNode9.on('pointerout', function (pointer) {this.buttonNode9SelClick.setVisible(false);}, this);
    this.buttonNode9.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () =>  this.AccessToLevel(9));
    //Fondo con nombre y boton JUGAR
    if(userConfig.lang == "es"){
      this.level9Name = this.add.image(gameWidth*12.6/16, gameHeight*3.7/16, 'Nivel9Name');
    }else{
      this.level9Name = this.add.image(gameWidth*12.6/16, gameHeight*3.7/16, 'Level9Name');
    }
    this.level9Name.setScale(1.8/3);
    this.level9Name.setVisible(false);
  }

  update(){

    //this.SetTextPos();

    if (user.map[0] == true){
      this.buttonNode1.setVisible(true);
    }
    if (user.map[1] == true){
      this.buttonNode2.setVisible(true);
      this.subnode1_1.setVisible(true);
      this.buttonSubnode1_1.setVisible(true);
    }
    if (user.map[2] == true){
      this.buttonNode3.setVisible(true);
      this.buttonSubnode2_1.setVisible(true);
      this.subnode2_1.setVisible(true);
    }
    if (user.map[3] == true){
      this.buttonNode4.setVisible(true);
    }
    if (user.map[4] == true){
      this.buttonNode5.setVisible(true);
      this.subnode4_1.setVisible(true);
      this.buttonSubnode4_1.setVisible(true);
    }
    if (user.map[5] == true){
      this.buttonNode6.setVisible(true);
      this.subnode5_1.setVisible(true);
      this.buttonSubnode5_1.setVisible(true);
    }
    if (user.map[6] == true){
      this.buttonNode7.setVisible(true);
    }
    if (user.map[7] == true){
      this.buttonNode8.setVisible(true);
      this.subnode7_1.setVisible(true);
      this.buttonSubnode7_1.setVisible(true);
    }
    if (user.map[8] == true){
      this.buttonNode9.setVisible(true);
    }
    if (user.map[9] == true){
      user.world[1] = true;
     console.log("Desbloquear mundo 2");
    }

    if (user.map[12] == true){
     this.buttonSubnode4_2.setVisible(true);
     this.subnode4_2.setVisible(true);
    }

    if (user.map[14] == true){
     this.subnode5_2.setVisible(true);
     this.buttonSubnode5_2.setVisible(true);
    }

    if (user.map[16] == true){
     this.subnode7_2.setVisible(true);
     this.buttonSubnode7_2.setVisible(true);
    }

  }

  AccessToLevel(level){

    this.clickSound.play();

    switch (level){

       case 0:

       if (this.numActiveNodes == 0){
         this.activeNode =  this.buttonNode0Sel;
         this.nameActiveNode = this.level0Name;
         this.numActiveNodes ++;
         this.buttonNode0Sel.setVisible(true);
         this.level0Name.setVisible(true);
         this.buttonNode0Sel.setInteractive({ useHandCursor: true  } )
         .on('pointerdown', () => this.StartPlaying());
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
        .on('pointerdown', () => this.StartPlaying());
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
        .on('pointerdown', () => this.StartPlaying());
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
        .on('pointerdown', () => this.StartPlaying());
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
        .on('pointerdown', () => this.StartPlaying());
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
        .on('pointerdown', () => this.StartPlaying());
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
        .on('pointerdown', () => this.StartPlaying());
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
        .on('pointerdown', () => this.StartPlaying());
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
        .on('pointerdown', () => this.StartPlaying());
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
        .on('pointerdown', () => this.StartPlaying());
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

      case 10:

      if (this.numActiveNodes == 0){
        this.activeNode =  this.buttonSubnode1_1Sel;
        this.nameActiveNode = this.level1_1Name;
        this.numActiveNodes ++;
        this.buttonSubnode1_1Sel.setVisible(true);
        this.level1_1Name.setVisible(true);
        this.buttonSubnode1_1Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.StartPlaying());
        levelIndex = 10;
        console.log("a jugar el " + level);
      }
      else {
        console.log("nodos activos " + this.numActiveNodes);
        this.nameActiveNode.setVisible(false);
        this.activeNode.setVisible(false);
        this.numActiveNodes = 0;
      }
      break;

      case 11:

      if (this.numActiveNodes == 0){
        this.activeNode =  this.buttonSubnode2_1Sel;
        this.nameActiveNode = this.level2_1Name;
        this.numActiveNodes ++;
        this.buttonSubnode2_1Sel.setVisible(true);
        this.level2_1Name.setVisible(true);
        this.buttonSubnode2_1Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.StartPlaying());
        levelIndex = 11;
        console.log("a jugar el " + level);
      }
      else {
        console.log("nodos activos " + this.numActiveNodes);
        this.nameActiveNode.setVisible(false);
        this.activeNode.setVisible(false);
        this.numActiveNodes = 0;
      }
      break;

      case 12:

      if (this.numActiveNodes == 0){
        this.activeNode =  this.buttonSubnode4_1Sel;
        this.nameActiveNode = this.level4_1Name;
        this.numActiveNodes ++;
        this.buttonSubnode4_1Sel.setVisible(true);
        this.level4_1Name.setVisible(true);
        this.buttonSubnode4_1Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.StartPlaying());
        levelIndex = 12;
        console.log("a jugar el " + level);
      }
      else {
        console.log("nodos activos " + this.numActiveNodes);
        this.nameActiveNode.setVisible(false);
        this.activeNode.setVisible(false);
        this.numActiveNodes = 0;
      }
      break;

      case 13:

      if (this.numActiveNodes == 0){
        this.activeNode =  this.buttonSubnode4_2Sel;
        this.nameActiveNode = this.level4_2Name;
        this.numActiveNodes ++;
        this.buttonSubnode4_2Sel.setVisible(true);
        this.level4_2Name.setVisible(true);
        this.buttonSubnode4_2Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.StartPlaying());
        levelIndex = 13;
        console.log("a jugar el " + level);
      }
      else {
        console.log("nodos activos " + this.numActiveNodes);
        this.nameActiveNode.setVisible(false);
        this.activeNode.setVisible(false);
        this.numActiveNodes = 0;
      }
      break;

      case 14:

      if (this.numActiveNodes == 0){
        this.activeNode =  this.buttonSubnode5_1Sel;
        this.nameActiveNode = this.level5_1Name;
        this.numActiveNodes ++;
        this.buttonSubnode5_1Sel.setVisible(true);
        this.level5_1Name.setVisible(true);
        this.buttonSubnode5_1Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.StartPlaying());
        levelIndex = 14;
        console.log("a jugar el " + level);
      }
      else {
        console.log("nodos activos " + this.numActiveNodes);
        this.nameActiveNode.setVisible(false);
        this.activeNode.setVisible(false);
        this.numActiveNodes = 0;
      }
      break;

      case 15:

      if (this.numActiveNodes == 0){
        this.activeNode =  this.buttonSubnode5_2Sel;
        this.nameActiveNode = this.level5_2Name;
        this.numActiveNodes ++;
        this.buttonSubnode5_2Sel.setVisible(true);
        this.level5_2Name.setVisible(true);
        this.buttonSubnode5_2Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.StartPlaying());
        levelIndex = 15;
        console.log("a jugar el " + level);
      }
      else {
        console.log("nodos activos " + this.numActiveNodes);
        this.nameActiveNode.setVisible(false);
        this.activeNode.setVisible(false);
        this.numActiveNodes = 0;
      }
      break;

      case 16:

      if (this.numActiveNodes == 0){
        this.activeNode =  this.buttonSubnode7_1Sel;
        this.nameActiveNode = this.level7_1Name;
        this.numActiveNodes ++;
        this.buttonSubnode7_1Sel.setVisible(true);
        this.level7_1Name.setVisible(true);
        this.buttonSubnode7_1Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.StartPlaying());
        levelIndex = 16;
        console.log("a jugar el " + level);
      }
      else {
        console.log("nodos activos " + this.numActiveNodes);
        this.nameActiveNode.setVisible(false);
        this.activeNode.setVisible(false);
        this.numActiveNodes = 0;
      }
      break;

      case 17:

      if (this.numActiveNodes == 0){
        this.activeNode =  this.buttonSubnode7_2Sel;
        this.nameActiveNode = this.level7_2Name;
        this.numActiveNodes ++;
        this.buttonSubnode7_2Sel.setVisible(true);
        this.level7_2Name.setVisible(true);
        this.buttonSubnode7_2Sel.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.StartPlaying());
        levelIndex = 17;
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

   }

   SetTextPos(){

     if((user.money>=0) && (user.money<100)){
       this.MoneyW1M.x = gameWidth*13/16
     }else if((user.money>=100) && (user.money<1000)){
       this.MoneyW1M.x = gameWidth*12.9/16
     }else if ((user.money>1000) && (user.money<10000)){
       this.MoneyW1M.x = gameWidth*12.8/16
     }else if ((user.money>=10000) && (user.money<100000)){
       this.MoneyW1M.x = gameWidth*12.7/16
     }else{
       this.MoneyW1M.x = gameWidth*12.6/16
     }
   }

   StartPlaying(){
     this.clickSound.play();
     this.cameras.main.fadeOut(1000, 0, 0, 0);
     this.time.delayedCall(1000, () => {
		     this.scene.start('LevelManager')
	   });
   }

   BackMapSelectionMenu(){
     this.clickSound.play();
     this.scene.pause('World1Map');
     this.scene.start('MapSelectionMenu');
   }

   ShopMenuW1M(){
     this.clickSound.play();
     prevScene = 'World1Map';
     this.scene.stop('World1Map');
     this.scene.start('ShopMenu');
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

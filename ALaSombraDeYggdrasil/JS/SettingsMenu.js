class SettingsMenu extends Phaser.Scene{
  constructor(){
      super("SettingsMenu");

      this.easyButtonSelSM;
      this.mediumButtonSelSM;
      this.diffButtonSelSM;
      this.backButtonText;
      this.resetText;
      this.easyText;
      this.medText;
      this.diffText;
      this.languageText;

      this.erase = false;
  }

  create(){

    this.cameras.main.fadeIn(1500, 0, 0, 0);

    this.clickSound = this.sound.add('ClickButtonSound', this.EffectsConfig());
    this.DiffSound = this.sound.add('ChangeDifficulty', this.EffectsConfig());

    this.backgroundSM = this.add.image(0, 0, 'backgroundSetM');
    this.backgroundSM.setScale(2/3);
    this.backgroundSM.setPosition(gameWidth/2, gameHeight/2);

    //BOTON FACIL
    this.easyButtonSM = this.add.image(gameWidth*4.8/16, gameHeight*6.5/16, 'deselectedButton');
    this.easyButtonSM.setScale(2/3);
    this.easyText = this.add.text(gameWidth*3.7/16, gameHeight*6.1/16,  stringsJSON.Buttons.easy , {fontFamily: "Acadian_Runes", fill: "#481d18", fontSize: "40px"});
    //Seleccionado
    this.easyButtonSelSM = this.add.image(gameWidth*4.8/16, gameHeight*6.5/16, 'EasyButtonSelected');
    this.easyButtonSelSM.setScale(2/3);

    if(userConfig.difficulty == 0){
      this.easyButtonSelSM.setVisible(true);
    }else{
      this.easyButtonSelSM.setVisible(false);
    }

    this.easyButtonSelSM2 = this.add.image(gameWidth*4.8/16, gameHeight*6.5/16, 'EasyButtonSelected');
    this.easyButtonSelSM2.setScale(2/3);
    this.easyButtonSelSM2.setVisible(false);

    if (userConfig.difficulty != 0){
      this.easyButtonSM.on('pointerover', function (pointer) {this.easyButtonSelSM2.setVisible(true);}, this);
      this.easyButtonSM.on('pointerout', function (pointer) {this.easyButtonSelSM2.setVisible(false);}, this);
    }

    this.easyButtonSM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.EasyLevel());


    //BOTON MEDIO
    this.mediumButtonSM = this.add.image(gameWidth*8.00/16, gameHeight*6.5/16, 'deselectedButton');
    this.mediumButtonSM.setScale(2/3);
    this.medText = this.add.text(gameWidth*7/16, gameHeight*6.1/16,  stringsJSON.Buttons.medium , {fontFamily: "Acadian_Runes", fill: "#481d18", fontSize: "40px"});
    //Seleccionado
    this.mediumButtonSelSM = this.add.image(gameWidth*8.00/16, gameHeight*6.5/16, 'MediumButtonSelected');
    this.mediumButtonSelSM.setScale(2/3);

    if(userConfig.difficulty == 1){
      this.mediumButtonSelSM.setVisible(true);
    }else{
      this.mediumButtonSelSM.setVisible(false);
    }

    this.mediumButtonSelSM2 = this.add.image(gameWidth*8.00/16, gameHeight*6.5/16, 'MediumButtonSelected');
    this.mediumButtonSelSM2.setScale(2/3);
    this.mediumButtonSelSM2.setVisible(false);

    if (userConfig.difficulty != 1){
      this.mediumButtonSM.on('pointerover', function (pointer) {this.mediumButtonSelSM2.setVisible(true);}, this);
      this.mediumButtonSM.on('pointerout', function (pointer) {this.mediumButtonSelSM2.setVisible(false);}, this);
    }

    this.mediumButtonSM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.MediumLevel());


    //BOTON DIFICIL
    this.diffButtonSM = this.add.image(gameWidth*11.15/16, gameHeight*6.5/16, 'deselectedButton');
    this.diffButtonSM.setScale(2/3);
    this.diffText = this.add.text(gameWidth*10.2/16, gameHeight*6.1/16,  stringsJSON.Buttons.difficult , {fontFamily: "Acadian_Runes", fill: "#481d18", fontSize: "40px"});
    //Seleccionado
    this.diffButtonSelSM = this.add.image(gameWidth*11.15/16, gameHeight*6.5/16, 'DifficultButtonSelected');
    this.diffButtonSelSM.setScale(2/3);

    if(userConfig.difficulty == 2){
      this.diffButtonSelSM.setVisible(true);
    }else{
      this.diffButtonSelSM.setVisible(false);
    }

    this.diffButtonSelSM2 = this.add.image(gameWidth*11.15/16, gameHeight*6.5/16, 'DifficultButtonSelected');
    this.diffButtonSelSM2.setScale(2/3);
    this.diffButtonSelSM2.setVisible(false);

    if (userConfig.difficulty != 2){
      this.diffButtonSM.on('pointerover', function (pointer) {this.diffButtonSelSM2.setVisible(true);}, this);
      this.diffButtonSM.on('pointerout', function (pointer) {this.diffButtonSelSM2.setVisible(false);}, this);
    }

    this.diffButtonSM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.DifficultLevel());

    //CHANGE LANGUAGE
    //Botones
    this.languageButton = this.add.image(gameWidth*8/16, gameHeight*8.7/16, 'deselectedButton');
    this.languageButton.setScale(2/3);
    this.languageButtonSel = this.add.image(gameWidth*7.64/16, gameHeight*8.7/16, 'selLeftButton');
    this.languageButtonSel.setVisible(false);
    this.languageButtonSel.setScale(2/3);
    //Texto
    this.languageText = this.add.text(gameWidth*7.1/16, gameHeight*8.3/16,  stringsJSON.Buttons.language , {fontFamily: "Acadian_Runes", fill: "#481d18", fontSize: "40px"});
    //Funciones Botones
    this.languageButton.on('pointerover', function (pointer) {this.languageButtonSel.setVisible(true);}, this);
    this.languageButton.on('pointerout', function (pointer) {this.languageButtonSel.setVisible(false);}, this);
    this.languageButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.ChangeLanguaje());

    //RESET
    //Botones
    this.resetButton = this.add.image(gameWidth*8/16, gameHeight*10.9/16, 'deselectedButton');
    this.resetButton.setScale(2/3);
    //this.resetButton.setVisible(false);
    this.resetButtonSel = this.add.image(gameWidth*8.35/16, gameHeight*10.9/16, 'selRightButton');
    this.resetButtonSel.setVisible(false);
    this.resetButtonSel.setScale(2/3);
    //Texto
    this.resetText = this.add.text(gameWidth*7.2/16, gameHeight*10.4/16,  stringsJSON.Buttons.erase_Data , {fontFamily: "Acadian_Runes", fill: "#481d18", fontSize: "40px"});
    //Acciones boton
    this.resetButton.on('pointerover', function (pointer) {this.resetButtonSel.setVisible(true);}, this);
    this.resetButton.on('pointerout', function (pointer) {this.resetButtonSel.setVisible(false);}, this);
    this.resetButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => (this.ActivateConfirmation()));

    //CONFIRMAR
    this.confirmButton = this.add.image(gameWidth*8/16, gameHeight*10.9/16, 'deselectedButton');
    this.confirmButton.setScale(2/3);
    this.confirmButton.setVisible(false);
    this.confirmButtonSel = this.add.image(gameWidth*7.64/16, gameHeight*10.9/16, 'selLeftButton');
    this.confirmButtonSel.setVisible(false);
    this.confirmButtonSel.setScale(2/3);
    //Texto
    this.confirmText = this.add.text(gameWidth*7/16, gameHeight*10.4/16,  stringsJSON.Buttons.confirm , {fontFamily: "Acadian_Runes", fill: "#481d18", fontSize: "40px"});
    this.confirmText.setVisible(false);
    //Acciones boton
    this.confirmButton.on('pointerover', function (pointer) {this.confirmButtonSel.setVisible(true);}, this);
    this.confirmButton.on('pointerout', function (pointer) {this.confirmButtonSel.setVisible(false);}, this);
    this.confirmButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => (this.ConfirmErase(true)));

    //CANCELAR
    this.cancelButton = this.add.image(gameWidth*11.5/16, gameHeight*10.9/16, 'deselectedButton');
    this.cancelButton.setScale(2/3);
    this.cancelButton.setVisible(false);
    this.cancelButtonSel = this.add.image(gameWidth*11.85/16, gameHeight*10.9/16, 'selRightButton');
    this.cancelButtonSel.setVisible(false);
    this.cancelButtonSel.setScale(2/3);
    //Texto
    this.cancelText = this.add.text(gameWidth*10.4/16, gameHeight*10.4/16,  stringsJSON.Buttons.cancel , {fontFamily: "Acadian_Runes", fill: "#481d18", fontSize: "40px"});
    this.cancelText.setVisible(false);
    //Acciones boton
    this.cancelButton.on('pointerover', function (pointer) {this.cancelButtonSel.setVisible(true);}, this);
    this.cancelButton.on('pointerout', function (pointer) {this.cancelButtonSel.setVisible(false);}, this);
    this.cancelButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => (this.ConfirmErase(false)));

    //BACK
    //Botones
    this.backButtonSM = this.add.image(gameWidth*8/16, gameHeight*13/16, 'deselectedButton');
    this.backButtonSM.setScale(2/3);
    this.backButtonSMSel = this.add.image(gameWidth*7.64/16, gameHeight*13/16, 'selLeftButton');
    this.backButtonSMSel.setScale(2/3);
    this.backButtonSMSel.setVisible(false);
    //Texto
    this.backButtonText = this.add.text(gameWidth*7.2/16, gameHeight*12.6/16,  stringsJSON.Buttons.back , {fontFamily: "Acadian_Runes", fill: "#481d18", fontSize: "40px"});
    //Funciones Botones
    this.backButtonSM.on('pointerover', function (pointer) {this.backButtonSMSel.setVisible(true);}, this);
    this.backButtonSM.on('pointerout', function (pointer) {this.backButtonSMSel.setVisible(false);}, this);
    this.backButtonSM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BackOptionsMenuSM());


  }

  Update(){

    if (userConfig.difficulty == 0){
      this.easyButtonSelSM.setVisible(true);
      this.mediumButtonSelSMSel.setVisible(false);
      this.diffButtonSelSM.setVisible(false);
    }
    if (userConfig.difficulty == 1){
      this.easyButtonSelSM.setVisible(false);
      this.mediumButtonSelSMSel.setVisible(true);
      this.diffButtonSelSM.setVisible(false);
    }
    if (userConfig.difficulty == 2){
      this.easyButtonSelSM.setVisible(false);
      this.mediumButtonSelSMSel.setVisible(false);
      this.diffButtonSelSM.setVisible(true);
    }

    if (userConfig.difficulty != 0){
      this.easyButtonSM.on('pointerover', function (pointer) {this.easyButtonSelSM2.setVisible(true);}, this);
      this.easyButtonSM.on('pointerout', function (pointer) {this.easyButtonSelSM2.setVisible(false);}, this);
    }

    if (userConfig.difficulty != 1){
      this.mediumButtonSM.on('pointerover', function (pointer) {this.mediumButtonSelSM2.setVisible(true);}, this);
      this.mediumButtonSM.on('pointerout', function (pointer) {this.mediumButtonSelSM2.setVisible(false);}, this);
    }

    if (userConfig.difficulty != 2){
      this.diffButtonSM.on('pointerover', function (pointer) {this.diffButtonSelSM2.setVisible(true);}, this);
      this.diffButtonSM.on('pointerout', function (pointer) {this.diffButtonSelSM2.setVisible(false);}, this);
    }


  }

  BackOptionsMenuSM(){
    this.clickSound.play();

    this.scene.pause('SettingsMenu');
    this.scene.start('OptionsMainMenu');

    console.log ("Nivel " + userConfig.difficulty);
    saveUserData();
  }

  EasyLevel(){
    this.DiffSound.play();

    this.easyButtonSelSM.setVisible(true);
    this.mediumButtonSelSM.setVisible(false);
    this.diffButtonSelSM.setVisible(false);
    userConfig.difficulty = 0;
    console.log ("Nivel fácil" + userConfig.difficulty);
    saveUserData();
  }

  MediumLevel(){
    this.DiffSound.play();

    this.easyButtonSelSM.setVisible(false);
    this.mediumButtonSelSM.setVisible(true);
    this.diffButtonSelSM.setVisible(false);
    userConfig.difficulty = 1;
    userConfig.difficulty = 1;
    saveUserData();
  }

  DifficultLevel(){
    this.DiffSound.play();

    this.easyButtonSelSM.setVisible(false);
    this.mediumButtonSelSM.setVisible(false);
    this.diffButtonSelSM.setVisible(true);
    userConfig.difficulty= 2;
    console.log ("Nivel dificil" + userConfig.difficulty);
    saveUserData();
  }

  ChangeLanguaje(){

    this.clickSound.play();

    console.log("idioma" + userConfig.lang);

    if(userConfig.lang == "es"){
      stringsJSON = phaserJSON.eng;
      userConfig.lang = "en";
      //userLang = "en";
    }
    else if(userConfig.lang == "en"){
      stringsJSON = phaserJSON.esp;
      userConfig.lang = "es";
      //userLang = "es";
    }

    this.backButtonText.setText( stringsJSON.Buttons.back);
    this.resetText.setText( stringsJSON.Buttons.erase_Data);
    this.easyText.setText( stringsJSON.Buttons.easy);
    this.medText.setText( stringsJSON.Buttons.medium);
    this.diffText.setText( stringsJSON.Buttons.difficult);
    this.languageText.setText( stringsJSON.Buttons.language);

    saveUserData();
  }

  ActivateConfirmation(){
    this.clickSound.play();

    this.confirmButton.setVisible(true);
    this.cancelButton.setVisible(true);
    this.resetButton.setVisible(false);
    this.cancelText.setVisible(true);
    this.confirmText.setVisible(true);
  }

  ConfirmErase(erase){

    this.clickSound.play();

    if(erase == true){
      console.log("resetiado");
      resetUserData();
      this.cameras.main.flash(600);
    }
    else{
        console.log("no resetiado");
    }

    this.confirmButton.setVisible(false);
    this.cancelButton.setVisible(false);
    this.resetButton.setVisible(true);
    this.cancelText.setVisible(false);
    this.confirmText.setVisible(false);

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

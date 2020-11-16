class ShopMenu extends Phaser.Scene{
  constructor(){
      super("ShopMenu");
  }

  preload(){
    this.load.json('Data',"./lib/Data.json");
  }

  create(){

    this.bendicionDeHierroSound = this.sound.add('soundBendicionDeHierro',this.EffectsConfig())
    this.buyObj = this.sound.add('BuyObject', this.EffectsConfig());
    this.clickSound = this.sound.add('ClickButtonSound', this.EffectsConfig());
    this.cameras.main.fadeIn(1500, 0, 0, 0);

    this.backgroundSM = this.add.image(0, 0, 'backgroundSM');
    this.backgroundSM .setScale(2/3);
    this.backgroundSM .setPosition(gameWidth/2, gameHeight/2);

    //MONEY
    this.MoneyShop = this.add.text(gameWidth*14.8/16, gameHeight*1/16,  user.money, {fontFamily: "Acadian_Runes",fontSize: "26px", align: 'center', fill: "#481d18"});
    this.SetTextPos();
    //this.Money.setOrigin(0.5,0.5);

    //BOTON OBJETO 1
    this.object1Button = this.add.image(gameWidth*3.96/16, gameHeight*14.08/16, 'deselectedButtonSmall');
    this.object1Button.setScale(2/3);
    this.object1ButtonSel = this.add.image(gameWidth*3.69/16, gameHeight*14.08/16, 'selSmallLeftButton');
    this.object1ButtonSel.setScale(2/3);
    this.object1ButtonSel.setVisible(false);
    this.object1Bought = this.add.image(gameWidth*3.96/16, gameHeight*8.75/16, 'object1Bought');
    this.object1Bought.setScale(2/3);
    this.icon1Button = this.add.image(gameWidth*15.2/16, gameHeight*3.3/16, 'IconObject1');
    this.icon1Button.setScale(2/3);
    //Texto BOTON
    this.buyObject1 = this.add.text(gameWidth*3.45/16, gameHeight*13.9/16,  stringsJSON.Buttons.buy, {fontFamily: "Acadian_Runes",fontSize: "20px", align: 'center', fill: "#481d18"});
    if (userConfig.lang == "en"){
      this.buyObject1.setX(gameWidth*3.7/16);
    }
    this.textIcon1Button= this.add.text(gameWidth*15.5/16, gameHeight*3.6/16, (" x" + user.buffs[0]), {fontFamily: "Acadian_Runes",fontSize: "20px", align: 'center', fill: "white"});
    this.buyObject1.setVisible(false);
    //Acciones Boton
    if(Number(user.buffs[0]) < 3){
      this.buyObject1.setVisible(true);
      this.object1Button.on('pointerover', function (pointer) {this.object1ButtonSel.setVisible(true);}, this);
      this.object1Button.on('pointerout', function (pointer) {this.object1ButtonSel.setVisible(false);}, this);
    }
    this.object1Button.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.AddObject1());

    //BOTON OBJETO 2
    this.object2Button = this.add.image(gameWidth*6.66/16, gameHeight*14.08/16, 'deselectedButtonSmall');
    this.object2Button.setScale(2/3);
    this.object2ButtonSel = this.add.image(gameWidth*6.39/16, gameHeight*14.08/16, 'selSmallLeftButton');
    this.object2ButtonSel.setScale(2/3);
    this.object2ButtonSel.setVisible(false);
    this.object2Bought = this.add.image(gameWidth*6.66/16, gameHeight*8.75/16, 'object2Bought');
    this.object2Bought.setScale(2/3);
    this.icon2Button = this.add.image(gameWidth*15.2/16, gameHeight*4.9/16, 'IconObject2');
    this.icon2Button.setScale(2/3);
    //this.object2Bought.setVisible(false);
    //Texto BOTON
    this.buyObject2 = this.add.text(gameWidth*6.15/16, gameHeight*13.9/16,  stringsJSON.Buttons.buy, {fontFamily: "Acadian_Runes",fontSize: "20px", align: 'center', fill: "#481d18"});
    if (userConfig.lang == "en"){
      this.buyObject2.setX(gameWidth*6.4/16);
    }
    this.buyObject2.setVisible(false);
    //Acciones Boton
    if(Number(user.buffs[1]) < 1){
    this.buyObject2.setVisible(true);
    this.object2Button.on('pointerover', function (pointer) {this.object2ButtonSel.setVisible(true);}, this);
    this.object2Button.on('pointerout', function (pointer) {this.object2ButtonSel.setVisible(false);}, this);
    }
    this.object2Button.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.AddObject2());

    //BOTON OBJETO 3
    this.object3Button = this.add.image(gameWidth*9.36/16, gameHeight*14.08/16, 'deselectedButtonSmall');
    this.object3Button.setScale(2/3);
    this.object3ButtonSel = this.add.image(gameWidth*9.09/16, gameHeight*14.08/16, 'selSmallLeftButton');
    this.object3ButtonSel.setScale(2/3);
    this.object3ButtonSel.setVisible(false);
    this.object3Bought = this.add.image(gameWidth*9.36/16, gameHeight*8.75/16, 'object3Bought');
    this.object3Bought.setScale(2/3);
    this.icon3Button = this.add.image(gameWidth*15.2/16, gameHeight*6.6/16, 'IconObject3');
    this.icon3Button.setScale(2/3);
    //this.object3Bought.setVisible(false);
    //Texto Boton
    this.buyObject3 = this.add.text(gameWidth*8.85/16, gameHeight*13.9/16,  stringsJSON.Buttons.buy, {fontFamily: "Acadian_Runes",fontSize: "20px", align: 'center', fill: "#481d18"});
    if (userConfig.lang == "en"){
      this.buyObject3.setX(gameWidth*9.1/16);
    }
    this.buyObject3.setVisible(false);
    //Acciones Boton
    if(Number(user.buffs[2]) < 1){
      this.buyObject3.setVisible(true);
      this.object3Button.on('pointerover', function (pointer) {this.object3ButtonSel.setVisible(true);}, this);
      this.object3Button.on('pointerout', function (pointer) {this.object3ButtonSel.setVisible(false);}, this);
    }
    this.object3Button.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.AddObject3());

    //BOTON OBJETO 4
    this.object4Button = this.add.image(gameWidth*12.05/16, gameHeight*14.08/16, 'deselectedButtonSmall');
    this.object4Button.setScale(2/3);
    this.object4ButtonSel = this.add.image(gameWidth*11.77/16, gameHeight*14.08/16, 'selSmallLeftButton');
    this.object4ButtonSel.setScale(2/3);
    this.object4ButtonSel.setVisible(false);
    this.object4Bought = this.add.image(gameWidth*12.04/16, gameHeight*8.75/16, 'object4Bought');
    this.object4Bought.setScale(2/3);
    this.icon4Button = this.add.image(gameWidth*15.2/16, gameHeight*8.1/16, 'IconObject4');
    this.icon4Button.setScale(2/3);
    //this.object4Bought.setVisible(false);
    //Texto Boton
    this.buyObject4 = this.add.text(gameWidth*11.55/16, gameHeight*13.9/16,  stringsJSON.Buttons.buy, {fontFamily: "Acadian_Runes",fontSize: "20px", align: 'center', fill: "#481d18"});
    if (userConfig.lang == "en"){
      this.buyObject4.setX(gameWidth*11.8/16);
    }
    this.buyObject4.setVisible(false);
    //Acciones Boton
    if(Number(user.buffs[2]) < 1){
    this.buyObject4.setVisible(true);
    this.object4Button.on('pointerover', function (pointer) {this.object4ButtonSel.setVisible(true);}, this);
    this.object4Button.on('pointerout', function (pointer) {this.object4ButtonSel.setVisible(false);}, this);
    }
    this.object4Button.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.AddObject4());

    //BOTON ATRAS
    this.backButtonSM = this.add.image(gameWidth*14.74/16, gameHeight*14.08/16, 'deselectedButtonSmall');
    this.backButtonSM.setScale(2/3);
    this.backButtonSMSel = this.add.image(gameWidth*14.45/16, gameHeight*14.08/16, 'selSmallLeftButton');
    this.backButtonSMSel.setScale(2/3);
    this.backButtonSMSel.setVisible(false);
    //Texto Boton
    this.backText = this.add.text(gameWidth*14.33/16, gameHeight*13.9/16,  stringsJSON.Buttons.back, {fontFamily: "Acadian_Runes",fontSize: "20px", align: 'center', fill: "#481d18"});
    //Acciones Boton
    this.backButtonSM.on('pointerover', function (pointer) {this.backButtonSMSel.setVisible(true);}, this);
    this.backButtonSM.on('pointerout', function (pointer) {this.backButtonSMSel.setVisible(false);}, this);
    this.backButtonSM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BackMainMenu());

    if(Number(user.buffs[0]) < 3){
      this.object1Bought.setVisible(false);
      this.buyObject1.setVisible(true);
    }else if(Number(user.buffs[0]) == 0){
      this.icon1Button.setVisible(false);
      this.textIcon1Button.setVisible(false);
      this.buyObject1.setVisible(true);
    }

    if(Number(user.buffs[1]) == 0){
      this.object2Bought.setVisible(false);
      this.icon2Button.setVisible(false);
      this.buyObject2.setVisible(true);
    }

    if(Number(user.buffs[2]) == 0){
      this.object3Bought.setVisible(false);
      this.icon3Button.setVisible(false);
      this.buyObject3.setVisible(true);
    }

    if(Number(user.buffs[3]) == 0){
      this.object4Bought.setVisible(false);
      this.icon4Button.setVisible(false);
      this.buyObject4.setVisible(true);
    }


  }

  AddObject1(){

    this.buyObj.play();
    this.bendicionDeHierroSound.play();
    if ((user.money >= phaserJSON.Store.shields.price)&& (user.buffs[0] < 3)){
      user.buffs[0]++;
      user.money-= phaserJSON.Store.shields.price;
      this.MoneyShop.setText(user.money);
      this.icon1Button.setVisible(true);
      this.textIcon1Button.setVisible(true);
      this.textIcon1Button.setText("x"+ user.buffs[0]);
    }else{
      console.log("No tienes suficiente dinero");
    }

    if(user.buffs[0] == 3){
      this.object1Bought.setVisible(true);
      this.buyObject1.setVisible(false);
    }

    saveUserData();
  }

  AddObject2(){

      this.buyObj.play();

      if ((user.money >= phaserJSON.Store.doublejump.price)&&(user.buffs[1] == 0)){
        user.buffs[1]++;
        user.money-= phaserJSON.Store.doublejump.price;
        this.MoneyShop.setText(user.money);
        this.object2Bought.setVisible(true);
        this.icon2Button.setVisible(true);
        this.buyObject2.setVisible(false);

      }else{
        console.log("No tienes suficiente dinero");
      }
      saveUserData();
  }

  AddObject3(){
    this.buyObj.play();

    if ((user.money >= phaserJSON.Store.invulnerability.price)&&(user.buffs[2] == 0)){
      user.buffs[2]++;
      user.money-= phaserJSON.Store.invulnerability.price;
      this.MoneyShop.setText(user.money);
      this.object3Bought.setVisible(true);
      this.icon3Button.setVisible(true);
      this.buyObject3.setVisible(false);
    }else{
      console.log("No tienes suficiente dinero");
    }
    saveUserData();
  }

  AddObject4(){

    this.buyObj.play();

    if ((user.money >= phaserJSON.Store.cooldown.price) && (Number(user.buffs[3]) == 0)){
      user.buffs[3]++;
      user.money-= phaserJSON.Store.cooldown.price;
      this.MoneyShop.setText(user.money);
      this.icon4Button.setVisible(true);
      this.object4Bought.setVisible(true);
      this.buyObject4.setVisible(false);
    }else{
      console.log("No tienes suficiente dinero");
    }
    saveUserData();
  }

  BackMainMenu(){
    this.clickSound.play();
    this.scene.pause('ShopMenu');
    this.scene.start(prevScene);
  }

  SetTextPos() {

          if((user.money>0) && (user.money<100)){
            console.log("menos 100");
              this.MoneyShop.x = gameWidth*14.55/16
          }else if((user.money>=100) && (user.money<1000)){
            console.log("menos 1.000");
              this.MoneyShop.x = gameWidth*14.45/16
          }else if ((user.money>=1000) && (user.money<10000)){
            console.log("menos 10.000");
              this.MoneyShop.x = gameWidth*14.35/16
          }else if ((user.money>=10000) && (user.money<100000)){
            console.log("menos 100.000");
              this.MoneyShop.x = gameWidth*14.25/16
          }else{
            console.log("lol");
            console.log(user.money);
              this.MoneyShop.x = gameWidth*14.15/16
          }

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

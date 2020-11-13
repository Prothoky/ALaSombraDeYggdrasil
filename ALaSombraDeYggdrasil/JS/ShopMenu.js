class ShopMenu extends Phaser.Scene{
  constructor(){
      super("ShopMenu");
  }

  preload(){
    this.load.json('Data',"./lib/Data.json");
  }

  create(){

    this.cameras.main.fadeIn(1500, 0, 0, 0);

    this.backgroundSM = this.add.image(0, 0, 'backgroundSM');
    this.backgroundSM .setScale(2/3);
    this.backgroundSM .setPosition(gameWidth/2, gameHeight/2);

    //MONEY
    this.Money = this.add.text(gameWidth*14.8/16, gameHeight*1.28/16,  user.money, {fontFamily: "Acadian_Runes",fontSize: "20px", align: 'center', fill: "#481d18"});
    this.Money.setOrigin(0.5,0.5);

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
    this.textIcon1Button= this.add.text(gameWidth*15.5/16, gameHeight*3.6/16, (" x" + user.buffs[0]), {fontFamily: "Acadian_Runes",fontSize: "20px", align: 'center', fill: "white"});
    //Acciones Boton
    if(Number(user.buffs[0]) < 3){
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
    //Acciones Boton
    if(Number(user.buffs[1]) < 1){
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
    //Acciones Boton
    if(Number(user.buffs[2]) < 1){
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
    //Acciones Boton
    if(Number(user.buffs[2]) < 1){
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
    }else if(Number(user.buffs[0]) == 0){
      this.icon1Button.setVisible(false);
      this.textIcon1Button.setVisible(false);
    }

    if(Number(user.buffs[1]) == 0){
      this.object2Bought.setVisible(false);
      this.icon2Button.setVisible(false);
    }

    if(Number(user.buffs[2]) == 0){
      this.object3Bought.setVisible(false);
      this.icon3Button.setVisible(false);
    }

    if(Number(user.buffs[3]) == 0){
      this.object4Bought.setVisible(false);
      this.icon4Button.setVisible(false);
    }


  }

  AddObject1(){

    if ((user.money >= phaserJSON.Store.shields.price)&& (user.buffs[0] < 3)){
      user.buffs[0]++;
      user.money-= phaserJSON.Store.shields.price;
      this.Money.setText(user.money);
      this.icon1Button.setVisible(true);
      this.textIcon1Button.setVisible(true);
      this.textIcon1Button.setText("x"+ user.buffs[0]);
    }else{
      console.log("No tienes suficiente dinero");
    }

    if(user.buffs[0] == 3){
      this.object1Bought.setVisible(true);
    }

    saveUserData();
  }

  AddObject2(){

      if ((user.money >= phaserJSON.Store.doublejump.price)&&(user.buffs[1] == 0)){
        user.buffs[1]++;
        user.money-= phaserJSON.Store.doublejump.price;
        this.Money.setText(user.money);
        this.object2Bought.setVisible(true);
        this.icon2Button.setVisible(true);

      }else{
        console.log("No tienes suficiente dinero");
      }
      saveUserData();
  }

  AddObject3(){

    if ((user.money >= phaserJSON.Store.invulnerability.price)&&(user.buffs[2] == 0)){
      user.buffs[2]++;
      user.money-= phaserJSON.Store.invulnerability.price;
      this.Money.setText(user.money);
      this.object3Bought.setVisible(true);
      this.icon3Button.setVisible(true);
    }else{
      console.log("No tienes suficiente dinero");
    }
    saveUserData();
  }

  AddObject4(){

    if ((user.money >= phaserJSON.Store.cooldown.price) && (Number(user.buffs[3]) == 0)){
      user.buffs[3]++;
      user.money-= phaserJSON.Store.cooldown.price;
      this.Money.setText(user.money);
      this.icon4Button.setVisible(true);
      this.object4Bought.setVisible(true);
    }else{
      console.log("No tienes suficiente dinero");
    }
    saveUserData();
  }

  BackMainMenu(){
    this.scene.pause('ShopMenu');
    this.scene.start(prevScene);
  }

}

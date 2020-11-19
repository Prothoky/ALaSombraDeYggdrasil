class ShopMenu extends Phaser.Scene{
  constructor(){
      super("ShopMenu");

      this.object1Button;
      this.object2Button;
      this.object3Button;
      this.object4Button;
  }

  preload(){
    this.load.json('Data',"./lib/Data.json");
  }

  create(){

    this.Invulnerability = phaserJSON.Store.invulnerability;
    this.DoubleJump = phaserJSON.Store.doublejump;
    this.Shields = phaserJSON.Store.shields;
    this.Cooldown = phaserJSON.Store.cooldown;

    this.bendicionDeHierroSound = this.sound.add('soundBendicionDeHierro',this.EffectsConfig());
    this.FuerzaDeOdinSound = this.sound.add('soundFuerzaDeOdin',this.EffectsConfig());
    this.RabiaSound = this.sound.add('soundRabia',this.EffectsConfig());
    this.PlumaDeValquiriaSound = this.sound.add('soundPlumaDeValquiria',this.EffectsConfig());
    this.ForceOfOdinSound = this.sound.add('soundForceOfOdin',this.EffectsConfig());
    this.IronBlessingSound = this.sound.add('soundIronBlessing',this.EffectsConfig());
    this.RageSound = this.sound.add('soundRage',this.EffectsConfig());
    this.ValkirieFeatherSound = this.sound.add('soundValkirieFeather',this.EffectsConfig());

    this.buyObj = this.sound.add('BuyObject', this.EffectsConfig());
    this.clickSound = this.sound.add('ClickButtonSound', this.EffectsConfig());

    this.cameras.main.fadeIn(1500, 0, 0, 0);

    this.backgroundSM = this.add.image(0, 0, 'backgroundSM');
    if (userConfig.lang == "en"){
      this.backgroundSM.setTexture('backgroundSMEn');
    }
    this.backgroundSM .setScale(2/3);
    this.backgroundSM .setPosition(gameWidth/2, gameHeight/2);

    //MONEY
    this.MoneyShop = this.add.text(gameWidth*14.9/16, gameHeight*0.9/16,  user.money, {fontFamily: "Acadian_Runes",fontSize: "26px", align: 'center', fill: "#481d18"});
    this.SetTextPos();

    //BOTON ATRAS
    this.backButtonSM = this.add.image(gameWidth*14.7/16, gameHeight*14.17/16, 'deselectedButtonSmall');
    this.backButtonSM.setScale(2/3);
    this.backButtonSMSel = this.add.image(gameWidth*14.41/16, gameHeight*14.17/16, 'selSmallLeftButton');
    this.backButtonSMSel.setScale(2/3);
    this.backButtonSMSel.setVisible(false);
    //Texto Boton
    this.backText = this.add.text(gameWidth*14.33/16, gameHeight*13.9/16,  stringsJSON.Buttons.back, {fontFamily: "Acadian_Runes",fontSize: "20px", align: 'center', fill: "#481d18"});
    //Acciones Boton
    this.backButtonSM.on('pointerover', function (pointer) {this.backButtonSMSel.setVisible(true);}, this);
    this.backButtonSM.on('pointerout', function (pointer) {this.backButtonSMSel.setVisible(false);}, this);
    this.backButtonSM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BackMainMenu());


    this.createObject1Buyable();
    this.createObject2Buyable();
    this.createObject3Buyable();
    this.createObject4Buyable();

    this.createObject1_Bought();
    this.createObject2_Bought();
    this.createObject3_Bought();
    this.createObject4_Bought();

    this.createObjectNoMoney();

    this.udpateLayout();
  }


  BackMainMenu(){
    this.clickSound.play();
    this.scene.pause('ShopMenu');
    this.scene.start(prevScene);
  }

  SetTextPos() {

    if((user.money>0) && (user.money<100)){
        this.MoneyShop.x = gameWidth*14.55/16
    }else if((user.money>=100) && (user.money<1000)){

        this.MoneyShop.x = gameWidth*14.45/16
    }else if ((user.money>=1000) && (user.money<10000)){

        this.MoneyShop.x = gameWidth*14.35/16
    }else if ((user.money>=10000) && (user.money<100000)){

        this.MoneyShop.x = gameWidth*14.25/16
    }else{

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

  createObject1_Bought(){
    this.object1Bought = this.add.image(gameWidth*3.96/16, gameHeight*8.75/16, 'object1Bought');
    if (userConfig.lang == "en"){
      this.object1Bought.setTexture('object1BoughtEn');
    }
    this.object1Bought.setScale(2/3);
  }

  createObject2_Bought(){
    this.object2Bought = this.add.image(gameWidth*6.66/16, gameHeight*8.75/16, 'object2Bought');
    if (userConfig.lang == "en"){
      this.object2Bought.setTexture('object2BoughtEn');
    }
    this.object2Bought.setScale(2/3);
  }

 createObject3_Bought(){
    this.object3Bought = this.add.image(gameWidth*9.36/16, gameHeight*8.75/16, 'object3Bought');
    if (userConfig.lang == "en"){
      this.object3Bought.setTexture('object3BoughtEn');
    }
    this.object3Bought.setScale(2/3);      
  }

  createObject4_Bought(){
    this.object4Bought = this.add.image(gameWidth*12.04/16, gameHeight*8.75/16, 'object4Bought');
    if (userConfig.lang == "en"){
      this.object4Bought.setTexture('object4BoughtEn');
    }
    this.object4Bought.setScale(2/3);
  }

  createObject1Buyable(){
    this.object1Button = this.add.image(gameWidth*3.96/16, gameHeight*14.15/16, 'deselectedButtonSmall');
    this.object1Button.setScale(2/3);
    this.object1ButtonSel = this.add.image(gameWidth*3.69/16, gameHeight*14.15/16, 'selSmallLeftButton');
    this.object1ButtonSel.setScale(2/3);
    this.object1ButtonSel.setVisible(false);
    
    this.icon1Button = this.add.image(gameWidth*15.2/16, gameHeight*3.3/16, 'IconObject1');
    this.icon1Button.setScale(2/3);
    
    //Texto BOTON
    this.buyObject1 = this.add.text(gameWidth*3.45/16, gameHeight*13.9/16,  stringsJSON.Buttons.buy, {fontFamily: "Acadian_Runes",fontSize: "20px", align: 'center', fill: "#481d18"});
    if (userConfig.lang == "en"){
      this.buyObject1.setX(gameWidth*3.7/16);
    }
    this.buyObject1.setVisible(true);

    this.textIcon1Button= this.add.text(gameWidth*15.5/16, gameHeight*3.6/16, (" x" + user.buffs[0]), {fontFamily: "Acadian_Runes",fontSize: "20px", align: 'center', fill: "white"});
    this.textIcon1Button.setVisible(true);
    //Acciones Boton
    
    this.object1Button.on('pointerover', function (pointer) {this.object1ButtonSel.setVisible(true);}, this);
    this.object1Button.on('pointerout', function (pointer) {this.object1ButtonSel.setVisible(false);}, this);
  
    this.object1Button.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.AddObject1());
  }
  
  createObject2Buyable(){
    this.object2Button = this.add.image(gameWidth*6.66/16, gameHeight*14.15/16, 'deselectedButtonSmall');
    this.object2Button.setScale(2/3);
    this.object2ButtonSel = this.add.image(gameWidth*6.39/16, gameHeight*14.15/16, 'selSmallLeftButton');
    this.object2ButtonSel.setScale(2/3);
    this.object2ButtonSel.setVisible(false);

    this.icon2Button = this.add.image(gameWidth*15.2/16, gameHeight*4.9/16, 'IconObject2');
    this.icon2Button.setScale(2/3);
    //Texto BOTON
    this.buyObject2 = this.add.text(gameWidth*6.15/16, gameHeight*13.9/16,  stringsJSON.Buttons.buy, {fontFamily: "Acadian_Runes",fontSize: "20px", align: 'center', fill: "#481d18"});
    if (userConfig.lang == "en"){
      this.buyObject2.setX(gameWidth*6.4/16);
    }
    this.buyObject2.setVisible(true);
    //Acciones Boton
    
    this.object2Button.on('pointerover', function (pointer) {this.object2ButtonSel.setVisible(true);}, this);
    this.object2Button.on('pointerout', function (pointer) {this.object2ButtonSel.setVisible(false);}, this);
    
    this.object2Button.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.AddObject2());
  }

  createObject3Buyable(){
    this.object3Button = this.add.image(gameWidth*9.36/16, gameHeight*14.15/16, 'deselectedButtonSmall');
    this.object3Button.setScale(2/3);
    this.object3ButtonSel = this.add.image(gameWidth*9.09/16, gameHeight*14.15/16, 'selSmallLeftButton');
    this.object3ButtonSel.setScale(2/3);
    this.object3ButtonSel.setVisible(false);
    
    this.icon3Button = this.add.image(gameWidth*15.2/16, gameHeight*6.6/16, 'IconObject3');
    this.icon3Button.setScale(2/3);
    //Texto Boton
    this.buyObject3 = this.add.text(gameWidth*8.85/16, gameHeight*13.9/16,  stringsJSON.Buttons.buy, {fontFamily: "Acadian_Runes",fontSize: "20px", align: 'center', fill: "#481d18"});
    if (userConfig.lang == "en"){
      this.buyObject3.setX(gameWidth*9.1/16);
    }
    this.buyObject3.setVisible(true);
    //Acciones Boton

    this.object3Button.on('pointerover', function (pointer) {this.object3ButtonSel.setVisible(true);}, this);
    this.object3Button.on('pointerout', function (pointer) {this.object3ButtonSel.setVisible(false);}, this);

    this.object3Button.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.AddObject3());
  }

  createObject4Buyable(){
    this.object4Button = this.add.image(gameWidth*12.05/16, gameHeight*14.15/16, 'deselectedButtonSmall');
    this.object4Button.setScale(2/3);
    this.object4ButtonSel = this.add.image(gameWidth*11.77/16, gameHeight*14.15/16, 'selSmallLeftButton');
    this.object4ButtonSel.setScale(2/3);
    this.object4ButtonSel.setVisible(false);

    this.icon4Button = this.add.image(gameWidth*15.2/16, gameHeight*8.1/16, 'IconObject4');
    this.icon4Button.setScale(2/3);
    //Texto Boton
    this.buyObject4 = this.add.text(gameWidth*11.55/16, gameHeight*13.9/16,  stringsJSON.Buttons.buy, {fontFamily: "Acadian_Runes",fontSize: "20px", align: 'center', fill: "#481d18"});
    if (userConfig.lang == "en"){
      this.buyObject4.setX(gameWidth*11.8/16);
    }
    this.buyObject4.setVisible(true);
    //Acciones Boton

    this.object4Button.on('pointerover', function (pointer) {this.object4ButtonSel.setVisible(true);}, this);
    this.object4Button.on('pointerout', function (pointer) {this.object4ButtonSel.setVisible(false);}, this);
 
    this.object4Button.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.AddObject4());
  }

  createObjectNoMoney(){
    this.object_1NoMoney = this.add.image(gameWidth*3.96/16, gameHeight*8.75/16, 'ShieldNoMoney_esp');
      if (userConfig.lang == "en"){
        this.object_1NoMoney.setTexture('ShieldNoMoney_eng');
      }
    this.object_1NoMoney.setScale(2/3);

    this.object_2NoMoney = this.add.image(gameWidth*6.66/16, gameHeight*8.75/16, 'InvulnerableNoMoney_esp');
      if (userConfig.lang == "en"){
        this.object_2NoMoney.setTexture('InvulnerableNoMoney_eng');
    }
    this.object_2NoMoney.setScale(2/3);

    this.object_3NoMoney = this.add.image(gameWidth*9.36/16, gameHeight*8.75/16, 'DobleJumpNoMoney_esp');
    if (userConfig.lang == "en"){
      this.object_3NoMoney.setTexture('DobleJumpNoMoney_eng');
    }
    this.object_3NoMoney.setScale(2/3); 
    
    this.object_4NoMoney = this.add.image(gameWidth*12.04/16, gameHeight*8.75/16, 'CooldownNoMoney_esp');
      if (userConfig.lang == "en"){
        this.object_4NoMoney.setTexture('CooldownNoMoney_eng');
      }
      this.object_4NoMoney.setScale(2/3);
  }


  buyable(price){
    if(user.money>=price)
      return true;
    else
      return false;
  }
  itemMax(item, numitemMax){
    if(Number(user.buffs[item])<numitemMax)
      return false;
    else
      return true;
  }

  udpateLayout(){
    if(this.itemMax(0,this.Shields.unitMax)){
      this.object1Bought.setVisible(true);
      this.object_1NoMoney.setVisible(false);
      this.object1Button.setVisible(false);
      this.object1Button.setInteractive(false);
    }    
    else{
      if (!this.buyable(this.Shields.price)){
        this.object_1NoMoney.setVisible(true);
        this.object1Bought.setVisible(false);
        this.object1Button.setVisible(false);
        this.object1Button.setInteractive(false);
      }
      else{
        this.object1Button.setVisible(true);
        
        this.object1Button.on('pointerover', function (pointer) {this.object1ButtonSel.setVisible(true);}, this);
        this.object1Button.on('pointerout', function (pointer) {this.object1ButtonSel.setVisible(false);}, this);

        this.object1Bought.setVisible(false);
        this.object_1NoMoney.setVisible(false);
      }
    }

    if(Number(user.buffs[0])>0){
      this.icon1Button.setVisible(true);
      this.textIcon1Button.setText("x"+ user.buffs[0]);
    }
    
    


    //BOTON OBJETO 2

    if(this.itemMax(1,this.Invulnerability.unitMax)){
      this.object2Bought.setVisible(true);
      this.object_2NoMoney.setVisible(false);
      this.object2Button.setVisible(false);
      this.object2Button.setInteractive(false);
    }
    
    
    else{
      if (!this.buyable(this.Invulnerability.price)){
        this.object_2NoMoney.setVisible(true);
        this.object2Bought.setVisible(false);
        this.object2Button.setVisible(false);
        this.object2Button.setInteractive(false);
      }
      else{
        this.object2Button.setVisible(true);
        
        this.object2Button.on('pointerover', function (pointer) {this.object2ButtonSel.setVisible(true);}, this);
        this.object2Button.on('pointerout', function (pointer) {this.object2ButtonSel.setVisible(false);}, this);

        this.object2Bought.setVisible(false);
        this.object_2NoMoney.setVisible(false);      
      }
    }

    if(Number(user.buffs[1])>0){
      this.icon2Button.setVisible(true);
    }else{
       this.icon2Button.setVisible(false);
    }


    //BOTON OBJETO 3

    if(this.itemMax(2,this.DoubleJump.unitMax)){
      this.object3Bought.setVisible(true);
      this.object_3NoMoney.setVisible(false);
      this.object3Button.setVisible(false);
      this.object3Button.setInteractive(false);
    }
    else{
      if (!this.buyable(this.DoubleJump.price)){
        this.object_3NoMoney.setVisible(true);
        this.object3Bought.setVisible(false);
        this.object3Button.setVisible(false);
        this.object3Button.setInteractive(false);
      }
      else{
        this.object3Button.setVisible(true);
        
        this.object3Button.on('pointerover', function (pointer) {this.object3ButtonSel.setVisible(true);}, this);
        this.object3Button.on('pointerout', function (pointer) {this.object3ButtonSel.setVisible(false);}, this);

        this.object3Bought.setVisible(false);
        this.object_3NoMoney.setVisible(false);
      }
    }

    if(Number(user.buffs[2])>0){
      this.icon3Button.setVisible(true);
    }else{
      this.icon3Button.setVisible(false);
    }

    
    //BOTON OBJETO 4

    if(this.itemMax(3,this.Cooldown.unitMax)){
      this.object4Bought.setVisible(true);
      this.object_4NoMoney.setVisible(false);
      this.object4Button.setVisible(false);
      this.object4Button.setInteractive(false);
    }
    
    else{
      if (!this.buyable(this.Cooldown.price)){
        this.object_4NoMoney.setVisible(true);
        this.object4Bought.setVisible(false);
        this.object4Button.setVisible(false);
        this.object4Button.setInteractive(false);
      }
      else{
        this.object4Button.setVisible(true);
        
        this.object4Button.on('pointerover', function (pointer) {this.object4ButtonSel.setVisible(true);}, this);
        this.object4Button.on('pointerout', function (pointer) {this.object4ButtonSel.setVisible(false);}, this);

        this.object4Bought.setVisible(false);
        this.object_4NoMoney.setVisible(false);
      }
    }

    if(Number(user.buffs[3])>0){
      this.icon4Button.setVisible(true);
    }else{
      this.icon4Button.setVisible(false);
    }

    
    this.SetTextPos();
  }



  AddObject1(){

    this.buyObj.play();
    if(userConfig.lang=="es")
      this.bendicionDeHierroSound.play();
    else
      this.IronBlessingSound.play();

    user.buffs[0]++;
    user.money-= this.Shields.price;
    this.MoneyShop.setText(user.money);
  
    saveUserData();

    this.udpateLayout();
  }

  AddObject2(){

    this.buyObj.play();
    if(userConfig.lang=="es")
      this.FuerzaDeOdinSound.play();
    else
      this.ForceOfOdinSound.play();

    user.buffs[1]++;
    user.money-= this.Invulnerability.price;
    this.MoneyShop.setText(user.money);
   
    saveUserData();

    this.udpateLayout();
  }

  AddObject3(){

    this.buyObj.play();
    if(userConfig.lang=="es")
      this.PlumaDeValquiriaSound.play();
    else
      this.ValkirieFeatherSound.play();

    user.buffs[2]++;
    user.money-=this.DoubleJump.price;
    this.MoneyShop.setText(user.money);
    
    saveUserData();

    this.udpateLayout();
  }

  AddObject4(){

    this.buyObj.play();
    if(userConfig.lang=="es")
      this.RabiaSound.play();
    else
      this.RageSound.play();
          
    user.buffs[3]++;
    user.money-= this.Cooldown.price;
    this.MoneyShop.setText(user.money);
    
    saveUserData();

    this.udpateLayout();
  }


}

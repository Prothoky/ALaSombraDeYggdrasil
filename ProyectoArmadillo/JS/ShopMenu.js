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
    this.backgroundMoney = this.add.image(0, 0, 'backgroundMoney');
    this.backgroundMoney.setScale(1/3);
    this.backgroundMoney.setPosition(gameWidth*13/16, gameHeight*1/16);
    this.Money = this.add.text(gameWidth*13/16, gameHeight*0.95/16,  user.money, {fontFamily: "Acadian_Runes",stroke:'#000000', align: 'center', fill: "white", strokeThickness: 2});
    this.Money.setOrigin(0.5,0.5);

    //BOTON OBJETO 1
    this.object1Button = this.add.image(gameWidth*2.6/16, gameHeight*8.64/16, 'object1Button');
    this.object1Button.setScale(2/3);
    this.object1Button.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AddObject1());

    //BOTON OBJETO 2
    this.object2Button = this.add.image(gameWidth*6.18/16, gameHeight*8.64/16, 'object2Button');
    this.object2Button.setScale(2/3);
    this.object2Button.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AddObject2());

    //BOTON OBJETO 3
    this.object3Button = this.add.image(gameWidth*9.75/16, gameHeight*8.64/16, 'object3Button');
    this.object3Button.setScale(2/3);
    this.object3Button.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AddObject3());

    //BOTON OBJETO 4
    this.object4Button = this.add.image(gameWidth*13.345/16, gameHeight*8.64/16, 'object4Button');
    this.object4Button.setScale(2/3);
    this.object4Button.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.AddObject4());

    //BOTON ATRAS
    this.backButtonSM = this.add.image(gameWidth*14/16, gameHeight*15/16, 'backButtonSM');
    this.backButtonSM.setScale(1.5/3);
    this.backButtonSM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.BackMainMenu());


  }

  AddObject1(){

    if (user.money >= phaserJSON.Store.shields.price){
      user.buffs[0]++;
      user.money-= phaserJSON.Store.shields.price;
      this.Money.setText(user.money);
    }else{
      console.log("No tienes suficiente dinero");
    }
    saveUserData();
  }

  AddObject2(){

      if (user.money >= phaserJSON.Store.doublejump.price){
        user.buffs[1]++;
        user.money-= phaserJSON.Store.doublejump.price;
        this.Money.setText(user.money);
      }else{
        console.log("No tienes suficiente dinero");
      }

  }

  AddObject3(){

    if (user.money >= phaserJSON.Store.invulnerability.price){
      user.buffs[2]++;
      user.money-= phaserJSON.Store.invulnerability.price;
      this.Money.setText(user.money);
    }else{
      console.log("No tienes suficiente dinero");
    }

  }

  AddObject4(){

    if (user.money >= phaserJSON.Store.cooldown.price){
      user.buffs[3]++;
      user.money-= phaserJSON.Store.cooldown.price;
      this.Money.setText(user.money);
    }else{
      console.log("No tienes suficiente dinero");
    }

  }

  BackMainMenu(){
    this.scene.pause('ShopMenu');
    this.scene.start(prevScene);
  }

}

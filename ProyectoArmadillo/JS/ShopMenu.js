class ShopMenu extends Phaser.Scene{
  constructor(){
      super("ShopMenu");
  }

  preload(){
    this.load.json('Data',"./lib/Data.json");
  }

  create(){

    var phaserJSON = this.cache.json.get('Data');

    var backgroundSM = this.add.image(0, 0, 'backgroundSM');
    backgroundSM.setScale(2/3);
    backgroundSM.setPosition(gameWidth/2, gameHeight/2);

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
    user.money-= phaserJSON.Store.shields.price;
      if(user.money<0){
        console.log("No tienes suficiente dinero");
        user.money += phaserJSON.Store.shields.price;
      }else{
        user.buffs[0]++;
      }
  }

  AddObject2(){
    user.money-= phaserJSON.Store.doublejump.price;
    if(user.money<0){
      console.log("No tienes suficiente dinero");
      user.money += phaserJSON.Store.doublejump.price;
    }else{
      user.buffs[1]++;
    }
  }

  AddObject3(){
    user.money-= phaserJSON.Store.invulnerability.price;
    if(user.money<0){
      console.log("No tienes suficiente dinero");
      user.money += phaserJSON.Store.invulnerability.price;
    }else{
      user.buffs[2]++;
    }
  }

  AddObject4(){
    user.money-= phaserJSON.Store.cooldown.price;
    if(user.money<0){
      console.log("No tienes suficiente dinero");
      user.money += phaserJSON.Store.cooldown.price;
    }else{
      user.buffs[3]++;
    }
  }

  BackMainMenu(){
    this.scene.pause('ShopMenu');
    this.scene.start(prevScene);
  }

}

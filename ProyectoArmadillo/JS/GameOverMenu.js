class GameOverMenu extends Phaser.Scene{
  constructor(){
      super("GameOverMenu");
  }

  create(){

    this.cameras.main.fadeIn(500, 0, 0, 0);

    var backgroundGOM = this.add.image(0, 0, 'backgroundGOM');
    backgroundGOM.setScale(2/3);
    backgroundGOM.setPosition(gameWidth/2, gameHeight/2);

    //BOTON VOLVER A JUGAR
    this.retryButtonGOM = this.add.image(gameWidth*5/16, gameHeight*11/16, 'ButtonRetryGOM');
    this.retryButtonGOM.setScale(2/3);
    this.retryButtonGOM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.PlayAgain());

    //BOTON ABANDONAR
    this.quitButtonGOM = this.add.image(gameWidth*10/16, gameHeight*11/16, 'ButtonQuitGOM');
    this.quitButtonGOM.setScale(2/3);
    this.quitButtonGOM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.QuitGameGOM());

    //this.FinalText = this.add.text(gameWidth*8/16, gameHeight*8.6/16, 'Perdiste Wey', {fill: "black"});

    //this.Money = this.add.text(gameWidth*12.85/16, gameHeight*0.7/16,  user.money, {fontFamily: "Acadian_Runes",stroke:'#000000', fill: "white", strokeThickness: 2});
    //this.DialogText = this.add.text(gameWidth*6/16, gameHeight*6/16,  "", {fontFamily: "StayHappy",stroke:'#000000', fill: "white", strokeThickness: 2});

    if(user.maxDistanceArcade==null){
      user.maxDistanceArcade=0;
    }

    if(arcadeMode == false){
      this.gameOverRunner = this.add.text(gameWidth*6/16, gameHeight*6/16,  "Moristes Wey", {fontFamily: "StayHappy", fontSize: 24, stroke:'#000000', fill: "white", strokeThickness: 2});
    }else{
      this.DialogText = this.add.text(gameWidth*6/16, gameHeight*6/16,  ("Puntuación: " + distanceAchieved ), {fontFamily: "StayHappy",  fontSize: 24, stroke:'#000000', fill: "white", strokeThickness: 2});

      
      if (distanceAchieved > user.maxDistanceArcade ){
        user.maxDistanceArcade = distanceAchieved;
      }
      

      this.DialogText = this.add.text(gameWidth*5/16, gameHeight*8/16,  ("Distancia máxima recorrida: " + user.maxDistanceArcade) , {fontFamily: "StayHappy",  fontSize: 24, stroke:'#000000', fill: "white", strokeThickness: 2});
      distanceAchieved = 0;

      saveUserData();
    }

  }

  PlayAgain(){
    this.scene.stop('GameOverMenu');
    this.scene.start('LevelManager');
    this.scene.bringToTop('LevelManager');
    //LevelManager.restartLevel();
  }

  QuitGameGOM(){
    this.scene.pause('GameOverMenu');
    this.scene.sendToBack('GameOverMenu');
    this.scene.start('MainMenu');
  }

}

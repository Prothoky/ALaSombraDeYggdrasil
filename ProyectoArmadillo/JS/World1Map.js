class World1Map extends Phaser.Scene{
  constructor(){
      super("World1Map");
  }

  preload(){
    this.load.image('backgroundWM1M', './ASSETS/World1Menu/FondoMapaMundo1.jpeg'); //CAMBIAR
    this.load.image('ButtonNode1', './ASSETS/World1Menu/NodoPrincipal.png'); //CAMBIAR
  }

  create(){
    var wid = this.cameras.main.width; //ancho del canvas en el dispositivo
    var heig = this.cameras.main.height;

    var background = this.add.image(0, 0, 'backgroundWM1M');
    //background.setScale(2/3)
    background.setPosition(wid/2, heig/2);

/*
//PRUEBAS BOTON PAUSE
    //BOTON Nivel 1
    this.ButtonNode1 = this.add.image(wid*14/16, heig*14/16, 'ButtonNode1');
    this.ButtonNode1.setScale(1.5/3);
    this.ButtonNode1.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.GoWorld1_1());
  }

  GoWorld1_1(){
    this.scene.pause('World1Map');
    this.scene.start('MapOne');
*/
    // (TESTEO) botón de iniciar partida
    this.botonJugar = this.add.image(wid*8.44/16, heig*14.05/16, 'World1Button');
    this.botonJugar.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.scene.start('LevelManager'));

  }
}

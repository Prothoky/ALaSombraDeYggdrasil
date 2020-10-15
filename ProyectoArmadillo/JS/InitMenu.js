class InitMenu extends Phaser.Scene{

  constructor(){
      super("InitMenu"); //super hace que la clase herede las caracteristicas de su predecesora
  }

  preload(){
    this.load.image('backgroundIM', './ASSETS/InitMenu/InitMenuBackground.jpg');
  }

  create(){
    var wid = this.cameras.main.width; //ancho del canvas en el dispositivo
    var heig = this.cameras.main.height;

    var background = this.add.image(0, 0, 'backgroundIM');
    background.setPosition(wid/2, heig/2);
    background.setScale(2/3);

    var text = this.add.text(wid*3/7, heig*3/4, 'Pulse para Iniciar', {fill: "black"});

//el start funciona sólo fuera de esta funcion, buscar alternativa
    this.input.on('pointerdown', function (pointer){
        this.scene.start('MainMenu');
    }, this);

  }

  update(){

  }
}

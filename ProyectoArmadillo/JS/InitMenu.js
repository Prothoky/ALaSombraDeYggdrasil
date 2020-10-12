class InitMenu extends Phaser.Scene{
  constructor(){
      super("InitMenu"); //super hace que la clase herede las caracteristicas de su predecesora
                //lo que se pase por parametro sera el identificador de la escena
  }

  create(){
    this.add.text(20, 20, 'Hola');  //PRIMERA PANTALLA QUE SE MUESTRA
    //this.add.text(20, 0, 'Bienvenido', {font: '25px Arial', fill: 'yellow'});
    //this.scene.start('MainMenu'); //Inicia la escena indicada
  }

  preload(){

  }

  create(){
    //this.fondo = this.add.image(0, 0, "nombre");
    //this.fondo.setOrigin(0, 0);
  }
}

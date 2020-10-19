class InitMenu extends Phaser.Scene{

  constructor(){
      super("InitMenu"); //super hace que la clase herede las caracteristicas de su predecesora
  }

  preload(){

    //Cargamos mapas desbloqueados y dinero del jugador
    var user_map = localStorage.getItem("UserMap"); //Variables a guardar en local
    var user_money = localStorage.getItem("UserMoney"); //Variables a guardar en local
    if(user_map!=null && user_money != null) {
      this.stringToArray(user_map);
      user.money = user_money;
    }

    //Checkeamos que estemos en movil o PC
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      PC=false;
    }
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

  stringToArray(user_map) {
    var separador = ",";
    var mapas = user_map.split(separador);
    
    for (var i=0; i < mapas.length; i++) {
      user.map[i] =mapas[i];
    }
  }
 
}

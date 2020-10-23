window.onload = function(){

  var config = {
    type: Phaser.AUTO,
    width: 1270, //Comprobar si en el escalado funciona bien
    height: 610,
    physics: {
      default: 'arcade',
      arcade: {
         debug: true,
         gravity: { y: 3500 }
      }
    },
    scale:{
      parent:'CanvasDiv', //no se q es
      //mode: Phaser.Scale.FIT, //hace que se adapte a cambios de tamaño
      autoCenter: Phaser.Scale.CENTER_BOTH,
      isPortrait: true
    },
    backgroundColor: 0x000000,
    //nombre que se muestra en la ventana del navegador
    //title:"Proyecto Armadillo",
    //URL del JUEGO
    //utl: "http://proyectoArmadillo.es",

    scene: [InitMenu, MainMenu, MapSelectionMenu, OptionsMenu, PauseMenu, CreditsMenu, World1Map, LevelManager, MapOne]

  }

  var game = new Phaser.Game(config);
}

// Variables globales
var controls = {  // Controles del jugador (teclado)
  up: Phaser.Input.Keyboard.KeyCodes.SPACE,
  left: Phaser.Input.Keyboard.KeyCodes.LEFT,
  right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
  attack: Phaser.Input.Keyboard.KeyCodes.CTRL,
  test: Phaser.Input.Keyboard.KeyCodes.F,
};

var user = { //Mapas desbloqueados y dinero del jugador
  world: [true,false,false,false,false,false,false,false,false],
  map: [true, false, false] ,
  money: 0,
};

var levelIndex = 0; // Indica el nivel a generar para LevelManager (CAMBIAR A PASO DE OBJETO DE ESCENA A ESCENA)

//Movil o PC
PC = true;

//Fecha de desbloqueo de nuevo mundo
unlockDate=new Date(2021 ,9 ,22); 

// Tamaño pantalla
var gameWidth = 1270;
var gameHeight = 610;

function saveUserData(){
  localStorage.setItem("UserWorld", user.world)
  localStorage.setItem("UserMap", user.map);
  localStorage.setItem("UserMoney", user.money);
}
function loadUserData(){
  var user_world = localStorage.getItem("UserWorld");
  var user_map = localStorage.getItem("UserMap");
  var user_money = localStorage.getItem("UserMoney"); 
  if(user_map!=null && user_money != null) {
    user.world = user_world;
    user.map = user_map;
    user.money = user_money;
  }
}

function resetUserData(){
  user.world= [true,false,false,false,false,false,false,false,false],
  user.map= [true, false, false] ,
  user.money= 0,
}
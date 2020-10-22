window.onload = function(){

  var config = {
    type: Phaser.AUTO,
    width: 1270, //Comprobar si en el escalado funciona bien
    height: 610,
    physics: {
      default: 'arcade',
      arcade: {
         debug: true,
         gravity: { y: 2000 }
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
  map: [false, false, false] ,
  money: 0,
};

var levelIndex = 0; // Indica el nivel a generar para LevelManager (CAMBIAR A PASO DE OBJETO DE ESCENA A ESCENA)

//Movil o PC
PC = true;

// Tamaño pantalla
var gameWidth = 1270;
var gameHeight = 610;

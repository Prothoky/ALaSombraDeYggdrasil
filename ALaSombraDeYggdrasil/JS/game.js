
window.onload = function(){

  var config = {
    type: Phaser.AUTO,
    parent:'game',
    width: 1270, //Comprobar si en el escalado funciona bien
    height: 610,
    fps: { target: fpsTarget, },
    physics: {
      default: 'arcade',
      arcade: {
         debug: false,
         fps: fpsTarget,
         gravity: { y: 3500 }
      }
    },
    scale:{

      mode: Phaser.Scale.FIT, //hace que se adapte a cambios de tamaño
      autoCenter: Phaser.Scale.CENTER_BOTH,
      isPortrait: true,
      //width: 1270, //Comprobar si en el escalado funciona bien
      //height: 610,
    },
    backgroundColor: 0x000000,
    //nombre que se muestra en la ventana del navegador
    //title:"Proyecto Armadillo",
    //URL del JUEGO
    //utl: "http://proyectoArmadillo.es",

    scene: [PreloadMenu, MainMenu, MapSelectionMenu, OptionsPauseMenu, OptionsMainMenu, VolumeMenu, SettingsMenu, PauseMenu, ShopMenu, CreditsMenu, TutorialMenu, World1Map, LevelManager, WinnerMenu, GameOverMenu]

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
  pause: Phaser.Input.Keyboard.KeyCodes.ESC
};

var fpsTarget = 60;

var levelIndex = 0; // Indica el nivel a generar para LevelManager (CAMBIAR A PASO DE OBJETO DE ESCENA A ESCENA)

var prevScene = 'MainMenu';

//Movil o PC
var PC = true;

// Tamaño pantalla
var gameWidth = 1270;
var gameHeight = 610;

//Fecha de desbloqueo de nuevo mundo
unlockDate=new Date(2020,12,1);

var phaserJSON;

var user = { //Mapas desbloqueados y dinero del jugador
  world: [true,false,false,false,false,false,false,false,false],
  map: [false, false, false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
  buffs: [0, 0, 0, 0],
  money: 0,
  maxDistanceArcade: 0
}

var userConfig = {
  volumeMusic: 6,
  volumeEffects: 6,
  difficulty: 0, // Indica la dificultad escogida: 0 fácil - 1 normal - 2 dificil  (aún sin implementar)
  lang: null
}

function saveUserData(){
  localStorage.setItem("UserData", JSON.stringify(user));
  localStorage.setItem("UserConfig" ,JSON.stringify(userConfig));
}

function loadUserData(){
  let data = localStorage.getItem("UserData");
  if (data != null)
    user = JSON.parse(data);
  data = localStorage.getItem("UserConfig");
  if(data!=null)
    userConfig = JSON.parse(data);
}

function resetUserData(configJson){
  user=configJson.user;
  userConfig=configJson.userConfig;
  saveUserData();
}

var stringsJSON;

function updateLanguage(userLang){
  if(userConfig.lang==null || userConfig.lang=="null"|| userConfig.lang=="")
    userConfig.lang = navigator.language || navigator.userLanguage;
  if(userConfig.lang == "es-ES" || userConfig.lang == "es"){
    stringsJSON = phaserJSON.esp;
    userConfig.lang = "es";}
  else if(userConfig.lang == "en-US" || userConfig.lang == "en"){
      stringsJSON = phaserJSON.eng;
      userConfig.lang = "en";
  }
  if(userLang == "es-ES" || userLang == "es"){
    stringsJSON = phaserJSON.esp;
    userConfig.lang = "es";
  }
  else if(userLang == "en-US" || userLang == "en"){
    stringsJSON = phaserJSON.eng;
    userConfig.lang = "en";
  }
}

// Variable música entre escenas
var musicMenu;  // Controlador de música de menú
var musicGameplay;  // Controlador de música de gamplay

// Modo arcade
var arcadeMode = false; // Modo endless runner activado?
var distanceAchieved = 0; // Distancia recorrida en el ultimo intento

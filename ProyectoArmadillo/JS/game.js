window.onload = function(){

  var config = {
    width: 1905, //Comprobar si en el escalado funciona bien
    height: 916,
    backgroundColor: 0x000000,
    //nombre que se muestra en la ventana del navegador
    //title:"Proyecto Armadillo",
    //URL del JUEGO
    //utl: "http://proyectoArmadillo.es",
    scene: [InitMenu, MainMenu, MapMenu, OptionsMenu, PauseMenu]
  }

  var game = new Phaser.Game(config);
}

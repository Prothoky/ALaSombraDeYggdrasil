window.onload = function(){

  var config = {
    width: 800,
    height: 600,
    backgroundColor: 0x000000,
    scene: [InitMenu, MainMenu, MapMenu, OptionsMenu, PauseMenu]
  }
  var game = new Phaser.Game(config);
}

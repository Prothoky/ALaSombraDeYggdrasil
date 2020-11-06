class PreloadMenu extends Phaser.Scene{

  constructor(){
      super("PreloadMenu"); //super hace que la clase herede las caracteristicas de su predecesora
  }

  preload(){

    this.load.json('Data',"./lib/Data.json");

    //loadUserData();
    //Cargamos mapas desbloqueados y dinero del jugador

    //Checkeamos que estemos en movil o PC
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      PC=false;
    }

    //BARRA DE CARGA DE PROGRESO

      var progressBar = this.add.graphics();

      var progressBox = this.add.graphics();
      progressBox.fillStyle(0xffffff, 0.2);
      progressBox.fillRect(100, 500, 1000, 50);

      var percentText = this.make.text({
          x: 600,
          y: 525,
          text: "0 %",
          style: {
              fontSize: '25px',
              fontFamily: 'Acadian_Runes',
              fontStyle: 'bold',
              fill: '#ffffff'
          }
      });

      percentText.setOrigin(0.5, 0.5);
      this.load.on("progress", function(value){
          console.log(value);
          percentText.setText(parseInt(value * 100) + ' %');
          progressBar.clear();
          progressBar.fillStyle(0xCB2821, 1);
          progressBar.fillRect(110, 510, 980 * value, 30);
      });

    //CARGA DE ASSETS

    //Init Menu
      this.load.image('backgroundIM', './ASSETS/InitMenu/InitMenuBackground.jpg');

    //Main MENU
        this.load.image('backgroundMM', './ASSETS/MainMenu/MainMenuBackground.jpg');
        this.load.image('shopButtonMM', './ASSETS/MainMenu/BotonTienda.jpg');
        //this.load.image('playButton', './ASSETS/MainMenu/BotonJugar.png');
        this.load.image('optionsButton', './ASSETS/MainMenu/BotonOpciones.png');
        this.load.image('creditsButton', './ASSETS/MainMenu/BotonCreditos.png');
        this.load.image('quitButton', './ASSETS/MainMenu/BotonSalir.png');
        this.load.image('historyButton', './ASSETS/MainMenu/BotonHistoria.png');
        this.load.image('arcadeButton', './ASSETS/MainMenu/BotonArcade.png');

    //Options Menu General
      this.load.image('backgroundOM', './ASSETS/OptionsMenu/OptionsMenuBackground.jpg');
      this.load.image('backButtonOM', './ASSETS/OptionsMenu/BotonSalir.png');
      this.load.image('VolumeUpButtonOM', './ASSETS/OptionsMenu/BotonSubirVolumen.png');
      this.load.image('VolumeDownButtonOM', './ASSETS/OptionsMenu/BotonBajarVolumen.png');

      //Options Main Menu
      this.load.image('backgroundVM', './ASSETS/OptionsMenu/MusicMenuBackground.jpg'); //Fondo Volume Menu
      this.load.image('backgroundSetM', './ASSETS/OptionsMenu/OptionsMainMenu/SettingsMenuBackgr.jpg'); //Fondo Settings Menu
      this.load.image('SettingsButton', './ASSETS/OptionsMenu/OptionsMainMenu/BotonAjustes.jpg');
      this.load.image('VolumeButton', './ASSETS/OptionsMenu/OptionsMainMenu/BotonVolumen.png');

      //Settings Menu
      this.load.image('DeleteButton', './ASSETS/OptionsMenu/OptionsMainMenu/BotonBorrar.png');
      this.load.image('EasyButton', './ASSETS/OptionsMenu/OptionsMainMenu/BotonFacil.png');
      this.load.image('EasyButtonSelected', './ASSETS/OptionsMenu/OptionsMainMenu/BotonFacilSeleccionado.png');
      this.load.image('MediumButton', './ASSETS/OptionsMenu/OptionsMainMenu/BotonMedio.png');
      this.load.image('MediumButtonSelected', './ASSETS/OptionsMenu/OptionsMainMenu/BotonMedioSeleccionado.png');
      this.load.image('DifficultButton', './ASSETS/OptionsMenu/OptionsMainMenu/BotonDificil.png');
      this.load.image('DifficultButtonSelected', './ASSETS/OptionsMenu/OptionsMainMenu/BotonDificilSeleccionado.png');

    //Credits Menu
      this.load.image('backgroundCM', './ASSETS/MapSelectionMenu/MapMenuBackground.jpeg'); //CAMBIAR
      this.load.image('backButtonCM', './ASSETS/MapSelectionMenu/BotonSalir.png');

    //Map Selection Menu
      this.load.image('backgroundMSM', './ASSETS/MapSelectionMenu/MapMenuBackground.jpeg');
      this.load.image('World1Button', './ASSETS/MapSelectionMenu/BotonMundo1.png');
      this.load.image('World2Button', './ASSETS/MapSelectionMenu/BotonMundo2.png');
      this.load.image('World3Button', './ASSETS/MapSelectionMenu/BotonMundo3.png');
      this.load.image('World4Button', './ASSETS/MapSelectionMenu/BotonMundo4.png');
      this.load.image('backButtonMSM', './ASSETS/MapSelectionMenu/BotonSalir.png');
      this.load.image('paperDesciptionMSM', './ASSETS/MapSelectionMenu/Pergamino.png');
      this.load.image('playButtonMSM', './ASSETS/MapSelectionMenu/BotonJugar.png');

    //Level Manager
      this.load.spritesheet('dude', 'ASSETS/Placeholders/dude.png', { frameWidth: 32, frameHeight: 48 });
      this.load.image('ground', 'ASSETS/Placeholders/platform.png');
      this.load.image('dot', 'ASSETS/Placeholders/star.png');
      this.load.image('bomb', 'ASSETS/Placeholders/bomb.png');
      this.load.image('bg_far', 'ASSETS/Secciones/Zona lejana.png');
      this.load.image('bg_medium' , 'ASSETS/Secciones/Zona media.png');
      this.load.image('bg_near' , 'ASSETS/Secciones/Zona delantera.png');
      this.load.image('bg_background', 'ASSETS/Secciones/Fondo.png');
      this.load.image('einar', 'ASSETS/Gameplay/einar_provisional.png');
      this.load.image('barricade', 'ASSETS/Gameplay/barricade.png');
      this.load.image('trunk', 'ASSETS/Gameplay/trunk.png');
      this.load.image('cabin_up', 'ASSETS/Gameplay/cabin_up.png');
      this.load.image('pauseButton', 'ASSETS/Gameplay/ButtonPause.png');
      this.load.spritesheet('einar_running', 'ASSETS/Gameplay/animacion_correr.png', { frameWidth: 400, frameHeight: 350 });
      this.load.spritesheet('einar_jumping', 'ASSETS/Gameplay/animacion_saltar.png', { frameWidth: 400, frameHeight: 350 });


    //Pause Menu
      this.load.image('backgroundPM', './ASSETS/PauseMenu/PauseMenuBackground.jpg');
      this.load.image('backButtonPM', './ASSETS/PauseMenu/BotonAtras.png');
      this.load.image('quitButtonPM', './ASSETS/PauseMenu/BotonAbandonar.png');
      this.load.image('optionsButtonPM', './ASSETS/PauseMenu/BotonOpciones.png');

    //SHOP MEMU
    this.load.image('backgroundSM', './ASSETS/Tienda/FondoTienda.jpg');
    this.load.image('backButtonSM', './ASSETS/PauseMenu/BotonAtras.png');
    this.load.image('object1Button', './ASSETS/Tienda/BotonObjeto1.png');
    this.load.image('object2Button', './ASSETS/Tienda/BotonObjeto2.png');
    this.load.image('object3Button', './ASSETS/Tienda/BotonObjeto3.png');
    this.load.image('object4Button', './ASSETS/Tienda/BotonObjeto4.png');

    //World 1 Map
      this.load.image('backgroundWM1M', './ASSETS/World1Menu/FondoMapaMundo1.jpg');
      this.load.image('NodoBlocked', './ASSETS/World1Menu/IconosNodos/NivelBloqueado.png');
      this.load.image('ButtonNodePrinc', './ASSETS/World1Menu/IconosNodos/NodoPrincipalDesbloq.png');
      this.load.image('ButtonNodePrincSnow', './ASSETS/World1Menu/IconosNodos/NodoPrincipalNieveDesbloq.png');
      this.load.image('ButtonNodePrincSel', './ASSETS/World1Menu/IconosNodos/NodoPrincipalSel.png');
      this.load.image('ButtonNodePrincSnowSel', './ASSETS/World1Menu/IconosNodos/NodoPrincipalNieveSel.png');
      this.load.image('ButtonSubode1', './ASSETS/World1Menu/NodoSecundario.png'); //CAMBIAR
      this.load.image('ButtonPlayLevel', './ASSETS/World1Menu/BotonJugar.png'); //CAMBIAR
      this.load.image('BackgrAcessToLevel', './ASSETS/World1Menu/FondoAccesoANivel.png'); //CAMBIAR
      this.load.image('BackButtonW1M', './ASSETS/World1Menu/BotonSalir.png'); //CAMBIAR

      //Level Names
      this.load.image('Level0Name', './ASSETS/World1Menu/Nombre1.png');
      this.load.image('Level1Name', './ASSETS/World1Menu/Nombre2.png');
      this.load.image('Level2Name', './ASSETS/World1Menu/Nombre3.png');
      this.load.image('Level3Name', './ASSETS/World1Menu/Nombre4.png');
      this.load.image('Level4Name', './ASSETS/World1Menu/Nombre5.png');


      //Subnodos
      this.load.image('ButtonSubNodeSel', './ASSETS/World1Menu/IconosSubniveles/SubnivelSeleccionado.png');
      this.load.image('ButtonSubNode1', './ASSETS/World1Menu/IconosSubniveles/Subnivel2.png');
      this.load.image('ButtonSubNode2', './ASSETS/World1Menu/IconosSubniveles/Subnivel3.png');
      this.load.image('ButtonSubNode4_1', './ASSETS/World1Menu/IconosSubniveles/Subnivel5_1.png');
      this.load.image('ButtonSubNode4_2', './ASSETS/World1Menu/IconosSubniveles/Subnivel5_2.png');
      this.load.image('ButtonSubNode5_1', './ASSETS/World1Menu/IconosSubniveles/Subnivel6_1.png');
      this.load.image('ButtonSubNode5_2', './ASSETS/World1Menu/IconosSubniveles/Subnivel6_2.png');
      this.load.image('ButtonSubNode7_1', './ASSETS/World1Menu/IconosSubniveles/Subnivel8_1.png');
      this.load.image('ButtonSubNode7_2', './ASSETS/World1Menu/IconosSubniveles/Subnivel8_2.png');


      //Game Over Menu
        this.load.image('backgroundGOM', './ASSETS/GameOverMenu/FondoGameOver.jpg');
        this.load.image('ButtonRetryGOM', './ASSETS/GameOverMenu/BotonReintentar.png');
        this.load.image('ButtonQuitGOM', './ASSETS/GameOverMenu/BotonSalir.png');

      //Winner Menu
        this.load.image('backgroundWM', './ASSETS/WinnerMenu/FondoWinner.jpg');
        this.load.image('ButtonContinueWM', './ASSETS/WinnerMenu/BotonContinuar.png');

      //HUD
        this.load.image('backgroundMoney', './ASSETS/HUDpantallas/FondoDinero.png');
        this.load.image('shopButtonIG', './ASSETS/HUDpantallas/BotonTiendaInGame.png');
        this.load.image('buttonFullScreen', './ASSETS/HUDpantallas/BotonFullScreen.jpg');

      // Música
      this.load.audio('test', './ASSETS/Music/test.mp3');
      this.load.audio('test2', './ASSETS/Music/test2.mp3');
      this.load.audio('player_death', './ASSETS/Sounds/449702__digestcontent__female-scream.wav');
      this.load.audio('player_attack', './ASSETS/Sounds/487643__phonosupf__electronic-attack.wav');
      this.load.audio('player_jump', './ASSETS/Sounds/341247__sharesynth__jump01.wav');
      this.load.audio('enemy_1', './ASSETS/Sounds/166036__vinrax__monster-pain8.wav');
      this.load.audio('player_running', './ASSETS/Sounds/107624__stintx__running-02.wav');

      //Carga automáticamente main menu cuando los assets están cargados
        /*this.load.on('complete', () => {
          this.scene.start('MainMenu')
        })*/

        this.load.on("complete", () => {
            console.log("Complete");
            this.scene.start('MainMenu');
        });


  }

  create(){

    loadUserData();

    var phaserJSON = this.cache.json.get('Data');

    checkLanguage(phaserJSON);

    var wid = this.cameras.main.width;
    var heig = this.cameras.main.height;

    var background = this.add.image(0, 0, 'backgroundIM');
    background.setPosition(wid/2, heig/2);
    background.setScale(2/3);

    var text = this.add.text(wid*3/7, heig*3/4, strings.Loading , {fill: "white"});

    // Animaciones
    this.anims.create({
        key: 'einar_running',
        frames: this.anims.generateFrameNumbers('einar_running', { start: 0, end: 17}),
        frameRate: 24,
        repeat: -1
    })

    this.anims.create({
        key: 'einar_jumping',
        frames: this.anims.generateFrameNumbers('einar_jumping', { start: 0, end: 29}),
        frameRate: 24,
        repeat: -1
    })
  }

  update(){

  }

}

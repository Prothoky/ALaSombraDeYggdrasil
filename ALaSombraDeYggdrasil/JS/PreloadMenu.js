class PreloadMenu extends Phaser.Scene{

  constructor(){
      super("PreloadMenu"); //super hace que la clase herede las caracteristicas de su predecesora
  }

  preload(){

    this.load.json('Data',"./lib/Data.json");

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

      progressBox.setDepth(2);
      progressBar.setDepth(2);

      var percentText = this.make.text({
          x: 600,
          y: 525,
          text: "0 %",
          style: {
              fontSize: '25px',
              fontFamily: 'Acadian_Runes',
              fontStyle: 'bold',
              align: 'center',
              fill: '#ffffff'
          }
      });

      percentText.setOrigin(0.5, 0.5);
      percentText.setDepth(2);

      console.log("Loading");
      this.load.on("progress", function(value){
          percentText.setText(parseInt(value * 100) + ' %');
          progressBar.clear();
          progressBar.fillStyle(0xffbc00, 1);
          progressBar.fillRect(110, 510, 980 * value, 30);

          if(value*100>99){
            progressBox.setVisible(false);
            progressBar.setVisible(false);
            percentText.setVisible(false);
          }
      });

    //CARGA DE ASSETS

    //ASSETS COMUNES
    this.load.image('deselectedButtonSmall', './ASSETS/AssetsComunes/BotonPequeño.png');
    this.load.image('selSmallLeftButton', './ASSETS/AssetsComunes/BotonPequeñoSelIzq.png');
    this.load.image('selSmallRightButton', './ASSETS/AssetsComunes/BotonPequeñoSelDch.png');
    this.load.image('deselectedButton', './ASSETS/AssetsComunes/BotonDeseleccionado.png');
    this.load.image('selLeftButton', './ASSETS/AssetsComunes/BotonSelIzq.png');
    this.load.image('selRightButton', './ASSETS/AssetsComunes/BotonSelDcha.png');

    //Init Menu
      this.load.image('backgroundIM', './ASSETS/InitMenu/InitMenuBackground.jpg');

    //Main MENU
      this.load.image('backgroundMM', './ASSETS/MainMenu/MainMenuBackground.jpg');



    //Options Menu General
      this.load.image('VolumeUpButtonOM', './ASSETS/OptionsMenu/BotonSubirVolumen.png');
      this.load.image('VolumeDownButtonOM', './ASSETS/OptionsMenu/BotonBajarVolumen.png');

    //Options Main Menu
      this.load.image('backgroundOM', './ASSETS/OptionsMenu/OptionsMenuBackground.jpg');
      this.load.image('backgroundOMEn', './ASSETS/OptionsMenu/OptionsMenuBackgroundEng.jpg');
      this.load.image('backgroundVM', './ASSETS/OptionsMenu/MusicMenuBackground.jpg'); //Fondo Volume Menu
      this.load.image('backgroundVMEn', './ASSETS/OptionsMenu/MusicMenuBackgroundEng.jpg');
      this.load.image('backgroundSetM', './ASSETS/OptionsMenu/OptionsMainMenu/SettingsMenuBackgr.jpg'); //Fondo Settings Menu
      this.load.image('backgroundSetMEn', './ASSETS/OptionsMenu/OptionsMainMenu/SettingsMenuBackgrEng.jpg');

    //Settings Menu
      this.load.image('EasyButtonSelected', './ASSETS/OptionsMenu/OptionsMainMenu/BotonFacilSeleccionado.png');
      this.load.image('MediumButtonSelected', './ASSETS/OptionsMenu/OptionsMainMenu/BotonMedioSeleccionado.png');
      this.load.image('DifficultButtonSelected', './ASSETS/OptionsMenu/OptionsMainMenu/BotonDificilSeleccionado.png');
      this.load.image('EasyButtonSelectedEn', './ASSETS/OptionsMenu/OptionsMainMenu/BotonFacilSeleccionadoEng.png');
      this.load.image('MediumButtonSelectedEn', './ASSETS/OptionsMenu/OptionsMainMenu/BotonMedioSeleccionadoEng.png');
      this.load.image('DifficultButtonSelectedEn', './ASSETS/OptionsMenu/OptionsMainMenu/BotonDificilSeleccionadoEng.png');

    //Credits Menu
      this.load.image('logo','ASSETS/Logo.jpeg');

    //Map Selection Menu
      this.load.image('backgroundMSM', './ASSETS/MapSelectionMenu/MapMenuBackground.jpg');
      this.load.image('backgroundMSMWolrd1Comp', './ASSETS/MapSelectionMenu/MapMenuBackgroundMidgardComp.jpg');
      this.load.image('World1Button', './ASSETS/MapSelectionMenu/BotonMidgard.png');
      this.load.image('World2Button', './ASSETS/MapSelectionMenu/BotonMuspelheim.png');
      this.load.image('backButton', './ASSETS/MapSelectionMenu/BotonVolver.png');
      this.load.image('paperWorld1', './ASSETS/MapSelectionMenu/PergaminoMidgard.png');
      this.load.image('paperWorld1En', './ASSETS/MapSelectionMenu/PergaminMidgard.png');
      this.load.image('playButton', './ASSETS/MapSelectionMenu/BotonJugar.png');
      this.load.image('playButtonSel', './ASSETS/MapSelectionMenu/JugarSeleccionado.png');

    //Level Manager
      this.load.spritesheet('dude', 'ASSETS/Placeholders/dude.png', { frameWidth: 32, frameHeight: 48 });
      this.load.image('mobile_button', 'ASSETS/Placeholders/button.png');
      this.load.image('ground', 'ASSETS/Placeholders/platform.png');
      this.load.image('dot', 'ASSETS/Placeholders/star.png');
      this.load.image('bomb', 'ASSETS/Placeholders/bomb.png');
      this.load.image('bg_far', 'ASSETS/Secciones/Zona lejana.png');
      this.load.image('bg_medium' , 'ASSETS/Secciones/Zona media.png');
      this.load.image('bg_near' , 'ASSETS/Secciones/Zona delantera.png');
      this.load.image('bg_background', 'ASSETS/Secciones/Fondo.png');
      this.load.image('bg_far_ice', 'ASSETS/Secciones/Zona lejana_hielo.png');
      this.load.image('bg_medium_ice' , 'ASSETS/Secciones/Zona media_hielo.png');
      this.load.image('bg_near_ice' , 'ASSETS/Secciones/Zona delantera_hielo.png');
      this.load.image('bg_background_ice', 'ASSETS/Secciones/Fondo_hielo.png');
      this.load.image('einar', 'ASSETS/Gameplay/einar_provisional.png');
      this.load.image('barricade', 'ASSETS/Gameplay/barricade.png');
      this.load.image('trunk', 'ASSETS/Gameplay/trunk.png');
      this.load.image('cabin_up_1', 'ASSETS/Gameplay/cabin_up_1.png');
      this.load.image('cabin_up_2', 'ASSETS/Gameplay/cabin_up_2.png');
      this.load.image('cabin_down_1', 'ASSETS/Gameplay/cabin_down_1.png');
      this.load.image('cabin_down_2', 'ASSETS/Gameplay/cabin_down_2.png');
      this.load.image('cabin_up_ice_1', 'ASSETS/Gameplay/cabin_up_ice_1.png');
      this.load.image('cabin_up_ice_2', 'ASSETS/Gameplay/cabin_up_ice_2.png');
      this.load.image('cabin_down_ice_1', 'ASSETS/Gameplay/cabin_down_ice_1.png');
      this.load.image('cabin_down_ice_2', 'ASSETS/Gameplay/cabin_down_ice_2.png');
      this.load.image('platform', 'ASSETS/Gameplay/platform.png');
      this.load.image('platform_ice', 'ASSETS/Gameplay/platform_ice.png');
      this.load.image('spikes', 'ASSETS/Gameplay/spikes.png');
      this.load.image('spikes_long', 'ASSETS/Gameplay/spikes_long.png');
      this.load.image('pauseButton', 'ASSETS/Gameplay/ButtonPause.png');
      this.load.spritesheet('einar_running', 'ASSETS/Gameplay/animacion_correr.png', { frameWidth: 400, frameHeight: 350 });
      this.load.spritesheet('einar_jumping', 'ASSETS/Gameplay/animacion_saltar.png', { frameWidth: 400, frameHeight: 350 });
      this.load.spritesheet('einar_attack', 'ASSETS/Gameplay/animacion_atacar.png', { frameWidth: 400, frameHeight: 350 });
      this.load.image('life', 'ASSETS/Tienda/IconoBendicion.png');
      this.load.image('ravenHugin', 'ASSETS/Gameplay/Hugin.png');

      this.load.image('backgroundDialogEinar', 'ASSETS/Gameplay/CajaTextoEinar.png');
      this.load.image('backgroundDialogHugin', 'ASSETS/Gameplay/CajaTextoHugin.png');
      this.load.image('backgroundDialogMunin', 'ASSETS/Gameplay/CajaTextoMunin.png');
      this.load.image('buttonDialogSel', 'ASSETS/Gameplay/FlechaSel.png');
      this.load.image('buttonDialog', 'ASSETS/Gameplay/Flecha.png');



    //Pause Menu
      this.load.image('backgroundPM', './ASSETS/PauseMenu/PauseMenuBackground.jpg');
      this.load.image('backgroundPMEn', './ASSETS/PauseMenu/PauseMenuBackgroundEn.jpg');

    //SHOP MEMU
      this.load.image('backgroundSM', './ASSETS/Tienda/FondoTienda.jpg');
      this.load.image('backgroundSMEn', './ASSETS/Tienda/FondoTiendaEng.jpg');
      //Sonidos
      this.load.audio('soundBendicionDeHierro' , './ASSETS/Sounds/BendicionDeHierro.m4a')
      this.load.audio('soundPlumaDeValquiria' , './ASSETS/Sounds/PlumaDeValquiria.m4a')
      this.load.audio('soundFuerzaDeOdin' , './ASSETS/Sounds/FuerzaDeOdin.m4a')
      this.load.audio('soundFuria' , './ASSETS/Sounds/Furia.m4a')
      this.load.audio('soundForceOfOdin' , './ASSETS/Sounds/ForceOfOdin.m4a')
      this.load.audio('soundIronBlessing' , './ASSETS/Sounds/IronBlessing.m4a')
      this.load.audio('soundValkirieFeather' , './ASSETS/Sounds/ValkirieFeather.m4a')
      this.load.audio('soundRage' , './ASSETS/Sounds/Rage.m4a')
      //Comprados
      this.load.image('object1Bought', './ASSETS/Tienda/BendicionMaximo.png');
      this.load.image('object2Bought', './ASSETS/Tienda/FuerzaComprado.png');
      this.load.image('object3Bought', './ASSETS/Tienda/PlumaComprado.png');
      this.load.image('object4Bought', './ASSETS/Tienda/RabiaComprado.png');
      this.load.image('object1BoughtEn', './ASSETS/Tienda/BendicionMaximoEng.png');
      this.load.image('object2BoughtEn', './ASSETS/Tienda/FuerzaCompradoEng.png');
      this.load.image('object3BoughtEn', './ASSETS/Tienda/PlumaCompradoEng.png');
      this.load.image('object4BoughtEn', './ASSETS/Tienda/RabiaCompradoEng.png');
      //Iconos
      this.load.image('IconObject1', './ASSETS/Tienda/IconoBendicion.png');
      this.load.image('IconObject2', './ASSETS/Tienda/IconoFuerza.png');
      this.load.image('IconObject3', './ASSETS/Tienda/IconoPluma.png');
      this.load.image('IconObject4', './ASSETS/Tienda/IconoRabia.png');

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
      //ENG
      this.load.image('Level0Name', './ASSETS/World1Menu/TitulosNodos/TheRegress.png');
      this.load.image('Level1Name', './ASSETS/World1Menu/TitulosNodos/MyMemory.png');
      this.load.image('Level2Name', './ASSETS/World1Menu/TitulosNodos/PastVoice.png');
      this.load.image('Level2_1Name', './ASSETS/World1Menu/TitulosNodos/Valkyre.png');
      this.load.image('Level3Name', './ASSETS/World1Menu/TitulosNodos/Finally.png');
      this.load.image('Level4Name', './ASSETS/World1Menu/TitulosNodos/TheDisbelief.png');
      this.load.image('Level5Name', './ASSETS/World1Menu/TitulosNodos/TheFrozenLake.png');
      this.load.image('Level6Name', './ASSETS/World1Menu/TitulosNodos/TheBetrayal.png');
      this.load.image('Level5_1Name', './ASSETS/World1Menu/TitulosNodos/MyHometown.png');
      this.load.image('Level5_2Name', './ASSETS/World1Menu/TitulosNodos/MyFamily.png');
      this.load.image('Level7Name', './ASSETS/World1Menu/TitulosNodos/TheRests.png');
      this.load.image('Level8Name', './ASSETS/World1Menu/TitulosNodos/TheMust.png');
      this.load.image('Level9Name', './ASSETS/World1Menu/TitulosNodos/TheShadow.png');
      //ESP
      this.load.image('Nivel0Name', './ASSETS/World1Menu/TitulosNodos/ElRegreso.png');
      this.load.image('Nivel1Name', './ASSETS/World1Menu/TitulosNodos/MiMemoria.png');
      this.load.image('Nivel1_1Name', './ASSETS/World1Menu/TitulosNodos/Yggdrasil.png');
      this.load.image('Nivel2Name', './ASSETS/World1Menu/TitulosNodos/LaVozDelPasado.png');
      this.load.image('Nivel2_1Name', './ASSETS/World1Menu/TitulosNodos/Valquirias.png');
      this.load.image('Nivel3Name', './ASSETS/World1Menu/TitulosNodos/AlFin.png');
      this.load.image('Nivel4Name', './ASSETS/World1Menu/TitulosNodos/LaDescreencia.png');
      this.load.image('Nivel5Name', './ASSETS/World1Menu/TitulosNodos/ElLagoHelado.png');
      this.load.image('Nivel4_1Name', './ASSETS/World1Menu/TitulosNodos/Valhalla.png');
      this.load.image('Nivel4_2Name', './ASSETS/World1Menu/TitulosNodos/Berserker.png');
      this.load.image('Nivel6Name', './ASSETS/World1Menu/TitulosNodos/LaTraicion.png');
      this.load.image('Nivel5_1Name', './ASSETS/World1Menu/TitulosNodos/MiPueblo.png');
      this.load.image('Nivel5_2Name', './ASSETS/World1Menu/TitulosNodos/MiFamilia.png');
      this.load.image('Nivel7Name', './ASSETS/World1Menu/TitulosNodos/LosRestos.png');
      this.load.image('Nivel8Name', './ASSETS/World1Menu/TitulosNodos/ElDeber.png');
      this.load.image('Nivel7_1Name', './ASSETS/World1Menu/TitulosNodos/Ragnarok.png');
      this.load.image('Nivel7_2Name', './ASSETS/World1Menu/TitulosNodos/Einar.png');
      this.load.image('Nivel9Name', './ASSETS/World1Menu/TitulosNodos/LaSombra.png');



      //Subnodos
      this.load.image('NodeDeselected', './ASSETS/World1Menu/IconosSubniveles/SubnivelDeseleccionado.png');
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


      //POEMS
      //Esp
      this.load.image('Poema1_1', './ASSETS/GamePlay/PoemaYggdrasil.png');
      this.load.image('Poema2_1', './ASSETS/GamePlay/PoemaValquirias.png');
      this.load.image('Poema4_1', './ASSETS/GamePlay/PoemaValhalla.png');
      this.load.image('Poema4_2', './ASSETS/GamePlay/PoemaBerserker.png');
      this.load.image('Poema7_1', './ASSETS/GamePlay/PoemaRagnarok.png');
      this.load.image('Poema7_2', './ASSETS/GamePlay/PoemaEinar.png');

      //Eng
      this.load.image('Poem1_1', './ASSETS/GamePlay/PoemYggdrasil.png');
      this.load.image('Poem2_1', './ASSETS/GamePlay/PoemValKyres.png');
      this.load.image('Poem4_1', './ASSETS/GamePlay/PoemValhalla.png');
      this.load.image('Poem4_2', './ASSETS/GamePlay/PoemBerserker.png');
      this.load.image('Poem7_1', './ASSETS/GamePlay/PoemRagnarok.png');
      this.load.image('Poem7_2', './ASSETS/GamePlay/PoemEinar.png');


      // Música
      this.load.audio('music_1', './ASSETS/Music/music_1.mp3');
      this.load.audio('music_2', './ASSETS/Music/music_2.mp3');
      this.load.audio('music_3', './ASSETS/Music/music_3.mp3');
      this.load.audio('musicDialog', './ASSETS/Music/MusicaDialogoFinal.mp3');
      this.load.audio('player_death', './ASSETS/Sounds/449702__digestcontent__female-scream.wav');
      this.load.audio('player_attack', './ASSETS/Sounds/sound_attack.mp3');
      this.load.audio('player_jump', './ASSETS/Sounds/sound_jump.mp3');
      this.load.audio('enemy_1', './ASSETS/Sounds/166036__vinrax__monster-pain8.wav');
      this.load.audio('player_running', './ASSETS/Sounds/107624__stintx__running-02.wav');
      this.load.audio('ChangeDifficulty', './ASSETS/Sounds/Dificultad.mp3');
      this.load.audio('ClickButtonSound', './ASSETS/Sounds/Click.mp3');
      this.load.audio('BuyObject', './ASSETS/Sounds/Compra.mp3');
      this.load.audio('Poem', './ASSETS/Sounds/Poema.mp3');

      /*  this.load.on("complete", () => {
            console.log("Complete");
            this.scene.start('MainMenu');
        });*/

      this.load.image('Logo', './ASSETS/Logo.jpeg');


  }

  create(){

    loadUserData();

    phaserJSON = this.cache.json.get('Data');

    updateLanguage();


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
        repeat: 0
    })

    this.anims.create ({
      key: 'einar_attacking',
      frames: this.anims.generateFrameNumbers('einar_attack', { start: 0, end: 17}),
      frameRate: 70,
      repeat: 0
    })

    this.logo = this.add.sprite(gameWidth*8/16, gameHeight*8/16, 'Logo');
    this.logo.setScale(1/3);
    this.logo.alpha = 0;

    this.tweens.add({
      targets:this.logo,
      duration: 1000,
      alpha: 1,
      yoyo: true,
      hold: 1000,
      delay: 1000,
      completeDelay: 2000,
      onComplete:()=>this.scene.start('MainMenu')
    })


  }

}

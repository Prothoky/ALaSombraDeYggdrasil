class LevelManager extends Phaser.Scene
{
    constructor ()
    {
        super({key:"LevelManager"});

        // 1) AUSTES
        // 1.1) Ajustes personaje
        this.playerMovementSpeed = 550;   // Velocidad de movimiento del personaje (lectura en loadSettings)
        this.playerHitboxWidth = 70;    // Ancho de la hitbox del personaje
        this.playerHitboxHeight = 145;   // Alto de la hitbox del personaje
        this.playerJumpSpeed = -550;  // Fuerza de salto del personaje
        this.playerJumpDuration = 350;    // Duración máxima de la anulación de gravedad del salto en ms
        this.playerJumpSpeedDecrement = 50; // Efecto de la gravedad sobre los saltos
        this.playerInvulnerabilityDuration = 1000;  // Tiempo de invulnerabilidiad después de recibir un ataque
        this.playerAttackDuration = 333;   // Duración del ataque
        this.playerAttackRefreshRate = 30;  // Tasa de refresco de posición de la hitbox del ataque
        this.playerAttackCounter = 0;   // Contador de tiempo del ataque
        this.playerAttackCooldown = 320;   // Cooldown del ataque
        this.playerAttackWidth = 70;    // Ancho de hitbox del ataque
        this.playerResizeFactor = 1; // Escalado del personaje
        this.playerResizeFactorPC = 0.56;
        if(PC){
          this.playerAttackHeight = this.playerHitboxHeight * this.playerResizeFactorPC * 1.4;   // Alto de hitbox del ataque
        }else{
          this.playerAttackHeight = this.playerHitboxHeight * this.playerResizeFactor * 1.4;   // Alto de hitbox del ataque
        }
        this.playerHealth = 0;  // Puntos de vida del jugador (ajustar en el switch del create)
        this.playerStartPositionY = 500;    // Posición de inicio del personaje
        // 1.2) Ajustes cámara
        this.following = false;
        this.cameraOffsetX = -250;  // Offset del seguido del personaje en el eje X
        // 1.3) Ajustes enemigos
        this.eagleSpeedX = -550; // Velocidad de movimiento de los enemigos
        this.eagleSpeedY = 250;
        // 1.4) Ajustes del generador aleatorio
        // La distancia entre trampas final será maxRandTrapDistance(rand) + trapDistance + minDistance
        this.platformPositionY = 260;   // Posición base en Y de las plataformas
        this.platformPositionOffset = 75;  // Distancia que puede variar la posición de la plataforma
        this.platformMaxHeight = 285;   // Altura máxima de las plataformas
        this.maxRandTrapDistance = 200; // Máximo de distancia entre trampas añadido (250)
        this.minDistStillEnemy = 30;   // Mínimo de distancia tras un enemigo quieto
        this.minDistMovingEnemy = 80;   // Mínimo de distancia tras un enemigo que se mueve
        this.minDistPlatform = 200;   // Mínimo de distancia tras una plataforma
        this.minDistSpikes = 400;   // Mínimo de distancia tras una trampa de pinchos
        this.minDistBarricade = 250;    // Mínimo de distancia tras una barricada
        this.minDistTrunk = 485;    // Mínimo de distancia tras un tronco
        this.minDistPlatformToSpikes = 550; // Mínimo de distancia tras una plataforma + pinchos largos
        this.minDistCabin = 1100;   // Mínimo de distancia tras una cabaña
        this.minDistCoin = 0;   // Mínimo de distancia tras una moneda
        this.minDistDoubleBarricade = 300;  // Mínimo distancia tras una barricada doble

        // 2) CONFIGURACIÓN DEL NIVEL (dependiente del nivel escogido en el minimapa, lectura en loadSettings)
        this.lengthMultiplier = 5; // Multiplicador de amaño de ancho del mapa
        this.minTrapDistance = 200;    // Distancia mínima entre cada trampa
        this.goldBase = 100;    // Oro base que se gana al superar el nivel

        // 3) GENERAL
        this.runnerMode = true; // Controles de runner (salto y ataque)
        this.endlessMode = false;  // Modo arcade (endless)
        this.levelGroundHeight = 470;   // Altura del suelo
        // 3.1) Settings enerador procedural
        this.levelIntroWidth = 1400; // Longitud al principio del mapa asegurado sin trampas
        this.endEventOffset = 500;  // Distancia desde la última trampa hasta el evento de fin de nivel.
        this.levelEndWidth = 3500;   // Longitud al final del mapa asegurado sin trampas. Debe ser muy grande.
        this.arcadeGeneratorOffset = 3500;
        // 3.2) PowerUps
        this.doubleJumpEnabled = false;

        // 4) REFERENCIAS
        // 4.1) Grupos
        this.ground; // Grupo de plataformas colisionables
        this.spikesTraps;   // Grupos de trampas
        this.platforms;    // Grupos de plataformas
        this.solidPlatforms;    // Grupos de plataformas con las que se ha hecho contacto
        this.enemies;   // Grupos de enemigos
        this.eagles;
        this.triggers;  // Grupos de triggers (colisiones que disparan eventos)
        this.barricades;    // Grupo de barricadas
        this.cabins = new Array();  // Grupo de cabañas
        this.coins; // Grupo de monedas
        this.cabinHitbox;
        this.trashRecolectors;   // Grupo de ecolector de basura (modo arcade)
        //this.trashRecolectorRemover;    // Eliminador de recolectores de basura
        // 4.2) HUD
        this.healthPointsDisplay = new Array(); // HUD de puntos de vida
        //  4.3) Otros
        this.player;    // Personaje
        this.jumpTimer; // Callback para salto progresivo
        this.playerAttackTimer;   // Temporizador de fin de ataque
        this.jumpSpeedDecrementTimer;   // Temporizador de disminución velocidad salto
        this.arcadeIntervalTimer; // Actualiza la distancia recorrida en el modo endless
        this.resetDepthTimer;
        this.attackHitbox;  // Hitbox del ataque
        this.trapFunctionsArray = new Array();  // Array que guarda las funciones de las trampas a generar
        this.endTrigger;    // Trigger del fin del nivel
        this.arcadeCicleCollision;  // Punto de reset (modo arcade)
        this.endLevelCollision;
        this.enemyCollision;

        // 5) VARIABLES DE INFORMACIÓN
        this.levelHeight = gameHeight;  // Alto del nivel
        this.levelWidth = gameWidth * this.lengthMultiplier;    // Ancho del nivel
        this.isPlayerDead = false;  // Está el personaje muerto?
        this.isPlayerJumping = false;   // Está el personaje saltando?
        this.isPlayerTouchingGround = false;    // Está el personaje tocando el suelo?
        this.doubleJumpAvaliable = true;    // Está el doble salto disponible?
        this.playerAttackAvaliable = true;  // Está el ataque disponible?
        this.isPlayerInvulnerable = false;  // Es el jugador invulnerable?
        this.isPlayerAttacking = false;
        this.hasCicled = false; // Se ha completado una primera vuelta en el modo arcade?
        this.isIceLevel = false; // Es un nivel de hielo?
        this.hasArrived = false;    // Ha llegado al final del nivel?
        this.xPointerFinalValue = 0;    // Almacena la posición donde se debe pintar la cabaña en endless mode
        this.xPointer = 0;    // Almacena donde tenemos que seguir creando trampas
        this.cicleIteration = 1;
        //this.gamePaused = false;

        // 6) INPUT
        // Teclas (no ejecutar si es en móvil)
        this.controls_enable;
        this.jumpButton;
        this.leftButton;
        this.rightButton;
        this.attackButton;
        this.testButton;
        this.pauseButton;

        //7) Textos
        //Dinero en posesion
        this.Money;
        //Dialogos finales
        this.DialogShowing=false;
        this.DialogBg;
        this.DialogText;
        this.indexText = 0;
        //this.buttonDialog
        this.buttonPause;
        this.raven;

        this.Poem1_1;
        this.Poem2_1;
        this.Poem4_1;
        this.Poem4_2;
        this.Poem7_1;
        this.Poem7_2;
        this.PoemVisible;

    }

    create ()
    {
        this.physics.world.setFPS(fpsTarget);
      //this.cameras.main.fadeIn(1500, 0, 0, 0);

        // ----FIX----
        // 1) ASIGNACIONES DE RESETEO
        // Vuelve a asignar los valores de determinadas variables al reintentar ya que no pasa correctamente por el constructor
        this.following=false;
        this.DialogShowing=false;
        this.playerAttackAvaliable = true;
        this.isPlayerInvulnerable = false;
        this.doubleJumpAvaliable = true;
        this.hasArrived = false;
        distanceAchieved = 0;  // Distancia modo endless a 0
        this.xPointer = 0;
        this.hasCicled = false;
        this.cicleIteration = 1;
        this.doubleJumpEnabled = false;
        this.playerInvulnerabilityDuration = 1000;
        this.playerAttackCooldown = 320;

        // ----CARGA DE DATOS----
        this.loadSettings();    // Carga los datos del nivel del archivo LevelConfiguration

        // ----ASSETS----
        // 1) AUDIO
        // 1.1) Música
        // Paramos música menú
        if (musicMenu.isPlaying) {
            musicMenu.stop();
        }
        // Ponemos música gameplay si no está ya
        if (!this.isIceLevel) {
            if (!musicGameplay.isPlaying) {
                musicGameplay.play();
            }
            if(musicGameplay.volume <= 0){
                musicGameplay.setVolume(userConfig.volumeMusic/10);
            }
        } else {
            if (!musicGameplayIce.isPlaying) {
                musicGameplayIce.play();
            }
            if(musicGameplayIce.volume <= 0){
                musicGameplayIce.setVolume(userConfig.volumeMusic/10);
            }
        }


        // 1.2) Sonidos
        // Declaramos sonidos
        let config = this.getAudioConfig();
        this.soundStart = this.sound.add('soundStart', config);
        this.soundDeath = this.sound.add('player_death', config);
        this.soundRunning = this.sound.add('player_running', config);
        this.soundJump = this.sound.add('player_jump', config);
        this.soundAttack = this.sound.add('player_attack', config);
        this.soundEnemy = this.sound.add('enemy_1', config);
        this.soundEagle = this.sound.add('soundEagle', config);
        this.soundCoin = this.sound.add('soundCoin', config);
        this.clickButtonSound = this.sound.add('ClickButtonSound', config);
        this.poemSound = this.sound.add('Poem', config);
        this.dialogSound = this.sound.add('musicDialog', config);

        this.soundStart.play();

        // 2) BACKGROUND
        if (this.isIceLevel) {
            this.bg_background = this.add.tileSprite(0, 0, 3772, 605, 'bg_background_ice');
            this.bg_far = this.add.tileSprite(0,0, 3772, 605, "bg_far_ice");
            this.bg_medium = this.add.tileSprite(0,0, 3772, 605, "bg_medium_ice");
            this.bg_near = this.add.tileSprite(0,-25, 3215, 515, "bg_near_ice");
        } else {
            this.bg_background = this.add.tileSprite(0,0, 3772, 605, 'bg_background');
            this.bg_far = this.add.tileSprite(0,0, 3772, 605, "bg_far");
            this.bg_medium = this.add.tileSprite(0,0, 3772, 605, "bg_medium");
            this.bg_near = this.add.tileSprite(0, -25, 3215, 515, "bg_near");
        }
        this.bg_near.setScale(1,1.25)
        this.bg_near.depth = 6;

        // Ajusta los tileSprites
        this.bg_near.alpha=0.95;
        this.bg_background.setOrigin(0,0);
        this.bg_far.setOrigin(0,0);
        this.bg_medium.setOrigin(0,0);
        this.bg_near.setOrigin(0,0);
        this.bg_background.setScrollFactor(0);
        this.bg_far.setScrollFactor(0);
        this.bg_medium.setScrollFactor(0);
        this.bg_near.setScrollFactor(0);

        //  ----GAMEPLAY----
        // 1) PERSONAJE
        // Creación personaje: setOrigin(1) IMPORTANTE (calcular colisiones)
      //  this.player = this.physics.add.sprite(-200, this.playerStartPositionY, 'einar_running').setOrigin(1).setScale(this.playerResizeFactor).setSize(this.playerHitboxWidth, this.playerHitboxHeight);
      if(PC){
        this.player = this.physics.add.sprite(-200, this.playerStartPositionY, 'einar_running').setOrigin(1).setScale(this.playerResizeFactorPC).setSize(this.playerHitboxWidth, this.playerHitboxHeight);
        this.player.setOffset(110, 140);    // Offset respecto hitbox
      }else{//ANIMACIONES MOVIL
        this.player = this.physics.add.sprite(-200, 300, 'einar_running').setOrigin(1).setScale(this.playerResizeFactor).setSize(this.playerHitboxWidth, this.playerHitboxHeight/2);
        this.player.setOffset(61.6, 78.4);    // Offset respecto hitbox
      }

      this.player.depth = 3;  // Profundidad del sprite

        // Dependiendo de la dificultad escogida asignamos nº vidas
        switch (userConfig.difficulty) {
            case 0:
                this.playerHealth = 5;
                break;
            case 1:
                this.playerHealth = 3;
                break;
            case 2:
                this.playerHealth = 1;
                break;
        }
        if (this.endlessMode == true) {
            this.playerHealth = 3;
        }
        // Aplica los efectos de las mejoras
        this.applyBuffs();


        // 3) OBJETOS DE CONTROL DE FLUJO
        this.endTrigger = this.physics.add.sprite(0, this.levelGroundHeight, 'dot').setSize(50, this.levelHeight + 200);  // Trigger de evento final de nivel
        this.endTrigger.body.setAllowGravity(false);    // Quitar gravedad
        this.endTrigger.setVisible(false);
        if (this.endlessMode == true) {
            this.arcadeIntervalTimer = this.time.addEvent( { delay: 200, callback: this.arcadeIntervalFunc, callbackScope: this, loop: true } );    // Aumenta la velocidad y la distancia
        }
        //this.trashRecolectorRemover = this.physics.add.sprite(this.levelWidth, this.levelGroundHeight, 'dot').setSize(50, this.levelHeight + 200);  // Elimina los recolectores de basura
        //this.trashRecolectorRemover.body.setAllowGravity(false);

        // 3) FÍSICAS
        //this.physics.world.setBounds(0, 0, this.levelWidth, this.levelHeight);  // Tamaño del nivel
        //this.player.setCollideWorldBounds(false);    // No puede salir de los límites del mapa

        // 3.1) Creación de grupos (ED que contienen objetos que actúan igual)
        this.ground = this.physics.add.staticGroup();    // Grupo de plataformas colisionables
        this.spikesTraps = this.physics.add.staticGroup();  // Grupo de trampas de pinchos
        this.platforms = this.physics.add.staticGroup();    // Grupo de plataformas
        this.solidPlatforms = this.physics.add.staticGroup();   // Grupo de plataformas con las que se ha hecho contacto
        this.enemies = this.physics.add.group();  // Grupo de enemigos
        this.eagles = this.physics.add.group();
        this.triggers = this.physics.add.staticGroup();   // Grupo de triggers
        this.barricades = this.physics.add.group(); // Grupo de barricadas
        this.attackHitbox = this.physics.add.group(); // Grupo de hitbox del personaje
        this.coins = this.physics.add.staticGroup();    // Grupo de monedas
        this.cabinHitbox = this.physics.add.staticGroup();
        this.trashRecolectors = this.physics.add.group();   // Objetos que eliminan trampas ya superadas

        this.generateGround(200, 'ground'); // Genera suelo para todo el nivel

        // Suelo antes del mapa para que venga desde antes corriendo einar
        this.ground.create(-200, this.levelGroundHeight, 'ground').setOrigin(0, 0).setVisible(false).refreshBody();
        this.ground.create(-400, this.levelGroundHeight, 'ground').setOrigin(0, 0).setVisible(false).refreshBody();
        this.ground.create(-600, this.levelGroundHeight, 'ground').setOrigin(0, 0).setVisible(false).refreshBody();
        this.ground.create(-800, this.levelGroundHeight, 'ground').setOrigin(0, 0).setVisible(false).refreshBody();


        // 3.2) Declaración de funciones de colision/overlap
        this.physics.add.collider(this.player, this.ground, this.grounded, null, this); // Permitimos colisiones entre suelo y jugador y cuenta como grounded (puede saltar)
        this.physics.add.collider(this.player, this.spikesTraps, () => this.playerHit()); // Función que se ejecuta al colisionar con spikes
        this.physics.add.overlap(this.player, this.cabinHitbox, this.changeDepth, null, this);
        this.physics.add.overlap(this.player, this.barricades, () => this.playerHit());    // Al hacer overlap con barricadas
        this.physics.add.collider(this.barricades, this.ground);    // barricadas chocan con el suelo
        this.physics.add.collider(this.barricades, this.platforms);    // barricadas chocan con plataformas
        this.physics.add.collider(this.player, this.platforms, this.grounded, null, this);  // Permitimos colision es entre plataforms y jugador y cuenta como grounded (puede saltar)
        this.physics.add.overlap(this.player, this.enemies, () => this.playerHit()); // Llama a playerDeath si colisiona con enemigo
        this.physics.add.overlap(this.player, this.eagles, () => this.playerHit()); // Llama a playerDeath si colisiona con enemigo
        this.physics.add.overlap(this.attackHitbox, this.enemies, this.killEnemy, null, this);  // LLama a killEnemy cuando la hitbox del ataque impacte con un enemigo
        this.physics.add.overlap(this.attackHitbox, this.eagles, this.killEnemy, null, this);  // LLama a killEnemy cuando la hitbox del ataque impacte con un enemigo
        this.physics.add.collider(this.enemies, this.platforms);    // Enemigos colisionan con el suelo
        this.physics.add.collider(this.enemies, this.ground);   // Enemigos colisionan con plataformas
        this.enemyCollision = this.physics.add.overlap(this.player, this.triggers, this.enemyStartMotion, null, this);    // Función que se llama al entrar el jugador en el área de visión del enemigo
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);    // Función de recoger moneda
        if (this.endlessMode == false) {    // Dependiendo de si es modo arcade
            this.endLevelCollision = this.physics.add.overlap(this.player, this.endTrigger, this.goalArrived, null, this);   // Genera el texto de fin del nivel
            this.endLevelCollision.active = true;
        } else {
            this.arcadeCicleCollision = this.physics.add.overlap(this.player, this.endTrigger, this.arcadeCicle, null, this);   // Resetea la posición del personaje y genera nuevas trampas
        }
        // Recolector de basura, elimina los objetos que toca
        this.physics.add.overlap(this.trashRecolectors, this.ground, this.deleteObject, null, this);
        this.physics.add.overlap(this.trashRecolectors, this.spikesTraps, this.deleteObject, null, this);
        this.physics.add.overlap(this.trashRecolectors, this.cabinHitbox, this.deleteObject, null, this);
        this.physics.add.overlap(this.trashRecolectors, this.barricades, this.deleteObject, null, this);
        this.physics.add.overlap(this.trashRecolectors, this.platforms, this.deleteObject, null, this);
        this.physics.add.overlap(this.trashRecolectors, this.enemies, this.deleteObject, null, this);
        this.physics.add.overlap(this.trashRecolectors, this.eagles, this.deleteObject, null, this);
        this.physics.add.overlap(this.trashRecolectors, this.triggers, this.deleteObject, null, this);
        //this.physics.add.overlap(this.trashRecolectorRemover, this.trashRecolectors, this.deleteObject, null, this);


        // 4) GENERACIÓN PROCEDURAL
        this.generateTrapArray();   // Genera el array de las trampas disponibles en este mapa
        this.proceduralGenerator(); // Genera el mapa
        // Especial para modo arcade
        if (this.endlessMode == true) {
            this.arcadeTrashRecolector = this.trashRecolectors.create(-1200, 300, 'dot').setOrigin(1).setSize(40, 610).setVisible(false);   // Objeto que elimina trampas ya superadas
            this.arcadeTrashRecolector.body.setAllowGravity(false);   // Quita gravedad
            this.arcadeTrashRecolector.setVelocityX(this.playerMovementSpeed);
            this.levelIntroWidth = 1500;
        }


        // 5) CÁMARA
        this.cameras.main.setBounds(0, 0, this.levelWidth, this.levelHeight);   // Límites cámara
        //this.cameras.main.startFollow(this.player, false, 1, 1, this.cameraOffsetX, 0); // Cámar sigue al personaje



        // ----HUD----
        // 1) Botón de pausa
        this.buttonPause = this.add.image(60, 33, 'deselectedButtonSmall');
        this.buttonPause.setDepth(11);
        this.buttonPause.setScale(1.5/3);
        this.buttonPause.setScrollFactor(0);
        this.buttonPauseSel = this.add.image(75, 33, 'selSmallRightButton');
        this.buttonPauseSel.setScale(1.5/3);
        this.buttonPauseSel.setDepth(11);
        this.buttonPauseSel.setScrollFactor(0);
        this.buttonPauseSel.setVisible(false);

        this.buttonPause.on('pointerover', function (pointer) {this.buttonPauseSel.setVisible(true);}, this);
        this.buttonPause.on('pointerout', function (pointer) {this.buttonPauseSel.setVisible(false);}, this);
        this.buttonPause.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.PauseGame());

        this.pauseText = this.add.text(gameWidth*0.4/16, gameHeight*0.68/16,  stringsJSON.Buttons.pause, {fontFamily: "Acadian_Runes",fontSize: "20px", align: 'center', fill: "#481d18"});
        this.pauseText.setScrollFactor(0);
        this.pauseText.setDepth(11);


        // 2) Puntos de vida
        this.healthIconOffset = 30; // Offset de los iconos de vida
        for(let i = 0; i < this.playerHealth; i++) {    // Posiciona los puntos de vida en el HUD
            this.healthPointsDisplay[i] = this.add.image(1270 - 25 * (1 + i), 50, 'life');
            this.healthPointsDisplay[i].setScale(2.5/5);
            this.healthPointsDisplay[i].setScrollFactor(0);
            this.healthPointsDisplay[i].depth = 10;
        }

        //MONEY

        if (arcadeMode == false){

          this.backgroundMoney = this.add.image(gameWidth*13/16, gameHeight*1.1/16, 'deselectedButtonSmall');
          this.backgroundMoney.setScale(1.5/3);
          this.backgroundMoney.setScrollFactor(0);

          this.Money = this.add.text(gameWidth*12.6/16, gameHeight*0.92/16,  user.money, {fontFamily: "Acadian_Runes",fontSize: "20px", align: 'center', fill: "#481d18"});
          this.Money.setScrollFactor(0);
        }


        //DIALOG End Level
        this.DialogBg = this.add.image(gameWidth*8/16, gameHeight*12.5/16, 'backgroundDialogEinar');
        this.DialogBg.setScale(2/3);
        this.DialogBg.setDepth(11);
        this.DialogBg.setScrollFactor(0);
        //this.DialogBg.setVisible(false);
        this.DialogBg.alpha = 0;
        //this.DialogBg.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.nextDialog());

        this.DialogText = this.add.text(gameWidth*6/16, gameHeight*11/16,  " ", {fontFamily: "Acadian_Runes",fontSize: "20px", align: 'center', fill: "#481d18"});
        this.DialogText.setScrollFactor(0);
        this.DialogText.setDepth(12);
        //this.DialogText.setVisible(false);
        this.DialogText.alpha = 0;

        this.buttonDialog = this.add.image(gameWidth*10.7/16, gameHeight*13.34/16, 'buttonDialog');
        this.buttonDialog.setScale(2/3);
        this.buttonDialog.setDepth(12);
        this.buttonDialog.setScrollFactor(0);
        this.buttonDialog.setVisible(false);

        this.buttonDialogBOX = this.add.image(gameWidth*10.7/16, gameHeight*13.34/16, 'boxNextDialog');
        this.buttonDialogBOX.setScale(2/3);
        this.buttonDialogBOX.setDepth(12);
        this.buttonDialogBOX.setScrollFactor(0);
        this.buttonDialogBOX.alpha = 0;

        this.buttonDialogSel = this.add.image(gameWidth*10.7/16, gameHeight*13.34/16, 'buttonDialogSel');
        this.buttonDialogSel.setScale(2/3);
        this.buttonDialogSel.setDepth(12);
        this.buttonDialogSel.setScrollFactor(0);
        this.buttonDialogSel.setVisible(false);

        //this.buttonDialog.setScale(0.5);
        if(PC){
          this.buttonDialog.on('pointerover', function (pointer) {this.buttonDialogSel.setVisible(true);}, this);
          this.buttonDialog.on('pointerout', function (pointer) {this.buttonDialogSel.setVisible(false);}, this);
          this.buttonDialog.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.nextDialog());
        }else{
          this.buttonDialogBOX.on('pointerover', function (pointer) {this.buttonDialogSel.setVisible(true);}, this);
          this.buttonDialogBOX.on('pointerout', function (pointer) {this.buttonDialogSel.setVisible(false);}, this);
          this.buttonDialogBOX.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.nextDialog());
        }


        //RAVEN raven
        this.raven = this.add.image(gameWidth*11.7/16, gameHeight*8.34/16, 'ravenMunin');
        if(levelIndex > 4){
          this.raven.setTexture('ravenHugin')
        }
        this.raven.setScale(2/3);
        this.raven.setDepth(5);
        //this.raven.setVisible(false);
        this.raven.setScrollFactor(0);
        this.raven.alpha = 0;

        //POEMS

        if(userConfig.lang == "es"){
          this.Poem1_1 = this.add.image(gameWidth*8/16, gameHeight*8/16, 'Poema1_1');
        }else{
          this.Poem1_1 = this.add.image(gameWidth*8/16, gameHeight*8/16, 'Poem1_1');
        }

        if(userConfig.lang == "es"){
          this.Poem2_1 = this.add.image(gameWidth*8/16, gameHeight*8/16, 'Poema2_1');
        }else{
          this.Poem2_1 = this.add.image(gameWidth*8/16, gameHeight*8/16, 'Poem2_1');
        }

        if(userConfig.lang == "es"){
          this.Poem4_1 = this.add.image(gameWidth*8/16, gameHeight*8/16, 'Poema4_1');
        }else{
          this.Poem4_1 = this.add.image(gameWidth*8/16, gameHeight*8/16, 'Poem4_1');
        }

        if(userConfig.lang == "es"){
          this.Poem4_2 = this.add.image(gameWidth*8/16, gameHeight*8/16, 'Poema4_2');
        }else{
          this.Poem4_2 = this.add.image(gameWidth*8/16, gameHeight*8/16, 'Poem4_2');
        }

        if(userConfig.lang == "es"){
          this.Poem7_1 = this.add.image(gameWidth*8/16, gameHeight*8/16, 'Poema7_1');
        }else{
          this.Poem7_1 = this.add.image(gameWidth*8/16, gameHeight*8/16, 'Poem7_1');
        }

        if(userConfig.lang == "es"){
          this.Poem7_2 = this.add.image(gameWidth*8/16, gameHeight*8/16, 'Poema7_2');
        }else{
          this.Poem7_2 = this.add.image(gameWidth*8/16, gameHeight*8/16, 'Poem7_2');
        }

        this.Poem1_1.setScale(2/3);
        this.Poem1_1.setDepth(11);
        this.Poem1_1.setVisible(false);
        this.Poem1_1.setScrollFactor(0);
        this.Poem1_1.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.levelCompletedFunc());

        this.Poem2_1.setScale(2/3);
        this.Poem2_1.setDepth(11);
        this.Poem2_1.setVisible(false);
        this.Poem2_1.setScrollFactor(0);
        this.Poem2_1.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.levelCompletedFunc());

        this.Poem4_1.setScale(2/3);
        this.Poem4_1.setDepth(11);
        this.Poem4_1.setVisible(false);
        this.Poem4_1.setScrollFactor(0);
        this.Poem4_1.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.levelCompletedFunc());

        this.Poem4_2.setScale(2/3);
        this.Poem4_2.setDepth(11);
        this.Poem4_2.setVisible(false);
        this.Poem4_2.setScrollFactor(0);
        this.Poem4_2.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.levelCompletedFunc());

        this.Poem7_1.setScale(2/3);
        this.Poem7_1.setDepth(11);
        this.Poem7_1.setVisible(false);
        this.Poem7_1.setScrollFactor(0);
        this.Poem7_1.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.levelCompletedFunc());

        this.Poem7_2.setScale(2/3);
        this.Poem7_2.setDepth(11);
        this.Poem7_2.setVisible(false);
        this.Poem7_2.setScrollFactor(0);
        this.Poem7_2.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.levelCompletedFunc());

        //FULL SCREEN
        this.fullScreenLM = this.add.image(gameWidth*15.5/16, gameHeight*13/14, 'buttonFullScreen');
        this.fullScreenLM.setScale(2/60);
        this.fullScreenLM.setScrollFactor(0);
        this.fullScreenLM.setDepth(10);
        this.fullScreenLM.setInteractive({ useHandCursor: true}).on('pointerdown', function() { this.scene.scale.toggleFullscreen()});



        // ----CONTROLES----
        // 1) PC
        this.controls_enable=true;
        this.jumpButton = this.input.keyboard.addKey(controls.up);
        this.leftButton = this.input.keyboard.addKey(controls.left);
        this.rightButton = this.input.keyboard.addKey(controls.right);
        this.attackButton = this.input.keyboard.addKey(controls.attack);
        this.testButton = this.input.keyboard.addKey(controls.test); // ELIMINAR VERSION FINAL
        this.pauseButton = this.input.keyboard.addKey(controls.pause);

        // Reiniciamos eventos
        this.jumpButton.off('down');
        this.jumpButton.off('up');
        this.attackButton.off('down');
        this.testButton.off('down');  // ELIMINAR VERSION FINAL
        this.pauseButton.off('down');

        // 1.1) Modo endless runner
        if (this.runnerMode == true) {
            this.jumpButton.on('down', this.playerStartJump, this);
            this.jumpButton.on('up', this.playerStopJump, this);
            this.attackButton.on('down', this.playerAttack, this);
            this.playerRight();
            this.pauseButton.on('down', this.PauseGame, this);
        } else {    // 1.2) Modo control izq/der
            this.jumpButton.on('down', this.playerStartJump, this);
            this.jumpButton.on('up', this.playerStopJump, this);
            this.leftButton.on('down', this.playerLeft, this);
            this.leftButton.on('up', this.playerStop,this);
            this.attackButton.on('down', this.playerAttack, this);
            this.rightButton.on('down', this.playerRight, this);
            this.rightButton.on('up',  this.playerStop,this);
            this.testButton.on('down', this.levelCompletedFunc, this);  // ELIMINAR VERSION FINAL
            this.pauseButton.on('down', this.PauseGame, this);
        }

        // 2) MÓVIL
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            console.log('Esto es un dispositivo móvil');
        }

        this.input.addPointer(2);

        var pointerJump = this.add.image(150,525, 'button_mobile').setInteractive(); //Hace la imagen interactuable
        pointerJump.setOrigin(0.5,0.5);
        pointerJump.setScale(0.65);
        pointerJump.setDepth(15);
        pointerJump.setVisible(true);


        var pointerAttack = this.add.image(1050, 525, 'button_mobile').setInteractive();
        pointerAttack.setDepth(15);
        pointerAttack.setScale(0.65);
        pointerAttack.setOrigin(0.5,0.5);
        pointerAttack.setVisible(true);

        pointerJump.setScrollFactor(0); //Los botones siempre quedan en pantalla
        pointerAttack.setScrollFactor(0);
        // setSize() cambia el tamaño de la hitbox
        // setVisible(false) lo hace invisible pero no se si lo hace también inactivo, si no probar a cambiar alpha
        //var pointerJump = this.add.image(gameWidth/4, gameHeight/2, 'dude').setInteractive().setSize(gameWidth/2, gameHeight/2).setScrollFactor(0);
        //var pointerAttack = this.add.image(gameWidth*3/4, gameHeight/2, 'dude').setInteractive().setSize(gameWidth/2, gameHeight/2).setScrollFactor(0);

        this.input.on('gameobjectdown',function (pointer) {

            if( pointerJump.getBounds().contains(pointer.downX, pointer.downY)){
                this.playerStartJump();
            }
            else if(pointerAttack.getBounds().contains(pointer.downX, pointer.downY)){
                this.playerAttack();
            }

            else{
                console.log(pointer);
            }
        }, this);

        this.input.on('gameobjectup',function (pointer) {

            if(pointerJump.getBounds().contains(pointer.downX, pointer.downY)){
                this.playerStopJump();
            }
            else if(pointerAttack.getBounds().contains(pointer.downX, pointer.downY)){
                //this.playerStop();
            }

            else{
                console.log(pointer);
            }
        }, this);

        if(PC) {
            pointerJump.setInteractive(false);
            pointerJump.destroy();
            pointerAttack.setInteractive(false);
            pointerAttack.destroy();
        }


        // ----TESTEO----
    }


    // FUNCIÓN DE CREADO PROCEDURAL DEL MAPA ----------------------------
    /*
    * Crea un cursor (xPointer) que va apuntando a una posición en x del nivel, desde 0 (comienzo) hasta
    * this.levelWidth (fin). Ejecuta el siguiente bucle mientras quede espacio:
    * 1) Coloca una trampa aleatoria en la posición x de la pool de trampas del escenario
    * 2) Deja un espacio libre que permita al jugador sortear la trampa
    * 3) Deja un espacio aleatorio hasta la siguiente trampa
    */
    proceduralGenerator() {
        if (!this.hasCicled) {
            this.xPointer += this.levelIntroWidth;   // Avanzamos el cursor una distancia inicial sin trampas si es la primera vez
        }
        let addedDistance;  // Almacena la distancia entre trampas a añadir en cada iter
        // Mientras quede espacio de mapa (sin contar el endWidth en arcade)
        let endWidth = 0;
        if (!this.endlessMode) {
            endWidth = this.levelEndWidth + 200;
        } /*else {
            endWidth = 0;
        }*/
        while (this.xPointer < this.levelWidth * this.cicleIteration - endWidth) { // 200 extra por si un enemigo cae justo en el límite
            // Genera una trampa aleatoria del pool de trampas y almacena su distancia mínima entre trampas
            addedDistance = this.generateRandomTrap(this.xPointer);
            // Aumenta espacio (derivado de la configuració ndel mapa y del random)
            addedDistance += this.minTrapDistance + Math.floor(Math.random() * this.maxRandTrapDistance);
            this.xPointer += addedDistance;
        }
        if (this.endlessMode) {
            this.endTrigger.x = this.xPointer - this.arcadeGeneratorOffset;
        } else {
            this.endTrigger.x = this.xPointer + this.endEventOffset;
        }
        this.xPointerFinalValue = this.xPointer;
        //console.log(this.percentagesTest);    // Debug
    }

    // Llama a una función aleatoria del array de trampas disponibles y le pasa x e y como parámetros
    generateRandomTrap(xPos) {
        return eval(this.trapFunctionsArray[this.randomTrapIndex()] + '(' + xPos + ')');
    }

    // Devuelve un índice válido del array de funciones de generación de trampas
    // Depende del nivel y del archivo LeveLConfiguration.js
    // Devuelve un índice de trampa de los almacenados en la variable que representa
    // al nivel y con los porcentajes de aparición indicados.
    randomTrapIndex() {
        let maxValue = 0;
        let difficultyIndex = 0;
        if (this.endlessMode == true) {
            difficultyIndex = 10;
        } else {
            difficultyIndex = DifficultyIndexSubnode(levelIndex);
        }
        for (let i = 0; i < levelTrapValues[difficultyIndex].length; i++) {
            maxValue += levelTrapValues[difficultyIndex][i][1];
        }
        let trapIndex = Math.floor(Math.random() * maxValue);
        let pointer = levelTrapValues[difficultyIndex].length;
        while (trapIndex >= 0 && pointer > 0) {
            pointer--;
            trapIndex -= levelTrapValues[difficultyIndex][pointer][1];
        }
        //this.percentagesTest[pointer]++;
        return levelTrapValues[difficultyIndex][pointer][0];
    }

    // Genera el array con las trampas disponibles del mapa
    generateTrapArray() {
        let trapFunctionsNames = [ 'this.generateSpikesTrap', 'this.generatePlatformNoEnemy', 'this.generateStillEnemy',
                                    'this.generatePlatform', /*'this.generateMovingEnemy', */'this.generatePlatformToSpikes',
                                    'this.generateSmallSpikesNoEnemy', 'this.generateSmallSpikes', 'this.generateBarricade',
                                    'this.generateTrunk', 'this.generateCabinUp', 'this.generatePlatformToCoinNoEnemy',
                                    'this.generateDoubleBarricade', 'this.generateCabinUpNoEnemy', 'this.generateCabinDown',
                                    'this.generatePlatformToCoin', 'this.generatePlatformToCoinRare' ];
        for (let i = 0; i < trapFunctionsNames.length; i++) {
            this.trapFunctionsArray[i] = trapFunctionsNames[i];
        }
    }
    // FIN DE FUNCIÓN DE CREADO PROCEDURAL DEL MAPA ---------------------


    // FUNCIONES DE CONTROL DEL PERSONAJE -------------------------------
    // Salto
    // Comienza el salto si está tocando el suelo y programa un timer para que no suba infinito.
    // Si termina el timer o se suelta el botón de salto se llamará a playerStopJump()
    playerStartJump() {
        if (this.isPlayerTouchingGround && this.player.body.velocity.y == 0) {
            if (!this.isPlayerAttacking) {

              if(PC){
                this.player.anims.play('einar_jumping');
              }

            }
            this.soundJump.play(this.getAudioConfig());
            this.soundRunning.stop();
            this.player.setVelocityY(this.playerJumpSpeed);
            this.isPlayerJumping = true;
            this.isPlayerTouchingGround = false;
            this.player.body.setAllowGravity(false);
            this.jumpTimer = this.time.addEvent( { delay: this.playerJumpDuration, callback: this.playerStopJump, callbackScope: this, loop: false } );
        } else if (this.doubleJumpAvaliable == true && this.doubleJumpEnabled == true) {
            this.soundJump.play(this.getAudioConfig());
            this.soundRunning.stop();
            this.player.setVelocityY(this.playerJumpSpeed);
            this.doubleJumpAvaliable = false;
            this.isPlayerJumping = true;
            this.isPlayerTouchingGround = false;
            this.player.body.setAllowGravity(false);
            this.jumpTimer = this.time.addEvent( { delay: this.playerJumpDuration, callback: this.playerStopJump, callbackScope: this, loop: false } );
        }
        this.jumpSpeedDecrementTimer = this.time.addEvent( { delay: 60, callback: this.playerDecrementJumpSpeed, callbackScope: this, loop: true } );
    }

    // Disminuye la velocidad del salto progresivamente para hacerlo más realista
    playerDecrementJumpSpeed() {
        this.player.setVelocityY(this.player.body.velocity.y + this.playerJumpSpeedDecrement);
    }

    // Detiene la subida del salto y elimina el timer
    playerStopJump() {
        this.player.body.setAllowGravity(true);
        if (this.jumpTimer != null) {
            this.jumpTimer.remove();
            this.jumpSpeedDecrementTimer.remove();
        }
    }

    // Cambia la variable que almacena si el personaje está saltando.
    // DEBE LLAMARSE SIEMPRE QUE TOQUE UN SUELO (ya lo hacen grupos platforms y ground)
    grounded() {
        if (this.hasArrived != true) {
            if (!this.soundRunning.isPlaying) {
                this.soundRunning.play(this.getAudioConfig());
                this.soundRunning.setLoop(true);
            }
            this.isPlayerJumping = false;
            this.isPlayerTouchingGround = true;
            this.doubleJumpAvaliable = true;
            if (!this.isPlayerAttacking) {
                this.player.anims.play('einar_running', true);
            }
        }
    }

    // moverse a la izquierda
    playerLeft() {
        this.player.setVelocityX(-this.playerMovementSpeed);
        //this.player.anims.play('left', true);
    }

    // moverse a la derecha
    playerRight() {
        if (!this.soundRunning.isPlaying) {
            this.soundRunning.play(this.getAudioConfig());
            this.soundRunning.setLoop(true);
        }
        this.player.setVelocityX(this.playerMovementSpeed);
        this.player.anims.play('einar_running', true);

    }

    // quedarse quieto
    playerStop() {
        this.player.setVelocityX(0);
        //this.player.anims.stop();
    }

    // atacar
    // Crea una hitbox de ataque (si está disponible el ataque) y crea los timers para su actualizado)
    playerAttack() {
        if (this.playerAttackAvaliable == true) {   // Si está disponible el ataque
            this.isPlayerAttacking = true;
            this.player.anims.play('einar_attacking');
            this.soundAttack.play(this.getAudioConfig());
            this.playerAttackAvaliable = false;
            // Crea la hitbox
            let localAttackHitbox = this.attackHitbox.create(this.player.body.x - this.playerHitboxWidth + 25, this.player.body.y, 'bomb');    // Cambiar sprite por 'dot' al importar animacion definitiva
            localAttackHitbox.setVisible(false);
            localAttackHitbox.setOrigin(0);
            localAttackHitbox.setSize(this.playerAttackWidth, this.playerAttackHeight, false);
            localAttackHitbox.body.setAllowGravity(false);
            localAttackHitbox.body.velocity.x = this.player.body.velocity.x + 215;
            //localAttackHitbox.setVisible(false);  // Volver invisible al importar animacion definitiva
            localAttackHitbox.refreshBody();
            // Crea el timer de actualziación
            this.playerAttackTimer = this.time.addEvent( { delay: this.playerAttackRefreshRate, callback: this.playerAttackRefresh, callbackScope: this, loop: true } );
        }
    }

    // Función de actualizado del ataque.
    // A cada this.playerAttackRefreshRate actualiza la posición de la hitbox (ajustándola al personaje) y lo destruye pasado el tiempo this.playerAttackDuration
    playerAttackRefresh() {
        this.playerAttackCounter += this.playerAttackRefreshRate;
        if (this.playerAttackCounter > this.playerAttackDuration) { // Si ha pasado el tiempo máximo destruye el ataque y crea timer para el cooldown.
            this.isPlayerAttacking = false;
            this.attackHitbox.clear(true, true);
            this.playerAttackCounter = 0;
            this.playerAttackTimer.remove();
            this.playerAttackCooldownTimer = this.time.addEvent( { delay: this.playerAttackCooldown, callback: function () { this.playerAttackAvaliable = true; }, callbackScope: this, loop: false } );
        } else {    // Actualiza la posición de la hitbox
            //this.attackHitbox.getChildren()[0].x = this.player.body.x + this.playerHitboxWidth * this.playerResizeFactor;
            this.attackHitbox.getChildren()[0].y = this.player.body.y;
        }
    }

    // El jugador recibe un golpe.
    // Mira si le quedan vidas restantes.
    // En caso afirmativo lo vuelve invulnerable unos segundos y le resta vida
    // En caso contrario game over
    playerHit() {
        if (this.isPlayerInvulnerable == false) {   // si el jugador no es invulnerable
            this.playerHealth--;
            // si está con un escudo comprado, quitarlo
            this.soundDeath.play(this.getAudioConfig());
            if (!this.endlessMode) {
                if (Number(user.buffs[0]) > 0)
                    user.buffs[0] = Number(user.buffs[0]) - 1;
            }
            if (this.playerHealth <= 0) {   // Si no le quedan vidas muere
                this.playerDeath();
            } else {
                this.isPlayerInvulnerable = true;   // lo vuelve invulnerable durante un tiempo
                if (this.playerInvulnerabilityDuration > 1000) {
                    this.player.setTint(0x1CC3FF);
                } else {
                    this.player.setTint(0xe62272);
                }
                this.invulnerabilityTimer = this.time.addEvent( { delay: this.playerInvulnerabilityDuration, callback: function () { this.isPlayerInvulnerable = false; this.player.clearTint() }, callbackScope: this, loop: false } );
                this.healthPointsDisplay[this.playerHealth].destroy();
            }
        }
    }

    // Muere el personaje. Para los sonidos. Llama al menú Game Over. Reinicia el nivel
    playerDeath() {
        this.soundRunning.stop();
        if (this.isPlayerDead == false) {
            this.player.setTint(0xe62272);
            this.isPlayerDead = true;

            this.scene.pause();
            this.scene.start('GameOverMenu');
            this.restartLevel();
        }
    }
    // FIN DE FUNCIONES DE CONTROL DEL PERSONAJE ------------------------


    // FUNCIONES DE GENERACIÓN DE ENEMIGOS/OBSTÁCULOS -------------------
    // FUNCIONES BASE
    // Función de creación de enemigos sin movimiento
    // xPos, yPos: posición en el mapa
    // collisionWidth, collisionHeight: tamaño de la hitbox


    generateStillEnemy(xPos, yPos = this.levelGroundHeight - 20, collisionWidth = 190, collisionHeight = 110) {

      if(PC){
        if (this.hasCicled) {
            yPos += 40;
        }
        xPos += 75;
        let newEnemy = this.enemies.create(xPos, yPos, 'draugr').setOrigin(1).setScale(this.playerResizeFactorPC);
        newEnemy.setSize(collisionWidth, collisionHeight);
        newEnemy.body.setOffset(135, 165);
        newEnemy.depth = 3;
        newEnemy.isStill = true;
        let newTrigger = this.triggers.create(xPos - 250, this.levelGroundHeight, 'dot').setVisible(false).refreshBody();
        newTrigger.body.setSize(500, 500);  // Trigger que hará que el enemigo se mueva cuando entre el personaje en contacto
        newTrigger.associatedEnemy = newEnemy;
        return this.minDistStillEnemy;
      }else{ //ANIMACIONES MOVIL
        if (this.hasCicled) {
            yPos += 40;
        }
        xPos += 75;
        let newEnemy = this.enemies.create(xPos, yPos, 'draugr').setOrigin(1).setScale(0.56);
        newEnemy.setSize(collisionWidth, collisionHeight);
        newEnemy.body.setOffset(135, 165);
        //newEnemy.body.setOffset(75.6, 92.4);
        newEnemy.depth = 3;
        newEnemy.isStill = true;
        let newTrigger = this.triggers.create(xPos - 250, this.levelGroundHeight, 'dot').setVisible(false).refreshBody();
        newTrigger.body.setSize(500, 500);
        //newTrigger.body.setSize(500, 500);  // Trigger que hará que el enemigo se mueva cuando entre el personaje en contacto
        newTrigger.associatedEnemy = newEnemy;
        return this.minDistStillEnemy;
      }

    }

    // Función de creación de enemigos con movimiento al acercarse el jugador EN DESUSO
    // xPos, yPos: posición en el mapa
    // collisionWidth, collisionHeight: tamaño de la hitbox
    // triggerWidth, triggerHeight: tamaño del trigger de movimiento. Si no se pasa toma valor por defecto
    /*generateMovingEnemy(xPos, yPos = -300, collisionWidth = 90, collisionHeight = 120, triggerWidth = 500, triggerHeight = 500) {
      if(PC){
        let newEnemy = this.eagles.create(xPos + 1050, yPos, 'eagle_attacking').setOrigin(0).setScale(0.56);
        newEnemy.anims.play('eagle_attacking');
        newEnemy.body.setAllowGravity(false);
        newEnemy.body.setSize(collisionWidth, collisionHeight);
        newEnemy.setOffset(130, 330);
        newEnemy.isStill = false;
        newEnemy.depth = 5;
        this.cabins[this.cabins.length] = newEnemy;
        let newTrigger = this.triggers.create(xPos - 950, this.levelGroundHeight, 'dot').setVisible(false).refreshBody();
        newTrigger.body.setSize(triggerWidth, triggerHeight);   // Trigger que hará que el enemigo se mueva cuando entre el personaje en contacto
        newTrigger.associatedEnemy = newEnemy;
        return this.minDistMovingEnemy;
      }else{
        return 0;
      }

    }*/

    // Funcion de creación de plataformas
    // xPos, yPos = posiciones x e y. Origen del sprite en el límite inferior derecho.
    // enemy = puede haber un enemigo encima?
    // Si no se otorgan valores se asignan solos. Enemy true y posición aleatoria (dentro de límites)
    // Únicamente cambiar el sprite y el valor de setScale()
    generatePlatform(xPos, yPos = this.platformPositionY + Math.floor(Math.random() * this.platformPositionOffset) - this.platformPositionOffset/2, enemy = true, scaleFactor = 0.5, visible = true, checkCollisionDown = false, cabinPlatform = false) {
        let platformId = '';
        if (this.isIceLevel) {
            platformId = 'platform_ice_halo';
        } else {
            platformId = 'platform_halo';
        }
        let localPlatform = this.platforms.create(xPos, yPos, platformId).setScale(scaleFactor).setOrigin(0).setVisible(visible).setSize(170, 10);
        if (cabinPlatform == true) {
            localPlatform.setOffset(365, 335);
        } else {
            localPlatform.setOffset(365, 335);
        }
        //localPlatform.setOffset(235, 200);
        localPlatform.body.checkCollision.left = false;
        localPlatform.body.checkCollision.right = false;
        localPlatform.body.checkCollision.down = checkCollisionDown;
        let enemyYOffset; // Offset vertical del enemigo (para que caiga en la plataforma debido a los orígenes de las imágenes)
        if (this.endlessMode == false) {
            enemyYOffset = 40;
        } else {
            enemyYOffset = 20;
        }
        if (enemy == true) {    // Generamos enemigo?
            this.generateStillEnemy(xPos + localPlatform.width*scaleFactor/2, yPos - enemyYOffset);
        }
        return this.minDistPlatform;
    }

    // Variante de la anterior, con ningún enemigo
    generatePlatformNoEnemy(xPos, yPos) {
        return this.generatePlatform(xPos, yPos, false);
    }

    // Funciones de creación de trampa de pinchos
    // xPos, yPos = posiciones x e y. Origen del sprite en el límite inferior derecho.
    // Únicamente cambiar el sprite y el valor de setScale()
    generateSpikesTrap(xPos, yPos = this.levelGroundHeight - 46, scaleFactor = 0.75, visible = true, sizeX = 136, sizeY = 10) {
        let localSpikes = this.spikesTraps.create(xPos, yPos, 'spikes').setScale(scaleFactor).setOrigin(0, 0).setSize(sizeX, sizeY).setVisible(visible);
        localSpikes.setOffset(142, 98);
        return this.minDistSpikes;
    }

    // Pinchos de barricada
    /*
    Como proceder para el endlessMode... -> como la primera pasada no se porque siempre se pone la hitbox un poco a la
    izquierda, pues ajustarlo para que en las sigu9ientes esté bien.
    */
    generateBarricade(xPos, yPos = this.levelGroundHeight, scaleFactor = 0.3, visible = true, offsetY = 110) {
        if (this.hasCicled == true) {   // fix modo arcade
            yPos -= 60;
        }
        let localBarricade = this.barricades.create(xPos, yPos, 'barricade').setScale(scaleFactor).setOrigin(1, 1).setVisible(visible).refreshBody();
        localBarricade.body.setSize(180, 180);
        localBarricade.setOffset(40, offsetY);
        return this.minDistBarricade;
    }

    // Tronco de arbol, similar a barricada
    generateTrunk(xPos, yPos = this.levelGroundHeight - 100, scaleFactor = 0.5) {
        let localBarricade = this.barricades.create(xPos, yPos, 'trunk').setScale(scaleFactor).setOrigin(0, 1).refreshBody();
        localBarricade.body.setSize(230, 80);
        localBarricade.setOffset(135, 160);
        localBarricade.depth = 0;
        return this.minDistTrunk;

    }

    // Cabaña
    // Pinta imagen de cabaña y crea 3 plataformas y 1 barricada
    generateCabinUp(xPos, yPos = this.levelGroundHeight + 123, scaleFactor = 0.7, enemies = true) {
        xPos += 300;
        let cabinId1;
        let cabinId2;
        if (this.isIceLevel) {
            cabinId1 = 'cabin_up_ice_1';
            cabinId2 = 'cabin_up_ice_2';
        } else {
            cabinId1 = 'cabin_up_1';
            cabinId2 = 'cabin_up_2';
        }
        let localCabin1 = this.physics.add.image(xPos, yPos, cabinId1).setScale(scaleFactor).setOrigin(0, 1);
        localCabin1.body.setAllowGravity(false);
        localCabin1.depth = 2;
        let localCabin2 = this.physics.add.image(xPos, yPos, cabinId2).setScale(scaleFactor).setOrigin(0, 1);
        localCabin2.body.setAllowGravity(false);
        this.generatePlatform(xPos - 340, 260, enemies && Math.random() >= 0.5);
        this.generatePlatform(xPos + 105, 215, false, 0.35, false, true, true);
        this.generatePlatform(xPos + 305, 215, enemies && Math.random() >= 0.5, 0.35, false, true, true);
        // Fix modo arcade hitbox desplazada

        if (this.endlessMode == true && !this.hasCicled) {
            this.generateBarricade(xPos + 310, this.levelGroundHeight, 0.7, false);
        } else if (this.endlessMode == true && this.hasCicled) {
            this.generateBarricade(xPos + 370, this.levelGroundHeight + 187, 0.7, false);
        } else {
            this.generateBarricade(xPos + 290, undefined, 0.7, false);
        }

        this.cabinHitbox.create(xPos + 310, this.levelGroundHeight, 'spikes').setOrigin(0, 1).setSize(370, 160).setVisible(false);

        this.cabins[this.cabins.length] = localCabin1;   // Almacena referencia para su eliminación
        this.cabins[this.cabins.length] = localCabin2;   // Almacena referencia para su eliminación
        return this.minDistCabin;
    }

    generateCabinUpNoEnemy(xPos,  yPos = this.levelGroundHeight + 123, scaleFactor = 0.7) {
        this.generateCabinUp(xPos, yPos, scaleFactor, false);
        return this.minDistCabin;
    }

    // Cabaña de pasar por dentro
    // Pinta imagen de cabaña y crea 3 plataformas y 1 collider de daño en el tejado
    generateCabinDown(xPos, yPos = this.levelGroundHeight + 123, scaleFactor = 0.7) {
        xPos += 300;
        let cabinId1;
        let cabinId2;
        if (this.isIceLevel) {
            cabinId1 = 'cabin_down_ice_1';
            cabinId2 = 'cabin_down_ice_2';
        } else {
            cabinId1 = 'cabin_down_1';
            cabinId2 = 'cabin_down_2';
        }
        let localCabin1 = this.physics.add.image(xPos, yPos, cabinId1).setScale(scaleFactor).setOrigin(0, 1);
        localCabin1.body.setAllowGravity(false);
        localCabin1.depth = 4;
        let localCabin2 = this.physics.add.image(xPos, yPos, cabinId2).setScale(scaleFactor).setOrigin(0, 1);
        localCabin2.body.setAllowGravity(false);

        // Creamos el techo
        let localPlatform1 = this.platforms.create(xPos + 50, 290, 'platform').setScale(0.5).setOrigin(0).setVisible(false).setSize(250, 10);
        localPlatform1.setOffset(235, 200);
        localPlatform1.body.checkCollision.left = false;
        localPlatform1.body.checkCollision.right = false;
        let localPlatform2 = this.platforms.create(xPos + 330, 290, 'platform').setScale(0.5).setOrigin(0).setVisible(false).setSize(170, 10);
        localPlatform2.setOffset(235, 200);
        localPlatform2.body.checkCollision.left = false;
        localPlatform2.body.checkCollision.right = false;

        // Creamos la hitbox de daño
        this.cabinHitbox.create(xPos + 295, 280, 'spikes').setOrigin(0, 1).setSize(380, 160).setVisible(false);

        // ALmacena referencias para eliminación
        this.cabins[this.cabins.length] = localCabin1;
        this.cabins[this.cabins.length] = localCabin2;
        return this.minDistCabin;
    }

    changeDepth(player, cabinHitbox) {
        if (this.isPlayerTouchingGround) {
            if (cabinHitbox.body.width == 380) {
                this.playerHit();
                player.depth = 5;
            } else if (cabinHitbox.body.width == 370) {
                player.depth = 1;
            }
            this.resetDepthTimer = this.time.addEvent( { delay: 1000, callback: function() { this.player.depth = 3;}, callbackScope: this, loop: false } );    // Aumenta la velocidad y la distancia
        }
    }

    // Moneda
    generateCoin(xPos, yPos = this.levelGroundHeight - 150, scaleFactor = 0.4, highValue = false) {
        let hitboxWidth = 70;
        let hitboxHeight = 70;
        if (highValue) {
            //let localCoin = this.coins.create(xPos, yPos, 'coin_1').setScale(scaleFactor).setTint(0xe62272).refreshBody();
            let localCoin = this.coins.create(xPos, yPos, 'coin_2').setScale(scaleFactor).refreshBody();
            localCoin.body.setSize(hitboxWidth, hitboxHeight);
            localCoin.value = 1;
        } else {
            let localCoin = this.coins.create(xPos, yPos, 'coin_1').setScale(scaleFactor).refreshBody();
            localCoin.body.setSize(hitboxWidth, hitboxHeight);
            localCoin.value = 0;

        }
        return this.minDistCoin;
    }


    // FUNCIONES COMPLEJAS (valores hardcodeados)
    // Plataforma + pinchos (necesario saltar desde la plataforma para no recibir hit)
    generatePlatformToSpikes(xPos, enemy = true, yPos = this.levelGroundHeight - 38, scaleFactor = 0.9) {
        this.generatePlatform(xPos + Math.floor(Math.random() * 155), this.platformPositionY - this.platformPositionOffset/2, enemy);
        let localSpikes = this.spikesTraps.create(xPos - 50, yPos - 15, 'spikes_long').setScale(scaleFactor).setOrigin(0, 0).setSize(450, 10);
        localSpikes.setOffset(317, 105);
        return this.minDistPlatformToSpikes;
    }

    // Genera trampas de pinchos pequeñas y seguidas
    generateSmallSpikes(xPos, enemy = true) {
        let spikesLength = 215;
        let enemyOffset = 175;
        let randomAdd = 0;
        let iteration = 1;
        while (randomAdd < 1) { // Aleatoriamente sigue añadiendo pinchos(cada vez menos probable)
            let localSpikes = this.spikesTraps.create(xPos + spikesLength * iteration, this.levelGroundHeight - 26, 'spikes').setScale(0.375).setOrigin(0, 0).setSize(68, 10);
            localSpikes.setOffset(129, 77);
            randomAdd += Math.random() * 0.65;
            if (enemy == true && iteration%2 != 0) {    // Sie es con enemigo añade enemigo
                this.generateStillEnemy(xPos + spikesLength * iteration + enemyOffset);
            }
            iteration++;
        }
        if (enemy == true) {
            return iteration * spikesLength + spikesLength + 150;
        }
        return iteration * spikesLength + spikesLength;
    }

    // Variante de la anterior sin enemigos
    generateSmallSpikesNoEnemy(xPos) {
        return this.generateSmallSpikes(xPos, false);
    }

    // Genera una plataforma y después una moneda a gran altura, sólo alcanzable desde la plataforma
    generatePlatformToCoin(xPos, enemy = true) {
        let ret = 0;
        ret += this.generatePlatform(xPos, undefined, enemy);
        ret += 200;
        xPos += ret;
        ret += this.generateCoin(xPos, 150);
        return ret;
    }

    generatePlatformToCoinRare(xPos, enemy = true) {
        let ret = 0;
        ret += this.generatePlatform(xPos, undefined, enemy);
        ret += 215;
        xPos += ret;
        ret += this.generateCoin(xPos, 140, undefined, true);
        return ret;
    }

    generatePlatformToCoinNoEnemy(xPos) {
        return this.generatePlatformToCoin(xPos, false);
    }

    // Genera una barricada + plataforma con barricada
    generateDoubleBarricade(xPos) {
        let platformY = this.levelGroundHeight - 260;
        this.generatePlatformNoEnemy(xPos - 190, platformY - 60);
        if (this.endlessMode && this.hasCicled) {
            this.generateBarricade(xPos - 90, this.levelGroundHeight - 60);
            this.generateBarricade(xPos - 90, platformY - 60 - 20, undefined, undefined, 150);
        } else {
            this.generateBarricade(xPos);
            this.generateBarricade(xPos, platformY - 20, undefined, undefined, 150);
        }
        return this.minDistDoubleBarricade;
    }

    // FIN DE FUNCIONES DE GENERACIÓN DE ENEMIGOS/OBSTÁCULOS ------------


    // FUNCIONES DE FLUJO DEL JUEGO -------------------------------------

    showDialog(){

      if((levelIndex < 10) || (levelIndex == 14) || (levelIndex == 15)){

        //set cuervo visible

        if(stringsJSON.Dialogs[levelIndex]!=null){
              this.DialogText.setText(stringsJSON.Dialogs[levelIndex][this.indexText][1]);
              switch (stringsJSON.Dialogs[levelIndex][this.indexText][0]){
                  case 'EINAR':{
                      this.DialogBg.setTexture('backgroundDialogEinar');
                      break;
                  }
                  case 'MUNIN':{
                      this.DialogBg.setTexture('backgroundDialogMunin');
                      break;
                  }
                  case 'HUGIN':{
                      this.DialogBg.setTexture('backgroundDialogHugin');
                      break;
                  }
                  default:{
                      this.DialogBg.setTexture('backgroundDialogHugin');
                      break;
                  }
              }
          }

        else{
               //this.levelCompletedFunc();
          }
      }else{

        switch (levelIndex){
          case 10:
            this.poemSound.play();
            this.Poem1_1.setVisible(true);
            this.PoemVisible = this.Poem1_1;
            break;
          case 11:
            this.poemSound.play();
            this.Poem2_1.setVisible(true);
            this.PoemVisible = this.Poem2_1;
            break;
          case 12:
            this.poemSound.play();
            this.Poem4_1.setVisible(true);
            this.PoemVisible = this.Poem4_1;
            break;
          case 13:
            this.poemSound.play();
            this.Poem4_2.setVisible(true);
            this.PoemVisible = this.Poem4_2;
            break;
          case 16:
            this.poemSound.play();
            this.Poem7_1.setVisible(true);
            this.PoemVisible = this.Poem7_1;
            break;
          case 17:
            this.poemSound.play();
            this.Poem7_2.setVisible(true);
            this.PoemVisible = this.Poem7_2;
            break;

        }
      }
    }

    // Devuelve el jugador al mapa del mundo (al completar el nivel)
    goalArrived() {
        let timeFadeOut=3000;
        this.endLevelCollision.active = false;
        this.player.setAccelerationX(-250);
        this.hasArrived = true;
        this.actualizeMapsCompleted();
        user.money+= levelSettings[DifficultyIndexSubnode(levelIndex)][userConfig.difficulty][3];
        user.map[levelIndex] = true;
        saveUserData();
        try{
            this.tweens.add({
                targets:  musicGameplay,
                volume:   0,
                timeFadeOut: 3000
            });
        }
        catch(error){
            console.log("Imposible get fadeout")
            musicGameplay.stop();
        }
        this.soundRunning.stop();
        this.endTrigger.setVisible(false);
        this.buttonPause.setVisible(false);
        this.Money.setVisible(false);
        this.backgroundMoney.setVisible(false);
        this.buttonPause.setVisible(false);
        this.pauseText.setVisible(false);

        for(let i = 0; i < this.playerHealth; i++) {    // Quita los puntos de vida en el HUD
            this.healthPointsDisplay[i].setVisible(false);
        }


        this.Disable_controls();
        this.time.addEvent({
                delay: timeFadeOut,
                callback: function() {

                /*  if(!PC){
                    pointerJump.setVisible(false);
                    pointerAttack.setVisible(false);
                  }*/

                    this.dialogSound.setLoop(true);
                    this.dialogSound.play();
                    this.DialogShowing=true;

                    if((levelIndex < 10) || (levelIndex == 14) ||(levelIndex == 15) ){
                        this.DialogBg.alpha = 0;
                        this.DialogText.alpha = 0;

                      //  if(PC){

                          this.tweens.add({
                            targets:this.DialogBg,
                            duration: 500,
                            alpha: 1,
                            yoyo: false,
                            hold: 2000,
                            delay: 1100,
                            completeDelay: 2000,
                          });
                          this.tweens.add({
                            targets:this.DialogText,
                            duration: 500,
                            alpha: 1,
                            yoyo: false,
                            hold: 2000,
                            delay: 1100,
                            completeDelay: 2000,
                          });

                          this.time.addEvent({
                            delay: 1100,
                            callback: function() {
                              this.buttonDialog.setVisible(true);
                              this.buttonDialogBOX.alpha = 0.0001;
                            },
                          callbackScope: this
                          }, this);
                      //  }

                    }
                    musicGameplay.stop();
                    this.showDialog();
                    try{
                        this.tweens.add({
                            targets:   this.dialogSound,
                            volume:   userConfig.volumeMusic/10,
                            timeFadeOut: 1500
                        });
                    }
                    catch(error){
                        console.log("Imposible get fadein")
                        this.dialogSound.play();
                    }
                },
                callbackScope: this
        }, this);

    }

    nextDialog(){

      this.clickButtonSound.play();

        if(stringsJSON.Dialogs[levelIndex][++this.indexText] != null){
            this.DialogText.setText(stringsJSON.Dialogs[levelIndex][this.indexText][1]);
            switch (stringsJSON.Dialogs[levelIndex][this.indexText][0]){
                case 'EINAR':{
                    this.DialogBg.setTexture('backgroundDialogEinar');
                    break;
                }
                case 'MUNIN':{
                    this.DialogBg.setTexture('backgroundDialogMunin');
                    break;
                }
                case 'HUGIN':{
                    this.DialogBg.setTexture('backgroundDialogHugin');
                    break;
                }
                default:{
                    this.DialogBg.setTexture('backgroundDialogHugin');
                    break;
                }
            }

        }
        else{
            this.DialogShowing = false;
            this.dialogSound.stop();
            this.levelCompletedFunc();
        }
    }

    // Actualiza los mapas completados y guarda los datos
    levelCompletedFunc() {

        this.soundRunning.stop();   // Para el sonido de los pasos

        if((levelIndex < 10) || (levelIndex == 14) ||(levelIndex == 15) ){
          //this.DialogText.setVisible(false);
          //this.DialogBg.setVisible(false);
          this.buttonDialog.setVisible(false);
          this.buttonDialogBOX.alpha = 0;
          this.buttonDialogSel.setVisible(false);
          //this.raven.setVisible(false);
          this.DialogShowing=false;
          this.raven.alpha = 0;
          this.DialogBg.alpha = 0;
          this.DialogText.alpha = 0;
        }

        else{
          this.clickButtonSound.play();
          this.PoemVisible.setVisible(false);

        }
        this.plugins.stop("rexsoundfadeplugin");
        this.cameras.main.fadeOut(2500, 0, 0, 0);
        this.time.delayedCall(2500, () => {
          this.indexText = 0;
          if (levelIndex == 9){
            world1Completed = true;
            user.world[1] = true;
            this.scene.stop('LevelManager');
            this.scene.start('WinnerMenu');
          }else{
            this.scene.stop('LevelManager');
            this.scene.start('World1Map');
          }
        });


    }

    // Actualiza la variable global de mapas pasados
    actualizeMapsCompleted() {
        user.map[levelIndex] = true;
    }

    // Vuelve al menú de mundo
    returnToWorldMap() {
        this.soundRunning.stop();
        this.scene.stop();
        this.scene.start('World1Map');
    }

    // Carga los datos del fichero de configuración
    loadSettings() {
        // Almacena si es un nivel de hielo o no
        if (DifficultyIndexSubnode(levelIndex) > 4 && arcadeMode == false) {
            this.isIceLevel = true;
        } else {
            this.isIceLevel = false;
        }
        if (arcadeMode == true) {
            this.endlessMode = true;
            let i = 10;
            let l = 0;
            this.lengthMultiplier = levelSettings[i][l][0];
            this.levelWidth = gameWidth * this.lengthMultiplier;
            this.playerMovementSpeed = levelSettings[i][l][1];
            this.minTrapDistance = levelSettings[i][l][2];
            this.goldBase = levelSettings[i][l][3];
        } else {
            this.endlessMode = false;
            let i = DifficultyIndexSubnode(levelIndex);
            let l = userConfig.difficulty;
            this.lengthMultiplier = levelSettings[i][l][0];
            this.levelWidth = gameWidth * this.lengthMultiplier;
            this.playerMovementSpeed = levelSettings[i][l][1];
            this.minTrapDistance = levelSettings[i][l][2];
            this.goldBase = levelSettings[i][l][3];
        }
        //this.playerMovementSpeed = 6000;
    }

    // Reinicia el nivel
    // Resetea las variables del create necesarias ya que no se resetean con this.scene.restart();
    restartLevel() {
        this.isPlayerDead = false;
        this.isPlayerJumping = false;
        this.isPlayerTouchingGround = false;
        this.playerAttackAvaliable = true;
        this.doubleJumpAvaliable = true;
        this.DialogShowing = false;

        //distanceAchieved = 0;
        if (this.jumpTimer != null) {
            this.jumpTimer.remove();
        }
        if (this.playerAttackTimer != null) {
            this.playerAttackTimer.remove();
        }
        if (this.playerAttackCooldownTimer != null) {
            this.playerAttackCooldownTimer.remove();
        }
        if (this.jumpSpeedDecrementTimer != null) {
            this.jumpSpeedDecrementTimer.remove();
        }
        if (this.arcadeIntervalTimer != null) {
            this.arcadeIntervalTimer.remove();
        }

    }

    // Función que se ejecuta repetidamente en el modo arcade, actualiza posición y aumenta velocidad
    arcadeIntervalFunc() {
        distanceAchieved += 5;
        this.playerMovementSpeed += 0.2; //ANTES ESTABA A 0.2
        this.player.body.setVelocityX(this.playerMovementSpeed);
        this.arcadeTrashRecolector.body.setVelocityX(this.playerMovementSpeed);
    }

    // Resetea la posición del jugador (para no crear mapa infinito) y crea nuevas trampas
    arcadeCicle() {
        if (this.hasCicled != true) {   // Actualiza la variable hasCicled para un hotfix
            this.hasCicled = true;
        }

        this.cicleIteration++;
        this.generateGround(200, 'ground');

        this.arcadeCicleCollision.active = false;   // Se ejecuta una única vez

        // Elimina las cabañas no recogidas por el recolector de basura
        this.deleteCabins();

        this.cabins.length = 0;

        this.proceduralGenerator(); // Genera trampas de nuevo
        //this.generateCabinUp(0, undefined, undefined, false);    // Fakea el final con una cabaña

        // Reposiciona al jugador y al recolector de basura y les da velocidad
        this.cameras.main.setBounds(0, 0, this.levelWidth * this.cicleIteration, this.levelHeight);   // Límites cámara

        this.arcadeCicleCollision.active = true;    // Permite de nuevo las colision de reseteo
    }

    deleteCabins() {
        for (let i = 0; i < this.cabins.length; i++) {
            if (this.cabins[i].x < this.player.x - 1200) {
                this.cabins[i].destroy();
                this.cabins.splice(i, 1);
            }
        }
    }

    // FIN DE FUNCIONES DE FLUJO DEL JUEGO ------------------------------

    // OTRAS FUNCIONES --------------------------------------------------
    // Genera suelo para todo el nivel
    // cambiar a la línea comentada para hacerlo invisible
    generateGround(spriteWidth, spriteName) {
        let i = 0;
        for(i = 0; i < this.levelWidth; i += spriteWidth) {
            this.ground.create(i + (this.cicleIteration - 1) * this.levelWidth, this.levelGroundHeight, spriteName).setOrigin(0, 0).setVisible(false).refreshBody();
        }
    }

    // Función que ordena al enemigo moverse cuando se encuentra con el jugador
    enemyStartMotion(player, triggers) {
        if (triggers.associatedEnemy.isStill == false) {
            this.soundEagle.play();
            triggers.associatedEnemy.setVelocityX(this.eagleSpeedX);
            triggers.associatedEnemy.setVelocityY(this.eagleSpeedY);
        } else {
            if (!triggers.associatedEnemy.anims.isPlaying)

            if(PC){
              triggers.associatedEnemy.anims.play('draugr_attacking');
            }

        }
        this.triggers.remove(triggers, true);
    }

    // Destruye al enemigo
    killEnemy(attackHitbox, enemies) {
        this.soundEnemy.play(this.getAudioConfig());
        enemies.setTint(0xe62272);
        enemies.body.enable = false;
        this.time.addEvent( { delay: 100, callback: this.killEnemyInterval, args: [enemies], callbackScope: this, loop: false } );
    }

    killEnemyInterval(enemy) {
        if (enemy.alpha > 0) {
            enemy.alpha -= 0.1;
            this.time.addEvent( { delay: 100, callback: this.killEnemyInterval, args: [enemy], callbackScope: this, loop: false } );
        } else {
            if (enemy.isStil == true) {
                    this.enemies.remove(enemy, true);
            } else {
                    this.eagles.remove(enemy, true);
            }
        }
    }

    // Recoge la moneda
    collectCoin(player, coin) {
        this.soundCoin.play();
        coin.destroy();
        if (coin.value == 0) {
            switch(userConfig.difficulty) {
                case 0:
                    user.money += 2;
                    break;
                case 1:
                    user.money += 4;
                    break;
                case 2:
                    user.money += 6;
                    break;
                default:
            }
        }
        if (coin.value == 1) {
            switch(userConfig.difficulty) {
                case 0:
                    user.money += 20;
                    break;
                case 1:
                    user.money += 40;
                    break;
                case 2:
                    user.money += 60;
                    break;
                default:
            }
        }
        this.Money.setText(user.money);
    }

    // Aplica los efectos de las mejoras
    applyBuffs() {
        if (!this.endlessMode) {
             // Añade escudos
            this.playerHealth += Number(user.buffs[0]);

            // Permite doble salto
            if (Number(user.buffs[2]) == 1) {
                this.doubleJumpEnabled = true;
            } else {
                this.doubleJumpEnabled = false;
            }

            // Aumenta la invulnerabilidad
            if (Number(user.buffs[1]) == 1) {
                this.playerInvulnerabilityDuration = 2000;
            } else {
                this.playerInvulnerabilityDuration = 1000;
            }

            // Reduce el cooldown del ataque
            if (Number(user.buffs[3]) == 1) {
                this.playerAttackCooldown = 160;
            } else {
                this.playerAttackCooldown = 320;
            }
        } else {
            this.doubleJumpEnabled = false;
            this.playerInvulnerabilityDuration = 1000;
            this.playerAttackCooldown = 320;
        }
    }

    // Devuelve la configuración de la reproducción de sonidos
    getAudioConfig() {
        return {
          mute: false,
          volume: userConfig.volumeEffects/10,
          rate: 1,
          detune: 0,
          seek: 0,
          loop: false,
          delay: 0
        };
    }

    // Elimina el segundo objeto de una colisión
    deleteObject(trashrecolector, otherObject) {
        otherObject.destroy();
    }
    // FIN DE OTRAS FUNCIONES -------------------------------------------
    // Da movimiento al fondo
    update (time, delta){
        this.SetTextPos();

       if(!this.DialogShowing){
            this.bg_background.tilePositionX = this.cameras.main.scrollX * .05;
            this.bg_far.tilePositionX = this.cameras.main.scrollX *.25;
            this.bg_medium.tilePositionX = this.cameras.main.scrollX *1;
            this.bg_near.tilePositionX = this.cameras.main.scrollX*1.25;
       }
       if(this.player.x >=300 && !this.following){
            this.following=true;
            this.cameras.main.startFollow(this.player, false, 1, 1, this.cameraOffsetX, 0); // Cámar sigue al personaje
       }
       if(this.player.body.velocity.x<=0){
            this.player.setAccelerationX(0);
            this.player.body.setVelocityX(0);
            this.player.anims.stop(); //Sustituir por iddle si existe
            this.following=false;

            if((levelIndex < 10) || (levelIndex == 14) ||(levelIndex == 15)){

              if(PC){
                this.tweens.add({
                  targets:this.raven,
                  duration: 500,
                  alpha: 1,
                  yoyo: false,
                  hold: 2000,
                  delay: 700,
                  completeDelay: 2000,
                })
              }else{
                this.raven.alpha = 1;
              }

            }


            //console.log("!!!ERROR")
        }

        if (this.player.anims.getCurrentKey() == 'einar_attacking'){
            if (this.player.anims.getProgress() >= 1) {
                if (this.isPlayerTouchingGround) {
                    this.player.anims.play('einar_running');
                }   else {

                  if(PC){
                    this.player.anims.play('einar_jumping');
                  }else{
                    this.player.anims.play('einar_running');
                  }

                }
            }
        }
    }

    PauseGame() {
        //gamePaused = true;
        this.clickButtonSound.play();
        this.soundRunning.stop();
        this.scene.run('PauseMenu');
        this.scene.bringToTop('PauseMenu');
        this.scene.pause();
    }

    Disable_controls(){
        //this.input.enabled = false;
        this.jumpButton.enabled = false;
        this.leftButton.enabled = false;
        this.rightButton.enabled =false;
        this.attackButton.enabled = false;
        this.testButton.enabled = false;
        this.pauseButton.enabled =false;
        this.controls_enable=false;
    }

    Enable_controls(){
        //this.input.enabled = true;
        this.jumpButton.enabled = true;
        this.leftButton.enabled = true;
        this.rightButton.enabled =true;
        this.attackButton.enabled = true;
        this.testButton.enabled = true;
        this.pauseButton.enabled =true;
        this.controls_enable=true;
    }

    SetTextPos() {
        if (!this.endlessMode) {
            if((user.money>0) && (user.money<100)){
                this.Money.x = gameWidth*13/16
            }else if((user.money>=100) && (user.money<1000)){
                this.Money.x = gameWidth*12.9/16
            }else if ((user.money>=1000) && (user.money<10000)){
                this.Money.x = gameWidth*12.8/16
            }else if ((user.money>=10000) && (user.money<100000)){
                this.Money.x = gameWidth*12.7/16
            }else{
                this.Money.x = gameWidth*12.6/16
            }
        }
    }

    showIcons(){

    }

}

// Traduce el nº de nodo con su dificultad para leer los settings en el archivo LevelConfiguration
// Los niveles principales tienen su configuración propia, pero los niveles opcionales no
function DifficultyIndexSubnode(index){

  let indexNode;

  if(index > 9){

  switch (index){

    case 10:
      indexNode = 1;
      break;

    case 11:
      indexNode = 2;
      break;

    case 12:
      indexNode = 4;
      break;

    case 13:
      indexNode = 4;
      break;

    case 14:
      indexNode = 5;
      break;

    case 15:
      indexNode = 5;
      break;

    case 16:
      indexNode = 7;
      break;

    case 17:
      indexNode = 7;
      break;

  }
}else{

    indexNode = index;
  }

  return indexNode


}

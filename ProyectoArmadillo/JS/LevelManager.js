class LevelManager extends Phaser.Scene
{
    constructor ()
    {
        super({key:"LevelManager"});

        // SETTINGS
        // 1) Configuración para JSON
        // Settings personaje
        this.playerMovementSpeed = 550;   // Velocidad de movimiento del personaje
        this.playerHitboxWidth = 95;    // Ancho de la hitbox del personaje
        this.playerHitboxHeight = 210;   // Alto de la hitbox del personaje
        this.playerJumpSpeed = -550;  // Fuerza de salto del personaje
        this.playerJumpDuration = 350;    // Duración máxima de la anulación de gravedad del salto en ms
        this.playerJumpSpeedDecrement = 50; // Efecto de la gravedad sobre los saltos
        this.playerInvulnerabilityDuration = 1000;  // Tiempo de invulnerabilidiad después de recibir un ataque
        this.playerAttackDuration = 300;   // ´Duración del ataque
        this.playerAttackRefreshRate = 30;  // Tasa de refresco de posición de la hitbox del ataque
        this.playerAttackCounter = 0;   // Contador de tiempo del ataque
        this.playerAttackCooldown = 450;   // Cooldown del ataque
        this.playerAttackWidth = 70;    // Ancho de hitbox del ataque
        this.playerAttackHeight = this.playerHitboxHeight * 0.5;   // Alto de hitbox del ataque 0.4 = this.playerResizeFactor
        this.playerHealth = 0;  // Puntos de vida del jugador
        // Settings cámara
        this.cameraOffsetX = -250;  // Offset del seguido del personaje en el eje X
        // Settings enemigos
        this.enemySpeed = -200; // Velocidad de movimiento de los enemigos
        // Settings del generador aleatorio
        this.platformPositionY = 385;   // Posición base en Y de las plataformas
        this.platformPositionOffset = 75;  // Distancia que puede variar la posición de la plataforma
        this.platformMaxHeight = 285;   // Altura máxima de las plataformas
        this.maxRandTrapDistance = 200; // Máximo de distancia entre trampas añadido (250)
        this.minDistStillEnemy = 30;   // Mínimo de distancia tras un enemigo quieto
        this.minDistMovingEnemy = 30;   // Mínimo de distancia tras un enemigo que se mueve
        this.minDistPlatform = 200;   // Mínimo de distancia tras una plataforma
        this.minDistSpikes = 400;   // Mínimo de distancia tras una trampa de pinchos
        this.minDistBarricade = 250;
        this.minDistPlatformToSpikes = 550;
        this.minDistCabin = 1100;
        // La distancia entre trampas final será maxRandTrapDistance(rand) + trapDistance + minDistance

        // 2) CONFIGURACIÓN DEL NIVEL (dependiendo del nivel escogido en el minimapa)
        this.lengthMultiplier = 10; // Multiplicador de amaño de ancho del mapa
        this.minTrapDistance = 200;    // Distancia mínima entre cada trampa
        this.goldBase = 100;    // Oro base que se gana al superar el nivel

        // 2) GENERAL
        this.playerResizeFactor = 0.4;
        this.runnerMode = true; // Controles de runner (salto y ataque)
        this.levelGroundHeight = 470;   // Altura del suelo
        // Settings enerador procedural
        this.levelIntroWidth = 1000; // Longitud al principio del mapa asegurado sin trampas
        this.endEventOffset = 500;  // Distancia desde la última trampa hasta el evento de fin de nivel.
        this.levelEndWidth = 3500;   // Longitud al final del mapa asegurado sin trampas. Debe ser muy grande.
        // PowerUps
        this.doubleJumpEnabled = false;

        // REFERENCIAS
        // Grupos
        this.ground; // Grupo de plataformas colisionables
        this.spikesTraps;   // Grupos de trampas
        this.platforms;    // Grupos de plataformas
        this.solidPlatforms;    // Grupos de plataformas con las que se ha hecho contacto
        this.enemies;   // Grupos de enemigos
        this.triggers;  // Grupos de triggers (colisiones que disparan eventos)
        this.barricades;    // Grupo de barricadas
        // HUD
        this.healthPointsDisplay = new Array();
        // Otros
        this.player;    // Personaje
        this.jumpTimer; // Callback para salto progresivo
        this.playerAttackTimer;   // Temporizador de fin de ataque
        this.jumpSpeedDecrementTimer;   // Temporizador de disminución velocidad salto
        this.attackHitbox;  // Hitbox del ataque
        this.trapFunctionsArray = new Array();  // Array que guarda las funciones de las trampas a generar
        this.endTrigger;    // Trigger del fin del nivel

        // VARIABLES DE INFORMACIÓN
        this.levelHeight = gameHeight;
        this.levelWidth = gameWidth * this.lengthMultiplier;
        this.isPlayerDead = false;
        this.isPlayerJumping = false;
        this.isPlayerTouchingGround = false;
        this.doubleJumpAvaliable = true;
        this.playerAttackAvaliable = true;
        this.isPlayerInvulnerable = false;  // Indica si el jugador es invulnerable

        // INPUT
        // Teclas (no ejecutar si es en móvil)
        this.jumpButton;
        this.leftButton;
        this.rightButton;
        this.attackButton;
        this.testButton;
        this.pauseButton;

        //this.gamePaused = false;

        // DEBUG
        /*
        this.percentagesTest = new Array();
        for (let i = 0; i < 8; i++) {
            this.percentagesTest[i] = 0;
        }
        */
    }

    preload () {
      gamePaused = false;
    }

    create ()
    {
        // Controlador de audio
        // Paramos música menú
        if (musicMenu.isPlaying) {
            musicMenu.stop();
        }
        // Ponemos música gameplay si no está ya
        if (!musicGameplay.isPlaying) {
          musicGameplay.play();
        }

        // Sonidos
        let config = {
          mute: false,
          volume: volumeEffects/10,
          rate: 1,
          detune: 0,
          seek: 0,
          loop: false,
          delay: 0
        };
        this.soundDeath = this.sound.add('player_death', config);
        this.soundRunning = this.sound.add('player_running', config);
        this.soundJump = this.sound.add('player_jump', config);
        this.soundAttack = this.sound.add('player_attack', config);
        this.soundEnemy = this.sound.add('enemy_1', config);

        // Carga de settings de la escena del archivo de configuración
        this.loadSettings();

        // Fix reseteo escena
        this.playerAttackAvaliable = true;
        this.isPlayerInvulnerable = false;
        this.doubleJumpAvaliable = true;

        this.bg_medium = new Array();   // hotfix line
        this.bg_backgorund = this.add.tileSprite(0,0, 5715, 916, 'bg_background');
        this.bg_far = this.add.tileSprite(0,0, 5715, 916, "bg_far");
        //this.bg_medium = this.add.tileSprite(0,0, 5715, 916, "bg_medium");
        // start hotfix
        let iter = 0;
        for (let i = 0; i < this.levelWidth; i = i + 5715 * 0.66) {
            this.bg_medium[iter] = this.add.tileSprite(i, 0, 5715, 916, "bg_medium");
            iter++;
        }
        // end hotfix
        this.bg_near = this.add.tileSprite(0,0, 5715, 916, "bg_near");
        this.bg_near.depth = 2;

        //Creación boton de pausa
        this.pauseButton = this.add.image(60, 40, 'pauseButton');
        this.pauseButton.setScrollFactor(0);
        //this.pauseButton.setDepth(1);
        //this.pauseButton.setScale(2/3);
        this.pauseButton.setInteractive({ useHandCursor: true  } )
    		.on('pointerdown', () => this.PauseGame());


        // PASAR A GLOBAL PARA NO HACERLO DE CADA VEZ
        // Animaciones globales
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        // FIN DE PASAR A GLOBAL PARA NO HACERLO DE CADA VEZ

        // PERSONAJE
        this.player = this.physics.add.sprite(400, 200, 'einar').setOrigin(1).setScale(this.playerResizeFactor).setSize(this.playerHitboxWidth, this.playerHitboxHeight);   // setOrigin(1) IMPORTANTE (calcular colisiones)
        this.player.depth = 1;
        this.endTrigger = this.physics.add.sprite(0, this.levelGroundHeight, 'dot').setSize(50, this.levelHeight);
        this.endTrigger.body.setAllowGravity(false);
        //this.player = this.physics.add.sprite(400, 200, 'einar').setOrigin(1);   // setOrigin(1) IMPORTANTE (calcular colisiones)
        // Dependiendo de la dificultad escogida asignamos nº vidas
        switch (difficulty) {
            case 0:
                this.playerHealth = 1;
                break;
            case 1:
                this.playerHealth = 3;
                break;
            case 2:
                this.playerHealth = 5;
                break;
        }
        // Aplica los efectos de las mejoras
        this.applyBuffs();

        // FÍSICAS
        this.physics.world.setBounds(0, 0, this.levelWidth, this.levelHeight);  // Tamaño del nivel
        this.ground = this.physics.add.staticGroup();    // Grupo de plataformas colisionables
        this.spikesTraps = this.physics.add.staticGroup();  // Grupo de trampas de pinchos
        this.platforms = this.physics.add.staticGroup();    // Grupo de plataformas
        this.solidPlatforms = this.physics.add.staticGroup();   // Grupo de plataformas con las que se ha hecho contacto
        this.enemies = this.physics.add.group();  // Grupo de enemigos
        this.triggers = this.physics.add.staticGroup();   // Grupo de triggers
        this.barricades = this.physics.add.group(); // Grupo de barricadas

        this.attackHitbox = this.physics.add.group(); // Grupo de hitbox del personaje
        this.generateGround(200, 'ground'); // Genera suelo para todo el nivel
        this.player.setCollideWorldBounds(false);    // No puede salir de los límites del mapa
        this.physics.add.collider(this.player, this.ground, this.grounded, null, this); // Permitimos colisiones entre suelo y jugador y cuenta como grounded (puede saltar)
        this.physics.add.collider(this.player, this.spikesTraps, () => this.playerHit()); // Función que se ejecuta al colisionar con spikes
        this.physics.add.overlap(this.player, this.barricades, () => this.playerHit());    // Al hacer overlap con barricadas
        this.physics.add.collider(this.barricades, this.ground);    // barricadas chocan con el suelo
        this.physics.add.collider(this.player, this.platforms, this.grounded, null, this);  // Permitimos colision es entre plataforms y jugador y cuenta como grounded (puede saltar)
        this.physics.add.overlap(this.player, this.enemies, () => this.playerHit()); // Llama a playerDeath si colisiona con enemigo
        this.physics.add.overlap(this.attackHitbox, this.enemies, this.killEnemy, null, this);  // LLama a killEnemy cuando la hitbox impacte con un enemigo
        this.physics.add.collider(this.enemies, this.platforms);    // Enemigos colisionan con el suelo
        this.physics.add.collider(this.enemies, this.ground);   // Enemigos colisionan con plataformas
        this.physics.add.overlap(this.player, this.triggers, this.enemyStartMotion, null, this);    // Función que se llama al entrar el jugador en el área de visión del enemigo
        this.physics.add.collider(this.player, this.endTrigger, this.endText, null, this);   // Genera el texto de fin del nivel

        // CÁMARA
        this.cameras.main.setBounds(0, 0, this.levelWidth, this.levelHeight);   // Límites cámara
        this.cameras.main.startFollow(this.player, false, 1, 1, this.cameraOffsetX, 0); // Cámar sigue al personaje

        // HUD
        this.healthIconOffset = 30;
        for(let i = 0; i < this.playerHealth; i++) {
            this.healthPointsDisplay[i] = this.add.image(1270 - this.healthIconOffset * (1 + i), + this.healthIconOffset, 'bomb');
            this.healthPointsDisplay[i].setScrollFactor(0);
            this.healthPointsDisplay[i].depth = 10;
        }

        // GENERACIÓN PROCEDURAL
        this.generateTrapArray();   // Genera el array de las trampas disponibles en este mapa
        this.proceduralGenerator(); // Genera el mapa

        // CONTROLES
        // PC
        this.jumpButton = this.input.keyboard.addKey(controls.up);
        this.leftButton = this.input.keyboard.addKey(controls.left);
        this.rightButton = this.input.keyboard.addKey(controls.right);
        this.attackButton = this.input.keyboard.addKey(controls.attack);
        this.testButton = this.input.keyboard.addKey(controls.test); // Eliminar en versión final
        this.pauseButton = this.input.keyboard.addKey(controls.pause);


        // Reiniciamos eventos
        this.jumpButton.off('down');
        this.jumpButton.off('up');
        this.attackButton.off('down');
        this.testButton.off('down');  // Eliminar en versión final

        // Modo endless runner
        if (this.runnerMode == true) {
            this.jumpButton.on('down', this.playerStartJump, this);
            this.jumpButton.on('up', this.playerStopJump, this);
            this.attackButton.on('down', this.playerAttack, this);
            this.playerRight();
            this.testButton.on('down', this.levelCompletedFunc, this);  // Eliminar en versión final
        } else {    // Modo control izq/der
            this.jumpButton.on('down', this.playerStartJump, this);
            this.jumpButton.on('up', this.playerStopJump, this);
            this.leftButton.on('down', this.playerLeft, this);
            this.leftButton.on('up', this.playerStop,this);
            this.attackButton.on('down', this.playerAttack, this);
            this.rightButton.on('down', this.playerRight, this);
            this.rightButton.on('up',  this.playerStop,this);
            this.testButton.on('down', this.levelCompletedFunc, this);  // Eliminar en versión final
        }

        // Móvil
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            console.log('Esto es un dispositivo móvil');
        }

        //Para movil:
        this.input.addPointer(2);

        var pointerJump = this.add.image(10, 10, 'dude').setInteractive(); //Hace la imagen interactuable
        var pointerAttack = this.add.image(500, 10, 'dude').setInteractive();
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

        this.bg_backgorund.setOrigin(0,0);
        this.bg_far.setOrigin(0,0);
        //this.bg_medium.setOrigin(0,0);
        this.bg_near.setOrigin(0,0);
        this.bg_backgorund.setScrollFactor(0);
        this.bg_far.setScrollFactor(0);
        //this.bg_medium.setScrollFactor(1);
        this.bg_near.setScrollFactor(0);
        this.bg_backgorund.setScale(0.66);
        this.bg_far.setScale(0.66);
        //this.bg_medium.setScale(0.66);
        this.bg_near.setScale(0.7);
        // start hotfix
        for (let i = 0; i < this.bg_medium.length; i++) {
            this.bg_medium[i].setOrigin(0, 0);
            this.bg_medium[i].setScrollFactor(1);
            this.bg_medium[i].setScale(0.66);
        }
        // end hotfix

        // TESTEO

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
        let xPointer = 0;   // Cursor de ancho de mapa
        xPointer += this.levelIntroWidth;   // Avanzamos el cursor una distancia inicial sin trampas
        let addedDistance;  // Almacena la distancia entre trampas a añadir en cada iter
        // Mientras quede espacio de mapa
        while (xPointer < this.levelWidth - this.levelEndWidth - 200) { // 200 extra por si un enemigo cae justo en el límite
            // Genera una trampa aleatoria del pool de trampas y almacena su distancia mínima entre trampas
            addedDistance = this.generateRandomTrap(xPointer);
            // Aumenta espacio (derivado de la configuració ndel mapa y del random)
            addedDistance += this.minTrapDistance + Math.floor(Math.random() * this.maxRandTrapDistance);
            xPointer += addedDistance;
        }
        this.endTrigger.x = xPointer + this.endEventOffset;
        //console.log(this.percentagesTest);
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
        for (let i = 0; i < levelTrapValues[levelIndex].length; i++) {
            maxValue += levelTrapValues[levelIndex][i][1];
        }
        let trapIndex = Math.floor(Math.random() * maxValue);
        let pointer = levelTrapValues[levelIndex].length;
        while (trapIndex >= 0 && pointer > 0) {
            pointer--;
            trapIndex -= levelTrapValues[levelIndex][pointer][1];
        }
        //this.percentagesTest[pointer]++;
        return levelTrapValues[levelIndex][pointer][0];
    }

    // Genera el array con las trampas disponibles del mapa
    // TRAMPAS DISPONIBLES DEPENDIENTES DEL NIVEL POR IMPLEMENTAR
    generateTrapArray() {
        let trapFunctionsNames = [ 'this.generateSpikesTrap', 'this.generatePlatformNoEnemy', 'this.generateStillEnemy',
                                'this.generatePlatform', 'this.generateMovingEnemy', 'this.generatePlatformToSpikes',
                                'this.generateSmallSpikesNoEnemy', 'this.generateSmallSpikes', 'this.generateBarricade',
                                'this.generateTrunk', 'this.generateCabinUp' ];
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
            this.soundJump.play();
            this.player.setVelocityY(this.playerJumpSpeed);
            this.isPlayerJumping = true;
            this.isPlayerTouchingGround = false;
            this.player.body.setAllowGravity(false);
            this.jumpTimer = this.time.addEvent( { delay: this.playerJumpDuration, callback: this.playerStopJump, callbackScope: this, loop: false } );
        } else if (this.doubleJumpAvaliable == true && this.doubleJumpEnabled == true) {
            this.soundJump.play();
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
        this.isPlayerJumping = false;
        this.isPlayerTouchingGround = true;
        this.doubleJumpAvaliable = true;
    }

    // moverse a la izquierda
    playerLeft() {
        this.player.setVelocityX(-this.playerMovementSpeed);
        //this.player.anims.play('left', true);
    }

    // moverse a la derecha
    playerRight() {
        this.soundRunning.play();
        this.soundRunning.setLoop(true);
        this.player.setVelocityX(this.playerMovementSpeed);
        //this.player.anims.play('right', true);

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
            this.soundAttack.play();
            this.playerAttackAvaliable = false;
            // Crea la hitbox
            let localAttackHitbox = this.attackHitbox.create(this.player.body.x, this.player.body.y, 'bomb');    // Cambiar sprite por 'dot' al importar animacion definitiva
            localAttackHitbox.setOrigin(0);
            localAttackHitbox.setSize(this.playerAttackWidth, this.playerAttackHeight, false);
            localAttackHitbox.body.setAllowGravity(false);
            localAttackHitbox.body.velocity.x = this.player.body.velocity.x;
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
            this.attackHitbox.clear(true, true);
            this.playerAttackCounter = 0;
            this.playerAttackTimer.remove();
            this.playerAttackCooldownTimer = this.time.addEvent( { delay: this.playerAttackCooldown, callback: function () { this.playerAttackAvaliable = true }, callbackScope: this, loop: false } );
        } else {    // Actualiza la posición de la hitbox
            this.attackHitbox.getChildren()[0].x = this.player.body.x + this.playerHitboxWidth * this.playerResizeFactor;
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
            this.soundDeath.play();
            if (Number(user.buffs[0]) > 0)
                user.buffs[0] = Number(user.buffs[0]) - 1;
            if (this.playerHealth <= 0) {   // Si no le quedan vidas muere
                this.playerDeath();
            } else {
                this.isPlayerInvulnerable = true;   // lo vuelve invulnerable durante un tiempo
                this.player.setTint(0xe62272);
                this.invulnerabilityTimer = this.time.addEvent( { delay: this.playerInvulnerabilityDuration, callback: function () { this.isPlayerInvulnerable = false; this.player.clearTint() }, callbackScope: this, loop: false } );
                this.healthPointsDisplay[this.playerHealth].destroy();
            }
        }
    }

    // Reinicia el nivel
    playerDeath() {

        /*
        //Guardar información del jugador
        user.map[0] = true;
        user.money=0;
        localStorage.setItem("UserMap", user.map);
        localStorage.setItem("UserMoney", user.money);
        */
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
    generateStillEnemy(xPos, yPos = this.levelGroundHeight - 60, collisionWidth = 40, collisionHeight = 60) {
        let newEnemy = this.enemies.create(xPos, yPos, 'dude').setOrigin(1).setTint(0xe62272).refreshBody();
        newEnemy.body.setSize(collisionWidth, collisionHeight);
        return this.minDistStillEnemy;
    }

    // Función de creación de enemigos con movimiento al acercarse el jugador
    // xPos, yPos: posición en el mapa
    // collisionWidth, collisionHeight: tamaño de la hitbox
    // triggerWidth, triggerHeight: tamaño del trigger de movimiento. Si no se pasa toma valor por defecto
    generateMovingEnemy(xPos, yPos = this.levelGroundHeight - 60, collisionWidth = 40, collisionHeight = 60, triggerWidth = 500, triggerHeight = 500) {
        let newEnemy = this.enemies.create(xPos, yPos, 'dude').setOrigin(1).setTint(0x00ff38).refreshBody();
        newEnemy.body.setSize(collisionWidth, collisionHeight);
        let newTrigger = this.triggers.create(xPos, yPos, 'dot').setVisible(false).refreshBody();
        newTrigger.body.setSize(triggerWidth, triggerHeight);
        newTrigger.associatedEnemy = newEnemy;
        return this.minDistMovingEnemy;
    }

    // Funcion de creación de plataformas
    // xPos, yPos = posiciones x e y. Origen del sprite en el límite inferior derecho.
    // enemy = puede haber un enemigo encima?
    // Si no se otorgan valores se asignan solos. Enemy true y posición aleatoria (dentro de límites)
    // Únicamente cambiar el sprite y el valor de setScale()
    generatePlatform(xPos, yPos = this.platformPositionY + Math.floor(Math.random() * this.platformPositionOffset) - this.platformPositionOffset/2, enemy = true, scaleFactor = 0.4, visible = true) {
        let localPlatform = this.platforms.create(xPos, yPos, 'ground').setScale(scaleFactor).setOrigin(0, 0).setTint(0x00ff38).setVisible(visible).refreshBody();
        localPlatform.body.checkCollision.left = false;
        localPlatform.body.checkCollision.right = false;
        localPlatform.body.checkCollision.down = false;
        let enemyYOffset = 200; // Offset vertical del enemigo (para que caiga en la plataforma debido a los orígenes de las imágenes)
        if (Math.random() < 0.5 && enemy == true) {    // Generamos enemigo?
            this.generateStillEnemy(xPos + localPlatform.width*scaleFactor/2, yPos - enemyYOffset);
        }
        return this.minDistPlatform;
    }

    // Variante de la anterior, con ningún enemigo
    generatePlatformNoEnemy(xPos) {
        return this.generatePlatform(xPos, undefined, false);
    }

    // Funciones de creación de trampa de pinchos
    // xPos, yPos = posiciones x e y. Origen del sprite en el límite inferior derecho.
    // Únicamente cambiar el sprite y el valor de setScale()
    generateSpikesTrap(xPos, yPos = this.levelGroundHeight - 1, scaleFactor = 0.5) {
        this.spikesTraps.create(xPos, yPos, 'ground').setScale(scaleFactor).setOrigin(0, 0).setTint(0xe62272).refreshBody();
        return this.minDistSpikes;
    }

    // Pinchos de barricada
    generateBarricade(xPos, yPos = this.levelGroundHeight, scaleFactor = 0.3, visible = true) {
        let localBarricade = this.barricades.create(xPos, yPos, 'barricade').setScale(scaleFactor).setOrigin(1, 1).setVisible(visible).refreshBody();
        localBarricade.body.setSize(180, 180);
        localBarricade.setOffset(40, 150);
        return this.minDistBarricade;
    }

    // Tronco de arbol
    generateTrunk(xPos, yPos = this.levelGroundHeight, scaleFactor = 0.5) {
        let localBarricade = this.barricades.create(xPos, yPos, 'trunk').setScale(scaleFactor).setOrigin(0, 1).refreshBody();
        localBarricade.body.setSize(230, 80);
        localBarricade.setOffset(90, 240);
        localBarricade.depth = 0;
        return this.minDistBarricade;

    }

    // Cabaña
    generateCabinUp(xPos, yPos = this.levelGroundHeight + 145, scaleFactor = 0.7) {
        xPos += 300;
        let localCabin = this.physics.add.image(xPos, yPos, 'cabin_up').setScale(scaleFactor).setOrigin(0, 1);
        localCabin.body.setAllowGravity(false);
        this.generatePlatform(xPos - 250, 360, false);
        this.generatePlatform(xPos + 165, 317, true, 0.35, false);
        this.generatePlatform(xPos + 395, 317, true, 0.35, false);
        this.generateBarricade(xPos + 290, undefined, 0.7, false);
        return this.minDistCabin;
    }



    // FUNCIONES COMPLEJAS (valores hardcodeados)
    // Plataforma + pinchos (necesario saltar desde la plataforma para no recibir hit)
    generatePlatformToSpikes(xPos, enemy = true) {
        this.generatePlatform(xPos + Math.floor(Math.random() * 170), this.platformPositionY - this.platformPositionOffset/2, enemy);
        this.generateSpikesTrap(xPos);
        this.generateSpikesTrap(xPos + 200);
        this.generateSpikesTrap(xPos + 300);
        return this.minDistPlatformToSpikes;
    }

    // Genera trampas de pinchos pequeñas y seguidas
    generateSmallSpikes(xPos, enemy = true) {
        let spikesLength = 220;
        let enemyOffset = 175;
        this.generateSpikesTrap(xPos, undefined, 0.2);
        let randomAdd = 0;
        let iteration = 1;
        while (randomAdd < 1) {
            this.generateSpikesTrap(xPos + spikesLength * iteration, undefined, 0.2);
            randomAdd += Math.random() * 0.65;
            if (enemy == true && iteration%2 != 0) {
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

    // FIN DE FUNCIONES DE GENERACIÓN DE ENEMIGOS/OBSTÁCULOS ------------


    // FUNCIONES DE FLUJO DEL JUEGO -------------------------------------
    // Devuelve el jugador al mapa del mundo (al completar el nivel)
    endText() {
        /*
        Aquí va el código de parar el personaje, imprimir el texto (derivado de levelIndex e importado de un JSON), pasarlo con buttonJump o buttonAttack
        */
        console.log("te pasaste el level");
        this.levelCompletedFunc();
    }

    levelCompletedFunc() {
        this.actualizeMapsCompleted();
        console.log("Pasaste el nivel" + levelIndex);
        //levelIndex ++;
        user.map[levelIndex] = true;
        saveUserData();
        //this.returnToWorldMap();
        this.scene.stop('LevelManager');
        this.scene.start('WinnerMenu');
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
        let i = levelIndex;
        let l = difficulty;
        this.lengthMultiplier = levelSettings[i][l][0];
        this.levelWidth = gameWidth * this.lengthMultiplier;
        this.playerMovementSpeed = levelSettings[i][l][1];
        this.minTrapDistance = levelSettings[i][l][2];
        this.goldBase = levelSettings[i][l][3];
    }

    // Aplica los efectos de las mejoras
    applyBuffs() {
        // Añade escudos
        this.playerHealth += Number(user.buffs[0]);
        if (Number(user.buffs[1]) == 1)
            this.doubleJumpEnabled = true;
        if (Number(user.buffs[2]) == 1) {
            this.playerInvulnerabilityDuration = 2000;
        } else {
            this.playerInvulnerabilityDuration = 1000;
        }

    }
    // FIN DE FUNCIONES DE FLUJO DEL JUEGO ------------------------------

    // OTRAS FUNCIONES --------------------------------------------------
    // Genera suelo para todo el nivel
    // cambiar a la línea comentada para hacerlo invisible
    generateGround(spriteWidth, spriteName) {
        let i = 0;
        for(i = 0; i < this.levelWidth; i += spriteWidth) {
            this.ground.create(i, this.levelGroundHeight, spriteName).setOrigin(0, 0).setVisible(false).refreshBody();
            //this.ground.create(i, this.levelGroundHeight, spriteName).setOrigin(0, 0).setVisible(false).refreshBody();
        }
    }

    // Función que ordena al enemigo moverse cuando se encuentra con el jugador
    enemyStartMotion(player, triggers) {
        triggers.associatedEnemy.setVelocityX(this.enemySpeed);
    }

    // Destruye al enemigo
    killEnemy(attackHitbox, enemies) {
        this.soundEnemy.play();
        this.enemies.remove(enemies, true); // Elimina el enemigo de la lista y del juego
    }

    // Reinicia el nivel
    // Resetea las variables del create necesarias ya que no se resetean con this.scene.restart();
    restartLevel() {
        this.isPlayerDead = false;
        this.isPlayerJumping = false;
        this.isPlayerTouchingGround = false;
        this.playerAttackAvaliable = true;
        this.doubleJumpAvaliable = true;
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
        //this.scene.stop();
        //this.scene.restart();
    }
    // FIN DE OTRAS FUNCIONES -------------------------------------------

    update (time, delta){
        //Fondo dinámico
        this.bg_backgorund.tilePositionX = this.cameras.main.scrollX * .1;
        this.bg_far.tilePositionX = this.cameras.main.scrollX *.1;
        //this.bg_medium.tilePositionX = this.cameras.main.scrollX * .5;
        //this.bg_medium.tilePositionX = this.cameras.main.scrollX;
        this.bg_near.tilePositionX = this.cameras.main.scrollX;
        /*
        if (this.pauseButton.isDown && !gamePaused) {
          console.log('xd');
          this.scene.run('PauseMenu');
          this.scene.bringToTop('PauseMenu');
          this.scene.pause();
          gamePaused = true;
        }
        */
    }

    }

    PauseGame(){
      console.log('HOLA');
      this.scene.run('PauseMenu');
      this.scene.bringToTop('PauseMenu');
      this.scene.pause();
      //gamePaused = true;
    }
}

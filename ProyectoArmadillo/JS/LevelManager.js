class LevelManager extends Phaser.Scene
{
    constructor ()
    {
        super({key:"LevelManager"});

        // SETTINGS
        // 1) Configuración para JSON
        // Settings personaje
        this.playerMovementSpeed = 600;   // Velocidad de movimiento del personaje
        this.playerHitboxWidth = 95;    // Ancho de la hitbox del personaje
        this.playerHitboxHeight = 210;   // Alto de la hitbox del personaje
        this.playerJumpSpeed = -500;  // Fuerza de salto del personaje
        this.playerJumpDuration = 400;    // Duración máxima de la anulación de gravedad del salto en ms
        this.playerAttackDuration = 1000;   // ´Duración del ataque
        this.playerAttackRefreshRate = 35;  // Tasa de refresco de posición de la hitbox del ataque
        this.playerAttackCounter = 0;   // Contador de tiempo del ataque
        this.playerAttackCooldown = 1000;   // Cooldown del ataque
        this.playerAttackWidth = 50;    // Ancho de hitbox del ataque
        this.playerAttackHeight = 50;   // Alto de hitbox del ataque
        // Settings cámara
        this.cameraOffsetX = -250;  // Offset del seguido del personaje en el eje X
        // Settings enemigos
        this.enemySpeed = -200; // Velocidad de movimiento de los enemigos
        // Settings del generador aleatorio
        this.platformPositionY = 300;
        this.maxRandTrapDistance = 250; // Máximo de distancia entre trampas añadido
        this.minDistStillEnemy = 200;   // Mínimo de distancia tras un enemigo quieto
        this.minDistMovingEnemy = 50;   // Mínimo de distancia tras un enemigo que se mueve
        this.minDistPlatform = 0;   // Mínimo de distancia tras una plataforma
        this.minDistSpikes = 100;   // Mínimo de distancia tras una trampa de pinchos
        // La distancia entre trampas final será maxRandTrapDistance(rand) + trapDistance + minDistance

        // 2) CONFIGURACIÓN DEL NIVEL (dependiendo del nivel escogido en el minimapa)
        this.lengthMultiplier = 10; // Multiplicador de amaño de ancho del mapa
        this.minTrapDistance = 200;    // Distancia mínima entre cada trampa

        // 2) GENERAL
        this.playerResizeFactor = 0.4;
        this.runnerMode = true; // Controles de runner (salto y ataque)
        this.levelGroundHeight = 470;   // Altura del suelo
        // Temporales (testeo)
        this.platformScaleFactor = 0.4; // Factor de escalado de las plataformas. 1 para no hacer escalado
        // Settings enerador procedural
        this.levelIntroWidth = 1000; // Longitud al principio del mapa asegurado sin trampas
        this.levelEndWidth = 600;   // Longitud al final del mapa asegurado sin trampas

        // REFERENCIAS
        // Grupos
        this.ground; // Grupo de plataformas colisionables
        this.spikesTraps;   // Grupos de trampas
        this.platforms;    // Grupos de plataformas
        this.solidPlatforms;    // Grupos de plataformas con las que se ha hecho contacto
        this.enemies;   // Grupos de enemigos
        this.triggers;  // Grupos de triggers (colisiones que disparan eventos)
        // Otros
        this.player;    // Personaje
        this.jumpTimer; // Callback para salto progresivo
        this.playerAttackTimer;   // Temporizador de fin de ataque
        this.attackHitbox;  // Hitbox del ataque
        this.trapFunctionsArray = new Array();  // Array que guarda las funciones de las trampas a generar
        this.endTrigger;    // Trigger del fin del nivel

        // VARIABLES DE INFORMACIÓN
        this.levelHeight = gameHeight;
        this.levelWidth = gameWidth * this.lengthMultiplier;
        this.isPlayerDead = false;
        this.isPlayerJumping = false;
        this.isPlayerTouchingGround = false;
        this.playerAttackAvaliable = true;

        // INPUT
        // Teclas (no ejecutar si es en móvil)
        this.jumpButton;
        this.leftButton;
        this.rightButton;
        this.attackButton;
        this.testButton;
    }

    preload () {
        // PASAR A GLOBAL PARA NO HACERLO DE CADA VEZ
        this.load.spritesheet('dude', 'ASSETS/Placeholders/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('ground', 'ASSETS/Placeholders/platform.png');
        this.load.image('dot', 'ASSETS/Placeholders/star.png');
        this.load.image('bomb', 'ASSETS/Placeholders/bomb.png');
        this.load.image('bg_far', 'ASSETS/Secciones/Zona lejana.png');
        this.load.image('bg_medium' , 'ASSETS/Secciones/Zona media.png');
        this.load.image('bg_near' , 'ASSETS/Secciones/Zona delantera.png');
        this.load.image('bg_background', 'ASSETS/Secciones/Fondo.png');
        this.load.image('einar', 'ASSETS/Gameplay/einar_provisional.png');
        // FIN DE PASAR A GLOBAL PARA NO HACERLO DE CADA VEZ
        //BACKGROUND

    }

    create ()
    {
        this.bg_backgorund = this.add.tileSprite(0,0, 5715, 916, 'bg_background');
        this.bg_far = this.add.tileSprite(0,0, 5715, 916, "bg_far");
        this.bg_medium = this.add.tileSprite(0,0, 5715, 916, "bg_medium");
        this.bg_near = this.add.tileSprite(0,0, 5715, 916, "bg_near");

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
        //this.player = this.physics.add.sprite(400, 200, 'einar').setOrigin(1);   // setOrigin(1) IMPORTANTE (calcular colisiones)
        this.endTrigger = this.physics.add.sprite(this.levelWidth - this.levelEndWidth/2, this.levelGroundHeight, 'dot').setSize(50, this.levelHeight);
        this.endTrigger.body.setAllowGravity(false);

        // FÍSICAS
        this.physics.world.setBounds(0, 0, this.levelWidth, this.levelHeight);  // Tamaño del nivel
        this.ground = this.physics.add.staticGroup();    // Grupo de plataformas colisionables
        this.spikesTraps = this.physics.add.staticGroup();  // Grupo de trampas de pinchos
        this.platforms = this.physics.add.staticGroup();    // Grupo de plataformas
        this.solidPlatforms = this.physics.add.staticGroup();   // Grupo de plataformas con las que se ha hecho contacto
        this.enemies = this.physics.add.group();  // Grupo de enemigos
        this.triggers = this.physics.add.staticGroup();   // Grupo de triggers

        this.attackHitbox = this.physics.add.group(); // Grupo de hitbox del personaje
        this.generateGround(200, 'ground'); // Genera suelo para todo el nivel
        this.player.setCollideWorldBounds(true);    // No puede salir de los límites del mapa
        this.physics.add.collider(this.player, this.ground, this.grounded, null, this); // Permitimos colisiones entre grupo de plataformas y jugador
        this.physics.add.collider(this.player, this.spikesTraps, () => this.playerDeath()); // Función que se ejecuta al colisionar con spikes
        this.physics.add.overlap(this.player, this.platforms, this.platformOverlap, null, this);    // Función que calcula si ha chocado desde arriba o desde abajo
        this.physics.add.collider(this.player, this.solidPlatforms, this.grounded, null, this);    // Una vez colisionado la plataforma desde arriba, volverla sólida
        this.physics.add.overlap(this.player, this.enemies, () => this.playerDeath()); // Llama a playerDeath si colisiona con enemigo
        this.physics.add.overlap(this.attackHitbox, this.enemies, this.killEnemy, null, this);  // LLama a killEnemy cuando la hitbox impacte con un enemigo
        this.physics.add.collider(this.enemies, this.platforms);    // Enemigos colisionan con el suelo
        this.physics.add.collider(this.enemies, this.ground);   // Enemigos colisionan con plataformas
        this.physics.add.overlap(this.player, this.triggers, this.enemyStartMotion, null, this);    // Función que se llama al entrar el jugador en el área de visión del enemigo
        this.physics.add.collider(this.player, this.endTrigger, this.endText, null, this);   // Genera el texto de fin del nivel

        // CÁMARA
        this.cameras.main.setBounds(0, 0, this.levelWidth, this.levelHeight);   // Límites cámara
        this.cameras.main.startFollow(this.player, false, 1, 1, this.cameraOffsetX, 0); // Cámar sigue al personaje

        /*  TESTEO
        // Generamos obstáculos de testeo
        this.generateSpikesTrap(400, 567);
        // Generamos plataforma de testeo
        this.generatePlatform(390, 480);
        // Generamos enemigo de testeo
        this.generateStillEnemy(900, 500, 40, 60);
        // Generamos enemogio con movimiento de testeo
        this.generateMovingEnemy(1000, 500, 40, 60);
        */

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
        }

        // Móvil
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            console.log('Esto es un dispositivo móvil');
        }

        //Para movil:
        this.input.addPointer(2);

        var pointerJump = this.add.image(10, 10, 'dude').setInteractive();
        var pointerAttack = this.add.image(500, 10, 'dude').setInteractive();
        // setSize() cambia el tamaño de la hitbox
        // setScrollFactor(0) creo que lo para siempre en frente a la camara
        // setVisible(false) lo hace invisible pero no se si lo hace también inactivo, si no probar a cambiar alpha
        //var pointerJump = this.add.image(gameWidth/4, gameHeight/2, 'dude').setInteractive().setSize(gameWidth/2, gameHeight/2).setScrollFactor(0);
        //var pointerAttack = this.add.image(gameWidth*3/4, gameHeight/2, 'dude').setInteractive().setSize(gameWidth/2, gameHeight/2).setScrollFactor(0);

        this.input.on('gameobjectdown',function (pointer) {

            if(pointerJump.getBounds().contains(pointer.downX, pointer.downY)){
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
                this.playerStop();
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
        this.bg_medium.setOrigin(0,0);
        this.bg_near.setOrigin(0,0);
        this.bg_backgorund.setScrollFactor(0);
        this.bg_far.setScrollFactor(0);
        this.bg_medium.setScrollFactor(0);
        this.bg_near.setScrollFactor(0);
        this.bg_backgorund.setScale(0.66);
        this.bg_far.setScale(0.66);
        this.bg_medium.setScale(0.66);
        this.bg_near.setScale(0.7);

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
    }

    // Llama a una función aleatoria del array de trampas disponibles y le pasa x e y como parámetros
    generateRandomTrap(xPos) {

        return eval(this.trapFunctionsArray[this.randomTrapIndex()] + '(' + xPos + ')');
    }

    // Devuelve un índice válido del array de funciones de generación de trampas
    randomTrapIndex() {
        let ret = Math.floor(Math.random() * this.trapFunctionsArray.length);
        //console.log(ret);
        return ret;
    }

    // Genera el array con las trampas disponibles del mapa
    // TRAMPAS DISPONIBLES DEPENDIENTES DEL NIVEL POR IMPLEMENTAR
    generateTrapArray() {
        this.trapFunctionsArray[0] = 'this.generateStillEnemy';
        this.trapFunctionsArray[1] = 'this.generateMovingEnemy';
        this.trapFunctionsArray[2] = 'this.generateSpikesTrap';
        this.trapFunctionsArray[0] = 'this.generatePlatform';
    }
    // FIN DE FUNCIÓN DE CREADO PROCEDURAL DEL MAPA ---------------------

    // FUNCIONES DE CONTROL DEL PERSONAJE -------------------------------

    // Salto
    // Comienza el salto si está tocando el suelo y programa un timer para que no suba infinito.
    // Si termina el timer o se suelta el botón de salto se llamará a playerStopJump()
    playerStartJump() {
        if (this.isPlayerTouchingGround && this.player.body.velocity.y == 0) {
            this.player.setVelocityY(this.playerJumpSpeed);
            this.isPlayerJumping = true;
            this.isPlayerTouchingGround = false;
            this.player.body.setAllowGravity(false);
            this.jumpTimer = this.time.addEvent( { delay: this.playerJumpDuration, callback: this.playerStopJump, callbackScope: this, loop: false } );
        }
    }

    // Detiene la subida del salto y elimina el timer
    playerStopJump() {
        this.player.body.setAllowGravity(true);
        this.jumpTimer.remove();
    }

    // Cambia la variable que almacena si el personaje está saltando.
    // DEBE LLAMARSE SIEMPRE QUE TOQUE UN SUELO (ya lo hacen grupos platforms y ground)
    grounded() {
        this.isPlayerJumping = false;
        this.isPlayerTouchingGround = true;
    }

    // moverse a la izquierda
    playerLeft() {
        this.player.setVelocityX(-this.playerMovementSpeed);
        //this.player.anims.play('left', true);
    }

    // moverse a la derecha
    playerRight() {
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
            this.playerAttackAvaliable = false;
            // Crea la hitbox
            let localAttackHitbox = this.attackHitbox.create(this.player.x, this.player.y - this.player.height, 'bomb');    // Cambiar sprite por 'dot' al importar animacion definitiva
            localAttackHitbox.setOrigin(0);
            localAttackHitbox.setSize(this.playerAttackWidth, this.playerAttackHeight, false);
            localAttackHitbox.body.setAllowGravity(false);
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
            this.attackHitbox.getChildren()[0].x = this.player.x;
            this.attackHitbox.getChildren()[0].y = this.player.y - this.player.height;
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

        if (this.isPlayerDead == false) {
            this.player.setTint(0xe62272);
            this.isPlayerDead = true;
            this.restartLevel();
        }
    }
    // FIN DE FUNCIONES DE CONTROL DEL PERSONAJE ------------------------


    // FUNCIONES DE GENERACIÓN DE ENEMIGOS/OBSTÁCULOS -------------------
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
        let newEnemy = this.enemies.create(xPos, yPos, 'dude').setOrigin(1).setTint(0xe62272).refreshBody();
        newEnemy.body.setSize(collisionWidth, collisionHeight);
        let newTrigger = this.triggers.create(xPos, yPos, 'dot').setVisible(false).refreshBody();
        newTrigger.body.setSize(triggerWidth, triggerHeight);
        newTrigger.associatedEnemy = newEnemy;
        return this.minDistMovingEnemy;
    }

    // Funcion de creación de plataformas
    // xPos, yPos = posiciones x e y. Origen del sprite en el límite inferior derecho.
    // Únicamente cambiar el sprite y el valor de setScale()
    generatePlatform(xPos, yPos = this.platformPositionY) {
        this.platforms.create(xPos, yPos, 'ground').setScale(this.platformScaleFactor).setOrigin(0, 0).setTint(0x00ff38).refreshBody();
        return this.minDistPlatform;
    }

    // Funciones de creación de trampa de pinchos
    // xPos, yPos = posiciones x e y. Origen del sprite en el límite inferior derecho.
    // Únicamente cambiar el sprite y el valor de setScale()
    generateSpikesTrap(xPos, yPos = this.levelGroundHeight - 1) {
        this.spikesTraps.create(xPos, yPos, 'ground').setScale(0.5).setOrigin(0, 0).setTint(0xe62272).refreshBody();
        return this.minDistSpikes;
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
        this.saveGame();
        console.log("Pasaste el nivel" + levelIndex);
        this.returnToWorldMap();
    }

    // Actualiza la variable global de mapas pasados
    actualizeMapsCompleted() {
        user.map[levelIndex] = true;
    }

    saveGame() {
        localStorage.setItem("UserMap", user.map);
        localStorage.setItem("UserMoney", user.money);
    }

    // Vuelve al menú de mundo
    returnToWorldMap() {
        this.scene.stop();
        this.scene.start('World1Map');
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
        this.enemies.remove(enemies, true); // Elimina el enemigo de la lista y del juego
    }

    // Comprueba si se ha colisionado con la plataforma por arriba (y se convierte en sólida)
    // o por abajo (y permite pasar).
    platformOverlap(player, platforms) {
        if (player.body.y < platforms.y) {
            let localSolidPlatform = this.solidPlatforms.create(platforms.x, platforms.y, 'ground').setScale(this.platformScaleFactor).setOrigin(0, 0).setTint(0x00ff38).refreshBody();
            localSolidPlatform.body.checkCollision.left = false;
            localSolidPlatform.body.checkCollision.right = false;
            localSolidPlatform.body.checkCollision.down = false;
        }
    }

    // Reinicia el nivel
    // Resetea las variables del create necesarias ya que no se resetean con this.scene.restart();
    restartLevel() {
        this.isPlayerDead = false;
        this.isPlayerJumping = false;
        this.isPlayerTouchingGround = false;
        this.playerAttackAvaliable = true;
        if (this.jumpTimer != null) {
            this.jumpTimer.remove();            
        }
        if (this.playerAttackTimer != null) {
            this.playerAttackTimer.remove();            
        }
        if (this.playerAttackCooldownTimer != null) {
            this.playerAttackCooldownTimer.remove();
        }        
        this.scene.stop();
        this.scene.restart();
    }
    // FIN DE OTRAS FUNCIONES -------------------------------------------


    update () {
        //Fondo dinámico
        this.bg_backgorund.tilePositionX = this.cameras.main.scrollX * .1;
        this.bg_far.tilePositionX = this.cameras.main.scrollX *.1;
        this.bg_medium.tilePositionX = this.cameras.main.scrollX * .5;
        this.bg_near.tilePositionX = this.cameras.main.scrollX ;
    }
}

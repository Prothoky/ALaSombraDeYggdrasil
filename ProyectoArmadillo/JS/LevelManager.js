class LevelManager extends Phaser.Scene
{
    constructor ()
    {
        super({key:"LevelManager"});

        // SETTINGS
        // General
        this.lengthMultiplier = 4; // Multiplicador de amaño de ancho del mapa
        this.levelHeight = gameHeight;
        this.levelWidth = gameWidth * this.lengthMultiplier;
        this.levelGroundHeight = 568;   // Altura del suelo
        this.platformScaleFactor = 0.4; // Factor de escalado de las plataformas. 1 para no hacer escalado
        // Settings personaje
        this.movementSpeed = 300;
        this.jumpSpeed = -500;
        this.jumpDuration = 400;    // Duración máxima de la anulación de gravedad del salto en ms
        this.playerAttackWidth = 50;
        //this.playerAttackHeight = 50;
        // Settings enemigos
        this.enemySpeed = -200; // Velocidad de movimiento de los enemigos

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

        // VARIABLES DE INFORMACIÓN
        this.isPlayerDead = false;
        this.isPlayerJumping = false;
        this.isPlayerTouchingGround = false;

        // INPUT
        // Teclas (no ejecutar si es en móvil)
        this.jumpButton;
        this.leftButton;
        this.rightButton;
        this.attackButton;
    }

    preload () {
        // PASAR A GLOBAL PARA NO HACERLO DE CADA VEZ
        this.load.spritesheet('dude', 'ASSETS/Placeholders/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('ground', 'ASSETS/Placeholders/platform.png');
        this.load.image('dot', 'ASSETS/Gameplay/dot.png');
        // FIN DE PASAR A GLOBAL PARA NO HACERLO DE CADA VEZ
    }

    create ()
    {
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

        // Jugador
        this.player = this.physics.add.sprite(100, 450, 'dude').setOrigin(1);   // setOrigin(1) IMPORTANTE (calcular colisiones)

        // Físicas
        this.physics.world.setBounds(0, 0, this.levelWidth, this.levelHeight);  // Tamaño del nivel
        this.ground = this.physics.add.staticGroup();    // Grupo de plataformas colisionables
        this.spikesTraps = this.physics.add.staticGroup();  // Grupo de trampas de pinchos
        this.platforms = this.physics.add.staticGroup();    // Grupo de plataformas
        this.solidPlatforms = this.physics.add.staticGroup();   // Grupo de plataformas con las que se ha hecho contacto
        this.enemies = this.physics.add.group();  // Grupo de enemigos
        this.triggers = this.physics.add.staticGroup();   // Grupo de triggers
        this.generateGround(200, 'ground'); // Genera suelo para todo el nivel
        this.player.setCollideWorldBounds(true);    // No puede salir de los límites del mapa
        this.physics.add.collider(this.player, this.ground, this.grounded, null, this); // Permitimos colisiones entre grupo de plataformas y jugador
        this.physics.add.collider(this.player, this.spikesTraps, () => this.playerDeath()); // Función que se ejecuta al colisionar con spikes
        this.physics.add.overlap(this.player, this.platforms, this.platformOverlap, null, this);    // Función que calcula si ha chocado desde arriba o desde abajo
        this.physics.add.collider(this.player, this.solidPlatforms, this.grounded, null, this);    // Una vez colisionado la plataforma desde arriba, volverla sólida
        this.physics.add.overlap(this.player, this.enemies, () => this.playerDeath()); // Llama a playerDeath si colisiona con enemigo
        this.physics.add.collider(this.enemies, this.platforms);    // Enemigos colisionan con el suelo
        this.physics.add.collider(this.enemies, this.ground);   // Enemigos colisionan con plataformas
        this.physics.add.overlap(this.player, this.triggers, this.enemyStartMotion, null, this);    // Función que se llama al entrar el jugador en el área de visión del enemigo

        // Cámara
        this.cameras.main.setBounds(0, 0, this.levelWidth, this.levelHeight);   // Límites cámara
        this.cameras.main.startFollow(this.player); // Cámar sigue al personaje

        // Generamos obstáculos de testeo
        this.generateSpikesTrap(400, 567);
        // Generamos plataforma de testeo
        this.generatePlatform(390, 480);
        // Generamos enemigo de testeo
        this.generateStillEnemy(900, 500, 40, 60);
        // Generamos enemogio con movimiento de testeo
        this.generateMovingEnemy(1000, 500, 40, 60);

        // Creamos los controles del teclado (no ejecutar si es en móvil)
        this.jumpButton = this.input.keyboard.addKey(controls.up);
        this.leftButton = this.input.keyboard.addKey(controls.left);
        this.rightButton = this.input.keyboard.addKey(controls.right);
        this.attackButton = this.input.keyboard.addKey(controls.attack);

        // Asignamos eventos a los botones (independiente del controlador)
        this.jumpButton.on('down', this.playerStartJump, this);
        this.jumpButton.on('up', this.playerStopJump, this);
        this.leftButton.on('down', this.playerLeft, this);
        this.rightButton.on('down', this.playerRight, this);
        this.attackButton.on('down', this.playerAttack, this);
    }

    // Funcion de creación de plataformas
    // xPos, yPos = posiciones x e y. Origen del sprite en el límite inferior derecho.
    // Únicamente cambiar el sprite y el valor de setScale()
    generatePlatform(xPos, yPos) {
        this.platforms.create(xPos, yPos, 'ground').setScale(this.platformScaleFactor).setOrigin(0, 0).setTint(0x00ff38).refreshBody();
    }

    // Funciones de creación de trampa de pinchos
    // xPos, yPos = posiciones x e y. Origen del sprite en el límite inferior derecho.
    // Únicamente cambiar el sprite y el valor de setScale()
    generateSpikesTrap(xPos, yPos) {
        this.spikesTraps.create(xPos, yPos, 'ground').setScale(0.5).setOrigin(0, 0).setTint(0xe62272).refreshBody();
    }

    // Funciones de control del personaje
    // Salto
    // Comienza el salto si está tocando el suelo y programa un timer para que no suba infinito.
    // Si termina el timer o se suelta el botón de salto se llamará a playerStopJump()
    playerStartJump() {
        if (this.player.body.touching.down) {
            this.player.setVelocityY(this.jumpSpeed);
            this.isPlayerJumping = true;
            this.player.body.setAllowGravity(false);
            this.jumpTimer = this.time.addEvent( { delay: this.jumpDuration, callback: this.playerStopJump, callbackScope: this, loop: false } );
        }
    }


    // FUNCIONES DE CONTROL DEL PERSONAJE -------------------------------

    // Salto
    // Comienza el salto si está tocando el suelo y programa un timer para que no suba infinito.
    // Si termina el timer o se suelta el botón de salto se llamará a playerStopJump()
    playerStartJump() {
        if (this.isPlayerTouchingGround && this.player.body.velocity.y == 0) {
            this.player.setVelocityY(this.jumpSpeed);
            this.isPlayerJumping = true;
            this.isPlayerTouchingGround = false;
            this.player.body.setAllowGravity(false);
            this.jumpTimer = this.time.addEvent( { delay: this.jumpDuration, callback: this.playerStopJump, callbackScope: this, loop: false } );
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
        this.player.setVelocityX(-this.movementSpeed);
        this.player.anims.play('left', true);
    }

    // moverse a la derecha
    playerRight() {
        this.player.setVelocityX(this.movementSpeed);
        this.player.anims.play('right', true);
    }

    // quedarse quieto
    playerStop() {
        this.player.setVelocityX(0);
        this.player.anims.stop();
    }

    // atacar
    playerAttack() {
        
    }

    // Pinta un texto de muerte
    playerDeath() {
        /* ALGO FALLA
        this.user = user;
        this.user += { nodo = 1 };
        localStorage.setItem("Usuario", this.user);*/
        if (this.isPlayerDead == false) {
            this.add.text(400, 400, 'Moristes wey', { color: '#ff0', fontSize: '40px' });
            this.isPlayerDead = true;
        }
    }
    // FIN DE FUNCIONES DE CONTROL DEL PERSONAJE ------------------------


    // FUNCIONES DE GENERACIÓN DE ENEMIGOS/OBSTÁCULOS -------------------    
    // Función de creación de enemigos sin movimiento
    // xPos, yPos: posición en el mapa
    // collisionWidth, collisionHeight: tamaño de la hitbox
    generateStillEnemy(xPos, yPos, collisionWidth, collisionHeight) {
        let newEnemy = this.enemies.create(xPos, yPos, 'dude').setOrigin(1).setTint(0xe62272).refreshBody();
        newEnemy.body.setSize(collisionWidth, collisionHeight);
    }

    // Función de creación de enemigos con movimiento al acercarse el jugador
    // xPos, yPos: posición en el mapa
    // collisionWidth, collisionHeight: tamaño de la hitbox
    // triggerWidth, triggerHeight: tamaño del trigger de movimiento. Si no se pasa toma valor por defecto
    generateMovingEnemy(xPos, yPos, collisionWidth, collisionHeight, triggerWidth = 500, triggerHeight = 500) {
        let newEnemy = this.enemies.create(xPos, yPos, 'dude').setOrigin(1).setTint(0xe62272).refreshBody();
        newEnemy.body.setSize(collisionWidth, collisionHeight);
        let newTrigger = this.triggers.create(xPos, yPos, 'dot').setVisible(false).refreshBody();
        newTrigger.body.setSize(triggerWidth, triggerHeight);
        newTrigger.associatedEnemy = newEnemy;
    }

    // Función que ordena al enemigo moverse cuando se encuentra con el jugador
    enemyStartMotion(player, triggers) {
        triggers.associatedEnemy.setVelocityX(this.enemySpeed);
    }

    // Funcion de creación de plataformas
    // xPos, yPos = posiciones x e y. Origen del sprite en el límite inferior derecho.
    // Únicamente cambiar el sprite y el valor de setScale()
    generatePlatform(xPos, yPos) {
        this.platforms.create(xPos, yPos, 'ground').setScale(this.platformScaleFactor).setOrigin(0, 0).setTint(0x00ff38).refreshBody();
    }

    // Comprueba si se ha colisionado con la plataforma por arriba (y se convierte en sólida)
    // o por abajo (y permite pasar).
    platformOverlap(player, platforms) {
        if (player.y < platforms.y) {
            this.solidPlatforms.create(platforms.x, platforms.y, 'ground').setScale(this.platformScaleFactor).setOrigin(0, 0).setTint(0x00ff38).refreshBody();
        }
    }

    // Funciones de creación de trampa de pinchos
    // xPos, yPos = posiciones x e y. Origen del sprite en el límite inferior derecho.
    // Únicamente cambiar el sprite y el valor de setScale()
    generateSpikesTrap(xPos, yPos) {
        this.spikesTraps.create(xPos, yPos, 'ground').setScale(0.5).setOrigin(0, 0).setTint(0xe62272).refreshBody();
    }
    // FIN DE FUNCIONES DE GENERACIÓN DE ENEMIGOS/OBSTÁCULOS ------------


    // OTRAS FUNCIONES --------------------------------------------------
    // Genera suelo para todo el nivel
    // cambiar a la línea comentada para hacerlo invisible
    generateGround(spriteWidth, spriteName) {
        let i = 0;
        for(i = 0; i < this.levelWidth; i += spriteWidth) {
            this.ground.create(i, this.levelGroundHeight, spriteName).setOrigin(0, 0).refreshBody();
            //this.ground.create(i, this.levelGroundHeight, spriteName).setOrigin(0, 0).setVisible(false).refreshBody();
        }
    }
    // FIN DE OTRAS FUNCIONES -------------------------------------------
    

    update () {
        // Fix para controles de movimiento izq. der. (eliminar cuando sea endless runner)
        if (this.rightButton.isUp && this.leftButton.isUp) {
            this.playerStop();
        }
    }
}

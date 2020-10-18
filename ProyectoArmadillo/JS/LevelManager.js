class LevelManager extends Phaser.Scene
{
    constructor ()
    {
        super({key:"LevelManager"});

        // Settings
        this.lengthMultiplier = 4; // Multiplicador de amaño de ancho del mapa
        this.levelHeight = gameHeight;
        this.levelWidth = gameWidth * this.lengthMultiplier;
        this.levelGroundHeight = 568;
        this.movementSpeed = 300;
        this.jumpSpeed = -500;
        this.jumpDuration = 400;    // Duración máxima de la anulación de gravedad del salto en ms
        this.platformScaleFactor = 0.4; // Factor de escalado de las plataformas. 1 para no hacer escalado

        // Referencias
        this.ground; // Grupo de plataformas colisionables
        this.spikesTraps;   // Grupos de trampas
        this.platforms;    // Grupos de plataformas
        this.solidPlatforms;    // Grupos de plataformas con las que se ha hecho contacto
        this.player;    // Personaje
        this.jumpTimer; // Callback para salto progresivo

        // Información de la partida
        this.isPlayerDead = false;
        this.isPlayerJumping = false;

        // Teclas (no ejecutar si es en móvil)
        this.jumpButton;
        this.leftButton;
        this.rightButton;
    }

    preload () {
        // PASAR A GLOBAL PARA NO HACERLO DE CADA VEZ
        this.load.spritesheet('dude', 'ASSETS/Placeholders/dude.png', { frameWidth: 32, frameHeight: 48 });    
        this.load.image('ground', 'ASSETS/Placeholders/platform.png');
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

        // Físicas
        this.physics.world.setBounds(0, 0, this.levelWidth, this.levelHeight);  // Tamaño del nivel
        this.ground = this.physics.add.staticGroup();    // Grupo de plataformas colisionables
        this.spikesTraps = this.physics.add.staticGroup();  // Grupo de trampas de pinchos
        this.platforms = this.physics.add.staticGroup();    // Grupo de plataformas
        this.solidPlatforms = this.physics.add.staticGroup();   // Grupo de plataformas con las que se ha hecho contacto
        this.generateGround(200, 'ground'); // Genera suelo para todo el nivel

        // Jugador
        this.player = this.physics.add.sprite(100, 450, 'dude').setOrigin(1);   // setOrigin(1) IMPORTANTE (calcular colisiones)
        this.player.setCollideWorldBounds(true);    // No puede salir de los límites del mapa
        this.physics.add.collider(this.player, this.ground, this.grounded, null, this); // Permitimos colisiones entre grupo de plataformas y jugador
        this.physics.add.collider(this.player, this.spikesTraps, () => this.playerDeath()); // Función que se ejecuta al colisionar con spikes
        this.physics.add.overlap(this.player, this.platforms, this.platformOverlap, null, this);    // Función que calcula si ha chocado desde arriba o desde abajo
        this.physics.add.collider(this.player, this.solidPlatforms, this.grounded, null, this);    // Una vez colisionado la plataforma desde arriba, volverla sólida

        // Cámara
        this.cameras.main.setBounds(0, 0, this.levelWidth, this.levelHeight);   // Límites cámara
        this.cameras.main.startFollow(this.player); // Cámar sigue al personaje

        // Generamos obstáculos de testeo
        this.generateSpikesTrap(400, 567);
        // Generamos plataforma de testeo
        this.generatePlatform(390, 480);

        // Creamos los controles del teclado (no ejecutar si es en móvil)
        this.jumpButton = this.input.keyboard.addKey(controls.up);
        this.leftButton = this.input.keyboard.addKey(controls.left);
        this.rightButton = this.input.keyboard.addKey(controls.right);

        // Asignamos eventos a los botones (independiente del controlador)
        this.jumpButton.on('down', this.playerStartJump, this);
        this.jumpButton.on('up', this.playerStopJump, this);
        this.leftButton.on('down', this.playerLeft, this);
        this.rightButton.on('down', this.playerRight, this);
    }

    // Genera suelo para todo el nivel
    // cambiar a la línea comentada para hacerlo invisible
    generateGround(spriteWidth, spriteName) {
        let i = 0;
        for(i = 0; i < this.levelWidth; i += spriteWidth) {
            this.ground.create(i, this.levelGroundHeight, spriteName).setOrigin(0, 0).refreshBody();
            //this.ground.create(i, this.levelGroundHeight, spriteName).setOrigin(0, 0).setVisible(false).refreshBody();
        }
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

    // Detiene la subida del salto y elimina el timer
    playerStopJump() {
        this.player.body.setAllowGravity(true);
        this.jumpTimer.remove();
    }

    // Cambia la variable que almacena si el personaje está saltando.
    // DEBE LLAMARSE SIEMPRE QUE TOQUE UN SUELO (ya lo hacen grupos platforms y ground)
    grounded() {
        this.isPlayerJumping = false;
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

    // Comprueba si se ha colisionado con la plataforma por arriba (y se convierte en sólida)
    // o por abajo (y permite pasar).
    platformOverlap(player, platforms) {
        if (player.y < platforms.y) {
            this.solidPlatforms.create(platforms.x, platforms.y, 'ground').setScale(this.platformScaleFactor).setOrigin(0, 0).setTint(0x00ff38).refreshBody();
        }
    }

    // Pinta un texto de muerte
    playerDeath() {
        if (this.isPlayerDead == false) {
            this.add.text(400, 400, 'Moristes wey', { color: '#ff0', fontSize: '40px' });    
            this.isPlayerDead = true;
        }        
    }

    update () {
        // Fix para controles de movimiento izq. der. (eliminar cuando sea endless runner)
        if (this.rightButton.isUp && this.leftButton.isUp) {
            this.playerStop();
        }        
    }

}
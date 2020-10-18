class LevelManager extends Phaser.Scene
{
    constructor ()
    {
        super({key:"LevelManager"});

        // Settings
        this.lengthMultiplier = 4; // Multiplicador de amaño de ancho del mapa
        this.levelHeight = gameHeight;
        this.levelWidth = gameWidth * this.lengthMultiplier;
        this.movementSpeed = 300;
        this.jumpSpeed = -700;
        this.platformScaleFactor = 0.4; // Factor de escalado de las plataformas. 1 para no hacer escalado

        // Referencias
        this.ground; // Grupo de plataformas colisionables
        this.spikesTraps;   // Grupos de trampas
        this.platforms;    // Grupos de plataformas
        this.solidPlatforms;    // Grupos de plataformas con las que se ha hecho contacto
        this.player;    // Personaje

        // Información de la partida
        this.isPlayerDead = false;

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
        this.ground.create(0, 568, 'ground').setOrigin(0, 0).setScale(2).refreshBody();    // Suelo
        this.ground.create(400, 568, 'ground').setOrigin(0, 0).setScale(2).refreshBody();    // Suelo

        // Jugador
        this.player = this.physics.add.sprite(100, 450, 'dude').setOrigin(1);   // setOrigin(1) IMPORTANTE (calcular colisiones)
        this.player.setCollideWorldBounds(true);    // No puede salir de los límites del mapa
        this.physics.add.collider(this.player, this.ground); // Permitimos colisiones entre grupo de plataformas y jugador
        this.physics.add.collider(this.player, this.spikesTraps, () => this.playerDeath()); // Función que se ejecuta al colisionar con spikes
        this.physics.add.overlap(this.player, this.platforms, this.platformOverlap, null, this);    // Función que calcula si ha chocado desde arriba o desde abajo
        this.physics.add.collider(this.player, this.solidPlatforms);    // Una vez colisionado la plataforma desde arriba, volverla sólida

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
    // salto
    playerJump() {
        this.player.setVelocityY(this.jumpSpeed);
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
        // Controlador de teclado (no ejecutar si es móvil)
        if (this.jumpButton.isDown && this.player.body.touching.down) {
            this.playerJump();
        }
        if (this.leftButton.isDown && this.rightButton.isUp) {
            this.playerLeft();
        }
        else if (this.rightButton.isDown && this.leftButton.isUp) {
            this.playerRight();
        }
        else {
            this.playerStop();
        }
        
    }

}
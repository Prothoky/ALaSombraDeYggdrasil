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
        this.jumpSpeed = -500;

        // Referencias
        this.platforms; // Grupo de plataformas colisionables
        this.spikesTraps;   // Grupos de trampas
        this.player;    // Personaje

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
        this.platforms = this.physics.add.staticGroup();    // Grupo de plataformas colisionables
        this.spikesTraps = this.physics.add.staticGroup();
        this.platforms.create(0, 568, 'ground').setOrigin(0, 0).setScale(2).refreshBody();    // Suelo
        this.platforms.create(400, 568, 'ground').setOrigin(0, 0).setScale(2).refreshBody();    // Suelo

        // Jugador
        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms); // Permitimos colisiones entre grupo de plataformas y jugador
        this.physics.add.collider(this.player, this.spikesTraps, () => this.playerDeath()); // Función que se ejecuta al colisionar con spikes

        // Cámara
        this.cameras.main.setBounds(0, 0, this.levelWidth, this.levelHeight);   // Límites cámara
        this.cameras.main.startFollow(this.player);
        //this.cameras.main.followOffset.set(-300, 0);

        // Generamos obstáculos de testeo
        this.generateSpikesTrap(400, 567);

        // Creamos los controles del teclado (no ejecutar si es en móvil)
        this.jumpButton = this.input.keyboard.addKey(controls.up);
        this.leftButton = this.input.keyboard.addKey(controls.left);
        this.rightButton = this.input.keyboard.addKey(controls.right);
    }

    // Funciones de creación de trampas
    generateSpikesTrap(xPos, yPos) {
        this.spikesTraps.create(xPos, yPos, 'ground').setScale(0.5).setOrigin(0, 0).setTint(0xe62272).refreshBody();
    }

    // Funciones de control del personaje
    playerJump() {
        this.player.setVelocityY(this.jumpSpeed);
    }

    playerLeft() {
        this.player.setVelocityX(-this.movementSpeed);
        this.player.anims.play('left', true);
    }

    playerRight() {
        this.player.setVelocityX(this.movementSpeed);
        this.player.anims.play('right', true);
    }

    playerStop() {
        this.player.setVelocityX(0);
        this.player.anims.stop();
    }

    playerDeath() {
        this.add.text(400, 400, 'Moristes wey', { color: '#ff0', fontSize: '40px' });
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
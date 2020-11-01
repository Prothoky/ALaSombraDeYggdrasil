# Ficha de juego


#### Título  
A la sombra de Yggdrasil
#### Género 
Es un runner en 2D con scroll lateral con narrativa vikinga.
#### Audiencia
Pensado para todo jugador interesado en la cultura vikinga y todos aquellos que les guste los plataformas [seguir].
#### Plataformas
El proyecto estará desarrollado para web y para dispositivos móviles.
#### Modos de Juego
El juego constará de un único modo individual con 2 dificultades.
#### Temática
La cultura vikinga es el punto de interés del juego, estará basado en los pueblos vikingos del siglo IX y X.
#### Estética  
[]

## Descripción del juego

El juego está inspirado en los clásicos endless runner, pero a diferencia de estos, el nivel en este caso tiene un final. El jugador se encontrará un mundo entero para atravesar, este está distribuido en un cuadrícula de XX por XX. Con este diseño de mapa se busca la exploración por completo del mundo para así conseguir todos los objetos y desafíos por resolver.


Respecto a la historia, el personaje es un vikingo ya vivido que tiene como único deseo morir en la guerra para poder alcanzar el Valhalla y poder reunirse con su familia y amigos más allá. Para ello vikingo irá recorriendo los 9 mundos que describen la mitología nórdica los cuales conforman el universo vikingo.

El protagonista iniciará su periplo en el planeta Midgar, que es el planeta tierra, el cual se encuentra en el centro del árbol yggdrasil (árbol que sostiene los planetas).


Para dotar al juego de personalidad, el recorrido de este estará repleto de referencia a los dioses y a la cultura nórdica, ilustrando de una manera amena sobre diferentes historias ya olvidadas. Se usa la Edda poética como instrumento para describir los mundos y a los dioses siguiendo de una manera fiel el método de transmisión de conocimiento de esa época, la poesía épica.


Durante el transcurso del juego el protagonista irá narrando su experiencia por este último viaje, invitando a una reflexión sobre la vida, su final y hacia donde se dirige su espíritu. De este modo dotamos de vida al personaje y así alcanza un mayor vínculo con el usuario.


[Contar sobre la experiencia de jugador, estilo visual y jugabilidad]

## Personaje

Por el momento estamos trabajando en el diseño del personaje. Están por definir aún las habilidades de este, aunque sabemos que el hacha será el arma principal del juego.
El mayor debate que surgió con este fue el movimiento que tendría en función de cómo sujetaría el hacha, pero hemos decidido que el personaje llevará el hacha en una única mano, pensando que sería una animación más lógica para este tipo de juegos tan rápidos.

![Einar](https://user-images.githubusercontent.com/55508821/97813399-3b3e4a00-1c88-11eb-80d3-1dbf2db12bf5.jpg)






## Mecánicas de juego
El juego tiene un sistema de movimiento limitado, el jugado irá por defecto de izquierda a derecha con la única opción de saltar y atacar.
La principal característica de este juego es la creación de niveles de manera procedimental, así el factor sorpresa es constante y podemos crear un mayor número de niveles para extender el tiempo de vida del juego mucho más.
Hay diferentes obstáculos en función del mapa en el que se encuentre el jugador, el contenido será temático para sumergir de una mejor manera al jugador y así también dotarlo con una mayor variedad de referencias.

Diseño de estructura de niveles de bosque con subniveles 

![diseño niveles boceto](https://user-images.githubusercontent.com/55508821/96874064-00613880-1476-11eb-9242-3d6ee32c792d.jpg)


Boceto de mapa del bosque "tileable"
![boceto mapa bosque](https://user-images.githubusercontent.com/55508821/96410498-4b195100-11e7-11eb-9289-1263f45bc08c.jpeg)

Aquí se muestra la continuación del mapa del bosque con un enemigo y un obstáculo
![mapa fase 2](https://user-images.githubusercontent.com/55508821/96566275-a7eb3900-12c5-11eb-8953-51e343277f71.jpg)

La escena de selección de mapa es en un tablero inspirado en paisajes de Noruega y Suecia donde el jugador va avanzando por los diferentes niveles del mundo.
![boceto mapa de niveles](https://user-images.githubusercontent.com/55508821/96410879-e4486780-11e7-11eb-986e-956eb7e3723b.jpeg)



El diseño de niveles está desarrollado con una curva de dificultad progresiva y situacional en función al avance de los distintos niveles del mundo. Una vez se alcance el hielo en el mapa, la dificultad bajará para que el usuario se pueda adaptar a los nuevos elementos incorporados en estos.


![dificultad](https://user-images.githubusercontent.com/55508821/97113804-f2691d00-16ec-11eb-9c7a-35e91484c141.JPG)

Durante la partida saldrán varios elementos a esquivar, ya sean enemigos u obstáculos:
[Ya implementados]
 - Pinchos normales
 - Plataformas
 - Enemigos quietos
 - Plataformas con enemigos
 - Enemigos con movimiento
 - Pinchos largos con plataforma para lograr el salto
 - Pinchos pequeños seguidos
 - Pinchos pequeños seguidos con enemigos
 
  [Aún por incluir]
  
  
 - Casa vikinga
 - Casa vikinga con obstáculo en el suelo
 - Casa vikinga con obstáculo en el techo
 - Casa vikinga con enemigo
 - Enemigo con ataque a distancia
 - Árbol
 - ...


## Interfaz y modos de juego
El diseño de interfaz de usuario debe de ser muy sencilla y ligera para el usuario, no pretendemos distraer con mucha carga de información para atraer a la mayor cantidad de público posible. El diseño del menú principal tiene como principal atención a Yggdrasil sujetando a los 9 mundos vikingos, estos estarán en gris hasta que se vayan desbloqueando, el jugador seleccionará el mundo y se adentrará en su respectivo tablero de niveles 

![boceto menu principal](https://user-images.githubusercontent.com/55508821/96411648-160dfe00-11e9-11eb-88f5-9fe2edd62911.jpeg)

La interfaz de juego está mayormente limitada por el lanzamiento del juego en los dispositivos móviles, en la pantalla de juego, una vez el jugador ya haya empuñado el hacha, aparecerá en la esquina superior izquierda a modo de vidas, unos escudos vikingos que te indicarán el número de escudos restantes que restan. Por la esquina superior derecha encontraremos un botón de pausa, ahí el jugador accederá al menú de pausa, donde tendrá las opciones de modificar el volumen, salir del juego o reiniciar la partida.


## Flujo de juego
![A la sombra de Yggdrasil](https://user-images.githubusercontent.com/55508821/96869494-d3118c00-146f-11eb-983f-405292a00031.png)


## Historia

Einar es el vikingo protagonista de esta historia. Fue bendecido con el don de la inmortalidad como regalo de los dioses para que guiara a su pueblo a un lugar próspero. El problema de este regalo es que juega como arma de doble filo, su pueblo acabó siendo arrastrado por el tiempo y el olvido. De ese legado apenas quedan unos poemas y unos cuentos de niños. Einar, ya sin familia ni destino sufre el exilio de la muerte en vida por eso, decide ir a ver a Odín a su propia casa, para reclamar su merecido sitio en el Valhalla para poder reunirse con su familia después de siglos de soliloquio. 
[Podría ser odín el que le diga que alcanzará el valhalla cuando atraviese los 9 mundos]

Para ello Einar irá recorriendo los nueve mundos que sostiene Yggdrasil teniendo a Asgard como meta. Esta aventura comienza en su planeta natal Midgard.

Cada mundo se dividirá en unos cuantos subniveles principales con sus respectivos niveles extras, extendiendose a modo de árbol por las fases principales. En estos niveles adicionales el jugador encontraría cuentos y leyendas de dioses y del propio Einar, progagando así la narrativa por varias direcciones.

Habrá 10 niveles principales, 5 en el bosque y los otros 5 en el hielo. Algunos de estos niveles tendrán ramas que contendrán niveles extras con historias adicionales sobre la cultura nórdica. 

El avance de los niveles irá reflejando el pensamiento del personaje y hará una transición desde la soledad hasta la ira de su situación, exigiendo a Odín con violencia que acabe con su sufrimiento. Einar en el último capítulo amenazará de muerte al mismísimo dios.


[Incluir título de cada nivel y una breve descripción sobre este]

A la hora de acabar el nivel, el jugador recibirá un dinero por el recorrido, dependiendo este del número de muerte y el número de enemigos establecidos. Este dinero también se repartirá de manera distinta en función del nivel de dificultad que se encuentre el jugador, estableceremos una economía de juego pensada para que el jugador pueda comprar habilidades antes de llegar a determinados niveles, así podrá ver su utilidad. Si este avanzara a niveles donde su falta de habilidades especiales le impide continuar, tendrá que volver a niveles pasados o completar todos los subniveles extra para poder obtener el dinero suficiente.



## Estilo artístico y música

## Experiencia de usuario

## Modelo de negocio
Para sostener este proyecto a dos años vista tenemos desarrollado un sistema de lanzamiento periódico del contenido del juego, de este modo conseguiremos extender el pulso del juego y rentabilizar el trabajo con un mayor beneficio económico.

Al constar de 9 mundos el juego, vamos a sacar el primer mundo nada más empezar y el segundo a las 2/3 semanas del lanzamiento. El resto de mundo se irán lanzando cada mes y medio, así diversificamos el contenido y damos un descanso a los jugadores para que no consuman su interés por el juego de una manera tan rápida.

En nuestro juego no queremos que el jugador se vea obligado a pagar para completar el juego, pero si que este complete el 100% del juego para poder seguir desbloqueando diferentes planetas. De este modo el sistema de publicidad que incluya el juego dará un mayor beneficio a largo plazo, con el que compensaremos ese ahorro monetario por parte del jugador. 

Al sacar los nuevos capítulos, estos tendrán un precio de 2 euros, un precio significativo pero que multiplicado con los 8 mundos, se convierte en un beneficio muy amplio. Para captar la atención del cliente en estos nuevos planetas, implementaremos también nuevas habilidades, mapas, skins y personajes jugables.


Por lo que a la tienda se refiere, se irá subiendo contenido con cierta frecuencia gratuito. Se implantará una moneda virtual con la que poder hacer compras de las distintas skins y objetos coleccionables.
En nuestro modelo de negocio no contemplamos que el usuario tenga que gastar dinero para alcanzar una mayor experiencia. Incentivaremos al jugador a repetir los niveles para ir obteniendo monedas a través de distintos desafíos que irán surgiendo de manera constante y aleatoria.

En la tienda se podrán adquirir escudos para las vidas, y nuevas habilidades para facilitar el avance del jugador, sobre todo para su recorrido por el modo difícil. 

## Controles
Los controles los vamos a definir en dos bloques, cada uno en función al entorno de juego en el que el usuario se encuentra:
 Ordenador:
 [Incluir tabla]
 
 Móvil:
 [Incluir tabla]


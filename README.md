# Ficha de juego


#### Título  
A la sombra de Yggdrasil
#### Género 
Es un runner en 2D scroll lateral con narrativa vikinga.
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



## Personaje

Por el momento estamos trabajando en el diseño del personaje. Están por definir aún las habilidades de este, aunque sabemos que el hacha será el arma principal del juego.
El mayor debate que surgió con este fue el movimiento que tendría en función de cómo sujetaría el hacha, pero hemos decidido que el personaje llevará el hacha en una única mano, pensando que sería una animación más lógica para este tipo de juegos tan rápidos.

![Einar](https://user-images.githubusercontent.com/55508821/97813399-3b3e4a00-1c88-11eb-80d3-1dbf2db12bf5.jpg)




## Modos de dificultad y modo arcade
A la hora de plantear la dificultad fuimos claro, tenemos que tener dificultades suficientes para todo el público posible, por eso hemos creado 3, Travesía(Fácil), cacería (normal) y frenesí (dificil) con un nivelado de tiempo, distancia entre trampas, dinero recibido y velocidad distintos en función decada dificultad

Cada nivel tiene un array donde especificamos el porcentaje de aparición de cada tipo de enemigo y de obstáculo. 

Para aumentar el tiempo de juego hemos implementado un modo arcade, siendo este un endless runner clásico donde el jugador probará la destreza obtenida durante la historia. Este no constará de ningún tipo de dificuldad opcional, ya que al ir aumentando progresivamente la velocidad, el jugador necesitará mucho tiempo para poder llegar lejos. Al final de la partida se indicará al jugador la distancia recorrida y su mayor recorrido.

## Mecánicas de juego
El juego tiene un sistema de movimiento limitado, el jugado irá por defecto de izquierda a derecha con la única opción de saltar y atacar.

El juego sigue una dinámica simple de esquive y ataque continuo. Lo interesante de este juego es por el modo historia que va a ir recorriendo el protagonista. 
Los 18 niveles están diseñados para generar continuamente un factor sorpresa por diversos motivos:
 - Aparición de nuevos elementos en cada nivel.
 - Aumento progresivo de la velocidad siguiendo el gráfico de la dificultad.
 - Reducción progresiva de la distancia entre trampas para que el jugador vaya afinando sus habilidades
 - Subniveles con historias secundarias para sacar un dinero extra.
 
 Para mejorar la jugabilidad del usuario hemos implementado unas mejoras en la tienda para que en los niveles finales pueda seguir jugando aún con el ritmo y la dificultad en aumento.
- Salto doble
- Mayor tiempo de invulnerabilidad tras un golpe
- Aumento en la velocidad de ataque de Einar
- Escudos

Diseño de estructura de niveles de bosque con subniveles 

![Fase Bosque](https://user-images.githubusercontent.com/55508821/98613632-f4d79380-22f6-11eb-9d0e-61c4e781673e.png)



Boceto de mapa del bosque "tileable"
![boceto mapa bosque](https://user-images.githubusercontent.com/55508821/96410498-4b195100-11e7-11eb-9289-1263f45bc08c.jpeg)

Aquí se muestra la continuación del mapa del bosque con un enemigo y un obstáculo
![mapa fase 2](https://user-images.githubusercontent.com/55508821/96566275-a7eb3900-12c5-11eb-8953-51e343277f71.jpg)

La escena de selección de mapa es en un tablero inspirado en paisajes de Noruega y Suecia donde el jugador va avanzando por los diferentes niveles del mundo.
![Midgard final](https://user-images.githubusercontent.com/55508821/98613748-3ff1a680-22f7-11eb-9d1f-bfcb319d769d.jpeg)


El diseño de niveles está desarrollado con una curva de dificultad progresiva y situacional en función al avance de los distintos niveles del mundo. Una vez se alcance el hielo en el mapa, la dificultad bajará para que el usuario se pueda adaptar a los nuevos elementos incorporados en estos.


![Dificultad final](https://user-images.githubusercontent.com/55508821/98614050-f190d780-22f7-11eb-85d2-1194f2f01c3c.JPG)

Durante la partida saldrán varios elementos a esquivar, ya sean enemigos u obstáculos:
|Obstáculos|
| -- | 
| 0 - pinchos standar| 
| 1 - plataformas sin enemigos| 
| 2 - enemigos quietos| 
| 3 - plataformas con enemigos| 
| 4 - enemigos con movimiento ¡NO!| 
| 5 - pinchos largos con plataforma para lograr el salto| 
| 6 - pinchos pequeñitos seguidos sin enemigo| 
| 7 - pinchos pequeñitos seguidos con enemigos| 
| 8 - barricada| 
| 9 - tronco tirado| 
| 10 - cabaña con enemigos| 
| 11 - moneda sin enemigos| 
| 12 - barricada en el suelo + barricada en plataforma| 
| 13 - cabaña sin enemigos| 
| 14 - cabaña de pasar por dentro| 
| 15 - moneda con enemigo| 



## Influencias
La travesía por Midgrad transcurre por la región de Sigtuna situado a una hora de Estocolmo en Suecia. Esa zona es conocida por la belleza de sus bosques y el gran lago Mälaren que en invierno se hace uno con el hielo.
[Insertar imágenes del bosque y el lago de verdad y la comparación ]


![imagen](https://user-images.githubusercontent.com/55508821/99160092-ac97e700-26e3-11eb-82e2-9d0158e9e993.png)

![imagen](https://user-images.githubusercontent.com/55508821/99160094-bd485d00-26e3-11eb-89e1-7b86f6b384b2.png)

El bosque cercano a Sigtuna


![imagen](https://user-images.githubusercontent.com/55508821/99160225-3e542400-26e5-11eb-81c8-8548d941615a.png)


El lago de Sigtuna


![imagen](https://user-images.githubusercontent.com/55508821/99160211-f03f2080-26e4-11eb-8d5f-d52a5dd2640a.png)



## Escenarios 

![MAPA BOSQUE](https://user-images.githubusercontent.com/55508821/98616851-f22c6c80-22fd-11eb-9cd8-a69b29f06a4a.jpg)



![MAPA HIELO](https://user-images.githubusercontent.com/55508821/98616835-e80a6e00-22fd-11eb-9470-2e7837797009.jpg)




## Interfaz y modos de juego
El diseño de interfaz de usuario debe de ser muy sencilla y ligera para el usuario, no pretendemos distraer con mucha carga de información para atraer a la mayor cantidad de público posible. El diseño del menú principal tiene como principal atención a Yggdrasil sujetando a los 9 mundos vikingos, estos estarán en gris hasta que se vayan desbloqueando, el jugador seleccionará el mundo y se adentrará en su respectivo tablero de niveles 

![Mení principal acabado](https://user-images.githubusercontent.com/55508821/98905009-f81b7c80-24ba-11eb-91e1-2ed3e8509b3c.jpeg)

A continuación la pantalla en la que aparecerán todos los mundos y la manera de seleccionar mundo
![Yggdrasil con poema](https://user-images.githubusercontent.com/55508821/98905036-023d7b00-24bb-11eb-95c2-0b3372ae8815.jpeg)


La interfaz de juego está mayormente limitada por el lanzamiento del juego en los dispositivos móviles, en la pantalla de juego, una vez el jugador ya haya empuñado el hacha, aparecerá en la esquina superior izquierda a modo de vidas, unos escudos vikingos que te indicarán el número de escudos restantes que restan. Por la esquina superior derecha encontraremos un botón de pausa, ahí el jugador accederá al menú de pausa, donde tendrá las opciones de modificar el volumen, salir del juego o reiniciar la partida.


## Flujo de juego
![A la sombra de Yggdrasil](https://user-images.githubusercontent.com/55508821/98612539-a45f3680-22f4-11eb-8d3b-8b0e48d76194.png)


## Historia

Einar es el vikingo protagonista de esta historia. Fue bendecido con el don de la inmortalidad como regalo de los dioses para que guiara a su pueblo a un lugar próspero. El problema de este regalo es que juega como arma de doble filo, su pueblo acabó siendo arrastrado por el tiempo y el olvido. De ese legado apenas quedan unos poemas y unos cuentos de niños. Einar, ya sin familia ni destino sufre el exilio de la muerte en vida por eso, decide ir a ver a Odín a su propia casa, para reclamar su merecido sitio en el Valhalla para poder reunirse con su familia después de siglos de soliloquio. 

Para ello Einar irá recorriendo los nueve mundos que sostiene Yggdrasil teniendo a Asgard como meta. Esta aventura comienza en su planeta natal Midgard.

Cada mundo se dividirá en unos cuantos subniveles principales con sus respectivos niveles extras, extendiendose a modo de árbol por las fases principales. En estos niveles adicionales el jugador encontraría cuentos y leyendas de dioses y del propio Einar, progagando así la narrativa por varias direcciones.

Habrá 10 niveles principales, 5 en el bosque y los otros 5 en el hielo. Algunos de estos niveles tendrán ramas que contendrán niveles extras con historias adicionales sobre la cultura nórdica. 

La historia principal del primer mundo constará de dos fases a nivel narrativo, el jugador al llegar al final de cada nivel se encontrará un cuervo para hablar, serán dos, Hugin y Munin, cuervo del pensamiento y del recuerdo. Con el apoyo a nivel metafórico del concepto de estos, Einar irá al principio recordando quien era tras tantos siglos de soledad, se hará muchas preguntas acerca de su pasado, su causa y la familia que tenía. Conforme avance, irá redescubriendo su vida hasta llegar al punto de recordar que es inmortal por la gracia o desgracia de Odín, que es el que le ha causado tantas guerras y penas. 
Durante la segunda mitad Einar se encontrará con el cuervo del pensamiento e irá reflexionando sobre diversos temas mientras atraviesa el lago Mälaren. Tratará la descreencia de lo divino, las incongruencias de la guerra y la ignorancia que ata a los hombres a estos dos eternos debates.




[Incluir título de cada nivel y una breve descripción sobre este]

A la hora de acabar el nivel, el jugador recibirá un dinero por el recorrido, dependiendo este del número de muerte y el número de enemigos establecidos. Este dinero también se repartirá de manera distinta en función del nivel de dificultad que se encuentre el jugador, estableceremos una economía de juego pensada para que el jugador pueda comprar habilidades antes de llegar a determinados niveles, así podrá ver su utilidad. Si este avanzara a niveles donde su falta de habilidades especiales le impide continuar, tendrá que volver a niveles pasados o completar todos los subniveles extra para poder obtener el dinero suficiente.



## Estilo artístico y música
La música buscada debía cumplir con la clara presencia de los sonidos vikingos. 
Para el menú principal la canción escogida debía acompañar al jugador en su proceso de exploración por las distintas pantallas. 
Para la canción principal del juego, encargamos a un profesional una canción a medida que pudiera inspirar al jugador la épica suficiente como para querer avanzar por la historia aún con el hándicap del diseño de niveles procedimental. Esta canción es una dosis de adrenalina para el jugador.
La canción de diálogo es un cambio de ritmo importante en el juego, así mostramos las distintas facetas del juego, tiene su parte frenética de juego en donde el jugador deberá ser muy ágil esquivando cada enemigo y una parte mucho más reflexiva donde se busca aumentar el nivel de empatía con el protagonista.


## Experiencia de usuario
Pensando en la experiencia de usuario, tendremos que dividirla  en función el tipo de jugador que tengamos. 

**Casual:** ese jugador que no tiene un gusto muy especifico y juega con pocas pretensiones. Estos se alejan de las dificultades asfixiantes y disfrutan del juego a modo de travesia, no suelen tener un alto nivel de juego.

**Explorador:** ese jugador va a indagar en todos los aspectos del juego, interesandose por la historia y los distintos cambios que van surgiendo conforme va progresando en el juego.

**Arcade:** ese jugador interesado unicamente en el modo endless runner, este tipo de jugadores huye de todo tipo de historia o explicaciones posibles, va al grano y tiene un entretenimiento muy concreto. Suelen buscar un nivel de dificultad fuerte para poner a prueba su destreza.


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


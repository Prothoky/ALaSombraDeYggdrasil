# Ficha de juego


#### Título  
A la sombra de Yggdrasil
#### Género 
Es un runner en 2D scroll lateral con narrativa vikinga.
#### Audiencia
Pensado para todo jugador interesado en la cultura vikinga y todos aquellos que les guste los plataformas.
#### Plataformas
El proyecto está desarrollado para web y para dispositivos móviles.
#### Modos de Juego
El juego consta de un modo Arcade endless runner y un modo historia con 3 dificultades.
#### Temática
La cultura vikinga es el punto de interés del juego, estará basado en los pueblos vikingos del siglo XII al XII.


## Descripción del juego

El juego está inspirado en los clásicos endless runner, pero a diferencia de estos, el nivel en este caso tiene un final. El jugador se encontrará un mundo entero para atravesar con dos tipos de escenarios.  Con este diseño de mapa se busca la exploración por completo del mundo para así conseguir todos los objetos y desafíos por resolver.


Respecto a la historia, el personaje es un vikingo ya vivido que ha olvidado todo lo que fue y comienza poco a poco a recordar todo lo que ha sido. El vikingo irá recorriendo los 9 mundos que describen la mitología nórdica los cuales conforman el universo vikingo.

El protagonista iniciará su periplo en el planeta Midgar, que es el planeta tierra, el cual se encuentra en el centro del árbol yggdrasil (árbol que sostiene los planetas).

Para dotar al juego de personalidad, el recorrido de este estará repleto de referencia a los dioses y a la cultura nórdica, ilustrando de una manera amena sobre diferentes historias ya olvidadas. Se usa la Edda poética como instrumento para describir los mundos y a los dioses siguiendo de una manera fiel el método de transmisión de conocimiento de esa época, la poesía épica.


Durante el transcurso del juego el protagonista irá narrando su experiencia por este último viaje, invitando a una reflexión sobre la vida, su final y hacia donde se dirige su espíritu. De este modo dotamos de vida al personaje y así alcanza un mayor vínculo con el usuario.



## Nuestro protagonista, Einar

Einar, la calamidad de Midgard es un robusto vikingo que lleva muchos siglos perdido en su amnesia. El diseño de nuestro personaje principal está pensado para reforzar el hecho de que es un verdadero vikingo, dotándole de hacha y escudo, una buena vestimenta, un casco con dos cuernos y una barba rojiza, todo esto, acompañado de un cuerpo con unas piernas bastante cortas, hombros muy anchos y brazos gigantes. Este personaje irá dialogando con los cuervos de Odín al final de cada nivel. Durante el camino hará uso de su imponente hacha para librarse de todos los enemigos que le dan caza.

![Einar](https://user-images.githubusercontent.com/55508821/97813399-3b3e4a00-1c88-11eb-80d3-1dbf2db12bf5.jpg)



## Modos de dificultad y modo arcade

Hemos desarrollado 3 dificultades distintas en función de los distintos tipos de jugador que podemos encontrar. Travesía(Fácil), Cacería (normal) y Frenesí (difícil) con un nivelado de tiempo, distancia entre trampas, dinero recibido y velocidad distintos en función de cada dificultad

Para aumentar el tiempo de juego hemos implementado un modo arcade, siendo este un endless runner clásico donde el jugador probará la destreza obtenida durante la historia. Este no constará de ningún tipo de dificultad opcional, ya que al ir aumentando progresivamente la velocidad. El jugador necesitará mucho tiempo para poder llegar lejos. Al final de la partida se indicará al jugador la distancia recorrida y su mayor recorrido.



## Mecánicas de juego
El juego tiene un sistema de movimiento limitado, el jugador irá por defecto de izquierda a derecha con la única opción de saltar y atacar.

El juego sigue una dinámica simple de esquive y ataque continuo. Lo interesante de este juego es por el modo historia que va a ir recorriendo el protagonista. 
Los 18 niveles están diseñados para generar continuamente un factor sorpresa por diversos motivos:
 - Aparición de nuevos elementos en cada nivel.
 - Aumento progresivo de la velocidad siguiendo el gráfico de la dificultad.
 - Reducción progresiva de la distancia entre trampas para que el jugador vaya afinando sus habilidades
 - Subniveles con historias secundarias para sacar un dinero extra.
 
 Para mejorar la jugabilidad del usuario hemos implementado unas mejoras en la tienda para que en los niveles finales pueda seguir     jugando aún con el ritmo y la dificultad en aumento.
- Salto doble
- Mayor tiempo de invulnerabilidad tras un golpe
- Aumento en la velocidad de ataque de Einar
- Escudos


El diseño de niveles está desarrollado con una curva de dificultad progresiva y situacional en función al avance de los distintos niveles del mundo. Una vez se alcance el hielo en el mapa, la dificultad bajará durante el primer nivel para que el usuario se pueda adaptar a los nuevos elementos incorporados en estos.


![Dificultad final](https://user-images.githubusercontent.com/55508821/98614050-f190d780-22f7-11eb-85d2-1194f2f01c3c.JPG)

Durante la partida saldrán varios elementos a esquivar, ya sean enemigos u obstáculos y otros objetos para recoger, como monedas y pergaminos:
|Obstáculos|
| -- | 
| 0 - pinchos estándar| 
| 1 - plataformas sin enemigos| 
| 2 - enemigos quietos| 
| 3 - plataformas con enemigos| 
| 4 - enemigos con movimiento ¡NO!| 
| 5 - pinchos largos con plataforma para lograr el salto| 
| 6 - pinchos pequeños seguidos sin enemigo| 
| 7 - pinchos pequeños seguidos con enemigos| 
| 8 - barricada| 
| 9 - tronco tirado| 
| 10 - cabaña con enemigos| 
| 11 - moneda sin enemigos| 
| 12 - barricada en el suelo + barricada en plataforma| 
| 13 - cabaña sin enemigos| 
| 14 - cabaña de pasar por dentro| 
| 15 - moneda con enemigo| 

## Escenarios 

**Influencias**
La travesía por Midgrad transcurre por la región de Sigtuna, la ciudad más Antigua de la actual Suecia, situado a una hora de Estocolmo. Esa zona es conocida por la belleza de sus bosques y el gran lago Mälaren que en invierno se hace uno con el hielo.

![imagen](https://user-images.githubusercontent.com/55508821/99160092-ac97e700-26e3-11eb-82e2-9d0158e9e993.png)

El bosque cercano a Sigtuna

![imagen](https://user-images.githubusercontent.com/55508821/99160225-3e542400-26e5-11eb-81c8-8548d941615a.png)

El lago de Sigtuna

![imagen](https://user-images.githubusercontent.com/55508821/99160211-f03f2080-26e4-11eb-8d5f-d52a5dd2640a.png)

Los mapas de nuestro juego se componen de cuatro capas distintas, una primera capa situada delante del espacio jugable y de nuestro personaje, para crear una mayor inmersión en el juego; una segunda capa donde se encuentra el suelo y donde se desarrollará toda la acción; una tercera con un paisaje lejano y, una cuarta y última con un cielo. Todas tileables y con distintas velocidades para dar una mayor sensación de velocidad.
En los cinco primeros niveles principales del juego nuestro protagonista tendrá que adentrarse por un bosque frondoso con árboles repletos de ramas a modo de estacas que crecen sobre un terreno bastante escabroso donde abunda la vegetación, donde podemos vislumbrar entre tanta maleza unas montañas nevadas, relacionadas con el segundo mapa jugable.

Boceto del mapa del bosque:

![boceto mapa bosque](https://user-images.githubusercontent.com/55508821/96410498-4b195100-11e7-11eb-9289-1263f45bc08c.jpeg)

Aquí se muestra la continuación del mapa del bosque con un enemigo y un obstáculo:

![mapa fase 2](https://user-images.githubusercontent.com/55508821/96566275-a7eb3900-12c5-11eb-8953-51e343277f71.jpg)

Diseño final del mapa del bosque:

![MAPA BOSQUE](https://user-images.githubusercontent.com/55508821/98616851-f22c6c80-22fd-11eb-9cd8-a69b29f06a4a.jpg)

A partir del sexto nivel principal, sobrepasamos esas montañas mostradas en el primer mapa para cercarnos al lago Mälaren, un paisaje simple pero bonito, con muy pocos árboles a diferencia del escenario anterior, repleto de dunas de nieve que cubren las grises rocas del suelo.

![MAPA HIELO](https://user-images.githubusercontent.com/55508821/98616835-e80a6e00-22fd-11eb-9470-2e7837797009.jpg)



## Interfaz y menús

El diseño de la UI debe de ser muy sencilla y ligera para el usuario, no pretendemos distraer con mucha carga de información para atraer a la mayor cantidad de público posible. 

El elemento esencial de nuestro juego para definir las interfaces es la madera, con el queremos transmitir una sensación rústica que pueda transmitir un poco cual fue uno de los materiales principales de la época, a su vez utilizamos este recurso debido al principal protagonista de la pantalla de selección de mundo, es decir, Yggdrassil.  

De esta manera hemos creado una interfaz completa y con un diseño coherente con el juego y con los elementos que este contiene. Hemos empleando textos con el mismo color y brillo de las luces que emanan de Yggdrasil para indicar información relevante y para los títulos de los menús, además, se ha usado a modo de selección de los distintos botones una flecha con esta misma iluminación para mantener el estilo visual.

Menú Principal

![image](https://user-images.githubusercontent.com/55493193/99725057-d753b800-2ab4-11eb-943f-7229d5ac60cb.png)

Ajustes de volumen

![imagen](https://user-images.githubusercontent.com/55508821/99616884-62ce3a00-2a1e-11eb-9dbe-9e53e327c510.png)

Ajustes de dificultad, idioma y borrado de datos

![imagen](https://user-images.githubusercontent.com/55508821/99616937-81343580-2a1e-11eb-9d0d-19a663908feb.png)

La dificultad de esta pantalla fue encontrar unos nombres adecuados para las distintas dificultades. Para compensar una posible incomprensión de las dificultades, las acompañamos de colores que aumentan tu tono oscuro conforme la dificultad va aumentando.

La pantalla de selección de mundo es bastante importante dentro de este título, ya que el árbol representado es el mismo que da nombre a nuestro juego.
En este menú nos encontramos ante Yggdrasil, el árbol de los nueve mundos, el cuál sostenta los nueve reinos por los que pasará nuestro protagonista, estando siete de ellos en las raíces, uno casi en la copa y otro en el centro, Midgard (La Tierra), el primer mundo jugable de esta versión. Quisimos indicar esto haciendo que el tronco árbol emanase luz en las zonas cercanas a los reinos desbloqueados por el momento, estando este reino a su vez iluminado mientras el resto están algo más apagados. Respecto al árbol como tal, hemos querido optar por una representación clásica, de modo que cualquier persona interesada en la mitología nórdica entendiera qué tenía delante cuando entrase a este menú.

![image](https://user-images.githubusercontent.com/55493193/99725216-0ec26480-2ab5-11eb-9d8d-4109a191ff6f.png)


Pantalla de selección de nivel de Midgard

![image](https://user-images.githubusercontent.com/55493193/99725355-4a5d2e80-2ab5-11eb-85a1-96303519c96d.png)

Pantalla de Tienda
Hemos añadido múltiples sonidos para cada utensilio para hacer que el efecto de compra tenga un feedback mayor por parte del usuario.

![imagen](https://user-images.githubusercontent.com/55508821/99617606-f3594a00-2a1f-11eb-96d6-564f8e0de0c0.png)


## Flujo de juego
![A la sombra de Yggdrasil](https://user-images.githubusercontent.com/55508821/99619135-10434c80-2a23-11eb-894f-02d202865c73.png)



## Historia

Einar es el vikingo protagonista de esta historia. Fue bendecido con el don de la inmortalidad como regalo de los dioses para que guiara a su pueblo a un lugar próspero. El problema de este regalo es que juega como arma de doble filo, su pueblo acabó siendo arrastrado por el tiempo y el olvido. De ese legado apenas quedan unos poemas y unos cuentos de niños. 

Einar, ya sin familia ni destino sufre el exilio de la muerte en vida por eso, durante su periplo irá recordando su legado y reflexionando sobre los dioses y sus influencias sobre el mundo.

Durante su viaje por Midgard oirá el rumor de que Yggdrasil está en peligro y que el poder de los dioses no ha tenido ningún efecto.
Einar irá recorriendo los nueve mundos que sostiene Yggdrasil teniendo a Asgard como meta.

Cada mundo se divide en unos cuantos niveles principales con sus respectivos subniveles extras, extendiéndose a modo de ramas por las fases principales. En estos niveles adicionales el jugador encuentra cuentos y leyendas de dioses y del propio Einar, enriqueciendo la narrativa y permitiendo contar muchas más leyendas sin tener que saturar la historia principal.

Hay 10 niveles principales, 5 en el bosque y los otros 5 en el hielo. Algunos de estos niveles extra.
La historia principal del primer mundo consta de dos fases a nivel narrativo, el jugador al llegar al final de cada nivel se encuentra con dos cuervos para hablar, son Hugin y Munin, cuervo del pensamiento y del recuerdo. Con el apoyo a nivel metafórico del concepto de estos, Einar irá al principio recordando quien era tras tantos siglos de soledad, se hará muchas preguntas acerca de su pasado, su causa y la familia que tenía. Conforme avance, irá redescubriendo su vida hasta llegar al punto de recordar que es inmortal por la gracia o desgracia de Odín, que es el que le ha causado tantas guerras y penas. 
Durante la segunda mitad Einar se encontrará con el cuervo del pensamiento e irá reflexionando sobre diversos temas mientras atraviesa el lago Mälaren. Tratará la descreencia de lo divino, las incongruencias de la guerra y la ignorancia que ata a los hombres a estos dos eternos debates.

A la hora de acabar el nivel, el jugador recibe un dinero por el recorrido. Este dinero también se reparte de manera distinta en función del nivel de dificultad que se encuentre el jugador. Hay una economía de juego pensada para que el jugador pueda comprar habilidades antes de llegar a determinados niveles, así puede comprobar su utilidad. Si este avanzara a niveles donde su falta de habilidades especiales le impide continuar, tendrá que volver a niveles pasados o completar todos los subniveles extra para poder obtener el dinero suficiente.



## Estilo artístico y música

Nuestro título cuenta con dos técnicas bastante diferenciadas a la hora de crear todo el arte del juego. Los menús, mapas y obstáculos que podemos ver en el transcurso del juego poseen un estilo semirrealista, el cual, combinado con  personajes y enemigos dibujados a contornos y con colores planos, da un toque algo diferente y atractivo al gameplay.
Un juego que nos ha servido mucho de referencia a la hora de llevar a cabo este estilo ha sido el famoso Hollow Knight, el cual también contaba con personajes y enemigos dibujados con estos trazados y con fondos en 2D que se combinaban en distintas capas para formar un espacio tridimensional, lo cuál le da una mayor profundidad a los escenarios y al juego en general.

Estas son precisamente las bases principales del estilo artístico de A la sombra de Yggdrasil: crear personajes y criaturas simples en cuanto a volumen y sombras se refiere, pero con estudiados y algunas veces incluso complejos diseños, que beben mucho de la cultura y mitología nórdica; para introducirlos en unos escenarios semirrealistas compuestos por varias capas para conseguir tanto un efecto de mayor profundidad como una mayor inmersión por parte del jugador en el mundo que hemos creado. De este modo, estos personajes y criaturas destacan mucho más que si tuvieran el mismo estilo que los mapas y los objetos inmóviles, pero podemos seguir apreciando la belleza de ese estilo semirealista aplicado a los escenarios, obstáculos e incluso algunos menús del juego.

La música buscada debía cumplir con la clara presencia de los sonidos vikingos. 
Para el menú principal la canción escogida debía acompañar al jugador en su proceso de exploración por las distintas pantallas. 
Para la canción principal del juego, encargamos a un profesional una canción a medida que pudiera inspirar al jugador la épica suficiente como para querer avanzar por la historia aún con el hándicap del diseño de niveles procedimental. Esta canción es una dosis de adrenalina para el jugador.
La canción de diálogo es un cambio de ritmo importante en el juego, así mostramos las distintas facetas del juego, tiene su parte frenética de juego en donde el jugador deberá ser muy ágil esquivando cada enemigo y una parte mucho más reflexiva donde se busca aumentar el nivel de empatía con el protagonista.



## Experiencia de usuario

Pensando en la experiencia de usuario, tendremos que dividirla  en función el tipo de jugador que tengamos. 

**Casual:** ese jugador que no tiene un gusto muy específico y juega con pocas pretensiones. Estos se alejan de las dificultades asfixiantes y disfrutan del juego a modo de travesía, no suelen tener un alto nivel de juego.

**Explorador:** ese jugador va a indagar en todos los aspectos del juego, interesándose por la historia y los distintos cambios que van surgiendo conforme va progresando en el juego.

**Arcade:** ese jugador interesado únicamente en el modo endless runner, este tipo de jugadores huye de todo tipo de historia o explicaciones posibles, va al grano y tiene un entretenimiento muy concreto. Suelen buscar un nivel de dificultad fuerte para poner a prueba su destreza.



## Modelo de negocio

Para sostener este proyecto a dos años vista tenemos desarrollado un sistema de lanzamiento periódico del contenido del juego, de este modo conseguiremos extender el pulso del juego y rentabilizar el trabajo con un mayor beneficio económico.

Al constar de 9 mundos el juego, vamos a sacar el primer mundo nada más empezar y el segundo a las 2/3 semanas del lanzamiento. El resto de mundo se irán lanzando cada mes y medio, así diversificamos el contenido y damos un descanso a los jugadores para que no consuman su interés por el juego de una manera tan rápida.

Para rentabilizar el producto hay diferentes maneras que obtener beneficios:

Al sacar los nuevos capítulos, estos tendrán un precio de 2 euros, un precio significativo pero que multiplicado con los 8 mundos, se convierte en un beneficio muy amplio. Para captar la atención del cliente en estos nuevos planetas, implementaremos también nuevas habilidades, mapas, skins y personajes jugables.

Compra de un Season pass completo que incluye todos los mundos por 10 euros para asegurar la compra completa por parte del jugador.

Sistema de donaciones en las páginas publicadas con un mínimo de 2 euros.


Por lo que a la tienda se refiere, se irá subiendo contenido con cierta frecuencia gratuito. 
En nuestro modelo de negocio no contemplamos que el usuario tenga que gastar dinero para alcanzar una mayor experiencia. Incentivaremos al jugador a repetir los niveles para ir obteniendo monedas a través de distintos desafíos que irán surgiendo de manera constante y aleatoria.

En la tienda se podrán adquirir escudos para las vidas, y nuevas habilidades para facilitar el avance del jugador, sobre todo para su recorrido por el modo difícil. 

Modelo de lienzo 

![imagen](https://user-images.githubusercontent.com/55508821/99619556-fce4b100-2a23-11eb-9a9b-a79e9d245721.png)



## Controles y tutorial
Los controles los vamos a definir en dos bloques, cada uno en función al entorno de juego en el que el usuario se encuentra:
Para ordenador está el espacio para saltar, el control para atacar y el ratón para moverse por el menú.
En dispositivos móviles haces un pleno uso de la pantalla táctil y el salto se realiza pulsando un botón situado a la izquierda inferior de la pantalla(horizontal) y el ataque con el botón situado en la parte inferior derecha(horizontal).

Para el tutorial hemos diseñado una pantalla en la que simplifique el contenido del juego, utilizando pocas palabras y los propios elementos del juego para explicar al jugador la tienda y su recorrido por el modo historia.

 Tutorial
 
![image](https://user-images.githubusercontent.com/55493193/99724672-41b82880-2ab4-11eb-8398-4aa71de8fb15.png)




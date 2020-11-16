/*
const seasons = {
    SUMMER: 'summer',
    WINTER: 'winter',
    SPRING: 'spring',
    AUTUMN: 'autumn'
}

LevelTrapValues[i] -> i indica el nivel (10 modo endless)
LevelTrapValues[i][j, k] -> j indica la trampa a settear el porcentaje de aparición,
k indica el porcentaje de aparición de dicha trampa. Se suman todos los porcentajes de
aparición de LevelTrapValues[i] y ese es el total.
(ej: [0, 3],[1, 3],[2, 3] aparecerían igual porcentaje de trampas 0, 1 y 2)
Leyenda de trampas

0 - pinchos standar
1 - plataformas sin enemigos
2 - enemigos quietos
3 - plataformas con enemigos
4 - aguila
5 - pinchos largos con plataforma para lograr el salto
6 - pinchos pequeñitos seguidos sin enemigo
7 - pinchos pequeñitos seguidos con enemigos
8 - barricada
9 - tronco tirado
10 - cabaña con enemigos
11 - moneda sin enemigos
12 - barricada en el suelo + barricada en plataforma
13 - cabaña sin enemigos
14 - cabaña de pasar por dentro
15 - moneda con enemigo
16 - moneda con enemigo valiosa
*/

var levelTrapValues = new Array();
levelTrapValues[0] =  [ [0, 1], [1, 1], [2, 0], [3, 0], [5, 0], [6, 0], [7, 0], [8, 2], [9, 0], [10,0], [11, 1], [12, 0], [13, 2],[14,0],[15,0] ];//Empiezo con 0,1,8,11,13
levelTrapValues[1] =  [ [0, 1], [1, 1], [2, 1], [3, 0], [5, 0], [6, 0], [7, 0], [8, 1], [9, 2], [10,0], [11, 1], [12, 0], [13, 1],[14,0],[15,0] ];//Añado el 9 y el 2 
levelTrapValues[2] =  [ [0, 1], [1, 1], [2, 1], [3, 0], [5, 0], [6, 0], [7, 0], [8, 2], [9, 1], [10,0], [11, 1], [12, 0], [13, 2],[14,2],[15,1] ];//Añado el 14 y el 15
levelTrapValues[3] =  [ [0, 1], [1, 1], [2, 1], [3, 2], [5, 2], [6, 0], [7, 0], [8, 1], [9, 1], [10,0], [11, 1], [12, 0], [13, 1],[14,1],[15,1] ];//añado el 3 y el 5
levelTrapValues[4] =  [ [0, 1], [1, 1], [2, 1], [3, 2], [5, 1], [6, 0], [7, 0], [8, 2], [9, 1], [10,0], [11, 1], [12, 0], [13, 1],[14,1],[15,2] ];//No añado nada
levelTrapValues[5] =  [ [0, 1], [1, 1], [2, 1], [3, 2], [5, 2], [6, 0], [7, 0], [8, 1], [9, 1], [10,2], [11, 1], [12, 0], [13, 1],[14,1],[15,1] ];//Solo añado el 10 ya que empieza el lago 
levelTrapValues[6] =  [ [0, 1], [1, 1], [2, 1], [3, 2], [5, 1], [6, 3], [7, 0], [8, 1], [9, 1], [10,1], [11, 1], [12, 0], [13, 2],[14,1],[15,1] ];//Añado el 6
levelTrapValues[7] =  [ [0, 1], [1, 1], [2, 1], [3, 1], [5, 1], [6, 1], [7, 3], [8, 1], [9, 1], [10,1], [11, 1], [12, 0], [13, 1],[14,1],[15,2] ];//Añado el 7
levelTrapValues[8] =  [ [0, 1], [1, 1], [2, 1], [3, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10,1], [11, 1], [12, 2], [13, 1],[14,1],[15,1] ];//Añado el 12
levelTrapValues[9] =  [ [0, 1], [1, 1], [2, 1], [3, 2], [5, 1], [6, 2], [7, 2], [8, 1], [9, 1], [10,1], [11, 1], [12, 3], [13, 1],[14,1],[15,3] ];
levelTrapValues[10] = [ [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 1], [7, 1], [8, 2], [9, 2], [10, 1], [12, 2], [13, 1], [14, 2] ];//es el Endless runner

/*
LevelSetting[i][l] -> i indica el nivel (10 modo endless), l la dificultad (0 = facil, 1 = normal , 2 dificil)
LevelTrapvalues[i][l][j] -> j indica el valor de la setting.
Leyenda de índices de settings:
0 - longitud del mapa (en múltiplos de 1270, siendo 10 = 12700...(predeterminado))
1 - velocidad del personaje (recomendadas 500, 550, 600)
2 - distancia intertrampa base en px (predeterminada 200)
3 - oro base recibido
*/
var levelSettings = new Array();
levelSettings[0] = [ [25, 500, 900, 100], [25, 575, 700, 70], [28, 675, 500, 50] ];
levelSettings[1] = [ [30, 500, 500, 100], [30, 575, 400, 70], [35, 675, 300, 50] ];
levelSettings[2] = [ [35, 500, 400, 100], [37, 575, 250, 70], [42, 675, 200, 50] ];
levelSettings[3] = [ [40, 500, 300, 100], [44, 575, 175, 70], [50, 675, 150, 50] ];
levelSettings[4] = [ [45, 550, 250, 100], [50, 625, 150, 70], [55, 700, 125, 50] ];
levelSettings[5] = [ [50, 500, 300, 100], [55, 600, 175, 70], [60, 675, 150, 50] ];//Aquí bajan las velocidades un poco por que es la primera vez que aparece el lago
levelSettings[6] = [ [55, 550, 250, 100], [60, 625, 150, 70], [65, 700, 125, 50] ];//A partir de aquí reduzco en 25 la distancia inter trampa  y la velocidad  de cada dificultad
levelSettings[7] = [ [55, 550, 250, 100], [60, 625, 150, 70], [65, 700, 125, 50] ];
levelSettings[8] = [ [55, 550, 250, 100], [60, 625, 150, 70], [65, 700, 125, 50] ];
levelSettings[9] = [ [60, 600, 250, 150], [65, 650, 150, 100],[70, 750, 125, 100] ];//Para el ultimo nivel aprieto más todavia la velocidad 
levelSettings[10] = [ [10, 550, 200, 100] ];
	
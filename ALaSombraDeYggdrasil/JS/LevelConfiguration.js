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
4 - enemigos con movimiento ¡NO USAR!
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
*/

var levelTrapValues = new Array();
levelTrapValues[0] =  [ [0, 1], [1, 1], [2, 0], [3, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10,0], [11, 1], [12, 0], [13, 1],[14,0],[15,0] ];//Empiezo con 0,1,11,13
levelTrapValues[1] =  [ [0, 1], [1, 1], [2, 0], [3, 0], [5, 0], [6, 0], [7, 0], [8, 1], [9, 0], [10,0], [11, 1], [12, 0], [13, 1],[14,0],[15,0] ];//Añado el 8 
levelTrapValues[2] =  [ [0, 1], [1, 1], [2, 1], [3, 0], [5, 0], [6, 0], [7, 0], [8, 1], [9, 1], [10,0], [11, 1], [12, 0], [13, 1],[14,0],[15,0] ];//Añado el 9 y el 2 
levelTrapValues[3] =  [ [0, 1], [1, 1], [2, 1], [3, 0], [5, 0], [6, 0], [7, 0], [8, 1], [9, 1], [10,0], [11, 1], [12, 0], [13, 1],[14,1],[15,1] ];//Añado el 14 y el 15
levelTrapValues[4] =  [ [0, 1], [1, 1], [2, 1], [3, 1], [5, 1], [6, 0], [7, 0], [8, 1], [9, 1], [10,0], [11, 1], [12, 0], [13, 1],[14,1],[15,1] ];//añado el 3 y el 5
levelTrapValues[5] =  [ [0, 1], [1, 1], [2, 1], [3, 1], [5, 1], [6, 0], [7, 0], [8, 1], [9, 1], [10,1], [11, 1], [12, 0], [13, 1],[14,1],[15,1] ];//Solo añado el 10 ya que empieza el lago 
levelTrapValues[6] =  [ [0, 1], [1, 1], [2, 1], [3, 1], [5, 1], [6, 1], [7, 0], [8, 1], [9, 1], [10,1], [11, 1], [12, 0], [13, 1],[14,1],[15,1] ];//Añado el 6
levelTrapValues[7] =  [ [0, 1], [1, 1], [2, 1], [3, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10,1], [11, 1], [12, 0], [13, 1],[14,1],[15,1] ];//Añado el 7
levelTrapValues[8] =  [ [0, 1], [1, 1], [2, 1], [3, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10,1], [11, 1], [12, 1], [13, 1],[14,1],[15,1] ];//Añado el 12
levelTrapValues[9] =  [ [0, 1], [1, 1], [2, 1], [3, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10,1], [11, 1], [12, 1], [13, 1],[14,1],[15,1] ];
levelTrapValues[10] = [ [0, 2], [1, 2], [2, 2], [3, 2], [5, 2], [6, 1], [7, 1], [8, 2], [9, 2], [10, 1], [12, 2], [13, 1], [14, 2] ];//es el Endless runner

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
levelSettings[0] = [ [30, 575, 200, 100], [35, 625, 175, 100], [40, 675, 150, 100] ];
levelSettings[1] = [ [35, 575, 200, 100], [40, 625, 175, 100], [45, 675, 150, 100] ];
levelSettings[2] = [ [40, 575, 200, 100], [45, 625, 175, 100], [50, 675, 150, 100] ];
levelSettings[3] = [ [45, 575, 200, 100], [50, 625, 175, 100], [55, 675, 150, 100] ];
levelSettings[4] = [ [50, 575, 200, 100], [55, 625, 175, 100], [60, 675, 150, 100] ];
levelSettings[5] = [ [50, 575, 200, 100], [55, 625, 175, 100], [60, 675, 150, 100] ];
levelSettings[6] = [ [55, 600, 175, 100], [60, 650, 150, 100], [65, 700, 125, 100] ];//A partir de aquí reduzco en 25 la distancia inter trampa  y la velocidad  de cada dificultad
levelSettings[7] = [ [60, 600, 175, 100], [65, 650, 150, 100], [70, 700, 125, 100] ];
levelSettings[8] = [ [65, 600, 175, 100], [70, 650, 150, 100], [75, 700, 125, 100] ];
levelSettings[9] = [ [70, 650, 175, 100], [75, 700, 150, 100], [80, 750, 125, 100] ];//Para el ultimo nivel aprieto más todavia la velocidad 
levelSettings[10] = [ [10, 500, 200, 100] ];

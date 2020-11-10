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
6 - pinchos pequeñitos seguidos
7 - pinchos pequeñitos seguidos con enemigos
8 - barricada
9 - tronco tirado
10 - cabaña
11 - moneda
12 - barricada en el suelo + barricada en plataforma
13 - cabaña sin enemigos
*/

var levelTrapValues = new Array();
levelTrapValues[0] =  [ [0, 1], [1, 1], [2, 0], [3, 0], [5, 0], [6, 0], [7, 0], [8, 1], [9, 0], [10, 1], [11, 1], [12, 0], [13, 0] ];
levelTrapValues[1] =  [ [0, 1], [1, 1], [2, 1], [3, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1] ];
levelTrapValues[2] =  [ [0, 1], [1, 1], [2, 1], [3, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1] ];
levelTrapValues[3] =  [ [0, 1], [1, 1], [2, 1], [3, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1] ];
levelTrapValues[4] =  [ [0, 1], [1, 1], [2, 1], [3, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1] ];
levelTrapValues[5] =  [ [0, 1], [1, 1], [2, 1], [3, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1] ];
levelTrapValues[6] =  [ [0, 1], [1, 1], [2, 1], [3, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1] ];
levelTrapValues[7] =  [ [0, 1], [1, 1], [2, 1], [3, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1] ];
levelTrapValues[8] =  [ [0, 1], [1, 1], [2, 1], [3, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1] ];
levelTrapValues[9] =  [ [0, 1], [1, 1], [2, 1], [3, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1] ];
levelTrapValues[10] = [ [0, 1], [1, 1], [2, 1], [3, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1] ];

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
levelSettings[0] = [ [30, 550, 200, 100], [35, 550, 200, 100], [40, 550, 200, 100] ];
levelSettings[1] = [ [35, 550, 200, 100], [40, 550, 200, 100], [45, 550, 200, 100] ];
levelSettings[2] = [ [40, 550, 200, 100], [45, 550, 200, 100], [50, 550, 200, 100] ];
levelSettings[3] = [ [45, 550, 200, 100], [50, 550, 200, 100], [55, 550, 200, 100] ];
levelSettings[4] = [ [50, 550, 200, 100], [55, 550, 200, 100], [60, 550, 200, 100] ];
levelSettings[5] = [ [50, 550, 200, 100], [55, 550, 200, 100], [60, 550, 200, 100] ];
levelSettings[6] = [ [55, 550, 200, 100], [60, 550, 200, 100], [65, 550, 200, 100] ];
levelSettings[7] = [ [60, 550, 200, 100], [65, 550, 200, 100], [70, 550, 200, 100] ];
levelSettings[8] = [ [65, 550, 200, 100], [70, 550, 200, 100], [75, 550, 200, 100] ];
levelSettings[9] = [ [70, 550, 200, 100], [75, 550, 200, 100], [80, 550, 200, 100] ];
levelSettings[10] = [ [10, 500, 200, 100] ];
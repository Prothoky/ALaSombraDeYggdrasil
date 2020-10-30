/*
LevelTrapValues[i] -> i indica el nivel
LevelTrapValues[i][j, k] -> j indica la trampa a settear el porcentaje de aparición, 
k indica el porcentaje de aparición de dicha trampa. Se suman todos los porcentajes de
aparición de LevelTrapValues[i] y ese es el total.
(ej: [0, 3],[1, 3],[2, 3] aparecerían igual porcentaje de trampas 0, 1 y 2)
Leyenda de trampas
0 - pinchos standar
1 - plataformas
2 - enemigos quietos
3 - plataformas con enemigos
4 - enemigos con movimiento
5 - pinchos largos con plataforma para lograr el salto
6 - pinchos pequeñitos seguidos
7 - pinchos pequeñitos seguidos con enemigos
8 - barricada
9 - tronco tirado
*/

var levelTrapValues = new Array();
levelTrapValues[0] = [ [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1] ];
levelTrapValues[1] = [ [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1] ];
levelTrapValues[2] = [ [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1] ];
levelTrapValues[3] = [ [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1] ];
levelTrapValues[4] = [ [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1] ];
levelTrapValues[5] = [ [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1] ];
levelTrapValues[6] = [ [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1] ];
levelTrapValues[7] = [ [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1] ];
levelTrapValues[8] = [ [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1] ];
levelTrapValues[9] = [ [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1] ];

/*
LevelSetting[i][l] -> i indica el nivel, l la dificultad (0 = difícil, 1 = normal)
LevelTrapvalues[i][l][j] -> j indica el valor de la setting.
Leyenda de índices de settings:
0 - longitud del mapa (en múltiplos de 1270, siendo 10 = 12700...(predeterminado))
1 - velocidad del personaje (recomendadas 500, 550, 600)
2 - distancia intertrampa base en px (predeterminada 200)
3 - oro base recibido
*/
var levelSettings = new Array();
levelSettings[0] = [ [10, 550, 200, 100], [10, 550, 200, 100] ];
levelSettings[1] = [ [10, 550, 200, 100], [10, 550, 200, 100] ];
levelSettings[2] = [ [10, 550, 200, 100], [10, 550, 200, 100] ];
levelSettings[3] = [ [10, 550, 200, 100], [10, 550, 200, 100] ];
levelSettings[4] = [ [10, 550, 200, 100], [10, 550, 200, 100] ];
levelSettings[5] = [ [10, 550, 200, 100], [10, 550, 200, 100] ];
levelSettings[6] = [ [10, 550, 200, 100], [10, 550, 200, 100] ];
levelSettings[7] = [ [10, 550, 200, 100], [10, 550, 200, 100] ];
levelSettings[8] = [ [10, 550, 200, 100], [10, 550, 200, 100] ];
levelSettings[9] = [ [10, 550, 200, 100], [10, 550, 200, 100] ];



# Simulated Annealing :exclamation:

## 1 Introducción
 El Recocido Simulado (SA) es uno de los métodos meta-heurísticos más sencillos y conocidos para abordar la difícil optimización global de caja negra.
 (aquellos cuya función objetivo no está dada explícitamente y sólo puede evaluarse mediante una costosa simulación).  

## Conceptos básicos

A principios de los años 80, tres investigadores de IBM, Kirkpatrick, Gelatt y Vecchi [12] introdujeron los conceptos de recocido en la optimización combinatoria. Estos conceptos se basan en una fuerte analogía con el recocido físico de los materiales. Este proceso consiste en llevar un sólido a un estado de baja energía tras
 después de aumentar su temperatura. 
 Se puede resumir en las dos etapas siguientes
 
- Llevar el sólido a una temperatura muy alta hasta la "fusión" de la estructura;
- Enfriar el sólido según un esquema muy particular de disminución de la temperatura para alcanzar un estado sólido de mínima energía.


En la fase líquida, las partículas se distribuyen al azar. Se ha demostrado que el estado de energía mínima se alcanza siempre que la temperatura inicial sea lo suficientemente alta y el tiempo de enfriamiento sea lo suficientemente largo.

Si no es así, el sólido se encontrará en un estado metaestable con energía no mínima; esto se denomina endurecimiento, que consiste en el enfriamiento repentino
de un sólido.👨‍🚀

![Figura 1](https://github.com/armaFab/metaheuristicas/blob/main/simulatedAnnealing/images/diagrama1.PNG)

Figura 1: Cuando la temperatura es alta, el material se encuentra en estado líquido (izquierda). En un proceso de endurecimiento, el material alcanza un estado sólido con energía no mínima (estado metaestable; arriba a la derecha). En este caso, la estructura de los átomos no tiene simmetría.
Durante un proceso de recocido lento, el material alcanza también un estado sólido pero en el que los átomos se organizan con simetría (cristal; abajo a la derecha).

❗ Antes de describir el algoritmo de recocido simulado para la optimización necesitamos introducir los principios de los algoritmos de optimización de búsqueda local, de los cuales el recocido simulado es una extensión.

### ⭐ 2.1 Local search (or Monte Carlo) algorithms

Estos algoritmos optimizan la función de coste explorando la vecindad del punto actual en el espacio de soluciones.

En las siguientes definiciones consideramos (S, f ) una instanciación de un problema de optimización combinatoria (S: conjunto de soluciones factibles, f : función objetivo). 
 
 🎈 Acontinuación se muestran la definiciones formales sin traducción tomadas textualmente de la bibliografia.
 
 ![Figura 2](https://github.com/armaFab/metaheuristicas/blob/main/simulatedAnnealing/images/diagrama2.PNG)
 ![Figura 4](https://github.com/armaFab/metaheuristicas/blob/main/simulatedAnnealing/images/diagrama4.PNG)
 
 Un algoritmo de búsqueda local es un algoritmo iterativo que comienza su búsqueda desde un punto factible, dibujado aleatoriamente en el espacio de estados. A continuación, se aplica sucesivamente un mecanismo de generación para encontrar una solución mejor (en términos de valor de la función objetivo), explorando la vecindad de la solución actual. Si se encuentra dicha solución, se convierte en la solución actual. El algoritmo finaliza cuando no se encuentra ninguna mejora, y la solución actual se considera la solución aproximada del problema de optimización. Se puede resumir el algoritmo con el siguiente pseudocódigo para un problema de minimización:
 
![Figura 3](https://github.com/armaFab/metaheuristicas/blob/main/simulatedAnnealing/images/diagrama3.PNG)
![Figura 5](https://github.com/armaFab/metaheuristicas/blob/main/simulatedAnnealing/images/diagrama5.PNG)

Así, por definición, los algoritmos de búsqueda local convergen a los óptimos locales a menos que se tenga una estructura de vecindad exacta. Esta noción de vecindad exacta es teórica porque en la práctica suele llevar a recurrir a una enumeración completa del espacio de búsqueda.
 
Intuitivamente, si la solución actual "cae" en un subdominio sobre el que la función objetivo es convexa, el algoritmo queda atrapado en este sub-dominio, a menos que la estructura de vecindad asociada con el mecanismo de generación pueda alcanzar puntos fuera de este subdominio.
Para evitar quedar atrapado en mínimos locales, es necesario entonces definir un proceso susceptible de aceptar transiciones de estado actuales que reduzcan momentáneamente el rendimiento (en términos de objetivo) de la solución actual: este es el principio fundamental de la función de recocido simulado, tal que antes de describir este algoritmo, es necesario introducir el algoritmo de Metrópolis [15] que es un componente básico de SA.


### ⭐ 2.2 Metropolis Algorithm

En 1953, tres investigadores estadounidenses (Metropolis, Rosenbluth y Teller [15]) desarrollaron un algoritmo para simular el recocido físico, como se describe en
sección 2. Su objetivo era reproducir fielmente la evolución de la estructura física de un material sometido a recocido.

Este algoritmo se basa en técnicas de Monte Carlo, que consiste en generar una secuencia de estados de del sólido de la siguiente manera.

Partiendo de un estado inicial i de energía Ei, se genera un nuevo estado j de energía E j generada modificando la posición de una partícula. Si la diferencia de energía, Ei - E j, es positiva (el nuevo estado presenta menor energía), el estado j se convierte en el nuevo estado actual. Si la diferencia de energía es menor o igual a cero, la probabilidad de que el estado j se convierta en el estado actual viene dada por:

![Figura 6](https://github.com/armaFab/metaheuristicas/blob/main/simulatedAnnealing/images/diagrama6.PNG)

donde T representa la temperatura del sólido y kB es la constante de Boltzman (kB = 1,38 × 10-23 joule/Kelvin).
El criterio de aceptación del nuevo estado se denomina criterio de Metrópolis. Si el enfriamiento se realiza con suficiente lentitud, el sólido alcanza un estado de equilibrio a cada temperatura dada T . En el algoritmo de Metropolis este equilibrio se consigue generando un gran número de transiciones a
cada temperatura. El equilibrio térmico se caracteriza por la distribución estadística de Boltzmann. Esta distribución da la probabilidad de que el sólido se encuentre en el estado i de energía Ei a la temperatura T :

![Figura 7](https://github.com/armaFab/metaheuristicas/blob/main/simulatedAnnealing/images/diagrama7.PNG)

donde X es una variable aleatoria asociada al estado actual del sólido y Z(T ) es un coeficiente de normalización, definido como:
![Figura 8](https://github.com/armaFab/metaheuristicas/blob/main/simulatedAnnealing/images/diagrama8.PNG)

### ⭐ 2.3 Simulated annealing (SA) algorithm

En el algoritmo SA, se aplica el algoritmo de Metrópolis para generar una secuencia de soluciones en el espacio de estados S. Para ello, se hace una analogía entre un sistema multipartícula y nuestro problema de optimización utilizando las siguientes equivalencias:

- Los puntos del espacio de estados representan los posibles estados del sólido;
- La función a minimizar representa la energía del sólido.

A continuación, se introduce un parámetro de control c, que actúa como temperatura. Este parámetro se expresa con las mismas unidades que el objetivo que se optimiza. También se supone que el usuario proporciona para cada punto del espacio de estados, una vecindad y un mecanismo para generar una solución en esta vecindad. A continuación, definimos el principio de aceptación :

![Figura 9](https://github.com/armaFab/metaheuristicas/blob/main/simulatedAnnealing/images/diagrama9.PNG)

donde c es el parámetro de control.
Por analogía, el principio de generación de un vecino corresponde al mecanismo de perturbación del algoritmo de Metrópolis, y el principio de aceptación representa el criterio de Metropolis.

![Figura 10](https://github.com/armaFab/metaheuristicas/blob/main/simulatedAnnealing/images/diagrama10.PNG)

En la siguiente sección, ck es el valor del parámetro de temperatura, y Lk es el número de transiciones generadas en una iteración k, el número de transiciones generadas en una iteración k. 

El SA puede resumirse como sigue

![Figura 11](https://github.com/armaFab/metaheuristicas/blob/main/simulatedAnnealing/images/diagrama11.PNG)

Una de las principales características del recocido simulado es su capacidad para aceptar transiciones que degradan la función objetivo.
Al principio del proceso, el valor de la temperatura ck es alto lo que permite aceptar transiciones con una alta degradación del objetivo y, por tanto, explorar a fondo el espacio de estados. A medida que ck disminuye sólo se aceptan las transiciones que mejoran el objetivo, o con un bajo deterioro del objetivo. Por último, cuando ck tiende a cero, no se acepta ningún deterioro del objetivo, y el algoritmo SA se comporta como un algoritmo de Monte Carlo.

![Figura 12](https://github.com/armaFab/metaheuristicas/blob/main/simulatedAnnealing/images/diagrama12.PNG)


# 🆎Bibliografía 
[1] E. Aarts and J. Korst. Simulated Annealing and Boltzmann Machines:A Stochastic Approach to Combinatorial Optimization and Neural Computing. Wiley, NY, USA, 1989.

[2] E. Aarts and P. Van Laarhoven. A new polynomial time cooling schedule. In Proceedings of the IEEE International Conference on Computer-Aided Design, Santa Clara, pages 206–208.

[3] E. Aarts and P. Van Laarhoven. Statistical cooling : A general approach to combinatorial problems. Philips Journal of Research, 40:193–226, 1985.

[4] H. Bayram and R. Sahin. A new simulated annealing approach for travelling salesman problem. Mathematical and Computational Applications, 18(3):313–322, 2013.

[5] S. Chaimatanan, D. Delahaye, and M. Mongeau. A hybrid metaheuristic optimization algorithm for strategic planning of 4D aircraft trajec- tories at the continental scale. IEEE Computational Intelligence Magazine, 9(4):46–61, 2014.

[6] M. Chams, A. Hertz, and D. de Werra. Some experiments with simulated annealing for coloring graphs. European Journal of Operational Research, 32(2):260 – 266, 1987.

[7] Y. Crama and M. Schyns. Simulated annealing for complex portfolio selection problems. European Journal of Operational Research, 150(3):546–571, 2003.

[8] T. Emden-Weiner and M. Proksch. Best practice simulated annealing for the airline crew scheduling problem. Journal of Heuristics, 5(4):419–436, 1999.

[9] R. Hanafi and E Kozan. A hybrid constructive heuristic and simulated annealing for railway crew scheduling. Computers & Industrial Engi- neering, 70:11–19, 2014.
[10] A. Islami, S. Chaimatanan, and D. Delahaye. Large-scale 4D trajec tory planning. In Electronic Navigation Research Institute, editor, Air Traffic Management and Systems II, volume 420 of Lecture Notes in Electrical Engineering, pages 27–47. Springer Japan, 2017.

[11] S. Kirkpatrick, C.D. Gelatt, and M.P. Vecchi. Optimization by simulated annealing. Science, 220(4598):671, 1983. 42


    



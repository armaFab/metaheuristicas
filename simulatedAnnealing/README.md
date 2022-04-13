# Simulated Annealing :exclamation:

## 1 Introducción
 El Recocido Simulado (SA) es uno de los métodos meta-heurísticos más sencillos y conocidos para abordar la difícil optimización global de caja negra.
heurístico para abordar los difíciles problemas de optimización global de caja negra (aquellos cuya función objetivo no está dada explícitamente y sólo puede evaluarse mediante una costosa simulación informática).  

## Conceptos básicos

A principios de los años 80, tres investigadores de IBM, Kirkpatrick, Gelatt y Vecchi [12] introdujeron los conceptos de recocido en la optimización combinatoria. Estos conceptos   se basan en una fuerte analogía con el recocido físico de los materiales. Este proceso consiste en llevar un sólido a un estado de baja energía tras
 después de aumentar su temperatura. Se puede resumir en las dos etapas siguientes
 
- Llevar el sólido a una temperatura muy alta hasta la "fusión" de la estructura;
- Enfriar el sólido según un esquema muy particular de disminución de la temperatura para alcanzar un estado sólido de mínima energía.


En la fase líquida, las partículas se distribuyen al azar. Se ha demostradoque el estado de energía mínima se alcanza siempre que la temperatura inicial sea lo suficientemente alta y el tiempo de enfriamiento sea lo suficientemente largo.

Si no es así, el sólido se encontrará en un estado metaestable con energía no mínima; esto se denomina endurecimiento, que consiste en el enfriamiento repentino
de un sólido.👨‍🚀

![Figura 1](https://github.com/armaFab/metaheuristicas/blob/main/simulatedAnnealing/images/diagrama1.PNG)

Figura 1: Cuando la temperatura es alta, el material se encuentra en estado líquido (izquierda). En un proceso de endurecimiento, el material alcanza un estado sólido con energía no mínima (estado metaestable; arriba a la derecha). En este caso, la estructura de los átomos no tiene simmetría. Durante un proceso de recocido lento, el material alcanza también un estado sólido pero en el que los átomos se organizan con simetría (cristal; abajo a la derecha).

❗ Antes de describir el algoritmo de recocido simulado para la optimización necesitamos introducir los principios de los algoritmos de optimización de búsqueda local, de los cuales el recocido simulado es una extensión.

### ⭐ 2.1 Local search (or Monte Carlo) algorithms

Estos algoritmos optimizan la función de coste explorando la vecindad del punto actual en el espacio de soluciones.

En las siguientes definiciones consideramos (S, f ) una instanciación de un problema de optimización combinatoria (S: conjunto de soluciones factibles, f : función objetivo). 
 

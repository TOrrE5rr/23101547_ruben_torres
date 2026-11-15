

## Menciona tres formas en que la evidencia del perfilador o de la bitacora puede perderse sin que nadie la borre deliberadamente.

 Al reiniciar MongoDB, se pierden los eventos almacenados en la memoria que consulta getLog.
Cuando system.profile se llena, los registros nuevos reemplazan a los mas antiguos.
 La rotacion de archivos de bitacora puede eliminar archivos antiguos automaticamente si no se conservan copias.

## ¿Por que el tamaño de 1 MB de system.profile es un problema de conservacion y no solo de espacio?

Porque su capacidad es limitada y, cuando se llena, reemplaza los registros antiguos por nuevos. Esto puede provocar que se pierda evidencia necesaria para investigar un incidente
## ¿Por que getLog sirve para interpretar pero no para conservar?
Porque permite revisar los eventos recientes del servidor, pero solo consulta hasta 1024 eventos almacenados en memoria
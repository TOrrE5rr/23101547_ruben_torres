## ¿Que evidencia permite detectar que hubo un cambio sin auditar?
La bitacora registra que postgres desactivo el disparador, ejecuto el UPDATE y volvio a activarlo

## ¿Que control administrativo (no tecnico) reduciria este riesgo?
Exigir autorizacion previa para desactivar la auditoria 

## Relaciona esta actividad con el principio de separacion de funciones de la Unidad II.
Quien administra la base de datos no debe ser la unica persona que controle la evidencia
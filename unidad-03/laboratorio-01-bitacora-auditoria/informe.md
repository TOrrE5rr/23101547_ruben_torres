# Informe — Bitacora y auditoria en PostgreSQL

##  Despliegue y situacion inicial

Se utilizo PostgreSQL 18 instalado localmente en Windows, con pgAdmin y PowerShell. La base de datos fue practica.

Inicialmente, log_statement estaba en none y el prefijo solo mostraba fecha y hora. Se registraban errores, pero no las modificaciones exitosas. Por eso no fue posible identificar al responsable del primer cambio del RFC.

## Configuracion aplicada

| Parametro | Valor | Aplicacion |
|---|---|---|
| logging_collector | on | Requiere reinicio si cambia. En la captura inicial ya estaba activo. |
| log_connections | on | Recarga. |
| log_disconnections | on | Recarga. |
| log_line_prefix | %m [%p] user=%u db=%d app=%a client=%h | Recarga. |
| log_statement | ddl y despues mod | Recarga. |
| log_min_error_statement | error | Se conservo. |

Se utilizo pg_reload_conf() para recargar y pg_settings para verificar

## Eventos observados

- Configuracion: solicitud de cambio de log_statement a mod.
- Acceso: autenticaciones fallidas de app_ventas, soporte_ana y usuario_inexistente.
- Privilegios: instrucciones GRANT y REVOKE sobre clientes.
- Estructura: incorporacion de la columna segmento.
- Datos: cambio del RFC del cliente 3.
- Error: DELETE rechazado a soporte_ana por falta de permisos.

## Auditoria del dato

La tabla auditoria.cambios_clientes guarda identificador, fecha, usuarios, aplicacion, IP, operacion, cliente y valores anteriores y posteriores en JSONB.

SECURITY DEFINER permite escribir la auditoria con los permisos del propietario de la funcion. session_user conserva la cuenta que inicio sesion, aunque current_user sea postgres dentro de la funcion.

El evento 1 confirma que app_ventas cambio el RFC del cliente 3 de GAMA780912XXX a GAMA780912ZZZ. El CSV contiene ocho eventos: seis UPDATE, un INSERT y un DELETE.


## Riesgos de la bitacora

La bitacora puede contener contraseñas y datos personales. El archivo original ocultaba la contraseña temporal, pero contenia otras contraseñas; se proporciono un procedimiento para retirarlas y recalcular el hash.

El hash original coincidio con el archivo entregado. Permite detectar modificaciones respecto a una copia confiable, pero no impide realizarlas.

Se deben restringir los accesos y conservar copias externas. Guardar la unica copia en el servidor implica riesgo de perdida o manipulacion.

## 7. Cronologia y conclusion


| Hora | Evento | Resultado | Fuente |
|---|---|---|---|
| 17:17:38.637 | Acceso con app_ventas desde 127.0.0.1. | Autenticacion fallida. | Linea 126 |
| 17:26:45.716 | postgres solicita REVOKE UPDATE a soporte_ana. | Sentencia registrada; resultado sin confirmar. | Linea 150 |
| 17:27:00.940 | postgres agrega segmento a clientes. | Columna corroborada en auditoria posterior. | Linea 154; evento 1 |
| 17:45:08.269 | postgres solicita log_statement = mod. | Solicitud registrada. | Linea 182 |
| 17:49:32.605 | app_ventas envia UPDATE del telefono a 6679990000. | Valor corroborado posteriormente. | Linea 217; evento 1 |
| 18:00:12.896 | soporte_ana intenta borrar al cliente 5. | Rechazado por permisos. | Lineas 279 y 281 |
| 18:53:44.305714 | app_ventas cambia el RFC de XXX a ZZZ. | Confirmado por auditoria. | Evento 1 |
| 19:11:20.085977 | postgres inserta y elimina a Pedro Ruiz. | Ambas operaciones auditadas. | Eventos 2 y 3 |
| 19:21:21.181 | postgres envia UPDATE del RFC a GHI con el disparador desactivado. | Valor corroborado despues, sin evento propio del cambio. | Linea 555; evento 8 |
| 19:30:38.289596 | postgres asigna segmento regular a cinco clientes. | Cinco cambios auditados. | Eventos 4 a 8 |

No hay evidencia para atribuir el primer cambio del RFC ni el cambio a XYZ planteado en la guia. Tampoco se conoce el telefono anterior.

La configuracion permite identificar la cuenta y los valores anteriores cuando el disparador esta activo. No recupera eventos pasados ni protege completamente frente a un administrador con control total.

## Preguntas de reflexion

## ¿Por que la auditoria no puede configurarse despues de un incidente para investigarlo?

Porque no recupera automaticamente los eventos ni los valores anteriores que no se guardaron.

## ¿Por que conviene que la bitacora la administre el servidor?

Porque PostgreSQL controla sus archivos y su rotacion, reduciendo la dependencia del mecanismo de despliegue.

## ¿Por que es importante el prefijo de linea?

Porque agrega fecha, usuario, PID e IP para identificar el contexto de cada evento.

## ¿Que diferencia hay entre registrar la sentencia y el cambio del dato?

La sentencia muestra la instruccion enviada. La auditoria conserva los valores anteriores y posteriores de cada fila.

## ¿Que diferencia hay entre pg_stat_activity y la bitacora?

pg_stat_activity muestra las sesiones actuales. La bitacora conserva los eventos historicos que fueron registrados.

## ¿Quien audita al administrador?

Un area independiente, mediante revision de cambios, autorizaciones y copias externas de las bitacoras.
## Actividad 17 — Cronologia y respuestas a Direccion

Las horas corresponden al 7 de noviembre de 2026, en UTC-06:00 (CST).
Las lineas citadas pertenecen a la bitacora exportada originalmente, contando las lineas vacias.
"Sin confirmar" indica que aparece la sentencia, pero no una confirmacion de su resultado.

| # | Fecha y hora | Usuario | Cliente | Tipo de evento | Que ocurrio | ¿Exitoso? | Fuente |
|---|---|---|---|---|---|---|---|
| 1 | 2026-11-07 17:17:38.637 | app_ventas (declarado) | 127.0.0.1 | Acceso | Fallo la autenticacion por contraseña. | No | Bitacora, linea 126 |
| 2 | 2026-11-07 17:17:55.354 | usuario_inexistente (declarado) | 127.0.0.1 | Acceso | Se intento entrar con un rol que no existe. | No | Bitacora, lineas 132 y 134 |
| 3 | 2026-11-07 17:18:34.904 | postgres | ::1 | Acceso | Se autorizo una conexion desde pgAdmin a practica. | Si | Bitacora, linea 148 |
| 4 | 2026-11-07 17:26:45.716 | postgres | ::1 | Privilegio | Se solicito retirar UPDATE sobre clientes a soporte_ana. | Sin confirmar | Bitacora, linea 150 |
| 5 | 2026-11-07 17:26:52.364 | postgres | ::1 | Privilegio | Se solicito conceder UPDATE sobre clientes a app_ventas. | Sin confirmar | Bitacora, linea 152 |
| 6 | 2026-11-07 17:27:00.940 | postgres | ::1 | Estructura | Se solicito agregar la columna segmento. La auditoria posterior contiene esa columna. | Si, corroborado posteriormente | Bitacora, linea 154; auditoria, id_evento 1 |
| 7 | 2026-11-07 17:45:08.269 | postgres | ::1 | Configuracion | Se solicito cambiar log_statement a mod. | Sin confirmar la recarga | Bitacora, linea 182 |
| 8 | 2026-11-07 17:49:32.605 | app_ventas | 127.0.0.1 | Datos | Se envio un UPDATE del telefono del cliente 3 a 6679990000. | El valor aparece despues; no se confirma esta ejecucion individual | Bitacora, linea 217; auditoria, id_evento 1 |
| 9 | 2026-11-07 17:52:47.555 | app_ventas | 127.0.0.1 | Datos | Se repitio el UPDATE del mismo telefono. | Sin confirmar esta ejecucion individual | Bitacora, linea 233 |
| 10 | 2026-11-07 17:58:43.492 | soporte_ana (declarado) | 127.0.0.1 | Acceso | Fallo la autenticacion por contraseña. | No | Bitacora, linea 259 |
| 11 | 2026-11-07 18:00:12.896 | soporte_ana | 127.0.0.1 | Error | Se rechazo borrar al cliente 5 por falta de permisos. | No | Bitacora, lineas 279 y 281 |
| 12 | 2026-11-07 18:00:46.839 | postgres | ::1 | Error | Se rechazo eliminar soporte_ana porque conservaba privilegios sobre clientes. | No | Bitacora, lineas 287 a 291 |
| 13 | 2026-11-07 18:53:44.305714 | app_ventas | 127.0.0.1 | Datos | Cambio el RFC del cliente 3 de GAMA780912XXX a GAMA780912ZZZ. | Si | Auditoria, id_evento 1; bitacora, linea 477 |
| 14 | 2026-11-07 19:11:20.085977 | postgres | ::1 | Datos | Inserto a Pedro Ruiz, cliente 6, con RFC RUPE950101AAA. | Si | Auditoria, id_evento 2 |
| 15 | 2026-11-07 19:11:20.085977 | postgres | ::1 | Datos | Elimino a Pedro Ruiz y se conservaron sus datos anteriores. | Si | Auditoria, id_evento 3 |
| 16 | 2026-11-07 19:20:44.095 | app_ventas | 127.0.0.1 | Error | Se rechazo el intento de borrar los registros de auditoria. | No | Bitacora, lineas 533 a 537 |
| 17 | 2026-11-07 19:20:44.178 | app_ventas | 127.0.0.1 | Error | Se rechazo el intento de desactivar el disparador. | No | Bitacora, lineas 539 a 543 |
| 18 | 2026-11-07 19:21:11.920 | postgres | ::1 | Estructura | Se envio la desactivacion del disparador. | Consistente con el cambio posterior sin evento de auditoria | Bitacora, linea 553 |
| 19 | 2026-11-07 19:21:21.181 | postgres | ::1 | Datos | Se envio el cambio del RFC del cliente 3 a GAMA780912GHI, sin un evento propio en la auditoria. | Si, corroborado por el estado posterior | Bitacora, linea 555; auditoria, id_evento 8 |
| 20 | 2026-11-07 19:21:31.805 | postgres | ::1 | Estructura | Se solicito reactivar el disparador. Despues volvieron a registrarse cambios. | Si, corroborado posteriormente | Bitacora, linea 557; auditoria, eventos 4 a 8 |
| 21 | 2026-11-07 19:30:38.289596 | postgres | ::1 | Datos | Actualizo segmento a regular en los cinco clientes existentes. | Si | Auditoria, eventos 4 a 8; bitacora, linea 581 |




## ¿Quien cambio el RFC la primera vez, en la Actividad 3? ¿Y en las Actividades 7, 12 y 14?

- Actividad 3: No hay evidencia que identifique al autor del primer cambio. La auditoria posterior muestra el valor GAMA780912XXX, pero no quien lo establecio ni cuando.
- Actividad 7: No hay evidencia de un cambio a GAMA780912XYZ. Ademas, el valor anterior registrado en la Actividad 12 fue GAMA780912XXX.
- Actividad 12: app_ventas cambio el RFC de GAMA780912XXX a GAMA780912ZZZ. Lo confirma id_evento 1.
- Actividad 14: La bitacora atribuye a postgres la sentencia que establece GAMA780912GHI. El evento 8 confirma que ese valor ya estaba guardado posteriormente, aunque el cambio del RFC no tiene un evento propio de auditoria.


## ¿Quien cambio el telefono?

La bitacora registra que app_ventas envio dos UPDATE para establecer el telefono 6679990000, desde 127.0.0.1, en las lineas 217 y 233.

## ¿Hubo intentos de acceso fallidos? ¿De que usuarios y desde donde?

Si. Se registraron intentos fallidos desde 127.0.0.1 usando los nombres app_ventas, usuario_inexistente y soporte_ana.



### 4. ¿Que valor tenia el RFC antes de cada cambio?

| Actividad | RFC anterior | Evidencia |
|---|---|---|
| 3 | No hay evidencia. | No existe un registro del estado anterior al primer cambio. |
| 7 | No hay evidencia. | No se encontro el UPDATE a GAMA780912XYZ ni una captura de sus valores anteriores. |
| 12 | GAMA780912XXX | valores_antes del id_evento 1. El nuevo valor fue GAMA780912ZZZ. |
| 14 | No hay evidencia directa del valor inmediatamente anterior. | El ultimo valor auditado era GAMA780912ZZZ, pero el disparador estaba desactivado durante el cambio. El evento 8 confirma posteriormente GAMA780912GHI. |


## Actividad 7 - Registro de cambios y conciliacion

El CSV contiene tres registros de preparacion: 251, 252 y 254. Para conciliar el cambio de permisos y la desactivacion del disparador se uso tambien la bitacora del LAB-01.

| Momento (bitacora) | Usuario | Sentencia | Folio que lo autoriza | ¿Autorizado? | Hallazgo |
|---|---|---|---|---|---|
| 2026-11-23 21:39:00.291 | postgres | CREATE SCHEMA gobierno | Sin folio visible | Sin confirmar | Preparacion del laboratorio. Se creo el esquema de gobierno. |
| 2026-11-23 21:39:09.722 | postgres | REVOKE ALL ON SCHEMA gobierno FROM PUBLIC | Sin folio visible | Sin confirmar | Preparacion. Se restringio el acceso al esquema. |
| 2026-11-23 21:39:30.993 | postgres | CREATE TABLE gobierno.solicitudes_cambio | Sin folio visible | Sin confirmar | Preparacion. El CSV muestra el inicio de la sentencia. |
| 2026-11-07 17:26:52.364 | postgres | GRANT UPDATE ON clientes TO app_ventas | Sin folio visible | Sin confirmar | El LAB-01 registra la sentencia. Falta la solicitud que justifique el permiso. |
| 2026-11-07 19:20:44.177 | app_ventas | ALTER TABLE clientes DISABLE TRIGGER trg_auditoria_clientes | Sin folio visible | Intento rechazado | PostgreSQL exigio ser propietario de la tabla. |
| 2026-11-07 19:21:11.920 | postgres | ALTER TABLE clientes DISABLE TRIGGER trg_auditoria_clientes | Sin folio visible | Sin confirmar | Hallazgo grave. Durante la desactivacion se registro un UPDATE del RFC del cliente 3. |
| 2026-11-07 19:21:31.805 | postgres | ALTER TABLE clientes ENABLE TRIGGER trg_auditoria_clientes | Sin folio visible | Sin confirmar | Se reactivo el disparador unos 20 segundos despues. |


## ¿Que cambios no tienen folio y como se clasifican?

Los tres registros del CSV corresponden a la preparacion del laboratorio

## ¿Que tan grave es desactivar el disparador y que distingue la linea 163 de la 169?
Es grave porque durante ese intervalo el disparador deja de guardar los valores anteriores y nuevos

## ¿Que limitacion existe si log_statement estuvo en none?
Durante ese periodo pudieron ejecutarse cambios sin quedar registrados como sentencias. La ausencia de una linea impide confirmar por esta via si el cambio se ejecuto, quien lo hizo y a que hora

## ¿Quien debe realizar la conciliacion?
Una persona de auditoria o Seguridad que no haya ejecutado los cambios



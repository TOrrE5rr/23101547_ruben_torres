## Si clientes tuviera un millon de registros, ¿que ocurriria con la auditoria tras un UPDATE sin WHERE?
Se generaria un millon de filas nuevas en la auditoria

## Propón quien podria autorizar la depuracion de auditoria.cambios_clientes.

El responsable de los datos, junto con el area de seguridad o cumplimiento, siguiendo la politica de retencion

## ¿Por que log_statement = 'all' puede convertir la bitacora en un nuevo deposito de datos sensibles?

Porque guarda el texto de todas las consultas, que puede incluir RFC, telefonos, contraseñas y otros datos escritos en las sentencias
## ¿Por que el proceso que registra el cambio es el principal y no tu sesion?
Porque ls sesion solicita la recarga, pero el proceso principal del servidor lee la configuracion y registra los cambios aplicados.

## ¿Que pasaria si alguien ejecutara ALTER SYSTEM SET log_statement = 'none'? ¿Quedaria rastro?
Se desactivaria el registro general de sentencias cuando se aplique la recarga. Si log_statement todavia estaba en 'ddl', el ALTER SYSTEM quedaria registrado. Tambien quedaria el mensaje del cambio de configuracion al recargar.

## ¿Por que no se recomienda editar postgresql.auto.conf a mano?
Porque postgresql administra ese archivo mediante ALTER SYSTEM. Editarlo a mano puede causar errores o perder cambios cuando postgresql vuelva a escribirlo.
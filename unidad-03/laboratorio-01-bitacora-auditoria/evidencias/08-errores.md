## ¿El intento de soporte_ana causo algun daño? ¿Por que debe auditarse de todos modos?
Si el DELETE fue rechazado por falta de permisos, no elimino el registro

## ¿Que diferencia hay entre un error de autorizacion y uno de autenticacion?
Un error de autenticacion ocurre cuando el usuario no logra iniciar sesion, por ejemplo, por una contraseña incorrecta. Un error de autorizacion ocurre cuando ya inicio sesion, pero no tiene permiso para realizar una accion

## ¿Que indica el error de DROP ROLE sobre el orden correcto para dar de baja a un usuario?
indica que soporte_ana todavia tiene privilegios sobre clientes. Primero se debe bloquear su acceso, retirar sus permisos y resolver otras dependencias, como objetos de su propiedad y ya luego eliminarla 
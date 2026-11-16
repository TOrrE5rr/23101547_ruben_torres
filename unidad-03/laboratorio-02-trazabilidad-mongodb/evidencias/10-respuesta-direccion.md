
## Actividad 10. Responder a Direccion

### 1. ¿Quien cambio el RFC de Maria Garcia en la Actividad 2? ¿Y en la Actividad 3?

En la Actividad 2: "No hay evidencia con esta edicion". El perfilador estaba apagado. La bitacora muestra conexiones y autenticaciones, pero no permite demostrar quien ejecuto la modificacion del RFC.

En la Actividad 3, el perfilador identifica a la cuenta app_ventas@comercial como la que ejecuto la actualizacion del cliente con _id: 3, correspondiente a Maria Garcia. Esto identifica al usuario de la base de datos, no a la persona que utilizo esa cuenta.

### 2. ¿Cuando y desde que aplicacion?

En la Actividad 2: "No hay evidencia con esta edicion". La hora de una conexion no demuestra la hora exacta del cambio, porque la operacion no quedo registrada.

En la Actividad 3, mi archivo system-profile.json registra la actualizacion el 15 de noviembre de 2026 a las 08:16:21.253 UTC, desde la aplicacion app-ventas-web y el cliente 127.0.0.1.

### 3. ¿Que valor tenia antes?

GAMA780912GHI tenia este valor inicial

### 4. ¿Cambio alguien los privilegios de app_ventas?

Si, app_ventas tenia inicialmente readWrite y despues tambien tenia dbAdmin sobre comercial


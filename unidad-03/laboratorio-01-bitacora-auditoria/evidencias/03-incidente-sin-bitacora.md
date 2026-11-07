## ¿Puedes demostrar quien modifico el RFC?
No. La imagen muestra intentos fallidos de acceso de app_ventas y partes de la consulta de busqueda, pero no muestra el UPDATE que modifico el RFC

## ¿Puedes demostrar que el cambio no lo hizo soporte_ana?
No. Que soporte_ana no aparezca en estos resultados no demuestra que no haya realizado el cambio

## Los privilegios de la Unidad II, ¿impidieron el cambio? ¿Debian impedirlo?
Si el comando devolvio UPDATE 1, los privilegios no impidieron el cambio. No debian impedirlo si app_ventas tenia autorizado modificar el RFC

## ¿Que tendria que haber estado configurado antes del incidente?
El registro de conexiones y log_statement ='mod' para guardar sentencias como UPDATE tambien un prefijo con fecha, hora, usuario, base de datos e IP para identificar el origen del cambio
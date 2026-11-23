| Columna | Clasificacion (Unidad II) | Finalidad | Control aplicado | ¿Cambios auditados? | Regla de calidad |
|---|---|---|---|---|---|
| id | Identificador interno | Identificar al cliente | Llave primaria | Si, por fila | Unico y obligatorio |
| nombre | Dato personal | Atender y facturar | Acceso limitado a Atencion y Facturacion | Si, por fila | Nombre sin dejar en blanco |
| correo | Dato personal de contacto | Contactar al cliente | Acceso limitado a Atencion | Si, por fila | Formato de correo valido y revision de duplicados sin distinguir mayusculas |
| telefono | Dato personal de contacto | Llamar al cliente | Acceso limitado a Atencion | Si, por fila | Diez digitos si es un numero nacional |
| rfc | Dato personal fiscal | Facturar | Vista enmascarada para soporte | Si, por fila | Formato de RFC valido. Obligatorio cuando se requiere para facturar |
| edad | Dato personal | Elaborar estadisticas | Analitica usa rangos de edad | Si, por fila | Entre 18 y 120 si se captura |
| ciudad | Dato personal de ubicacion | Elaborar estadisticas por ciudad | Analitica consulta conteos por ciudad | Si, por fila | Escribir el nombre de cada ciudad de manera uniforme |
| codigo_postal | Dato personal de ubicacion | Facturar y analizar zonas | Facturacion usa el dato completo y Analitica lo usa agrupado | Si, por fila | Cinco digitos, incluidos los ceros iniciales |
| segmento | Dato de negocio | Agrupar clientes por categoria comercial | Acceso segun los permisos de la tabla clientes | Si, por fila | Usar una categoria del catalogo aprobado, si existe |



## ¿Que ventaja tiene guardar el significado en COMMENT en lugar de solo en un documento aparte?

La descripcion queda asociada a la columna y se puede consultar o exportar junto con su nombre y tipo de dato.

## ¿Quedaron registrados los COMMENT en la bitacora? ¿Con que nivel de log_statement?

En practica se verifico el nivel mod, que registra las sentencias COMMENT. La copia del LAB-01 no contiene esas sentencias

## ¿Que informacion del diccionario debe mantenerse fuera del motor? ¿Por que?

La matriz de gobierno debe documentar la clasificacion, la finalidad, los responsables, las aprobaciones, los plazos de retencion y las reglas de calidad
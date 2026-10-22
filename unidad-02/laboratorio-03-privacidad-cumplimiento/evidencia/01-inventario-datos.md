## actividad 1
| Campo | ¿Es dato personal? | Finalidad | ¿Es necesario? | Nivel de acceso | Retencion |
| --- | --- | --- | --- | --- | --- |
| id | Si, permite vincular los datos con un cliente. | Distinguir los registros y evitar confusiones. | Si, permite localizar al cliente correcto. | Personal autorizado que necesite localizar registros. | Mientras se conserve el registro del cliente, porque permite identificarlo. |
| nombre | Si, identifica directamente a la persona. | Atender al cliente y elaborar sus facturas. | Si, ambos procesos necesitan identificar al cliente. | Atencion y facturacion, porque lo requieren para sus funciones. | Mientras dure la relacion comercial; en facturas, durante el plazo requerido. |
| correo | Si, permite identificar o contactar al cliente. | Responder consultas y enviar informacion del servicio. | Si, cuando sea el medio de contacto elegido. | Atencion al cliente, porque necesita comunicarse con el. | Mientras sea necesario para atender al cliente. |
| telefono | Si, permite contactar a una persona. | Resolver dudas y dar seguimiento por llamada. | Solo si se necesita; no exigirlo si basta el correo. | Atencion al cliente, porque realiza el seguimiento. | Mientras sea necesario para el contacto telefonico. |
| rfc | Si, identifica al contribuyente. | Emitir las facturas del cliente. | Solo cuando se requiera facturar. | Facturacion, porque necesita los datos fiscales. | Durante el plazo requerido para conservar la documentacion fiscal. |
| edad | Si, esta vinculada con una persona. | Generar estadisticas por grupos de edad. | Solo si el analisis lo requiere; basta usar rangos. | Analitica, mediante resultados agrupados para evitar identificar clientes. | Hasta generar las estadisticas; despues, conservar solo resultados que no identifiquen personas. |
| ciudad | Si, al estar vinculada con el cliente. | Generar estadisticas sobre la ubicacion de los clientes. | Solo si se realizan analisis por ciudad. | Analitica, mediante datos agrupados porque no necesita identificar personas. | Hasta generar las estadisticas; despues, conservar solo resultados que no identifiquen personas. |
| codigo_postal | Si, aporta informacion sobre la ubicacion del cliente. | Completar datos fiscales y generar estadisticas por zona. | Solo si la factura o el analisis lo requieren. | Facturacion para datos fiscales y analitica con resultados agrupados. | En datos fiscales, durante el plazo requerido; para analisis, hasta obtener resultados agrupados. |
| fecha_alta | Si, describe cuando una persona se registro como cliente. | Conocer su antiguedad y generar estadisticas de registros. | Si, permite dar seguimiento a la relacion comercial. | Atencion para consultar antiguedad y analitica para estadisticas agrupadas. | Mientras dure la relacion comercial, porque permite conocer su inicio. |

## actividad 2

  ### Todos los campos son necesarios para atención al cliente?
  No, se necesiataria el id, nombre y algun medio de contacto como correo o telefono, los demas se requeriria una justificacion para tenerlos

  ### ¿Por qué soporte necesitaría conocer el RFC?
  la justificacion es que atenidera algun problema de facturacion
  ### ¿Necesita conocer la edad?
  No
  ### ¿Necesita conocer el código postal?
  no , a menos que atiende temas de entregas

 ### ¿Qué principio de privacidad está relacionado con esta decisión?
 la minimizacion de datos

 ## actividad 3
  ### Por qué esta información puede ser más apropiada para analítica que entregar directamente la tabla completa de clientes?
para tener una correcta minimizacion de datos, solo se necesitan los datos proporcionados para hacer la estadistica

## actividad 4 
### ¿Qué información puede consultar el rol?
rango de edad y ciudad
 ### ¿Puede consultar directamente clientes?
 no
 ### ¿Puede obtener nombre, correo y RFC?
 no
### ¿Qué principio de privacidad estás aplicando?
minimizacion de datos
### ¿Qué principio de seguridad estás aplicando?
privilegio minimo

## Propuesta de arquitectura de datos protegidos

La base de datos se separa en tres areas segun su finalidad

| Area | Informacion | Acceso |
| --- | --- | --- |
| Operacion | Datos necesarios para atender clientes y facturar | Atencion consulta datos de contacto y Facturacion consulta datos fiscales |
| Analitica | Cantidades por ciudad, rango de edad y region postal | Analistas consultan solo resultados agrupados |
| Auditoria | Usuario, fecha, accion realizada y registro afectado | Personal autorizado para revisar movimientos |

## Controles propuestos

| Control | Propuesta |
| --- | --- |
| Acceso | Crear roles y dar a cada area solo los permisos necesarios |
| Minimizacion | Usar vistas con los campos necesarios y datos agrupados para analitica |
| Proteccion de informacion sensible | Cifrar los datos que requieren mayor proteccion y limitar quien puede verlos |
| Retencion | Definir cuanto tiempo se guarda cada tipo de dato y revisar los plazos |
| Trazabilidad | Registrar quien consulta o modifica datos, cuando y que accion realiza |
| Eliminacion | Borrar los datos autorizados al vencer su plazo y gestionar sus copias y respaldos |
| Atencion de solicitudes | Registrar la solicitud, verificar la identidad y aplicar los cambios autorizados en los sistemas correspondientes |


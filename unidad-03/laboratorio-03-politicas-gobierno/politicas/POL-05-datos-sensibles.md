## POL-05 - Uso de datos sensibles

Objetivo: Evitar la consulta o divulgacion indebida de RFC, correos, telefonos y valores personales guardados en la auditoria.

Alcance: Tablas, colecciones, vistas, bitacoras y exportaciones de PostgreSQL y MongoDB.

Regla: Facturacion puede consultar el RFC completo para facturar, Soporte usa la vista enmascarada y Analitica recibe datos agrupados. Toda consulta de valores completos para investigar un incidente requiere autorizacion previa, folio, motivo, usuario, fecha y datos consultados. Al cerrar el caso, Seguridad registra el resultado y revisa si procede eliminar la evidencia conforme a POL-03.

Responsable: El propietario del dato aprueba el uso. El DBA aplica los permisos y Seguridad revisa los accesos por incidente.

Excepciones: El propietario del dato y Seguridad pueden autorizar acceso temporal a valores completos para un caso especifico, con alcance y vencimiento registrados.

Evidencia: La vista enmascarada de la Unidad II y auditoria.cambios_clientes del LAB-01 respaldan el control de acceso y el historial de cambios, respectivamente. En el LAB-01 no se comprobo la lectura de RFC por soporte_ana con la configuracion usada. Para acreditar esa lectura se requiere un registro de acceso vinculado al folio.

Revision: Cada seis meses y despues de un incidente de acceso.
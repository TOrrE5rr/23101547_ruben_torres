## actividad 11

### Matriz de gobierno de datos

| Dato | Finalidad | Responsable | Usuarios autorizados | Proteccion | Retencion | Accion al finalizar |
| --- | --- | --- | --- | --- | --- | --- |
| nombre | Atender y facturar | Atencion y Facturacion | Personal de ambas areas | Limitar el acceso | Mientras se necesite para atender o conservar facturas | Eliminar |
| correo | Contactar al cliente | Atencion al cliente | Personal de atencion | Limitar el acceso | Mientras se necesite contactar al cliente | Eliminar |
| telefono | Llamar al cliente | Atencion al cliente | Personal de atencion | Limitar el acceso | Mientras se necesite llamar al cliente | Eliminar |
| rfc | Crear facturas | Facturacion | Personal de facturacion | Cifrar y limitar el acceso | Durante el plazo requerido para facturas | Eliminar al terminar el plazo |
| edad | Crear estadisticas | Analitica | Analistas, solo datos agrupados | Usar rangos de edad | Hasta terminar el analisis | Conservar solo resultados anonimos |
| ciudad | Crear estadisticas por ciudad | Analitica | Analistas, solo datos agrupados | Mostrar cantidades por ciudad | Hasta terminar el analisis | Conservar solo resultados anonimos |
| codigo_postal | Facturar y analizar zonas | Facturacion y Analitica | Facturacion y analistas | Dato completo para facturar; agrupado para analizar | Mientras se necesite para facturas o analisis | Eliminar el dato y conservar resultados anonimos |



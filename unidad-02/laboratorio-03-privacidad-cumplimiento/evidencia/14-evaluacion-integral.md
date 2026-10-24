## actividad 14 
| Problema | Principio afectado | Riesgo | Control propuesto |
| --- | --- | --- | --- |
| Analitica consulta directamente clientes | Minimo privilegio | Acceso a datos que no necesita | Quitar acceso directo y usar vistas limitadas |
| Analitica puede ver nombres, correos, telefonos y RFC | Minimizacion | Exposicion de datos personales | Excluir esos campos de las consultas |
| Analitica recibe datos individuales para crear estadisticas | Minimizacion | Identificar clientes sin necesidad | Entregar resultados agrupados |
| Se conservan datos de hace 12 años sin justificar su necesidad | Limitacion de conservacion | Acumular informacion innecesaria | Revisar que datos deben mantenerse |
| No existe una politica de retencion | Responsabilidad | Conservar datos indefinidamente | Definir plazos y responsables |
| Los desarrolladores reciben copias completas | Minimo privilegio | Exponer mas informacion de la necesaria | Entregar solo los datos necesarios para las pruebas |
| Las pruebas utilizan datos reales | Privacidad por diseño | Filtrar informacion de clientes | Usar datos ficticios |
| Existen copias fuera de la base principal | Control del ciclo de vida | Dejar datos sin actualizar o eliminar | Registrar las copias y controlar su eliminacion |
| Marketing usa correos sin una finalidad claramente documentada | Limitacion de finalidad | Enviar promociones sin justificar ese uso | Revisar el uso permitido y el consentimiento cuando corresponda |
| No se define la finalidad de cada dato | Finalidad | Utilizar informacion para otros fines | Documentar para que se necesita cada campo |
| No se relaciona cada dato con una necesidad concreta | Minimizacion | Guardar datos que no aportan al servicio | Revisar cada campo y eliminar los innecesarios |
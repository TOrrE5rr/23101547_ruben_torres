## POL-03 - Retencion

Objetivo: Conservar evidencia durante el tiempo necesario y evitar la acumulacion de datos personales.

Alcance: Datos de clientes, bitacoras, auditoria, exportaciones y respaldos de PostgreSQL y MongoDB.

Regla: El propietario conserva los datos de contacto mientras se necesiten para atender al cliente y conserva solo resultados anonimos al terminar el analisis. Los plazos operativos son 7 dias para exportaciones de system.profile, 30 dias para sentencias que modifican datos, 90 dias para accesos de PostgreSQL, bitacora de mongod y auditoria de clientes, y 12 meses para cambios de privilegios, estructura e instantaneas de roles. Al vencer el plazo, el DBA elimina los registros y exportaciones correspondientes, registra la baja y reaplica las bajas si recupera un respaldo anterior.

Responsable: El propietario aprueba el plazo de los datos de negocio. Seguridad aprueba el de las bitacoras y el DBA ejecuta las bajas.

Excepciones: Si hay una investigacion abierta, Seguridad documenta que evidencia debe preservarse, quien puede leerla y cuando se revisara la excepcion. Plazo a confirmar con el área jurídica para la documentacion fiscal o si preservar evidencia entra en conflicto con la eliminacion de datos personales.

Evidencia: La matriz 11-gobierno-datos.md de la Unidad II y evidencias/05-conservacion.md del LAB-03 documentan los criterios. Para demostrar la eliminacion se requiere un registro de bajas con fecha, conjunto de datos, periodo eliminado y responsable.

Revision: Cada seis meses y cuando cambie la finalidad de un dato.## POL-03 - Retencion

Objetivo: Conservar evidencia durante el tiempo necesario y evitar la acumulacion de datos personales.

Alcance: Datos de clientes, bitacoras, auditoria, exportaciones y respaldos de PostgreSQL y MongoDB.

Regla: El propietario conserva los datos de contacto mientras se necesiten para atender al cliente y conserva solo resultados anonimos al terminar el analisis. Los plazos operativos son 7 dias para exportaciones de system.profile, 30 dias para sentencias que modifican datos, 90 dias para accesos de PostgreSQL, bitacora de mongod y auditoria de clientes, y 12 meses para cambios de privilegios, estructura e instantaneas de roles. Al vencer el plazo, el DBA elimina los registros y exportaciones correspondientes, registra la baja y reaplica las bajas si recupera un respaldo anterior.

Responsable: El propietario aprueba el plazo de los datos de negocio. Seguridad aprueba el de las bitacoras y el DBA ejecuta las bajas.

Excepciones: Si hay una investigacion abierta, Seguridad documenta que evidencia debe preservarse, quien puede leerla y cuando se revisara la excepcion. Plazo a confirmar con el área jurídica para la documentacion fiscal o si preservar evidencia entra en conflicto con la eliminacion de datos personales.

Evidencia: La matriz 11-gobierno-datos.md de la Unidad II y evidencias/05-conservacion.md del LAB-03 documentan los criterios. Para demostrar la eliminacion se requiere un registro de bajas con fecha, conjunto de datos, periodo eliminado y responsable.

Revision: Cada seis meses y cuando cambie la finalidad de un dato.
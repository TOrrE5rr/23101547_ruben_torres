## POL-04 - Restauracion

Objetivo: Recuperar el servicio sin sobrescribir datos vigentes ni reactivar permisos vencidos.

Alcance: Restauraciones de PostgreSQL y MongoDB en pruebas y produccion por perdida, corrupcion o cambio fallido.

Regla: Antes de restaurar, el propietario del dato y Operaciones de TI aprueban el motivo, el respaldo, la fecha que se desea recuperar y el ambiente de destino. El DBA valida la copia en pruebas y, antes de reabrir produccion, verifica los datos con el propietario, revisa los permisos vigentes y reaplica las bajas registradas desde la fecha del respaldo. El procedimiento técnico se definirá en la Unidad V.

Responsable: El propietario y Operaciones de TI autorizan. El DBA ejecuta y el propietario valida el resultado.

Excepciones: Operaciones de TI puede autorizar una restauracion de prueba dentro del calendario de POL-02, en un ambiente aislado y con acceso restringido.

Evidencia: En los LAB-01 a LAB-03 no se presento un acta de restauracion. Se requiere registrar la autorizacion, copia utilizada, ambiente, fecha y resultado de la validacion.

Revision: Cada seis meses y despues de cada restauracion en produccion.
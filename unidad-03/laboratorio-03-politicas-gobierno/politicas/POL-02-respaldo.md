## POL-02 - Respaldo

Objetivo: Recuperar los datos y su configuracion despues de una perdida.

Alcance: Datos de clientes, registros de auditoria y gobierno, roles y configuraciones de PostgreSQL y MongoDB en produccion.

Regla: El DBA realiza un respaldo diario, lo cifra y conserva una copia fuera del servidor durante 30 dias. Cada mes, el DBA de respaldo recupera una copia en pruebas y un segundo responsable verifica que los datos se puedan consultar y que los permisos correspondan al ambiente de pruebas. El procedimiento técnico se definirá en la Unidad V.

Responsable: Operaciones de TI aprueba el calendario. El DBA realiza el respaldo y un segundo responsable de Operaciones verifica el resultado.

Excepciones: Si el servicio impide completar el respaldo, Operaciones de TI registra la causa y autoriza una nueva ejecucion dentro de las siguientes 24 horas.

Evidencia: En los LAB-01 a LAB-03 no se presento un registro de respaldos verificados. Se requiere una bitacora con fecha, identificador de la copia, resultado de la prueba y nombre de quien verifico.

Revision: Cada seis meses y despues de una prueba fallida.
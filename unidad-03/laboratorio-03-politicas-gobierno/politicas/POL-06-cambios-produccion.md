## POL-06 - Cambios en produccion

Objetivo: Evitar cambios sin autorizacion y poder determinar que se modifico, quien lo hizo y con que resultado.

Alcance: Cambios de estructura, permisos, configuracion y datos en produccion. Un ambiente es el conjunto de recursos, datos, configuraciones y accesos destinado a una etapa de trabajo. Produccion es el ambiente que atiende la operacion real.

Regla: Antes del cambio, el solicitante registra el motivo, objeto afectado, riesgo, prueba previa, horario y plan de reversion, y obtiene la aprobacion del propietario. Durante el cambio, el DBA ejecuta solo lo aprobado y registra la cuenta utilizada y la hora. Despues, el propietario valida el resultado y el DBA cierra la solicitud con la evidencia o documenta la reversion.

Responsable: El propietario del dato o servicio aprueba y valida. El DBA ejecuta y documenta el cambio.

Excepciones: En un incidente urgente, el propietario puede autorizar una ejecucion inmediata. El DBA registra la autorizacion antes de actuar y completa la revision el siguiente dia habil.

Evidencia: Folio de gobierno.solicitudes_cambio, previsto para la Actividad 7 del LAB-03. En PostgreSQL se adjuntan las lineas GRANT, REVOKE o ALTER TABLE del LAB-01, segun el cambio. En MongoDB se adjuntan las instantaneas de roles del LAB-02 cuando cambian privilegios. El folio identifica al ejecutor y la validacion confirma el resultado.

Revision: Cada seis meses. Cada mes, el DBA compara los cambios registrados con las solicitudes aprobadas.
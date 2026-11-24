## POL-01 - Acceso

Objetivo: Evitar accesos sin autorizacion y retirar permisos que ya no se necesitan.

Alcance: Cuentas de personas y aplicaciones en PostgreSQL y MongoDB, en desarrollo, pruebas y produccion.

Regla: El usuario o el responsable de una aplicacion solicita el acceso e indica el ambiente, los datos, el permiso y la finalidad. El propietario del dato aprueba la solicitud y el DBA concede solo los permisos aprobados. Cada mes, el DBA compara los permisos vigentes con las solicitudes y retira los vencidos.

Responsable: El propietario del dato aprueba. El DBA concede, revisa y retira los permisos.

Excepciones: En una emergencia, el propietario puede aprobar un permiso temporal con hora de vencimiento. El DBA registra su retiro.

Evidencia: Solicitud aprobada, sentencias GRANT y REVOKE de la bitacora de PostgreSQL del LAB-01 e instantaneas de auditoria.instantaneas_privilegios del LAB-02. Las instantaneas permiten comparar los roles entre dos fechas.

Revision: Cada seis meses.
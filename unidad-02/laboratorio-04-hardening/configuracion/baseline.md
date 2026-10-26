## Actividad 19 
## BASELINE

## Red
- Interfaces autorizadas:tilizar listen_addresses = 'localhost' para la practica local. Si se requieren conexiones remotas, agregar solamente la IP privada necesaria del servidor.
- Puerto: conservar 5432 y restringir su acceso
- Firewall:permitir conexiones entrantes unicamente desde equipos autorizados. Para uso exclusivamente local, no habilitar acceso remoto.
- Redes permitidas:utilizar 127.0.0.1/32 y ::1/128 para conexiones locales. Evitar reglas generales con 0.0.0.0/0 o ::/0
## Autenticacion

- Metodo: utilizar scram-sha-256 y evitar trust en las conexiones de usuarios.
- Credenciales: establecer contraseñas largas, unicas y diferentes para cada cuenta. Cambiarlas ante sospecha de compromiso y no guardarlas en scripts ni repositorios
- Cuentas administrativas: reservar postgres para administracion y mantenimiento. Evitar cuentas administrativas compartidas cuando existan varios responsables

## Autorizacion

- Roles: separar las funciones de administracion, aplicacion y consulta.
- Privilegios:otorgar solamente los permisos necesarios sobre bases, esquemas, tablas y secuencias. Revisar tambien membresias y permisos heredados de PUBLIC.
- Cuenta de aplicacion: utilizar app_lab sin SUPERUSER, CREATEDB ni CREATEROLE.
- Cuenta de consulta: utilizar consulta_lab con SELECT solamente sobre las tablas o vistas autorizadas
- Verificacion:comprobar que las operaciones permitidas funcionan y las no autorizadas son rechazadas

## Configuracion

- Reglas de acceso: especificar base de datos, usuario, origen y metodo en pg_hba.conf. Exigir TLS para las cuentas correspondientes mediante hostssl, sin reglas alternativas que permitan conexiones sin cifrado.
- Conexiones: conservar inicialmente max_connections = 100 y superuser_reserved_connections = 3, evaluando su adecuacion al consumo real.
- Limites por cuenta:proponer 10 conexiones para app_lab y 5 para consulta_lab.
- Tiempos de espera proponer statement_timeout = '30s'  idle_in_transaction_session_timeout = '60s' para las cuentas de aplicacion y consulta. Ajustarlos si las operaciones legitimas requieren mas tiempo
- Extensiones conservar pgcrypto y plpgsql mientras sean necesarias. Revisar dependencias antes de retirar extensiones
- Registros:registrar conexiones y desconexiones, revisar errores de autenticacion y establecer rotacion y retencion de logs

## Sistema operativo

- Propietario de archivos:mantener la propiedad bajo una cuenta autorizada y conservar los acceso necesarios para la cuenta de Windows que ejecuta PostgreSQL.
- Permisos: restringir los permisos NTFS de configuracion, datos y claves privadas. Evitar accesos innecesarios de usuarios comunes.
- Directorio de datos:proteger la carpeta data contra lectura, modificacion y eliminacion no autorizadas
- Verificacion:revisar permisos mediante icacls y comprobar que el servicio funciona despues de cualquier ajuste

## Cifrado

- TLS:habilitar ssl = on y establecer TLS 1.2 como version minima, permitiendo TLS 1.3.
- Cliente: utilizar verify-full con un certificado confiable y un nombre de servidor que coincida cn el certificad
- Clave privada:restringir el acceso a server.key y excluirla del repositorio.
- Credenciales:utilizar verificadores SCRAM para las cuentas PostgreSQL; no almacenar contraseñas en texto claro
- Informacion sensible:aplicar cifrad cuando sea necesario y gestionar las claves por separado de los datos y del codigo.
- Evidencia: verificar ssl, version y cipher en pg_stat_ssl. En el laboratorio se confirmo TLS 1.3 con TLS_AES_256_GCM_SHA384 en la conexion revisada

## Mantenimiento

- Actualizacion:asignar al DBA la revision de actualizaciones de PostgreSQL, Windows y extensiones. Priorizar las correcciones de seguridad segun su riesgo.
- Pruebas:comprobar compatibilidad, realizar respaldos y definir recuperacion antes de actualizar.
- Revision periodica:revisar mensualmente roles, reglas de acceso, interfaces, permisos, extensiones y certificados repetir la revision despues de cambios importantes.
- Monitoreo: revisar regularmente los registros y atender intentos de acceso sospechosos.
- Documentacion:registrar configuracion anterior y posterior, responsable, fecha, justificacion,pruebas y procedimiento para revertir cada cambio.
- Respaldos:proteger las copias de seguridad y probar su restauracion periodicamente.
# Laboratorio 04 — Hardening



## Entorno

- Sistema operativo: Windows
- PostgreSQL:version 18. La guia del laboratorio utiliza PostgreSQL 16.
- Herramientas:pgAdmin, PowerShell 
- Base de datos: practica
- Cuenta administrativa:postgres
- Puerto:5432.
- Modalidad: laboratorio local.
- Directorio de configuracion: C:\Program Files\PostgreSQL\18\data.

## Superficie de ataque inicial

PostgreSQL estaba configurado con listen_addresses = '*', escuchando en todas las interfaces IPv4 e IPv6 mediante el puerto 5432,las conexiones observadas utilizaban ::1, correspondiente al mismo equipo.
Las reglas locales revisadas de pg_hba.conf utilizaban all/all y scram-sha-256. TLS estaba desactivado mediante ssl = off. La cuenta postgres tenia privilegios administrativos y no se habia identificado una cuenta independiente para la aplicacion.
Escuchar en todas las interfaces no demuestra por si solo acceso desde Internet; este tambien depende del firewall y de la configuracion de red.

## Hallazgos
- La escucha en todas las interfaces era innecesaria para una practica local
- Las reglas locales permitian intentar conexiones con distintas cuentas y bases de datos
- La autenticacion utilizaba scram-sha-256
- TLS estaba desactivado
- postgres era la cuenta de superusuario identificada
- analista2, analista3 y soporte eran roles sin LOGIN ni privilegios de superusuario
- Las extensiones instaladas eran pgcrypto 1.4 y plpgsql 1.0
- max_connections estaba configurado en 100
- superuser_reserved_connections estaba configurado en 3
- statement_timeout e idle_in_transaction_session_timeout estaban en 0

## Cambios realizados

Se genero un certificado autofirmado de laboratorio y su clave privada mediante OpenSSL. Los archivos server.crt y server.key se colocaron en el directorio data.

Se activo la configuracion ssl on y se recargo la configuracion de postgresqwl se verifico que la conexion utilizada estaba cifrada mediante TLS 1.3 con TLS_AES_256_GCM_SHA384.

Se elaboraron la comparacion antes y despues, el checklist y una propuesta de baseline de seguridad.

Los cambios en interfaces, reglas de acceso, cuentas de aplicacion, permisos del sistema operativo y limites de conexiones permanecen como propuestas pendientes de confirmar.

## Justificación de los cambios

La activacion de TLS permite cifrar la comunicacion entre el cliente y PostgreSQL. Esto reduce el riesgo de exposicion del contenido transmitido.

El certificado autofirmado se utiliza para la practica. La validacion de la identidad del servidor mediante verify-full requiere configurar la confianza en el certificado y comprobar el nombre del servidor.

La documentacion permite distinguir los cambios aplicados de las propuestas y facilita repetir las verificaciones. Habilitar TLS no sustituye los controles de red, autenticacion, autorizacion y sistema operativo.

## Verificación


 ## powershell
Test-Path "C:\Program Files\PostgreSQL\18\data\server.crt"
Test-Path "C:\Program Files\PostgreSQL\18\data\server.key"

SHOW ssl;

## Checklist
## Verificacion final

- [x] Identifique la superficie de ataque.
- [x] Identifique las interfaces de escucha.
- [x] Identifique el puerto PostgreSQL.
- [x] Revise pg_hba.conf.
- [x] Analice las reglas de autenticacion.
- [x] Identifique cuentas administrativas.
- [x] Revise los atributos de los roles; falta comprobar sus permisos efectivos sobre objetos.
- [x] Separe conceptualmente cuentas administrativas y de aplicacion.
- [x] Revise extensiones.
- [x] Revise parametros de conexion.
- [x] Revise permisos del sistema operativo: pendiente de verificar.
- [x] Verifique las direcciones de escucha; falta comprobar el alcance permitido por el firewall.
- [x] Analice el uso de TLS y confirme TLS 1.3 en la conexion actual.
- [x] Documente los cambios confirmados y las propuestas pendientes.
- [x] Elabore una checklist.
- [x] Construi una propuesta de linea base.
## Conclusiones
La revision permitio identificar exposicion innecesaria en las interfaces de escucha y controles pendientes en cuentas, permisos y conexiones se habilito TLS y se comprobo el cifrado de la conexion actual. Este resultado mejora la proteccion de las comunicaciones, pero no significa que el hardening este completola seguridad de PostgreSQL requiere combinar restricciones de red, autenticacion segura, privilegios minimos, proteccion de archivos, mantenimiento y monitoreo. Cada cambio debe documentarse y comprobarse mediante evidencia.
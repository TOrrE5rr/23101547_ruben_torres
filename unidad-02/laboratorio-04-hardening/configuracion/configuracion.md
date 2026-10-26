# Configuracion de TLS

## Archivos y rutas

| Archivo | Ruta | Funcion |
| --- | --- | --- |
| postgresql.conf | C:\Program Files\PostgreSQL\18\data\postgresql.conf | Configuracion del servidor y TLS. |
| pg_hba.conf | C:\Program Files\PostgreSQL\18\data\pg_hba.conf | Reglas de acceso y autenticacion. |
| server.crt | C:\Program Files\PostgreSQL\18\data\server.crt | Certificado del servidor. |
| server.key | C:\Program Files\PostgreSQL\18\data\server.key | Clave privada del servidor. |

## Cambios realizados

Se generaron server.crt y server.key con OpenSSL y se copiaron a la carpeta data.

En postgresql.conf se habilitaron las siguientes opciones, quitando el simbolo # al inicio:

- ssl = on
- ssl_cert_file = 'server.crt'
- ssl_key_file = 'server.key'
- ssl_min_protocol_version = 'TLSv1.2'

Se guardo el archivo y se recargo la configuracion. No se confirmaron cambios en pg_hba.conf.

## Resultado

Se verifico TLS habilitado y una conexion cifrada con:

- Version: TLS 1.3.
- Cipher: TLS_AES_256_GCM_SHA384.

La clave privada server.key no debe subirse al repositorio. Sus permisos de Windows quedan pendientes de verificar.
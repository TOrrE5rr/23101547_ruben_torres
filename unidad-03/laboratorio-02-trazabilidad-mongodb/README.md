## Objetivo

Examinar que evidencia aportan el perfilador y la bitacora de MongoDB Community para identificar operaciones, accesos y cambios de permisos. Reconocer sus limites frente a la auditoria nativa.

## Despliegue utilizado

Se utilizo una instalacion local de MongoDB en Windows, administrada mediante el servicio MongoDB. Se trabajo con MongoDB Compass y su shell integrado, con dos conexiones: DBA y aplicacion.

| Elemento | Configuracion identificada |
|---|---|
| Servidor | 127.0.0.1:27017 |
| Base de trabajo | comercial |
| Coleccion | clientes |
| Servicio de Windows | MongoDB |
| Ejecutable | C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe |
| Configuracion del servicio | C:\Program Files\MongoDB\Server\8.0\bin\mongod.cfg |
| Datos | C:\Program Files\MongoDB\Server\8.0\data |
| Bitacora en archivo | C:\Program Files\MongoDB\Server\8.0\log\mongod.log |

| Version instalada identificada por la ruta | Rama 8.0 |


## Conexiones en Compass

Usar Add new connection y completar la contraseña en Authentication. Las cadenas siguientes no incluyen contraseñas:

- DBA: `mongodb://admin@127.0.0.1:27017/comercial?authSource=admin`
- Aplicacion: `mongodb://app_ventas@127.0.0.1:27017/comercial?authSource=comercial&appName=app-ventas-web`

El DBA configura y consulta el perfilador. La aplicacion ejecuta las consultas y modificaciones sobre clientes. No utilizar connect() dentro del shell de Compass: esa plataforma rechazo la apertura de conexiones nuevas desde el shell.


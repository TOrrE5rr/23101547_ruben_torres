## 1. Despliegue, edicion y limitacion

La practica se desarrollo en Windows con un servidor local accesible por 127.0.0.1:27017. La administracion se realizo con MongoDB Compass y su shell integrado. La salida del servicio confirma el nombre MongoDB y el ejecutable C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe, con el archivo mongod.cfg en la misma carpeta.

La ruta corresponde a la rama 8.0. No se presenta 7.0.43 como version propia, porque es la version usada en los ejemplos de la guia. Falta adjuntar la salida local de db.version(), buildInfo.modules y serverCmdLineOpts().parsed para completar la comprobacion de version, edicion y configuracion efectiva.

MongoDB Community no cuenta con auditoria nativa. El laboratorio utiliza el perfilador y la bitacora como mecanismos de trazabilidad parcial. No se presentan como equivalentes a la auditoria de Enterprise o Atlas.

## 2. Perfilador: configuracion, interpretacion y costo

Se trabajaron los niveles 0, 1 y 2 en comercial. El nivel 0 no registra operaciones nuevas; el nivel 1 selecciona operaciones por umbral o filtro; el nivel 2 permite observar consultas y modificaciones. Para conservar modificaciones se utilizo un filtro de insert, update y remove.

El archivo system-profile.json aportado contiene seis registros. Cuatro corresponden a app_ventas@comercial sobre comercial.clientes: dos update, una query y una remove. Otros dos corresponden a admin@admin sobre comercial.system.profile. Estos ultimos son operaciones administrativas de consulta del perfilador y no deben confundirse con operaciones de la aplicacion.

| Operacion | Usuario | Aplicacion | Momento UTC | Evidencia |
|---|---|---|---|---|
| update | app_ventas@comercial | app-ventas-web | 2026-11-15 07:27:02.560 | Asignacion de telefono 6670000000 al cliente _id: 1 |
| query | app_ventas@comercial | app-ventas-web | 2026-11-15 08:16:11.112 | Consulta sobre comercial.clientes; filtro no incluido en la exportacion |
| update | app_ventas@comercial | app-ventas-web | 2026-11-15 08:16:21.253 | Asignacion de RFC GAMA780912XYZ al cliente _id: 3 |
| remove | app_ventas@comercial | app-ventas-web | 2026-11-15 08:16:45.576 | Eliminacion solicitada con filtro _id: 2 |

En los cuatro registros el cliente es 127.0.0.1. La cuenta autenticada identifica al usuario de base de datos, no a la persona que uso sus credenciales. appName es un nombre declarado por el cliente.

El JSON ya cumple la presencia de query, update y remove de app_ventas. Sin embargo, no incluye nModified, ndeleted ni nreturned; por eso no permite afirmar cuantos documentos cambiaron, se eliminaron o se devolvieron. El command vacio de la query se explica por la proyeccion usada al exportar, que selecciono command.q y command.u, pero no command.find ni command.filter.

El nivel 2 aumenta el trabajo del servidor y el volumen de evidencia. Ademas, puede registrar filtros o valores con datos personales. El filtro reduce ese volumen, pero deja fuera las lecturas nuevas. La trazabilidad depende de activar el mecanismo antes de las operaciones que interesa observar.

## 3. Bitacora de mongod

El mongod.cfg compartido contiene systemLog.destination: file, systemLog.logAppend: true y la ruta C:\Program Files\MongoDB\Server\8.0\log\mongod.log. Esto describe la configuracion en archivo; la configuracion efectiva se verifica con serverCmdLineOpts().parsed.

En el trabajo se consultaron Successfully authenticated y Failed to authenticate. Algunas consultas fallaron al acceder a attr.doc.application.name porque ese campo no estaba presente. Se ajustaron con encadenamiento opcional y el texto No registrado. La ausencia del campo de aplicacion no invalida los demas campos del evento.

Para atribuir un cambio del perfilador se relaciona Profiler settings changed con Successfully authenticated mediante el mismo ctx, dentro de la misma ejecucion del servidor y con fechas coherentes. Los identificadores de conexion pueden repetirse despues de un reinicio.

No se adjunto bitacora-mongod.log para este informe. Por ello no se inventan conteos, puertos, fechas de acceso ni un ctx de la ejecucion del alumno. El archivo bitacora-lab01(1).log pertenece a PostgreSQL y solo sustenta la comparacion de motores.

## 4. Privilegios: control compensatorio y limite

La Actividad 7 compara dos instantaneas de los roles de app_ventas. La guia muestra readWrite antes y readWrite mas dbAdmin despues. Sus busquedas de grantRolesToUser devuelven cero en el perfilador y en la bitacora. Este resultado describe las fuentes consultadas bajo esa configuracion, no una garantia de ausencia de cualquier otro registro posible.

Las instantaneas permiten detectar diferencias de roles. No identifican por si solas al autor ni el instante exacto del otorgamiento. tomada_por registra quien genero la instantanea. Si un rol se agrega y se retira entre capturas, el cambio puede pasar inadvertido.

No se adjunto una exportacion de las instantaneas propias. El resultado de la guia se conserva como referencia del procedimiento, sin sustituir la evidencia de la ejecucion local. Se recomienda adjuntar las dos capturas reales y documentar la revocacion final de dbAdmin.

## 5. Conservacion y exportacion

system.profile es una coleccion limitada, de 1 MB por defecto. Al llenarse reemplaza registros antiguos. El estado temporal del perfilador no se conserva al reiniciar, aunque los documentos almacenados pueden permanecer. getLog consulta hasta 1024 eventos recientes en memoria y esa memoria se pierde al reiniciar.

El archivo de perfilado incluido es la copia exacta del JSON aportado. Su hash SHA-256 se incluye en evidencias/hashes.sha256. No se incluye un hash ficticio de bitacora-mongod.log, porque ese archivo no fue adjuntado. Se deben integrar los logs reales y recalcular el manifiesto final en la PC del alumno.

Las exportaciones deben realizarse antes del reinicio o del reemplazo de registros. La copia del archivo de bitacora del servidor complementa getLog, aunque su historia tambien depende de la rotacion y retencion de archivos. Un hash ayuda a comprobar que los bytes no cambiaron respecto del valor calculado; no demuestra por si mismo autenticidad, integridad previa ni que la exportacion este completa.

## 6. Comparacion con PostgreSQL y auditoria nativa

| Aspecto | PostgreSQL: evidencia revisada | MongoDB Community: evidencia revisada |
|---|---|---|
| Accesos | Autenticaciones exitosas y fallidas en la bitacora | Consultas realizadas durante la practica; falta adjuntar el log MongoDB |
| Privilegios | GRANT UPDATE y REVOKE UPDATE registrados con usuario postgres | El perfilador exportado no incluye otorgamientos; las instantaneas son el control compensatorio de la guia |
| Estructura | ALTER TABLE, funcion y disparador registrados | No hay un cambio de estructura en el JSON aportado |
| Datos | Sentencias de actualizacion, insercion y eliminacion | update y remove con usuario, cliente, aplicacion y momento |
| Valores anteriores | La funcion definida usa OLD y NEW; falta la exportacion de filas de auditoria | No estan en el perfilador exportado |
| Lecturas | No se comprobo el SELECT exitoso de soporte_ana en el log revisado | query de app_ventas en comercial.clientes |
| Configuracion | ALTER SYSTEM SET log_statement = 'mod' aparece en el log | La guia usa Profiler settings changed y correlacion por ctx; falta adjuntar esa evidencia local |

Enterprise y Atlas ofrecen auditoria nativa documentada, pero no se practicaron en este trabajo. Las operaciones CRUD exitosas requieren la configuracion de auditoria correspondiente, incluido auditAuthorizationSuccess. No se afirma que ese mecanismo almacene automaticamente los valores anteriores de cada documento.

## 7. Respuesta a Direccion

### ¿Quien cambio el RFC en la Actividad 2 y en la Actividad 3?

Actividad 2: No hay evidencia con esta edicion en las fuentes descritas por la prueba. El perfilador estaba apagado y una conexion autenticada no demuestra la ejecucion de una modificacion concreta.

Actividad 3: el JSON propio identifica a app_ventas@comercial como cuenta que ejecuto el update sobre _id: 3. El nuevo RFC solicitado es GAMA780912XYZ. El archivo no incluye nModified para determinar si esa ejecucion cambio efectivamente el valor o repitio uno existente.

### ¿Cuando y desde que aplicacion?

Para la Actividad 2 no se puede fijar el momento exacto del cambio usando solo los accesos. Para la actualizacion registrada en la Actividad 3, el momento es 2026-11-15T08:16:21.253Z, la aplicacion es app-ventas-web y el cliente es 127.0.0.1.

### ¿Que valor tenia antes?

No hay evidencia con esta edicion en el registro exportado. La guia establece GAMA780912GHI como dato inicial y GAMA780912XXX en la Actividad 2. Deducir el valor anterior a partir de esa secuencia no equivale a demostrarlo mediante una imagen anterior guardada por el perfilador.

### ¿Cambio alguien los privilegios de app_ventas?

Las instantaneas presentadas en la guia muestran la incorporacion de dbAdmin. Para confirmar ese resultado en la ejecucion propia deben adjuntarse sus instantaneas. Incluso con ambas capturas, no hay evidencia con esta edicion en las fuentes de la prueba para atribuir el otorgamiento a una cuenta o fijar su hora exacta.

## 8. Recomendacion

Para una organizacion que necesite atribuir cambios de permisos, recomiendo evaluar MongoDB Enterprise o un despliegue compatible de Atlas con auditoria nativa. La decision debe considerar costo, eventos requeridos, filtros, rendimiento, retencion y proteccion de los registros. Una prueba controlada debe comprobar que cada otorgamiento y revocacion conserva usuario, resultado y momento.

Mientras se mantenga Community, pueden utilizarse instantaneas periodicas protegidas, exportaciones y registros de cambios autorizados. Estas medidas reducen el riesgo, pero no sustituyen una auditoria completa. Los permisos de escritura de evidencias deben limitarse y conviene conservar copias fuera del control de quien administra el servidor.

## 9. Reflexion

## ¿Por que el perfilador no debe presentarse como un mecanismo de auditoria de seguridad?

Porque fue diseñado para analizar el desempeño de las operaciones. No cubre todos los eventos de seguridad y sus registros pueden perderse al llenarse la coleccion. Ademas, depende de la configuracion que estuviera activa cuando ocurrio el evento.

## ¿Por que el perfilador si aporta trazabilidad aunque no sea auditoria?

Porque registra operaciones junto con datos como el usuario, la aplicacion, el cliente y el momento. Esto ayuda a investigar lo ocurrido, aunque no ofrece un historial completo de todos los eventos de seguridad.

## ¿Que riesgo introduce el nivel 2 al registrar filtros de consultas que pueden contener datos personales?

Puede guardar nombres, correos, RFC y otros datos personales dentro de los registros. Si alguien accede a ellos sin autorizacion, podria obtener informacion sensible. Por eso deben protegerse tanto los registros como sus exportaciones.

## ¿Que diferencia hay entre detectar un cambio y atribuirlo a alguien?

Detectar un cambio significa comprobar que algo es diferente, por ejemplo, que un usuario tiene un rol adicional. Atribuirlo significa contar con evidencia que identifique quien lo realizo. Las capturas muestran diferencias, pero no demuestran por si solas quien hizo el cambio.

## ¿Por que reconocer una limitacion tecnica es parte del trabajo profesional del DBA?

Porque permite informar con claridad que se puede demostrar y que no. Evita sacar conclusiones sin evidencia y ayuda a proponer controles adicionales para cubrir los riesgos que las herramientas actuales no resuelven.
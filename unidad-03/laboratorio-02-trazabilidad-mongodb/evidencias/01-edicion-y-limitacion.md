## ¿Qué edición de MongoDB estás usando? ¿Qué evidencia lo demuestra? 
Community, lo evidenica el comando db.serverBuildInfo().modules

## ¿A dónde escribe tu servidor su bitácora? ¿Cómo lo sabes? path: 
'C:\\Program Files\\MongoDB\\Server\\8.0\\log\\mongod.log' por el comando db.serverCmdLineOpts().parsed.systemLog

## Según REF-U3-04, ¿qué cuatro categorías de eventos registraría la auditoría nativa?
Cambio de esquema DDL, Operacines de replicacion y fragmentacion, autenticacion y autorizacion y operaciones CRUD

## ¿Qué tendría que evaluar una organización antes de licenciar Enterprise o migrar a Atlas solo para obtener auditoría?
Los costos, lo que se debe de registrar, impacto de rendimiento, almacenamiento y los esfuerzod de migracion
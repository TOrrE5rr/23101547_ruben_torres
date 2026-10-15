| Situacion | Mecanismo apropiado | ¿Que protege? |
| --- | --- | --- |
| Contraseña de usuario | Hash con sal mediante bcrypt | La contraseña almacenada, sin permitir su descifrado. |
| RFC almacenado en una tabla | Cifrado simetrico | La confidencialidad del RFC en reposo. |
| Consulta enviada desde un cliente al servidor | TLS | La confidencialidad e integridad de los datos en transito. |
| Respaldo de una base de datos | Cifrado del respaldo | Los datos respaldados ante accesos no autorizados. |
| Clave criptografica | Gestor de claves con control de acceso | La clave frente a exposicion y uso no autorizado. |
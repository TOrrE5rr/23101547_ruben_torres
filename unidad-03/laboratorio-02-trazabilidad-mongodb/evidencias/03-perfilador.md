### 9.1 Interpretar los documentos

| # | op | Usuario | Cliente | Aplicacion | Momento (UTC) | Que hizo | Documentos afectados |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | query | app_ventas@comercial | 127.0.0.1 | MongoDB Compass | 2026-11-09 04:21:52.427 | Consulto clientes de Culiacan. | Examino 5 y devolvio 3. |
| 2 | update | app_ventas@comercial | 127.0.0.1 | MongoDB Compass | 2026-11-09 04:22:35.920 | Cambio el RFC del cliente 3 a GAMA780912XYZ. | Modifico 1. |
| 3 | remove | app_ventas@comercial | 127.0.0.1 | MongoDB Compass | 2026-11-09 04:22:54.553 | Elimino al cliente con _id: 2. | Elimino 1. |

## ¿Puedes saber cual era el RFC antes del cambio?

No, El registro muestra el nuevo RFC, pero no contiene el valor anterior

## ¿Puedes saber que datos tenia el documento eliminado?

No. Muestra el filtro _id: 2 y confirma que se elimino un documento, pero no guarda su contenido anterior

## ¿Que ventaja y que riesgo tiene registrar las consultas?

La ventaja es identificar las consultas realizadas, el usuario y el momento, ademas de analizar su rendimiento

## ¿Por que el campo user incluye @comercial?
Porque identifica al usuario app_ventas y su base de autenticacion, comercial
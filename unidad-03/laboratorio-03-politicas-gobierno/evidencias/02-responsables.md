| Conjunto de datos | Propietario | Custodio | Usuarios autorizados | Quien aprueba accesos | Quien aprueba correcciones |
|---|---|---|---|---|---|
| practica.public.clientes (PostgreSQL) | Atencion, Facturacion o Analitica, segun el campo | DBA de PostgreSQL | Atencion y Facturacion segun su funcion. Analitica solo consulta datos agrupados. | Responsable del campo solicitado | Responsable del campo afectado |
| auditoria.cambios_clientes (PostgreSQL) | Auditoria interna | DBA de PostgreSQL | Auditores con permiso de lectura. El disparador registra los cambios. | Auditoria interna | Auditoria interna aprueba una aclaracion y conserva el evento original. |
| Bitacora de PostgreSQL y vista .bitacora | Seguridad de TI | DBA de PostgreSQL | DBA encargado y personal autorizado de Seguridad o Auditoria | Seguridad de TI | Seguridad de TI aprueba una aclaracion y conserva la bitacora original. |
| comercial.clientes (MongoDB) | Atencion, Facturacion o Analitica, segun el campo | DBA de MongoDB | Aplicacion de ventas y personal autorizado segun su funcion. Analitica solo consulta datos agrupados. | Responsable del campo solicitado | Responsable del campo afectado |
|comercial.system.profile (MongoDB) | Operaciones de TI | DBA de MongoDB | DBA y personal autorizado de monitoreo o auditoria | Operaciones de TI | Operaciones de TI aprueba una aclaracion y conserva el registro original. |

## ¿Por que el propietario de auditoria.cambios_clientes debe ser distinto de quien opera clientes`?  
Para que la revision sea independiente. Si quien cambia un RFC tambien controla la evidencia, podria ocultar una modificacion 
## ¿Quien deberia poder leer las bitacoras y la vista dba.bitacora?  
Solo el DBA encargado y el personal autorizado de Seguridad o Auditoria

## ¿Que ocurre cuando nadie tiene asignada la responsabilidad sobre un dato? 
Queda sin definir quien debe verificar el dato y aprobar su correccion
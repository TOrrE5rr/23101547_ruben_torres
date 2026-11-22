| # | Hallazgo | Registros | Regla de calidad | Quien decide la correccion | Accion propuesta |
|---|---|---|---|---|---|
| C1 | Posible cliente duplicado | 1 y 7 | Correo unico sin distinguir mayusculas | Atencion al cliente | Confirmar si es la misma persona antes de unir los registros. |
| C2 | RFC incompleto | 7 | Formato del RFC | Facturacion | Verificar el RFC con la constancia fiscal. |
| C3 | Correo sin formato valido | 8 | Formato del correo | Atencion al cliente | Confirmar el correo con el cliente. |
| C4 | Edad de -3 | 8 | Edad entre 18 y 120 | Analitica | Verificar la edad con la fuente original. |
| C5 | RFC ausente | 8 | Completitud del RFC | Facturacion | Solicitarlo si se requiere para facturar. |

## ¿Por que el DBA no debe corregir por su cuenta el RFC del registro 7? 
El formato indica que hay un error. Solo Facturacion puede confirmar el valor correcto con la constancia fiscal y autorizar el cambio.

## ¿Que restriccion habria evitado cada hallazgo y quien debe aprobarla?  
C1: indice unico sobre lower(correo). C2 y C3: un CHECK de formato para cada campo. C4: CHECK (edad BETWEEN 18 AND 120). C5: NOT NULL si el RFC es obligatorio. El responsable de cada dato debe aprobar la regla y el DBA la implementa.

## ¿Que mecanismo del LAB-01 deja evidencia de la correccion?**  
El disparador trg_auditoria_clientes registra en auditoria.cambios_clientes el usuario de la sesion, la fecha y los valores antes y despues del cambio.
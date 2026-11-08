| Campo propuesto | Tipo | ¿Que pregunta responde? | ¿Puede ser nulo? ¿Por que? |
|---|---|---|---|
| id_evento | BIGSERIAL | ¿Cual es el identificador del evento? | No, es la clave primaria |
| momento | TIMESTAMPTZ | ¿Cuando ocurrio el cambio? | No, se necesita ubicar el evento en el tiempo |
| usuario_sesion | TEXT | ¿Que usuario inicio la sesion? | No, identifica la cuenta conectada |
| usuario_efectivo | TEXT | ¿Con los privilegios de que usuario se ejecuto? | No, identifica el usuario efectivo al registrar el evento |
| aplicacion | TEXT | ¿Desde que aplicacion se realizo? | Si, la tabla lo permite. Si no se configura el nombre, normalmente queda una cadena vacia |
| ip_cliente | INET | ¿Desde que direccion IP se conectaron? | Si, una conexion local por socket Unix no tiene IP |
| operacion | TEXT | ¿Que operacion se realizo? | No, debe indicar INSERT, UPDATE o DELETE |
| id_cliente | BIGINT | ¿Que cliente fue afectado? | Si. el diseño lo permite, aunque deberia guardarse cuando el cliente tenga identificador |
| valores_antes | JSONB | ¿Como estaba el registro antes? | Si en un INSERT no existe un registro anterio |
| valores_despues | JSONB | ¿Como quedo el registro despues? | Si, en un DELETE el registro deja de existir |

## ¿Por que momento usa TIMESTAMPTZ y no TIMESTAMP?

Porque permite identificar el mismo instante aunque las sesiones usen distintas zonas horarias. Esto ayuda a ordenar y comparar los eventos sin confundir las horas.

## ¿Por que se guarda el registro completo en JSONB y no solo la columna que cambio?

Para conservar el estado completo antes y despues de la operacion. Esto permite comparar los valores e investigar el cambio, aunque despues se modifique la estructura de clientes.

## La tabla de auditoria tambien contendra RFC. ¿Que implica eso para su clasificacion y su control de acceso?
Debe tratarse como informacion confidencial porque contiene datos personales, incluso valores anteriores, solo el personal autorizado debe consultarla, y se deben restringir los permisos para modificar o borrar sus registros
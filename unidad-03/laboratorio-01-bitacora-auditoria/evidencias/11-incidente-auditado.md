## Compara tu hipotesis de la Actividad 11 con este resultado.
El resultado muestra que SECURITY DEFINER permite guardar la auditoria con los permisos de postgres. Por eso el UPDATE funciona, aunque app_ventas no pueda consultar la auditoria

## Escribe la sentencia UPDATE que restauraria el valor anterior.


```sql
UPDATE clientes
SET rfc = 'GAMA780912XYZ'
WHERE id = 3;
```


## ¿Que columna conserva mas valor para una investigacion: aplicacion o ip_cliente? ¿Cual puede falsificar el cliente con mas facilidad?
ip_cliente suele aportar evidencia mas confiable del origen de la conexion, aunque no identifica por si sola a una persona. aplicacion es mas facil de falsificar, porque el cliente puede elegir libremente el valor de application_name.
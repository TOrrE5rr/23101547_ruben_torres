## ¿Que perdiste de evidencia al aplicar el filtro? ¿Que ganaste?
Deje de registrar las consultas de lectura, por lo que perdi evidencia de quien consulto los datos y cuando ,gane un menor volumen de registros y facilite la revision de inserciones, actualizaciones y eliminaciones

## ¿Que filtro usarias si solo interesaran operaciones sobre la coleccion clientes?
Usaria el campo ns para limitar el perfilado a comercial.clientes

db.setProfilingLevel(1, {
  filter: { ns: "comercial.clientes" }
})
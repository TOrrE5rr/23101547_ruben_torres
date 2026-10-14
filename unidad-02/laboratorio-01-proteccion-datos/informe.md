
# Laboratorio 01 — Proteccion de datos

# Actividad 1

| Campo | ¿Identifica directamente? | ¿Puede contribuir a identificar? | ¿Requiere proteccion? | Justificacion |
|---|---|---|---|---|
| id | No | Si | Si | Identifica el registro y permite vincular informacion del cliente entre tablas. |
| nombre | Si | Si | Si | Identifica nominalmente a la persona, aunque puede haber nombres repetidos. |
| correo | Si | Si | Si | Permite contactar a una persona y vincular informacion con ella. |
| telefono | Si | Si | Si | Puede asociarse con su titular, aunque puede ser compartido. |
| rfc | Si | Si | Si | Identifica fiscalmente a una persona. |
| edad | No | Si | Si | Combinada con otros datos, reduce el grupo de posibles personas. |
| ciudad | No | Si | Si | Contribuye a identificar a una persona al combinarse con otros atributos. |
| codigo_postal | No | Si | Si | Delimita una zona geografica y facilita la identificacion junto con otros datos. |
| fecha_alta | No | Si | Si | Puede cruzarse con informacion externa para ayudar a identificar al cliente. |





### 1. ¿Que campos identifican directamente a una persona?
Los campos `nombre`, `correo`, `telefono` y `rfc`, porque permiten reconocer o vincular informacion con una persona. Sin embargo, el nombre puede repetirse y el telefono puede ser compartido.

### 2. ¿Que campos no identifican por si solos, pero podrian contribuir a hacerlo?
Los campos `edad`, `ciudad`, `codigo_postal` y `fecha_alta`. 

### 3. ¿Que combinacion de campos podria incrementar el riesgo de reidentificacion?
La combinacion de `edad`, `ciudad` y `codigo_postal`, porque reduce el numero de personas que coinciden con esas caracteristicas.

### 4. ¿Todos los datos que deben protegerse son necesariamente datos personales sensibles desde el punto de vista juridico?
No. Los datos personales sensibles incluyen informacion como salud, origen etnico, creencias religiosas. Los campos de esta tabla no son sensibles por su sola naturaleza, pero deben protegerse cuando corresponden a personas reales porque permiten identificarlas o conocer informacion sobre ellas.




## Actividad 2. Enmascaramiento de datos mediante una vista

### 1. ¿Que informacion continua existiendo en la tabla original?

La tabla `clientes` conserva todos los datos completos: id, nombre, correo, telefono, RFC, edad, ciudad, codigo postal y fecha de alta

### 2. ¿Que informacion puede visualizar el usuario soporte?
El rol `soporte` puede consultar el id y el nombre completos. Del correo puede visualizar los primeros dos caracteres y el dominio; del telefono y del RFC, unicamente los ultimos cuatro caracteres. 
### 3. ¿Por que no es suficiente ocultar los datos unicamente en la aplicacion?
Porque un usuario con permisos sobre la tabla podria consultar directamente la base de datos y obtener los valores completos, sin pasar por la aplicacion. Por eso, la proteccion debe incluir restricciones de acceso en la base de datos.

### 4. ¿Que ocurriria si soporte tuviera acceso directo a clientes?
Podria consultar los datos originales completos 

### Permisos aplicados

```sql
-- Permite utilizar el esquema public.
GRANT USAGE ON SCHEMA public TO soporte;

-- Permite consultar la vista con datos enmascarados.
GRANT SELECT ON v_clientes_soporte TO soporte;

-- Retira los permisos directos sobre la tabla original.
REVOKE ALL ON clientes FROM soporte;
```

El mecanismo utilizado es el enmascaramiento de datos mediante una vista y el control de acceso por roles. La vista muestra parcialmente el correo, telefono y RFC mediante funciones de texto y asteriscos, mientras los valores completos permanecen en la tabla original. El rol soporte tiene permiso para consultar la vista, pero no la tabla clientes, lo que impide que obtenga directamente los datos completos.


# Actividad 4
### 1. ¿Que ocurriria si `analista` pudiera consultar tambien `pii.mapa_cliente`?

Podria relacionar cada token con el identificador original del cliente. Con acceso a informacion adicional que vincule ese identificador con una persona, podria reidentificarla.

### 2. ¿Que principio de seguridad se esta aplicando al separar ambos accesos?

El principio de minimo privilegio: cada rol accede unicamente a la informacion necesaria para realizar sus funciones.

### 3. ¿Por que la seudonimizacion no equivale a anonimizacion?

Porque conserva informacion adicional que permite recuperar la relacion con una persona. La anonimizacion busca impedir esa identificacion mediante medios razonablemente disponibles.

### 4. ¿Que informacion permite volver a relacionar el token con una persona?

La correspondencia entre token y cliente_id en pii.mapa_cliente, junto con los datos identificativos del cliente en la tabla original.






# Actividad 6
## Analisis del resultado

### 1. ¿Que identificadores directos fueron eliminados?

Se excluyeron del resultado el nombre, correo, telefono y RFC. Tambien se excluyo el identificador interno `id`. Estos datos siguen existiendo en la tabla original.

### 2. ¿Que cuasi-identificadores permanecen?

Permanecen el rango de edad y la region formada por los primeros dos caracteres del codigo postal.

### 3. ¿Que combinaciones de atributos podrian reducir el anonimato?

La combinacion de rango de edad y region puede formar grupos pequeños. Al relacionarla con informacion externa, podria facilitar la identificacion de personas.

### 4. ¿Que sucede cuando un grupo contiene pocos registros?

Aumenta el riesgo de distinguir a sus integrantes o inferir informacion sobre ellos. Sin el filtro HAVING se muestran incluso grupos de una sola persona; con HAVING COUNT(*) >= 5 se excluyen los grupos menores de cinco.

### 5. ¿Que atributos deberian generalizarse?

La edad puede agruparse en intervalos mas amplios. 

### 6. ¿Que informacion deberia suprimirse?

Deben mantenerse fuera los identificadores directos y el id. Tambien deberian suprimirse los grupos con menos de cinco registros y los atributos que no sean necesarios para el analisis.

### 7. ¿Es correcto afirmar que el conjunto de datos es “100 % anonimo”? ¿Por que?

No. Generalizar y suprimir informacion reduce el riesgo, pero no garantiza que sea imposible reidentificar a alguien mediante otras fuentes.

# Actividad 7
## Retencion de informacion

- **¿Que registros serian afectados?**  
  Ninguno actualmente. La consulta devolvio un resultado vacio porque ningun registro tiene una fecha de alta anterior a cinco años.

- **¿Cual seria la justificacion del periodo?**  
  Los cinco años son un periodo didactico del laboratorio. En una organizacion, el plazo debe definirse segun la finalidad de los datos, las necesidades operativas y las obligaciones aplicables.

- **¿Que aprobacion deberia existir antes de eliminar informacion?**  
  Una autorizacion documentada del responsable de los datos, previa revision de que no existan motivos para conservarlos. En este caso no se requiere autorizar una eliminacion, porque no se identificaron registros afectados.

- **¿Que respaldo deberia existir?**  
  Antes de una futura eliminacion, debe existir un respaldo verificado, protegido y con acceso restringido, cuyo funcionamiento se haya comprobado mediante una prueba de restauracion.

- **¿Que evidencia deberia conservarse?**  
  La consulta ejecutada, la fecha de revision y una captura del resultado vacio, indicando que se identificaron cero registros y no se elimino informacion.

- **¿Que procedimiento permitiria recuperar informacion eliminada accidentalmente?**  
  Restaurar el respaldo en un entorno separado, identificar los registros eliminados y reincorporarlos con autorizacion, verificando su integridad y evitando duplicados. En esta actividad no fue necesario recuperar informacion porque no se realizo ninguna eliminacion.

## 19. Resumen del laboratorio

### 19.1 Clasificacion

Todos los campos requieren proteccion al estar relacionados con clientes. Nombre, correo, telefono y RFC permiten identificarlos directamente. Edad, ciudad, codigo postal y fecha de alta pueden ayudar a identificarlos al combinarse. El id permite relacionar sus registros.

### 19.2 Enmascaramiento

Se oculto parte del correo, telefono y RFC para el rol `soporte`, porque no necesita verlos completos. Se uso la vista `v_clientes_soporte`, funciones de texto y asteriscos. Se permitio consultar la vista y se retiro el acceso directo a la tabla.

### 19.3 Seudonimizacion

Los tokens se generaron como UUID aleatorios con `gen_random_uuid()`. La relacion entre token y cliente_id esta en `pii.mapa_cliente`. Solo deberia acceder personal autorizado que necesite recuperar esa relacion. Se separaron los permisos para que `analista2` trabaje con los datos sin consultar el mapa ni la tabla original.

### 19.4 Anonimizacion

Se excluyeron del resultado nombre, correo, telefono, RFC e id. La edad se agrupo en rangos y el codigo postal se redujo a sus primeros dos caracteres. El filtro `HAVING COUNT(*) >= 5` excluye grupos menores de cinco; con los cinco datos originales, la consulta combinada no muestra ningun grupo.

En el reto se ampliaron los rangos a 18-64 y 65+, se excluyeron menores y edades nulas, y se quito la region. Esto reduce el riesgo, pero cruzar resultados con otras fuentes todavia podria revelar informacion. No se puede asegurar anonimato completo.

### 19.5 Retencion

Se buscaron registros con fecha de alta anterior a cinco años. La consulta salio vacia, por lo que no hubo candidatos a eliminar. Debe conservarse la informacion necesaria para el trabajo y las obligaciones aplicables. Podria eliminarse la que ya no sea necesaria y haya cumplido su plazo, despues de revisarla.

Antes de eliminar debe existir autorizacion, un respaldo verificado y un registro de la operacion. En esta practica no se ejecuto DELETE.

### 19.6 Conclusiones

- **Para soporte:** usaria enmascaramiento mediante una vista para mostrar solo lo necesario.
- **Para analitica:** usaria seudonimizacion, con el mapa separado y restringido.
- **Para publicar estadisticas:** usaria datos agregados, rangos amplios y supresion de grupos pequeños, revisando el riesgo antes de publicarlos.
- **Control de acceso:** sigue siendo necesario porque alguien con acceso a los originales o al mapa podria obtener informacion que se intento proteger.

## 20. Preguntas de reflexion

### 1. ¿Cual es la diferencia entre enmascaramiento y seudonimizacion?

El enmascaramiento oculta partes del dato al mostrarlo. La seudonimizacion usa un token en lugar de la identidad y conserva una relacion separada.

### 2. ¿Por que la seudonimizacion no significa anonimizacion?

Porque el mapa y los datos originales permiten volver a relacionar el token con una persona.

### 3. ¿Por que eliminar nombre y RFC no garantiza que un conjunto de datos sea anonimo?

Porque otros datos, como correo o telefono, pueden identificarla. Tambien la combinacion de edad y ubicacion puede ayudar a hacerlo.

### 4. ¿Que funcion tienen los cuasi-identificadores?

Describen caracteristicas que, al combinarse o cruzarse con otras fuentes, pueden ayudar a identificar a alguien.

### 5. ¿Por que es importante separar el mapa de seudonimizacion?

Para evitar que quien analiza los datos pueda relacionar facilmente los tokens con los clientes.

### 6. ¿Que principio de seguridad se aplica al impedir que el analista acceda al mapa?

El minimo privilegio: darle solo los accesos necesarios para su trabajo.

### 7. ¿Por que una vista puede ser preferible a entregar acceso directo a la tabla?

Porque permite mostrar solo los campos necesarios y ocultar parte de los valores originales.

### 8. ¿Que diferencia existe entre proteger un dato para visualizacion y protegerlo contra acceso no autorizado?

Proteger la visualizacion cambia lo que se muestra. El control de acceso limita quien puede consultar la informacion.

### 9. ¿Por que la retencion forma parte de la proteccion de datos?

Porque limita el tiempo que se guardan los datos y evita acumular informacion que ya no se necesita.

### 10. ¿Que riesgo existe si una organizacion conserva informacion indefinidamente?

Aumenta la cantidad de datos que podrian filtrarse o usarse sin permiso, ademas de guardar informacion desactualizada.


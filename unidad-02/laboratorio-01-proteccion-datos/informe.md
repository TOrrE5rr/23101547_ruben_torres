
# Laboratorio 01 — Protección de datos

# Actividad 1

| Campo | ¿Identifica directamente? | ¿Puede contribuir a identificar? | ¿Requiere protección? | Justificación |
|---|---|---|---|---|
| id | No | Sí | Sí | Identifica el registro y permite vincular información del cliente entre tablas. |
| nombre | Sí | Sí | Sí | Identifica nominalmente a la persona, aunque puede haber nombres repetidos. |
| correo | Sí | Sí | Sí | Permite contactar a una persona y vincular información con ella. |
| telefono | Sí | Sí | Sí | Puede asociarse con su titular, aunque puede ser compartido. |
| rfc | Sí | Sí | Sí | Identifica fiscalmente a una persona. |
| edad | No | Sí | Sí | Combinada con otros datos, reduce el grupo de posibles personas. |
| ciudad | No | Sí | Sí | Contribuye a identificar a una persona al combinarse con otros atributos. |
| codigo_postal | No | Sí | Sí | Delimita una zona geográfica y facilita la identificación junto con otros datos. |
| fecha_alta | No | Sí | Sí | Puede cruzarse con información externa para ayudar a identificar al cliente. |





### 1. ¿Qué campos identifican directamente a una persona?
Los campos `nombre`, `correo`, `telefono` y `rfc`, porque permiten reconocer o vincular información con una persona. Sin embargo, el nombre puede repetirse y el teléfono puede ser compartido.

### 2. ¿Qué campos no identifican por sí solos, pero podrían contribuir a hacerlo?
Los campos `edad`, `ciudad`, `codigo_postal` y `fecha_alta`. 

### 3. ¿Qué combinación de campos podría incrementar el riesgo de reidentificación?
La combinación de `edad`, `ciudad` y `codigo_postal`, porque reduce el número de personas que coinciden con esas características.

### 4. ¿Todos los datos que deben protegerse son necesariamente datos personales sensibles desde el punto de vista jurídico?
No. Los datos personales sensibles incluyen información como salud, origen étnico, creencias religiosas. Los campos de esta tabla no son sensibles por su sola naturaleza, pero deben protegerse cuando corresponden a personas reales porque permiten identificarlas o conocer información sobre ellas.
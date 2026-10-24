# Laboratorio 03 — Privacidad y cumplimiento

### 1 Introduccion
En esta practica se analizo el uso de los datos personales de clientes y los riesgos de guardarlos o compartirlos sin una finalidad clara, el problema principal es permitir accesos innecesarios y conservar informacion sin definir cuando debe eliminarse

### 2 Inventario de datos
Se identificaron los campos id, nombre, correo, telefono, RFC, edad, ciudad, codigo postal y fecha de alta, todos son datos personales cuando estan relacionados con un cliente identificable, el nombre y el id permiten identificarlo, el correo y telefono permiten contactarlo, el RFC se utiliza para fines fiscales y los demas describen su edad, ubicacion y registro

### 3 Finalidades
Los datos deben utilizarse segun las necesidades de cada area, Atencion al cliente necesita identificar y contactar a las personas, Facturacion requiere datos fiscales y Analitica necesita informacion agrupada para generar estadisticas, el uso para promociones debe revisarse y autorizarse antes de realizarse

### 4 Minimizacion
Cada area debe recibir solo los datos que necesita, Atencion no requiere el RFC ni la edad para resolver consultas generales y Analitica puede trabajar sin nombres, correos ni telefonos, tambien pueden utilizarse rangos de edad y regiones del codigo postal para reducir el detalle de la informacion

### 5 Control de acceso
Los permisos se asignan segun las funciones de cada area, Atencion consulta datos de contacto, Facturacion consulta datos fiscales y Analitica accede a resultados agrupados mediante vistas, el DBA utiliza sus permisos para realizar las tareas tecnicas necesarias

### 6 Derechos ARCO
El acceso requiere localizar y entregar los datos del cliente de forma segura, la rectificacion implica corregir la informacion y registrar el cambio, la cancelacion requiere revisar tambien las copias y los sistemas relacionados, mientras que la oposicion implica detener el uso de los datos para una finalidad determinada

### 7 Retencion
El periodo de conservacion debe definirse considerando para que se necesitan los datos y las obligaciones aplicables, la empresa debe registrar el plazo, desde cuando se cuenta y que se hara al terminar, guardar informacion por si sirve en el futuro no es una justificacion suficiente

### 8 Gobierno de datos
Atencion al cliente se encarga de los datos necesarios para atender y contactar, Facturacion de los datos fiscales y Analitica de las estadisticas, el DBA administra los controles tecnicos, el responsable de privacidad coordina las solicitudes y el propietario de los datos define las necesidades de uso junto con las areas correspondientes

### 9 Evaluacion integral
Los principales riesgos son el acceso de Analitica a toda la tabla, la entrega de copias completas a desarrolladores y el uso de datos reales en pruebas, tambien se encontro falta de reglas de retencion y de documentacion sobre las finalidades, estas situaciones aumentan el riesgo de filtraciones y usos indebidos

### 10 Conclusiones
Aprendi que administrar una base de datos implica proteger la informacion y controlar su uso, la privacidad ayuda a definir que datos se necesitan y para que pueden utilizarse, mientras que la seguridad permite protegerlos mediante permisos, cifrado y otros controles

## Preguntas de reflexion

### 1 ¿Una base de datos tecnicamente segura necesariamente cumple con todos los requisitos de privacidad?
No, aunque este protegida puede contener datos innecesarios o utilizarlos para finalidades no autorizadas

### 2 ¿Por que el principio de minimo privilegio tambien contribuye a la privacidad?
Porque permite que cada persona consulte solo los datos necesarios para realizar su trabajo
### 3 ¿Por que el DBA no deberia decidir por si solo la finalidad del tratamiento de los datos?
Porque las finalidades deben definirse con las areas que conocen las necesidades del negocio y las condiciones para usar los datos

### 4 ¿Por que los desarrolladores no deberian recibir automaticamente copias completas de bases de datos productivas?
Porque normalmente pueden realizar pruebas con datos ficticios, recibir una copia completa expone informacion que no necesitan
### 5 ¿Por que una copia utilizada para desarrollo tambien puede representar un riesgo de privacidad?
Porque puede contener datos reales que se filtren, se compartan o permanezcan guardados sin control

### 6 ¿Por que la retencion debe formar parte del ciclo de vida de los datos?
Porque permite definir cuando dejan de ser necesarios y evitar que se conserven indefinidamente

### 7 ¿Que relacion existe entre privacidad por diseño y diseño de bases de datos?
La privacidad debe considerarse desde que se eligen los datos que se guardaran, los permisos de acceso y los plazos de conservacion

### 8 ¿Que controles tecnicos implementarias para reducir el riesgo de exposicion de datos personales?
Implementaria permisos por rol, vistas limitadas, cifrado, resultados agrupados, registros de auditoria y datos ficticios para pruebas

### 9 ¿Que informacion deberia conocer un DBA para responder tecnicamente a una solicitud ARCO?
Debe conocer la identidad verificada del cliente, la accion autorizada y la ubicacion de sus datos en tablas, copias, respaldos y otros sistemas

### 10 ¿Que responsabilidades deberian corresponder al DBA, al responsable de privacidad, al area juridica y al propietario de los datos?
El DBA aplica los cambios tecnicos autorizados, el responsable de privacidad coordina las solicitudes y revisa el uso de los datos, el area juridica interpreta las obligaciones legales y el propietario de los datos define las necesidades de uso y los accesos correspondientes
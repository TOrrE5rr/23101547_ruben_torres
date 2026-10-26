## actividad 1
| Elemento | Estado actual | Es necesario? | Riesgo |
| --- | --- | --- | --- |
| Puerto PostgreSQL | 5432 | Si, para conexiones TCP | Accesos no autorizados si la red no esta restringida |
| Interfaces de escucha | * (todas las interfaces) | Solo las utilizadas | Exposicion en redes innecesarias |
| Conexiones remotas | null | Solo las autorizadas | Conexiones desde equipos no requeridos |
| Usuarios administrativos | postgre | Si, solo para administrar | Uso indebido de privilegios elevados |
| SSL/TLS | off | Si, para proteger conexiones remotas | Trafico sin cifrado TLS |
| Metodos de autenticacion |scram-sha-256 | Si, preferentemente scram-sha-256 | Metodos o reglas de acceso inseguros |

#### Por que conocer la superficie de ataque debe preceder al hardening?
porque permite identificar los puntos de acceso, los riesgos y las conexiones necesarias antes de aplicar cambios

## actividad 2
practica=# SHOW config_file;
                     config_file
-----------------------------------------------------
 C:/Program Files/PostgreSQL/18/data/postgresql.conf
(1 row)


practica=# SHOW hba_file;
                    hba_file
-------------------------------------------------
 C:/Program Files/PostgreSQL/18/data/pg_hba.conf
(1 row)


practica=# SHOW ident_file;
                    ident_file
---------------------------------------------------
 C:/Program Files/PostgreSQL/18/data/pg_ident.conf
(1 row)

### Por que es importante conocer la ubicacion fisica de estos archivos?
Porque permite encontrar los archivos correctos para revisar la configuracion, controlar el acceso, proteger los datos y consultar los registros

## actividad 3
## Configuracion encontrada
listen_addresses='* escucha en todas las interfaces de red disponibles
#### Interfaces necesarias

localhost si solo se utiliza desde el mismo equipo. Si existen conexiones remotas autorizadas, tambien la interfaz de la red privada correspondiente

#### Interfaces innecesarias

Las interfaces que no utilizan los clientes autorizados,

#### Analisis
La segunda arquitectura reduce mejor la exposicion porque mantiene PostgreSQL en una red privada y bloquea el acceso directo desde Internet ,el firewall debe permitir solamente las conexiones necesarias de equipos autorizados, escuchar en todas las interfaces no significa por si solo que posgre sea accesible desde intenret tambien depende del firewall y de la configuracion de red

## actvidad 5


## Que bases de datos permite?
Permite intentar conexiones a todas las bases de datos, sujeto a los permisos del usuario

## Que usuarios permite?
Cualquier usuario con capacidad de iniciar sesion

## Que direcciones de origen permite?
Cualquier direccion IPv4 

## Que metodo de autenticacion utiliza?
scram-sha-256

## Por que puede representar una exposicion innecesaria?
Porque permite intentos de conexion desde cualquier direccion IPv4, aunque solo algunos equipos necesiten acceso

## Que informacion necesitarias para restringirla?
La IP del equipo autorizado, el nombre de la base de datos y el usuario que necesita conectarse


**Regla actual del caso hipotetico:**

host    all    all    0.0.0.0/0    scram-sha-256

**Problema:**
La regla permite intentos de conexion desde cualquier origen IPv4 y no limita la base de datos ni el usuario

**Origen que realmente necesita acceso:**

127.0.0.1, porque la practica se realiza desde el mismo equipo.

**Base de datos:**
practica

**Usuario:**
postgres

**Regla propuesta:**

host    practica    postgres    127.0.0.1/32    scram-sha-256

## actividad 7
## Que diferencia existe entre autenticacion y autorizacion?
La autenticacion comprueba quien eres, la autorizacion determina que acciones puedes realizar y a que datos puedes acceder

## Que protege scram-sha-256?
Protege la autenticacion mediante contraseña, sin almacenarla ni enviarla en texto claro

## Por que una contraseña almacenada mediante un mecanismo de autenticacion no debe confundirse con cifrado reversible?
Porque se almacena un verificador que permite comprobar la contraseña, no recuperar la original,el cifrado reversible permite recuperar el contenido mediante una clave

## Que sucede si una cuenta tiene permisos excesivos aunque utilice una contrasena fuerte?
Puede consultar, modificar o eliminar datos que no necesita



## actividad 8
| Rol | LOGIN | SUPERUSER | CREATEROLE | CREATEDB | Funcion |
| --- | --- | --- | --- | --- | --- |
| analista2 | No | No | No | No | Agrupar permisos de analisis |
| analista3 | No | No | No | No | Agrupar permisos de analisis |
| soporte | No | No | No | No | Agrupar permisos para tareas de soporte |
| postgres | Si | Si | Si | Si | Administracion del servidor PostgreSQL |


## Por que no deberia utilizarse una cuenta SUPERUSER como cuenta normal de una aplicacion?
porque tiene privilegios elevados sobre todo el servidor, si la aplicacion presenta una falla o alguien obtiene su contraseña, podria acceder, modificar o eliminar datos y cambiar permisos

## actividad 9
## DBA
cuenta con login utilizada para administrar el servidor, gestionar usuarios, asignar permisos y realizar mantenimiento

## APP
cuenta con login utilizada por el software para conectarse a la base de datos, deebe tener unicamente los permisos necesarios para su funcionamiento, sin privilegios administrativos

## CONSULTA
cuenta con login utilizada para consultar informacion. Solo debe tener permisos de lectura sobre las tablas o vistas autorizadas

## Que riesgo existe si la aplicacion se conecta utilizando una cuenta administrativa?
 podria modificar o eliminar datos, cambiar permisos y afectar el servidor

 ## actividad 10
 ## Que extensiones existen?
pgcrypto version 1.4 y plpgsql version 1.0

## Cuales son necesarias?
pgcrypto es necesaria si se utilizan funciones de hash y cifrado, plpgsql permite crear y ejecutar funciones y procedimientos con logica de programacion
## Cuales fueron instaladas para practicas?
pgcrypto se instalo para las practicas de proteccion de contraseñas y cifrado de datos

## Cuales podrian representar funcionalidad innecesaria en otro entorno?
pgcrypto podria ser innecesaria si el sistema no utiliza sus funciones

## actividad 11
## max_connections
Valor actual: 100
Establece el numero maximo de conexiones simultaneas al servidor, incluyendo las reservadas

## superuser_reserved_connections
Valor actual: 3
Reserva 3 conexiones del total para superusuarios. Permite que el administrador pueda conectarse cuando se agotan los espacios disponibles para conexiones normale

## statement_timeout
Valor actual: 0.

Limita el tiempo de ejecucion de una sentencia SQL,el valor 0 significa que este limite esta desactivado, por lo que una consulta no se cancela automaticamente por este parametro.

## idle_in_transaction_session_timeout
Valor actual: 0
Limita el tiempo que una sesion puede permanecer inactiva con una transaccion abierta, el valor 0 significa que no se cierra automaticamente por este motivo

## Por que mantener conexiones indefinidamente abiertas puede representar un problema de disponibilidad o consumo de recursos?
Porque consumen memoria y ocupan espacios de conexion, lo que puede impedir que otros usuarios se conecten tambien mantienen transacciones abiertas, pueden conservar bloqueos y dificultar la limpieza de datos antiguos, afectando el rendimiento del servidor

## actividad 12
## Por que no es suficiente proteger PostgreSQL mediante GRANT y REVOKE si cualquier usuario del sistema operativo puede leer archivos sensibles?
Porque grant y revoke controlan los permisos dentro de posgresql, pero no el acceso directo a los archivos del 

## actividad 13
## Direccion de escucha
0.0.0.0 y [::]. PostgreSQL escucha en todas las interfaces IPv4 e IPv6

## Puerto
5432

## Esta expuesto fuera de la interfaz necesaria?
Si, esta escuchando en todas las interfaces, aunque para esta practica local solo se necesita localhost esto no significa que sea accesible desde internet, ya que tambien depende del firewall y de las reglas de acceso

## Conexiones observadas
Las conexiones ESTABLISHED mostradas utilizan [::1], que corresponde al mismo equipo mediante IPv6 no se observan conexiones desde otros equipos en este resultado

## actividad 15
## la conexion actual utiliza tls?
si

## version
1.3

## cipher
TLS_AES_256_GCM_SHA384

## actividad 15
Las sugerencias de la columna Despues deben aplicarse y verificarse antes de registrarlas como cambios realizados.
## actividad 16

| Control | Antes | Despues | Justificacion |
| --- | --- | --- | --- |
| listen_addresses | *: todas las interfaces | Sugerido: localhost | Limitar la escucha al mismo equipo porque la practica es local. |
| pg_hba.conf | Reglas locales con all/all y scram-sha-256 | Sugerido: reglas para practica, usuarios autorizados y origenes 127.0.0.1/32 y ::1/128; usar hostssl para APP y CONSULTA | Restringir las conexiones por base, usuario y origen, y exigir TLS para esas cuentas. |
| Metodo de autenticacion | scram-sha-256 | Conservar scram-sha-256 | Mantener un metodo seguro de autenticacion mediante contraseña. |
| Usuarios administrativos | postgres con privilegios de superusuario | Sugerido: reservar postgres para administracion local | Evitar el uso de privilegios elevados en operaciones normales de la aplicacion. |
| Cuentas de aplicacion | No se identifico una cuenta APP separada | Sugerido: app_lab con permisos necesarios y consulta_lab con solo lectura | Separar funciones y aplicar el principio de minimo privilegio. |
| Puerto | 5432 | Conservar 5432 con acceso restringido | La proteccion depende de los controles de acceso y no solamente del numero de puerto. |
| TLS | ssl = off | Confirmado: ssl = on; conexion actual con TLS 1.3 y TLS_AES_256_GCM_SHA384 | Proteger la comunicacion entre el cliente y el servidor mediante cifrado. |
| Permisos SO | Sin revision documentada | Sugerido: restringir permisos NTFS a la cuenta del servicio y administradores autorizados, conservando los accesos necesarios de SYSTEM | Evitar lectura o modificacion no autorizada de datos, configuracion y clave privada. |
| Extensiones | pgcrypto 1.4 y plpgsql 1.0 | Conservar ambas extensiones | Son utilizadas en las practicas de cifrado y funciones. |
| Conexiones | Maximo de 100, reserva de 3 para superusuarios y ambos timeouts en 0 | Sugerido: conservar 100 y 3; establecer statement_timeout de 30s e idle_in_transaction_session_timeout de 60s para app_lab y consulta_lab | Limitar consultas prolongadas y transacciones inactivas; ajustar los tiempos si las operaciones legitimas requieren mas duracion. |



## Actividad 17



| # | Control | Verificado | Evidencia |
| --- | --- | --- | --- |
| 1 | Puerto documentado | Si | Puerto 5432 identificado mediante SHOW port y revision de red. |
| 2 | Interfaces de escucha justificadas |Si | Se identifico listen_addresses = *; para la practica local se propone localhost. |
| 3 | pg_hba.conf revisado | Si | Se identificaron reglas locales con all/all y scram-sha-256. |
| 4 | Origenes autorizados restringidos | si | Se identificaron origenes locales |
| 5 | Autenticacion segura | Si | Metodo scram-sha-256 registrado en la revision. |
| 6 | Superusuarios identificados | Si | postgres identificado con privilegios de superusuario. |
| 7 | Cuentas de aplicacion separadas | si | Se propusieron app_lab y consulta_lab |
| 8 | Privilegios minimos | si | analista2, analista3 y soporte no son superusuarios |
| 9 | Extensiones revisadas | Si | Se identificaron pgcrypto 1.4 y plpgsql 1.0. |
| 10 | TLS habilitado y conexion cifrada verificada | Si | ssl = on; conexion con TLS 1.3 y TLS_AES_256_GCM_SHA384. |
| 11 | Permisos de archivos de configuracion restringidos | Pendiente | Falta evidencia de permisos NTFS mediante icacls o propiedades de seguridad. |
| 12 | Directorio de datos protegido | si | Se vieron los permisos |
| 13 | Politica de firewall documentada | Pendiente | Falta incorporar la politica de origenes permitidos y denegados. |
| 14 | Politica de actualizaciones documentada | Pendiente | Falta definir responsable, frecuencia de revision, pruebas y respaldo previo. |
| 15 | Configuracion registrada | Si | Tabla antes y despues con valores conocidos y sugerencias identificadas. |
| 16 | Limite de conexiones revisado | Si | max_connections = 100. |
| 17 | Conexiones administrativas reservadas | Si | superuser_reserved_connections = 3. |
| 18 | Tiempo limite de consultas revisado | Si, desactivado | statement_timeout = 0; se propone un limite por cuenta. |
| 19 | Tiempo de inactividad en transacciones revisado | Si, desactivado | idle_in_transaction_session_timeout = 0; se propone un limite por cuenta. |
| 20 | Exposicion de red revisada | Si | Se observo escucha en 0.0.0.0:5432 y [::]:5432. |
| 21 | Conexiones actuales identificadas | Si | Las conexiones observadas utilizan ::1, correspondiente al mismo equipo. |
| 22 | Certificado y clave del servidor disponibles | Si | Test-Path devolvio True para server.crt y server.key dentro de data. |

## Actividad 18 

| # | Problema | Riesgo | Control propuesto |
| --- | --- | --- | --- |
| 1 | Se aceptan conexiones desde cualquier direccion IPv4 | Equipos no autorizados pueden intentar conectarse | Permitir solamente las IP o redes necesarias. |
| 2 | La aplicacion utiliza una cuenta administrativa | Una vulnerabilidad en la aplicacion puede comprometer todo el servidor | Crear una cuenta de aplicacion sin privilegios administrativos. |
| 3 | PostgreSQL escucha en todas las interfaces | El servicio queda disponible en interfaces innecesarias | Configurar listen_addresses con localhost o la IP privada necesaria. |
| 4 | El firewall permite el puerto 5432 desde cualquier origen | Se facilita el acceso de red desde equipos no autorizados | Permitir el puerto solamente desde origenes autorizados. |
| 5 | pg_hba.conf utiliza all para las bases de datos | No limita las bases a las que se puede intentar acceder | Especificar la base de datos requerida por cada conexion. |
| 6 | pg_hba.conf utiliza all para los usuarios | No restringe las cuentas que pueden intentar conectarse desde esos origenes | Especificar los usuarios o roles autorizados. |
| 7 | La cuenta de aplicacion tiene permisos excesivos | Puede modificar o eliminar informacion y configuraciones que no necesita | Aplicar minimo privilegio sobre esquemas, tablas y funciones. |
| 8 | Se considera suficiente tener contraseñas fuertes | Se descuidan otras capas de seguridad | Combinar autenticacion, permisos, restricciones de red y configuracion segura. |
| 9 | No se indica si TLS esta habilitado y es obligatorio | Si no se utiliza TLS, la comunicacion puede viajar sin cifrado | Verificar TLS y exigirlo mediante hostssl y una configuracion adecuada del cliente. |
| 10 | No se documentan los permisos del sistema operativo | Permisos excesivos podrian permitir leer o modificar archivos sensibles | Revisar y restringir permisos sobre datos, configuracion y claves privadas. |
| 11 | No se menciona monitoreo de conexiones y errores | Los intentos de acceso indebido podrian pasar inadvertidos | Revisar registros y establecer alertas sobre eventos sospechosos. |


## ¿Es suficiente tener contraseñas fuertes?

no, las contraseñas fuertes ayudan a proteger la autenticacion, pero no determinan que acciones puede realizar un usuario ni restringen la exposicion del servidor,la autenticacion debe comprobar la identidad mediante un metodo seguro como scram-sha-256. La autorizacion debe limitar los permisos de cada cuenta, evitando que la aplicacion utilice privilegios administrativos,en la red el firewall debe permitir solamente los origenes necesarios. En la configuracion, listen_addresses y pg_hba.conf deben restringir interfaces, bases, usuarios y direcciones autorizadas, ademas de exigir TLS donde corresponda.

El sistema operativo debe proteger los archivos de configuracion, los datos y las claves privadas

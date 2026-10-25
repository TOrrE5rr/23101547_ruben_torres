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
Porque grant y revoke controlan los permisos dentro de posgresql, pero no el acceso directo a los archivos del sistema
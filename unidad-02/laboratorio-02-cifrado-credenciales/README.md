# Laboratorio 02 — Cifrado y credenciales
## 1. Introduccion

La practica aborda los riesgos de almacenar contraseñas y datos sensibles sin proteccion, utilizar conexiones sin TLS y exponer claves criptograficas en archivos SQL.

## 2. Proteccion de credenciales

El texto claro permite leer directamente una contraseña. El hash genera una representacion unidireccional para verificarla sin recuperarla. El cifrado permite recuperar el dato original mediante una clave.

## 3. Proteccion de datos sensibles

Se utilizo el RFC como ejemplo de dato sensible y se protegio con pgp_sym_encrypt(), porque identifica a una persona y debe mantenerse confidencial. Su recuperacion se realiza con pgp_sym_decrypt() y la clave correcta.

## 4. TLS

TLS protege la confidencialidad e integridad de los datos en transito. Al ejecutar SHOW ssl en PostgreSQL se obtuvo off, lo que indica que TLS estaba desactivado en el servidor.

## 5. Gestion de claves

Las claves no deben guardarse junto con los scripts porque una filtracion del codigo tambien las expondria. Deben almacenarse por separado, con acceso restringido y procedimientos de rotacion y recuperacion.

## 6. Resultados

Los ejemplos permitieron comparar contraseñas en texto claro con hashes, verificar contraseñas y cifrar el RFC. Tambien se identifico que el servidor no tenia TLS habilitado.

## 7. Problemas encontrados

La principal dificultad identificada fue que TLS estaba desactivado. Su habilitacion requiere configurar un certificado, una clave privada y los parametros correspondientes del servidor.

## 8. Conclusiones

Aprendi que cada mecanismo protege un aspecto diferente. En un entorno productivo aplicaria hash para contraseñas, cifrado para datos sensibles y respaldos, TLS con validacion del servidor y una gestion segura de claves.

##  Preguntas de reflexion

### 1. ¿Por que una contraseña no debe almacenarse como texto claro?

Porque cualquier persona que acceda a ella podria conocerla y utilizarla inmediatamente para intentar entrar a la cuenta.

### 2. ¿Por que un hash no es equivalente a un cifrado?

Porque el hash no permite descifrar el dato original, mientras que el cifrado permite recuperarlo mediante una clave.

### 3. ¿Por que el cifrado de una columna no sustituye al control de acceso?

Porque tambien es necesario controlar quien puede consultar, modificar o eliminar los datos, aunque esten cifrados.

### 4. ¿Por que TLS no sustituye a los mecanismos de autorizacion de PostgreSQL?

Porque TLS protege la comunicacion, pero los permisos determinan que operaciones puede realizar cada usuario.

### 5. ¿Que ocurriria si una organizacion pierde una clave utilizada para cifrar informacion?

Si no existe una copia recuperable de la clave, podria perder definitivamente el acceso a la informacion cifrada.

### 6. ¿Que ocurriria si una clave criptografica se publica accidentalmente en GitLab?

Se consideraria comprometida y deberia reemplazarse. Borrarla del archivo no basta, porque puede permanecer en el historial o en copias del repositorio.

### 7. ¿Por que un repositorio privado no debe considerarse un almacen de secretos?

Porque sus colaboradores, cuentas comprometidas o copias pueden exponerlos, y el historial conserva versiones anteriores.

### 8. ¿Que diferencia existe entre proteger informacion almacenada y proteger informacion durante su transmision?

La proteccion en reposo resguarda datos guardados en archivos, tablas o respaldos; la proteccion en transito resguarda los datos mientras viajan entre equipos.

### 9. ¿Por que la gestion de claves es tan importante como el algoritmo criptografico?

Porque incluso un cifrado fuerte pierde su utilidad si la clave se expone, se pierde o se utiliza sin autorizacion.

### 10. ¿Que mecanismo adicional implementarias en una organizacion para proteger los respaldos de las bases de datos?

Implementaria cifrado de respaldos con claves separadas, acceso restringido y pruebas periodicas de restauracion.
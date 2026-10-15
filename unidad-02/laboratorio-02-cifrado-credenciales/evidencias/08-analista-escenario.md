#### Pregunta 1
¿Cuales son los principales riesgos?

Robo de contraseñas, exposicion de datos personales y financieros
#### Pregunta 2
¿Que mecanismo utilizarias para cada elemento?
Utilizaria control de acceso y cifrado en reposo para el nombre, correo, RFC e informacion financiera, hash con sal mediante bcrypt para las contraseñas, un gestor seguro para las claves criptograficas, TLS con validacion del certificado y del nombre del servidor para las conexiones, y cifrado con acceso restringido para los respaldos
#### Pregunta 3
¿Cual de los problemas consideras mas critico y por que?

Considero mas critico almacenar contraseñas en texto claro, porque una filtracion permite conocerlas inmediatamente y utilizarlas para intentar acceder a las cuentas

#### Pregunta 4
¿Tener correctamente configurados los usuarios y permisos elimina estos riesgos?

No, los permisos limitan el acceso, pero no protegen por si solos los datos ante una filtracion
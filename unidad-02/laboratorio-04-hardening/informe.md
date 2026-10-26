## Informe

## 1. ¿Cual era la principal superficie de ataque?
El servicio PostgreSQL escuchaba en todas las interfaces IPv4 e IPv6 mediante el puerto 5432, aunque la practica solo necesitaba conexiones locales. Su accesibilidad desde otros equipos dependia tambien del firewall y de las reglas de acceso.

## 2. ¿Que configuracion representaba el mayor riesgo?
La configuracion listen_addresses = '*' representaba una exposicion innecesaria para el entorno local. Ademas, TLS estaba desactivado, por lo que las conexiones no contaban con este cifrado.

## 3. ¿Que cambio produjo la mayor reduccion de exposicion?

El cambio confirmado fue activar TLS y verificar una conexion con TLS 1.3. Esto redujo el riesgo de exposicion del contenido transmitido, pero no redujo las interfaces de escucha ni los origenes permitidos. Para reducir la exposicion de red falta confirmar el cambio a localhost y las restricciones de acceso.

## 4. ¿Que diferencia existe entre firewall y pg_hba.conf?
El firewall controla el acceso de red mediante direcciones, puertos y protocolos. pg_hba.conf controla que conexiones acepta PostgreSQL segun su origen, base de datos, usuario y metodo de autenticacion. Ambos controles se complementan.

## 5. ¿Que diferencia existe entre autenticacion y autorizacion?

La autenticacion comprueba la identidad del usuario. La autorizacion determina que acciones puede realizar y a que objetos puede acceder mediante sus permisos.

## 6. ¿Por que una cuenta de aplicacion no debe ser SUPERUSER?
Porque una vulnerabilidad en la aplicacion podria permitir modificar o eliminar datos, cambiar permisos y afectar todo el servidor. La cuenta debe tener solamente los privilegios necesarios para funcionar.

## 7. ¿Por que cambiar el puerto de PostgreSQL no constituye hardening suficiente?

Porque el servicio puede ser descubierto en otro puerto. Cambiarlo no corrige reglas permisivas, privilegios excesivos ni conexiones sin cifrado. Se necesitan controles de acceso y configuracion segura.

## 8. ¿Por que listen_addresses = '*' puede ser innecesario?
Porque hace que PostgreSQL escuche en todas las interfaces disponibles. Si solamente se utiliza desde el mismo equipo, localhost es suficiente y evita escuchar en interfaces de red innecesarias.

## 9. ¿Que papel tiene el sistema operativo en la seguridad de PostgreSQL?
El sistema operativo protege los archivos de configuracion, el directorio de datos y las claves privadas. En Windows, los permisos NTFS deben impedir accesos innecesarios y conservar los permisos requeridos por la cuenta del servicio.

## 10. ¿Que controles deberian revisarse periodicamente?
Las interfaces de escucha, reglas de firewall y pg_hba.conf, cuentas, membresias, privilegios, certificados TLS, permisos de archivos, extensiones, limites de conexiones, registros, actualizaciones y respaldos.


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

Porque permite identificar los puntos de acceso, los riesgos y las conexiones necesarias antes de aplicar cambios. Asi se pueden restringir accesos innecesarios sin afectar el funcionamiento del sistema.
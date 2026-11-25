

## 1. Alcance



| Sistema | Servidor y despliegue | Base y version identificada |
|---|---|---|
| PostgreSQL | Instalacion local en Windows, conexiones por 127.0.0.1 y ::1 mediante pgAdmin y la aplicacion de ventas. | Base practica, correspondiente a la base comercial de la guia. La ruta del servidor identifica la rama 18. No se aporto el numero de parche. Fuente: bitacora-lab01.log, lineas 204, 473-477 y 551. |
| MongoDB | Servicio local de Windows en 127.0.0.1:27017, administrado con Compass y su shell. | Base comercial. Practica con Community, ruta de instalacion 8.0. La version exacta y los modulos activos quedaron pendientes de verificar. Fuente: LAB-02/informe.md, lineas 7-9. |

## 2. Configuracion de auditoria (A3)

| Mecanismo | Configuracion y alcance comprobado | Evidencia |
|---|---|---|
| Colector de PostgreSQL | logging_collector, log_connections y log_disconnections estaban en on. log_statement estaba en mod y log_min_error_statement en error. El prefijo incluye hora, proceso, usuario, base, aplicacion y cliente. Es una captura del estado vigente. | E1-configuracion-registro.txt, seis filas identificadas por el nombre del parametro. |
| Auditoria de cambios por fila | trg_auditoria_clientes figura con estado O en clientes, habilitado para operaciones normales. La muestra contiene INSERT, UPDATE y DELETE. | E3-disparadores.txt, fila trg_auditoria_clientes. E4-muestra-auditoria.txt, eventos 1-10. |
| Perfilador de MongoDB | Se practicaron los niveles 0, 1 y 2. El informe describe un filtro para insert, update y remove. El JSON conserva operaciones con fecha, cuenta, cliente y aplicacion. | E6: LAB-02/informe.md, linea 15, y system-profile.json, primer objeto, operacion update. |
| Bitacora de mongod | El informe identifica salida a archivo y logAppend habilitado en mongod.cfg. La copia del LAB-02 carece del archivo de bitacora para verificar directamente sus eventos. | E6: LAB-02/informe.md, lineas 34 y 54. 09-comparacion.md, lineas 3-4. |

## 3. Bitacora interpretada (A3, A5)

| Evento y tipo | Quien y cuando | Desde donde | Objeto y accion | Resultado, interpretacion y evidencia |
|---|---|---|---|---|
| 1. Incidente del RFC de Maria Garcia. Modificacion de dato personal. | Cuenta del cambio inicial: sin determinar. Cambio posterior registrado: app_ventas, 07/11/2026 18:53:44.305. | Origen inicial sin determinar. Para el cambio posterior: app-ventas-web, 127.0.0.1, base practica. | El caso del laboratorio identifica a Maria Garcia con el cliente 3. La sentencia posterior actualiza el RFC de ese cliente. | La bitacora y el evento por fila permiten atribuir el cambio posterior a la cuenta de la aplicacion. Faltan evidencia directa del autor, hora y origen del cambio inicial y una identificacion de la persona fisica que uso la cuenta. Fuente: caso del RFC del LAB-01, bitacora-lab01.log, lineas 473-477, y E4-muestra-auditoria.txt, evento 1. |
| 2. Intento de borrar evidencia. Acceso denegado. | app_ventas, 07/11/2026 19:20:44.095. | app-ventas-web, 127.0.0.1, proceso 9988. | DELETE sobre auditoria.cambios_clientes. | PostgreSQL registro permiso denegado sobre el esquema. El intento fue bloqueado y esa sentencia no borro el historial. Fuente: bitacora-lab01.log, lineas 531-537. |
| 3. Intento de desactivar la auditoria. Cambio de estructura rechazado. | app_ventas, 07/11/2026 19:20:44.177. | app-ventas-web, 127.0.0.1, proceso 9988. | Intento de desactivar trg_auditoria_clientes. | El error indica que se requeria ser propietario de la tabla. La linea de error permite distinguir un intento de una desactivacion efectiva. Fuente: bitacora-lab01.log, lineas 539-543. |
| 4. Desactivacion por el administrador. Interrupcion del control. | postgres, 07/11/2026, de 19:21:11.920 a 19:21:31.805. | pgAdmin 4, ::1, proceso 11640. | La sesion desactivo el disparador, ejecuto un UPDATE del RFC del cliente 3 a las 19:21:21.181 y reactivo el disparador. | La bitacora conserva la secuencia. E4 carece de un evento por fila para ese UPDATE. La reactivacion posterior no reconstruye el valor anterior. Fuente: bitacora-lab01.log, lineas 551-557, y E4-muestra-auditoria.txt, eventos 1-10. |
| 5. Actualizacion en MongoDB. Modificacion perfilada. | app_ventas@comercial, 15/11/2026 07:27:02.560 UTC. | app-ventas-web, 127.0.0.1. | El perfilador registro un update del telefono para el cliente con _id 1 en comercial.clientes. | El JSON permite identificar cuenta, filtro y campo. El registro exportado carece de contador de documentos modificados y del valor anterior. Fuente: system-profile.json, primer objeto, y 09-comparacion.md, lineas 7-8. |

## 4. Elementos de gobierno (A1, A2)

| Elemento | Resultado de las Actividades 2, 3 y 4 | Evidencia o base de la propuesta |
|---|---|---|
| Responsables | Se propone a Gerencia Comercial como propietaria de Clientes y al DBA como custodio tecnico. Atencion decide sobre datos de contacto y Facturacion valida el RFC. Auditoria interna debe revisar el historial con independencia del operador. | 11-gobierno-datos.md, lineas 7-13. La necesidad de revision independiente se observa en bitacora-lab01.log, lineas 553-557. |
| Catalogo | CAT-01: practica/public.clientes. CAT-02: practica/auditoria.cambios_clientes. CAT-03: practica/gobierno.solicitudes_cambio. CAT-04: comercial/clientes en MongoDB. CAT-05: comercial/system.profile. La vista dba.bitacora tambien debe inventariarse como acceso a la bitacora. | E2-privilegios.txt, fila app_ventas. E4-muestra-auditoria.txt, evento 1. data-1795491733986.csv, num 254. system-profile.json, campos ns de los dos primeros objetos. bitacora-lab01.log, lineas 84 y 587. |
| Diccionario | La exportacion tecnica prevista es diccionario-clientes.csv. La matriz de negocio identifica el RFC para facturacion, el correo y el telefono para contacto, y edad y ciudad para estadisticas agrupadas. La revision directa del CSV exportado queda pendiente. | diccionario-clientes.csv, archivo de la Actividad 3 pendiente de cotejo. 11-gobierno-datos.md, lineas 8-13. |

## 5. Conservacion (A3)

Criterio propuesto en la Actividad 5. El documento de referencia es evidencias/05-conservacion.md, redactado en la practica y pendiente de cotejo con la copia final. Los plazos siguientes son operativos. La columna de evidencia indica por que se eligieron.

| Registro | Plazo propuesto y motivo | Evidencia |
|---|---|---|
| Accesos PostgreSQL y bitacora de mongod | 90 dias para investigar accesos fallidos y correlacionar sesiones. | bitacora-lab01.log, lineas 202-204 y 473-475. LAB-02/informe.md, lineas 34-38. |
| Cambios de privilegios y estructura, e instantaneas de roles | 12 meses para comparar revisiones y detectar permisos que siguieron vigentes. | bitacora-lab01.log, lineas 150-154. 09-comparacion.md, lineas 5-6. |
| Sentencias que modifican datos | 30 dias para revisar incidentes recientes. Las sentencias pueden contener telefono o RFC. | bitacora-lab01.log, lineas 217 y 477. |
| Auditoria por fila | 90 dias, con revision anticipada cuando venza la finalidad del dato personal. | 11-gobierno-datos.md, lineas 7-13. 09-comparacion.md, linea 8. |
| Exportaciones de system.profile | 7 dias para diagnostico operativo. Exportar antes de que la coleccion sobrescriba eventos. | system-profile.json, primer objeto. LAB-02/informe.md, lineas 30 y 56. |

Se propone guardar las exportaciones cifradas fuera del servidor, restringir su lectura al personal autorizado, verificar su SHA-256 y registrar la baja al vencer. Como PostgreSQL mezcla varios tipos de eventos en un archivo, se propone separar las copias que requieran un plazo mayor

## 6. Politicas (A4)

| Politica propuesta en la Actividad 6 | Regla verificable | Evidencia disponible o pendiente |
|---|---|---|
| POL-01 Acceso | El propietario aprueba el permiso y el DBA lo revisa mensualmente. | E2-privilegios.txt, filas app_ventas, soporte y soporte_ana. bitacora-lab01.log, lineas 150-152. Pendiente acreditar la aprobacion y la revision mensual. |
| POL-02 Respaldo | Respaldo diario, copia cifrada por 30 dias y prueba mensual verificada por una segunda persona. | En los anexos revisados no hay bitacora de respaldos ni acta de prueba. E4-muestra-auditoria.txt, eventos 1-10, contiene una muestra de operaciones. El procedimiento tecnico se definira en la Unidad V. |
| POL-03 Retencion | Aplicar los plazos de la seccion 5, registrar la baja y documentar excepciones. | 05-conservacion.md, Actividad 5, y 11-gobierno-datos.md, lineas 7-13. Falta un registro de bajas ejecutadas. |
| POL-04 Restauracion | El propietario y Operaciones autorizan la restauracion. El DBA la ejecuta y el propietario valida el resultado. | En los anexos revisados no existe acta de restauracion. El procedimiento tecnico se definira en la Unidad V. |
| POL-05 Uso de datos sensibles | Facturacion usa el RFC por necesidad de negocio. Soporte consulta la vista autorizada y las excepciones requieren folio. | 11-gobierno-datos.md, linea 10. E2-privilegios.txt, filas soporte y soporte_ana. 09-comparacion.md, linea 9: lectura efectiva del RFC sin comprobar. |
| POL-06 Cambios en produccion | Todo cambio requiere solicitud, aprobacion, ventana y conciliacion independiente con la bitacora. | data-1795491733986.csv, num 251, 252 y 254: preparacion del registro de solicitudes. bitacora-lab01.log, lineas 152 y 553-557: cambios que deben conciliarse. |

## 7. Conciliacion de cambios (A5)

| Cambio | Autorizacion y resultado | Evidencia |
|---|---|---|
| Creacion de gobierno, restriccion de PUBLIC y creacion de solicitudes_cambio | Son las tres sentencias de preparacion del 23/11/2026. El CSV no muestra un folio para ellas. | data-1795491733986.csv, registros num 251, 252 y 254. |
| GRANT UPDATE a app_ventas | La bitacora registra la sentencia y E2 confirma el permiso vigente. Falta la solicitud que acredite su autorizacion. | bitacora-lab01.log, linea 152. E2-privilegios.txt, fila app_ventas. |
| Desactivacion del disparador | app_ventas recibio un rechazo. postgres desactivo y reactivo el disparador. En el material revisado falta un folio para la intervencion del administrador. | bitacora-lab01.log, lineas 539-543 y 553-557. |
| Alta de canal_alta, folio CAM-2026-014 | La guia asigna ese folio. La extraccion entregada no incluye el ALTER TABLE ni una fila con aprobacion y ventana. La ejecucion dentro del horario autorizado queda pendiente de comprobar. | Guia LAB-03, Actividad 7, solicitud CAM-2026-014. data-1795491733986.csv, totalidad de registros: num 251, 252 y 254. |

## 8. Hallazgos



| ID | Hallazgo | Fuente | Severidad | Impacto | Recomendacion | Decision requerida de |
|---|---|---|---|---|---|---|
| H-01 | Calidad: el ejercicio identifica un posible duplicado entre los clientes 1 y 7, RFC incompleto en 7 y RFC ausente en 8. E4 confirma la insercion de 7 y 8. Falta la salida local de las consultas de calidad para confirmar cada defecto. | Actividad 1, resultados de referencia y 01-calidad.md pendiente de cotejo. E4, eventos 9 y 10. | Media | Posible duplicacion de clientes o error de facturacion. | Confirmar las filas mediante las consultas de calidad y validar el RFC con Facturacion antes de corregir o fusionar. | Atencion al Cliente y Facturacion |
| H-02 | Cambio con autorizacion sin acreditar: postgres desactivo el disparador y ejecuto un UPDATE del RFC. | bitacora-lab01.log, lineas 553-557. E4, eventos 1-10. | Alta | Hueco en la auditoria por fila de un dato personal. | Revisar la intervencion y exigir folio y supervision independiente para futuras desactivaciones. | Comite de cambios y Auditoria interna |
| H-03 | soporte_ana tiene SELECT directo sobre clientes. Falta verificar si esta permitido por su funcion. | E2, fila soporte_ana. 11-gobierno-datos.md, linea 10. | Media | Posible acceso al RFC completo fuera de Facturacion. | Solicitar la autorizacion. Si excede el alcance aprobado, tramitar el ajuste y verificar el permiso resultante. | Propietario del dato y Seguridad |
| H-04 | El cambio canal_alta carece de una linea conciliable en el CSV entregado. | data-1795491733986.csv, num 251, 252 y 254. | Media | Falta demostrar ejecucion dentro de la ventana de CAM-2026-014. | Recuperar el tramo de bitacora y cotejarlo con la solicitud aprobada. | Comite de cambios |
| H-05 | La entrega revisada del LAB-02 carece de bitacora-mongod.log y de su hash original. | LAB-02/informe.md, linea 54, y LAB-02/evidencias/hashes.sha256, unica entrada. | Media | Auditoria no puede verificar en ese paquete los accesos de mongod. | Integrar la copia real si se conserva o documentar el periodo sin cobertura. | Operaciones de TI y Seguridad |

## 9. Limitaciones conocidas y riesgos aceptados (A6)

| Estado | Limitacion y riesgo residual | Quien deberia aceptar formalmente |
|---|---|---|
| Verificado en PostgreSQL | El administrador puede desactivar el disparador. Su estado actual habilitado no demuestra continuidad historica. Fuente: E3 y bitacora-lab01.log, lineas 553-557. | Propietario de Clientes y Seguridad, con revision de Auditoria interna. |
| Verificado para la configuracion practicada | Con el registro usado no se acredito una lectura exitosa del RFC por soporte_ana. E2 acredita permisos, no lecturas. No se aporto una prueba con pgAudit. Fuente: 09-comparacion.md, linea 9, y E2. | Propietario del dato y Seguridad. |
| Verificado en MongoDB Community | system.profile contiene operaciones concretas. Algunos registros carecen de valores anteriores o de contadores de filas afectadas. El perfilador puede sobrescribir eventos. Fuente: system-profile.json, primer objeto, y LAB-02/informe.md, linea 56. | Operaciones de TI y Seguridad. |
| Documentado pero no practicado | La auditoria nativa de MongoDB Enterprise/Atlas se estudio como alternativa. No se configuro ni valido en el laboratorio Community. Fuente: 09-comparacion.md, columna Enterprise/Atlas, lineas 3-10. | Direccion de TI y Seguridad deben decidir si aceptan la cobertura de Community o requieren controles adicionales. |
| Verificacion pendiente | El hash final de E5 no se presento para cotejo. Para E6 si se verifico el hash del perfilador original. | Auditoria interna debe decidir si admite el expediente con el anexo E5 pendiente. |

## 10. indice de evidencias


| ID o actividad | Archivo | Localizador, hash o estado |
|---|---|---|
| E1 | E1-configuracion-registro.txt | Seis parametros. |
| E2 | E2-privilegios.txt | Siete filas. |
| E3 | E3-disparadores.txt | Una fila para trg_auditoria_clientes. |
| E4 | E4-muestra-auditoria.txt | Eventos 1-10. |
| E5 | E5-bitacora-postgresql.log y E5-bitacora-postgresql.sha256 | Pendiente cotejar la copia final ya depurada con su hash. Incluir los archivos rotados y sus hashes si cubren el periodo. |
| E6 | system-profile.json y hashes.sha256 | Hash recalculado y coincidente con el manifiesto del LAB-02: 31e62cfa49b2b328e18a8347c48c79cdbe383c8aa4568a587dd560cf0c7a212b |
| E6 | bitacora-mongod.log y su hash | Ausentes del paquete del LAB-02 revisado. Pendiente confirmar si se conservan en el servidor local. |
| E6 | 09-comparacion.md | 9f128b8dcfb351a40b6a52a1028e5cd836343892280ce018e6180d6d50755ddc |
| LAB-01 | bitacora-lab01.log | 0ee2dc856861c955db15fec24344c30458b13e852176986a4bf7e70e82916b31. Este hash corresponde a la copia historica, distinta de E5. |
| Unidad II | 11-gobierno-datos.md | 9ac7c9292802bbc0744e061dfbb09eea9bfd09fedb8c036797917502ccbb61d7 |
| Actividad 7 | data-1795491733986.csv | 55f29635aa39ab0eccdc5e3410980e76fa024ee838480cdc97a74ec1b990fa2c |
| LAB-02 | LAB-02-archivos.zip, documento interno LAB-02/informe.md | Entorno, perfilado, bitacora y alcance de las evidencias. |
| LAB-03 | 01-calidad.md, diccionario-clientes.csv y 05-conservacion.md | Anexos de las Actividades 1, 3 y 5. Pendiente cotejar las copias locales finales. |
| LAB-03 | Matriz de responsables, catalogo, POL-01 a POL-06 y solicitud CAM-2026-014 | Actividades 2, 4, 6 y 7. Pendiente vincular las copias definitivas y la evidencia de aprobacion. |

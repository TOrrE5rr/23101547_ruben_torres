##  ¿Por que logging_collector requiere reinicio y log_statement solo recarga?
Porque logging_collector necesita iniciar un proceso que recoge y guarda los registros. log_statement solo cambia que sentencias se registran, por lo que basta con recargar la configuracion

##  ¿Que ventaja tiene que la bitacora se lea con SQL y no con una herramienta del sistema operativo o del contenedor? ¿Que riesgo introduce?
Permite consultar y filtrar los registros desde PostgreSQL sin acceder al sistema operativo. El riesgo es que usuarios sin autorizacion puedan ver informacion sensible si se les dan permisos sobre la vista

##  ¿Quien deberia poder consultar dba.bitacora?
Solo el administrador de la base de datos o personal autorizado, porque la bitacora puede contener consultas, errores y datos sensibles
-- Verificar interfaces, puerto y autenticacion.
SHOW listen_addresses;
SHOW port;
SHOW password_encryption;

--  Revisar reglas de acceso y posibles errores
SELECT
    type,
    database,
    user_name,
    address,
    netmask,
    auth_method,
    error
FROM pg_hba_file_rules
ORDER BY rule_number;

-- Revisar cuentas y privilegios administrativos
SELECT
    rolname,
    rolcanlogin,
    rolsuper,
    rolcreaterole,
    rolcreatedb
FROM pg_roles
WHERE rolname !~ '^pg_'
ORDER BY rolname;

-- Confirmar TLS habilitado
SHOW ssl;

-- Comprobar que la conexion actual utiliza TLS
SELECT ssl, version, cipher
FROM pg_stat_ssl
WHERE pid = pg_backend_pid();

--  Revisar extensiones
SELECT extname, extversion
FROM pg_extension;

-- Revisar limites de conexiones
SHOW max_connections;
SHOW superuser_reserved_connections;

-- Los tiempos reflejan la cuenta conectada
SHOW statement_timeout;
SHOW idle_in_transaction_session_timeout;
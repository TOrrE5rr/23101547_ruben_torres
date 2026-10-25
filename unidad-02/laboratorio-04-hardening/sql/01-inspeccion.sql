SELECT version();


SHOW port;
SHOW listen_addresses;
SHOW ssl;
SHOW password_encryption;

SELECT
    pid,
    usename,
    datname,
    client_addr,
    client_port,
    application_name
FROM pg_stat_activity;

-- ver roles administrativos

SELECT
    rolname AS usuario,
    rolcanlogin AS puede_iniciar_sesion,
    rolsuper AS superusuario,
    rolcreaterole AS puede_crear_roles,
    rolcreatedb AS puede_crear_bases
FROM pg_roles
WHERE rolsuper OR rolcreaterole OR rolcreatedb;
-- reglas pg_hba.conf
SELECT
    type,
    database,
    user_name,
    address,
    auth_method
FROM pg_hba_file_rules;
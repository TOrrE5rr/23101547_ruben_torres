-- Crea un esquema para guardar la relación entre tokens y clientes.
CREATE SCHEMA pii;

-- Crea un esquema para los datos destinados al análisis.
CREATE SCHEMA analitica;

-- Relaciona cada token único con un cliente de la tabla original.
CREATE TABLE pii.mapa_cliente (
    token UUID PRIMARY KEY,
    cliente_id BIGINT UNIQUE
        REFERENCES public.clientes(id)
);

-- Habilita la extensión de funciones criptográficas.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Genera un token aleatorio para cada cliente y guarda su relación.
INSERT INTO pii.mapa_cliente (token, cliente_id)
SELECT
    gen_random_uuid(),
    id
FROM clientes;

-- Consulta el mapa de correspondencia entre tokens y clientes.
SELECT *
FROM pii.mapa_cliente;













-- Regresa al rol original para configurar los objetos y permisos.
RESET ROLE;

-- Crea el rol sin inicio de sesión directo.
CREATE ROLE analista2 NOLOGIN;

-- Crea una copia analítica con tokens, sin identificadores directos.
CREATE TABLE analitica.clientes AS
SELECT
    m.token,
    c.edad,
    c.ciudad,
    c.codigo_postal
FROM public.clientes AS c
JOIN pii.mapa_cliente AS m
    ON c.id = m.cliente_id;

SELECT *
FROM analitica.clientes;

-- Permite consultar el conjunto analítico.
GRANT USAGE ON SCHEMA analitica TO analista2;
GRANT SELECT ON analitica.clientes TO analista2;

-- Retira permisos directos sobre el mapa y la tabla original.
REVOKE ALL ON SCHEMA pii FROM analista2;
REVOKE ALL ON pii.mapa_cliente FROM analista2;
REVOKE ALL ON public.clientes FROM analista2;

-- Autoriza al usuario a asumir el rol; requiere permiso para asignarlo.
GRANT analista2 TO u_23101547_ruben_torres;

-- Activa el rol para comprobar el acceso.
SET ROLE analista2;

-- Debe permitir consultar los datos analíticos.
SELECT *
FROM analitica.clientes;

-- Debe denegar el acceso al mapa de correspondencia.
SELECT *
FROM pii.mapa_cliente;

-- Debe denegar el acceso a los datos originales.
SELECT *
FROM public.clientes;

-- Finaliza la prueba y regresa al rol original.
RESET ROLE;
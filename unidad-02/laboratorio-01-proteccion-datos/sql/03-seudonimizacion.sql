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
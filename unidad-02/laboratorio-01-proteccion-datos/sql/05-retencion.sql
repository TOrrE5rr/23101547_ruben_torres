SELECT *
FROM clientes
WHERE fecha_alta <
      CURRENT_DATE - INTERVAL '5 years';
	  GRANT soporte TO u_23101547_ruben_torres;
RESET ROLE;
SET ROLE soporte;

SELECT *
FROM public.v_clientes_soporte;

SELECT *
FROM public.clientes;

RESET ROLE;
SET ROLE analista2;

SELECT *
FROM analitica.clientes;

SELECT *
FROM pii.mapa_cliente;

SELECT *
FROM public.clientes;
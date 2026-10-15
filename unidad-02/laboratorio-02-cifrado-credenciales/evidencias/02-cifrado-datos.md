# ¿Qué diferencia existe entre crypt() y pgp_sym_encrypt()?
crypt() genera un hash unidireccional para contraseñas; pgp_sym_encrypt() cifra datos que pueden recuperarse con una clave
 # ¿Cuál de los dos mecanismos permite recuperar el dato original?
 pgp_sym_encrypt(), utilizando pgp_sym_decrypt() con la clave correcta
# ¿Qué ocurre si se utiliza una clave incorrecta?
El descifrado falla
# ¿Qué problema de seguridad representa colocar la clave directamente en una consulta?
La clave puede quedar expuesta en el codigo, historial o registros de consultas, permitiendo descifrar los datos a quien tenga acceso a ellos.

![Captura](img/image3.png)
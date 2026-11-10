## ¿Que campo distingue un acceso fallido de uno exitoso?

El campo result: 0 indica exito. En mis intentos fallidos aparece 18 para clave incorrecta y 11 para usuario inexistente

## ¿Que diferencia hay entre el error de clave incorrecta y el de usuario inexistente? ¿Por que el cliente recibe el mismo mensaje?

Para app_ventas, el error storedKey mismatch con result: 18 indica que la clave es incorrecta
Para usuario_inexistente, UserNotFound con result

El cliente recibe "Authentication failed" en ambos casos para no revelar si una cuenta existe

## ¿Por que el nombre de la aplicacion del intento fallido es mongosh 2.10.0 y no app-ventas-web?

En mi mongo marca como undifined
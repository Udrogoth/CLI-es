clase Controlador {

    // Retorna todos los usuarios de la base de datos JSON
    funcion obtenerTodos() {
        variable usuarios = obtenerDatos("db/usuarios.json");
        retornar usuarios;
    };

    // Maneja el registro con las reglas de negocio necesarias
    funcion registrar(datosNuevos) {
        variable usuarios = obtenerDatos("db/usuarios.json");

        // 1. Validar que el correo no venga vacío
        si (!datosNuevos.correo) {
            retornar { 
                error: verdadero, 
                mensaje: "El campo correo es requerido." 
            };
        }

        // 2. Lógica para el ID AUTOINCREMENTAL
        variable maxId = 0;
        para (variable i = 0; i < usuarios.longitud; i = i + 1) {
            variable usuarioActual = usuarios[i];
            si (usuarioActual.id > maxId) {
                maxId = usuarioActual.id;
            }
        }
        datosNuevos.id = maxId + 1;

        // 3. Lógica para evitar CORREOS DUPLICADOS
        variable correoDuplicado = falso;
        para (variable i = 0; i < usuarios.longitud; i = i + 1) {
            si (usuarios[i].correo == datosNuevos.correo) {
                correoDuplicado = verdadero;
            }
        }

        si (correoDuplicado) {
            imprimir("⚠️ Intento de registro omitido: El correo ya existe.");
            retornar { 
                error: verdadero, 
                mensaje: "El correo electrónico ya se encuentra registrado." 
            };
        } sino {
            // El CLI simplemente guarda lo que le enviamos de manera agnóstica
            guardarDatos("db/usuarios.json", datosNuevos);
            imprimir("✅ Usuario registrado con éxito!");

            retornar {
                exito: verdadero,
                mensaje: "Usuario registrado con éxito",
                usuarioId: datosNuevos.id
            };
        }
    };
};

exportar = new Controlador();
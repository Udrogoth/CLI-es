// Importamos el controlador local que acabamos de crear
constante ControladorUsuarios = importar("./src/controladores/usuarios.es");

clase ServidorCRUD {

    funcion iniciar(puerto) {
        crearServidor(puerto, (servidor) => {
            
            // Ruta raíz
            servidor.get("/", (peticion, respuesta) => this.inicio(peticion, respuesta));
            
            // Ruta para ver los usuarios (GET)
            servidor.get("/usuarios", (peticion, respuesta) => {
                variable lista = ControladorUsuarios.obtenerTodos();
                respuesta.enviar(lista);
            });

            // Ruta para registrar un usuario (POST)
            servidor.post("/usuarios", (peticion, respuesta) => {
                // peticion.cuerpo ya viene parseado como JSON gracias a tu CLI
                variable resultado = ControladorUsuarios.registrar(peticion.cuerpo);
                
                si (resultado.error) {
                    respuesta.enviar(resultado, 400);
                } sino {
                    respuesta.enviar(resultado, 201);
                }
            });

            servidor.get("/estado", (peticion, respuesta) => {
                respuesta.enviar({ estado: "activo" });
            });

        });

        limpiar();
        imprimir("🚀 Servidor Backend corriendo en http://localhost:" + puerto);
    };

    funcion inicio(peticion, respuesta) {
        respuesta.enviar({ saludo: "Bienvenido a tu API con módulos en .es" });
    };

};

constante miApp = new ServidorCRUD();
miApp.iniciar(3000);
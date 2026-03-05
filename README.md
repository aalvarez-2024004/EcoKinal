# EcoKinal
Proyecto de reciclaje llamado EcoKinal desarrollado en Node.js || IN6BM

# INTRUCCIONES AUTENTICACION DE USUARIO - AuthEcoKinal
1er paso - Ubicarse dentro de la terminal 1 y situarse en la carpeta AuthEcoKinal por medio del siguiente comando : cd AuthEcoKinal

2do paso - Estando ahi, realizar el comando: pnpm install nodemon

ANTES DE CONTINUAR, IMPORTANTE: 
	ES IMPORTANTE QUE TENGA ABIERTO docker desktop y asi mismo, pgAdmin

3er paso - Ejecutar en la terminal 1 el siguiente comando : pnpm add -D cross-env

4to paso - Ejecutar en la terminal 1 el siguiente comando :  docker compose up --build

5to paso - Verificar en docker-desktop que el contenedor se haya inicializado 
correctamente y este activo

6to paso - En pgAdmin, debe crear un servidor llamado AuthEcoKinal, ahi mismo debe irse al apartado de Connection y colocar: 

6.1 Host name / address: localhost

6.2 Port / 5436

6.3 Username / root

6.4 Password / admin

6.5 Ingresar al servidor y activar la base de datos llamada AuthEcoKinal (con owner root)

8vo paso - Realizar el siguiente comando para correr el programa: pnpm run dev

7mo paso - Probar las peticiones en PostMan del siguiente link: 
https://www.postman.com/aalvarez-2024004-2419738/workspace/ecokinal

    O TAMBIEN: Puede abrir postman, e importar el archivo JSON donde se encuentran todos los endpoints, el archivo JSON lo puede encontrar en la ruta:  C:GestorDeOpiniones-main\ArchivoJSONpostMan
    Nombre del archivo: AuthEcoKinal.json

# INSTRUCCIONES PARA DETECTAR UNA IMAGEN - DetectorDeReciclaje

1er paso - Abrir una nueva terminal y situarse en la carpeta DetectorDeReciclaje por medio del siguiente comando : cd DetectorDeReciclaje

2do paso - Estando ahi, realizar el comando: pnpm install 

3er paso - Realizar el siguiente comando para correr el programa: pnpm run dev

**IMPORTANTE: El módulo AuthEcoKinal debe estar en ejecución, ya que el sistema requiere autenticación mediante token**

4to paso - Probar las peticiones en Postman que se encuentran en la carpeta llamada ArchivosJSONpostMan
y dirigirse hacia la carpeta llamada: ClasificarImagen 

5to paso - Probar los endpoints desde la documentación interactiva de Swagger.

    Debe dirigirse a su navegador de confianza y pegar esta URL: http://localhost:3007/api-docs
    
    1. Para probar el endpoint debes iniciar sesion en AuthEcoKinal
    2. Copiar el token que se genera al iniciar sesión
    3. En Swagger, presionar el botón Authorize.
    4. Pegar el token en formato: Bearer TU_TOKEN_AQUI
    5. Presionar Try it out para ejecutar la petición.

**Los formatos permitidos son: .JPEG, .JPG y .PNG**
# Simulaci-n-de-Peticiones-HTTP-
1. DESCRIPCIÓN DEL PROYECTO
---------------------------
Este proyecto consiste en una página web que realiza peticiones HTTP utilizando la API pública de Google Books. 
La aplicación permite buscar libros, mostrarlos con paginación de 10 resultados por página y registrar detalles 
de cada petición como método, URL, estado y tiempo de respuesta. 
También se analizaron cabeceras y CORS mediante las herramientas del navegador.

El proyecto cumple con los objetivos de comprender:
- Peticiones HTTP (GET)
- APIs públicas
- Códigos de estado
- CORS
- Headers de red
- Documentación de resultados


2. PROCEDIMIENTO REALIZADO
--------------------------

PASO 1: Creación de la página web
Se creó un archivo HTML con:
- Input de búsqueda
- Botón de consulta
- Contenedor para mostrar libros
- Botones de paginación
Se añadieron los archivos externos app.js y style.css.

<img width="1920" height="935" alt="image" src="https://github.com/user-attachments/assets/3f1a728f-381b-4996-8eb0-6f7e7fe3e9b4" />


PASO 2: Implementación de peticiones HTTP
Se utilizó fetch() para enviar peticiones GET a:

https://www.googleapis.com/books/v1/volumes?q=BUSQUEDA&startIndex=0&maxResults=10

Cada petición registra:
- URL solicitada
- Método HTTP utilizado (GET)
- Tiempo de respuesta usando performance.now()
- Código de estado recibido

La información se muestra en consola y los resultados en pantalla.
<img width="1904" height="933" alt="image" src="https://github.com/user-attachments/assets/d5ed6192-d610-43a7-903d-b94cd3cad395" />


PASO 3: Análisis en Developer Tools
En la pestaña Network se analizaron:

Request Headers:
- Host
- Accept
- User-Agent
- Parámetros q, startIndex y maxResults

Response Headers:
- Content-Type: application/json
- Access-Control-Allow-Origin: *
- Cache-Control

Política de CORS:
La API de Google Books permite acceso público con Access-Control-Allow-Origin: *, 
lo que autoriza a cualquier dominio a consumir la API.

<img width="1920" height="942" alt="image" src="https://github.com/user-attachments/assets/a064790b-8b6e-498f-ac9c-e3d8c9b4fd40" />


PASO 4: Documentación de Resultados
-----------------------------------

TABLA DE REGISTROS DE PETICIONES (EJEMPLOS)
--------------------------------------------
| Método | Búsqueda     | Código | Tiempo | CORS        |
|--------|--------------|--------|--------|-------------|
| GET    | "python"     | 200    | 491 ms | Permitido   |
| GET    | "javascript" | 200    | 806 ms | Permitido   |
| GET    | "asdfghjkl"  | 200    | 780 ms | Permitido   |
----------------------------------------------------------

PASO 5: Commit y Push
Trabajo realizado en la rama:
feature/http-client

3. RESULTADOS ESPERADOS Y OBTENIDOS
-----------------------------------
- Página web funcional con consumo de API real
- Paginación de 10 resultados por página
- Registros de tiempos y códigos de estado
- Análisis de CORS y headers desde Network
- README documentado

let pagina = 0;
let queryActual = "";

document.getElementById("btnBuscar").addEventListener("click", () => {
    pagina = 0;
    queryActual = document.getElementById("query").value.trim();
    buscarLibros();
});

document.getElementById("nextBtn").addEventListener("click", () => {
    pagina++;
    buscarLibros();
});

document.getElementById("prevBtn").addEventListener("click", () => {
    if (pagina > 0) pagina--;
    buscarLibros();
});

function buscarLibros() {
    const maxResults = 10;
    const startIndex = pagina * maxResults;

    if (queryActual === "") {
        document.getElementById("resultado").innerHTML = "Escribe algo para buscar...";
        return;
    }

    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(queryActual)}&startIndex=${startIndex}&maxResults=${maxResults}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            mostrarResultados(data);
        })
        .catch(err => console.error("Error:", err));
}

function mostrarResultados(data) {
    const contenedor = document.getElementById("resultado");
    contenedor.innerHTML = "";

    if (!data.items) {
        contenedor.innerHTML = "No se encontraron resultados.";
        return;
    }

    data.items.forEach(item => {
        const titulo = item.volumeInfo.title || "Sin título";
        const autores = item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "Autor desconocido";

        const div = document.createElement("div");
        div.className = "libro";
        div.innerHTML = `<strong>${titulo}</strong><br><em>${autores}</em>`;
        contenedor.appendChild(div);
    });

    // Control de botones de paginación
    document.getElementById("prevBtn").disabled = (pagina === 0);
    document.getElementById("nextBtn").disabled = (!data.items || data.items.length < 10);
}

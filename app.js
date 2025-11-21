let currentPage = 1;
let currentQuery = "";
const resultsPerPage = 10;

async function searchBooks() {
    currentQuery = document.getElementById("searchInput").value.trim();
    currentPage = 1;
    fetchBooks();
}

async function fetchBooks() {
    if (!currentQuery) return;

    const startIndex = (currentPage - 1) * resultsPerPage;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(currentQuery)}&startIndex=${startIndex}&maxResults=${resultsPerPage}`;

    // MARCAR TIEMPO DE INICIO
    const startTime = performance.now();

    let response, data;

    try {
        response = await fetch(url);

        // TIEMPO FINAL
        const endTime = performance.now();
        const responseTime = (endTime - startTime).toFixed(2);

        // DETECTAR CORS PERMITIDO
        const corsAllowed = response.headers.get("Access-Control-Allow-Origin") ? 
                            "Sí, permitido" : 
                            "No especificado / permitido por política pública";

        // LOG DETALLADO
        console.log("----- PETICIÓN HTTP -----");
        console.log("Método:", "GET");
        console.log("URL:", url);
        console.log("Código de estado:", response.status);
        console.log("Tiempo de respuesta:", responseTime + " ms");
        console.log("CORS permitido:", corsAllowed);
        console.log("--------------------------");

        data = await response.json();

    } catch (error) {
        console.error("Error en la solicitud:", error);
        return;
    }

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (!data.items) {
        resultsDiv.innerHTML = "<p>No se encontraron resultados.</p>";
        return;
    }

    data.items.forEach(book => {
        const info = book.volumeInfo;

        const title = info.title || "Sin título";
        const authors = info.authors ? info.authors.join(", ") : "Autor desconocido";
        const desc = info.description ? info.description.substring(0, 200) + "..." : "Sin descripción";
        const thumbnail = info.imageLinks ? info.imageLinks.thumbnail : "";

        const card = `
            <div class="book-card">
                ${thumbnail ? `<img src="${thumbnail}" alt="book cover">` : ""}
                <div class="book-info">
                    <h3>${title}</h3>
                    <p><strong>Autor:</strong> ${authors}</p>
                    <p>${desc}</p>
                </div>
            </div>
        `;

        resultsDiv.innerHTML += card;
    });

    updatePagination(data.totalItems);
}

function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / resultsPerPage);

    document.getElementById("pageNumber").textContent = `Página ${currentPage}`;

    document.getElementById("prevBtn").disabled = currentPage <= 1;
    document.getElementById("nextBtn").disabled = currentPage >= totalPages;
}

function nextPage() {
    currentPage++;
    fetchBooks();
}

function prevPage() {
    currentPage--;
    fetchBooks();
}

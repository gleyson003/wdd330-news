// Use header and footer dynamic
function loadHTML(id, url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (callback) callback();
        })
        .catch(error => console.error(`Erro ao carregar ${url}:`, error));
}

// Use main dynamic
function loadPage(page) {
    loadHTML("content", `/pages/${page}`);
}

function updateFooter() {
    let currentYear = new Date().getFullYear();
    let lastModification = document.lastModified;

    let currentYearElement = document.getElementById('currentyear');
    let lastModifiedElement = document.getElementById('lastModified');

    if (!currentYearElement || !lastModifiedElement) {
        console.error("Erro: Elementos 'currentyear' ou 'lastModified' não encontrados no footer.");
        return;
    }

    currentYearElement.textContent = currentYear;
    lastModifiedElement.textContent = 'Last modification: ' + lastModification;
}

document.addEventListener("DOMContentLoaded", () => {
    loadHTML("header", "public/partials/header.html");
    loadHTML("footer", "public/partials/footer.html", updateFooter);
    loadPage("home.html");
});

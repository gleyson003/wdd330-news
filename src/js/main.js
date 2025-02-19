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
    history.pushState({ page: page }, "", `?page=${page}`);
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
    loadHTML("header", "src/public/partials/header.html");
    loadHTML("footer", "src/public/partials/footer.html", updateFooter);

    const params = new URLSearchParams(window.location.search);
    const page = params.get("page") || "home.html";

    loadPage(page);
});

//bitcoin api
function bitcoinPrice () {
    const url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data && data.bitcoin && data.bitcoin.usd) {
            document.getElementById("bitcoin-price").textContent = `$ ${data.bitcoin.usd.toFixed(2)}`
        } else {
            console.error("Error trying get the bitcoin price.")
        }
    })
}

function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("from-currency").value;
    const toCurrency = document.getElementById("to-currency").value;

    if (!amount || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    const apiKey = "18e72fe75bc4bd57f951b8f7";
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.conversion_result) {
                document.getElementById("converted-value").textContent = `${data.conversion_result.toFixed(2)} ${toCurrency}`;
            } else {
                console.error("Error getting exchange rate.");
                document.getElementById("converted-value").textContent = "Error!";
            }
        })
        .catch(error => console.error("API request error:", error));
}


document.addEventListener("DOMContentLoaded", bitcoinPrice);
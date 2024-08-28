document.addEventListener("DOMContentLoaded", () => {
    initializeProductList();
});

const productForm = document.getElementById("productForm");
const tableBody = document.getElementById("productTableBody");

productForm.addEventListener("submit", (event) => {
    event.preventDefault();
    processProductInput();
});

function processProductInput() {
    const nameInput = document.getElementById("productName").value.trim();
    const priceInput = parseFloat(document.getElementById("productPrice").value);
    const categoryInput = document.getElementById("productCategory").value.trim();

    if (!nameInput || isNaN(priceInput) || !categoryInput) {
        alert("Todos os campos são obrigatórios e devem ser preenchidos corretamente.");
        return;
    }

    const nameIsValid = /^[A-Za-zÀ-ÖØ-Ýà-öø-ÿ\s]+$/.test(nameInput);
    const categoryIsValid = /^[A-Za-zÀ-ÖØ-Ýà-öø-ÿ\s]+$/.test(categoryInput);

    if (!nameIsValid || !categoryIsValid) {
        alert("Nome e categoria devem conter apenas caracteres alfabéticos.");
        return;
    }

    const newProduct = {
        name: nameInput,
        price: priceInput.toFixed(2),
        category: categoryInput
    };

    insertProductIntoTable(newProduct);
    storeProductInLocalStorage(newProduct);
    productForm.reset();
}

function insertProductIntoTable(product) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${product.name}</td>
        <td>R$ ${product.price}</td>
        <td>${product.category}</td>
        <td><button onclick="handleProductRemoval(this)">Excluir</button></td>
    `;
    tableBody.appendChild(row);
}

function storeProductInLocalStorage(product) {
    const products = JSON.parse(localStorage.getItem("productList")) || [];
    products.push(product);
    localStorage.setItem("productList", JSON.stringify(products));
}

function initializeProductList() {
    const savedProducts = JSON.parse(localStorage.getItem("productList")) || [];
    savedProducts.forEach(insertProductIntoTable);
}

function handleProductRemoval(button) {
    const row = button.closest("tr");
    const productName = row.querySelector("td").textContent.split('\n')[0];
    row.remove();

    let products = JSON.parse(localStorage.getItem("productList")) || [];
    products = products.filter(product => product.name !== productName);
    localStorage.setItem("productList", JSON.stringify(products));
}

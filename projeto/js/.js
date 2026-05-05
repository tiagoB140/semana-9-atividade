// B.1 Base de dados
const data = {
  produtos: [
    { id: 1, nome: "iPhone 13", preco: 5000, categoria: "Celulares", imagem: "https://via.placeholder.com/150", descricao: "iPhone moderno", emEstoque: true },
    { id: 2, nome: "Galaxy S22", preco: 4000, categoria: "Celulares", imagem: "https://via.placeholder.com/150", descricao: "Samsung top", emEstoque: true },
    { id: 3, nome: "Notebook Dell", preco: 3500, categoria: "Notebooks", imagem: "https://via.placeholder.com/150", descricao: "Notebook potente", emEstoque: false },
    { id: 4, nome: "MacBook Air", preco: 8000, categoria: "Notebooks", imagem: "https://via.placeholder.com/150", descricao: "Notebook Apple", emEstoque: true },
    { id: 5, nome: "Mouse Gamer", preco: 150, categoria: "Acessórios", imagem: "https://via.placeholder.com/150", descricao: "Mouse RGB", emEstoque: true },
    { id: 6, nome: "Teclado Mecânico", preco: 300, categoria: "Acessórios", imagem: "https://via.placeholder.com/150", descricao: "Teclado gamer", emEstoque: true },
    { id: 7, nome: "PlayStation 5", preco: 4500, categoria: "Games", imagem: "https://via.placeholder.com/150", descricao: "Console Sony", emEstoque: false },
    { id: 8, nome: "Xbox Series X", preco: 4200, categoria: "Games", imagem: "https://via.placeholder.com/150", descricao: "Console Microsoft", emEstoque: true }
  ]
};

// B.2 Seleção de elementos
const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");

const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.querySelector("#btnRender");

// B.3 Funções

function formatPrice(preco) {
  return "R$ " + preco.toFixed(2);
}

function createProductCard(produto) {
  const card = document.createElement("div");

  card.setAttribute("data-id", produto.id);
  card.classList.add("card");

  // style obrigatório
  card.style.boxShadow = "2px 2px 5px rgba(0,0,0,0.2)";

  card.innerHTML = `
    <h3>${produto.nome}</h3>
    <img src="${produto.imagem}" />
    <p>${formatPrice(produto.preco)}</p>
    <p>${produto.categoria}</p>
    <button class="btn-details">Ver detalhes</button>
    <button class="btn-highlight">Destacar</button>
  `;

  // eventos
  const btnDetails = card.querySelector(".btn-details");
  btnDetails.addEventListener("click", () => {
    showProductDetails(produto);
  });

  const btnHighlight = card.querySelector(".btn-highlight");
  btnHighlight.addEventListener("click", () => {
    card.classList.toggle("highlight");
  });

  return card;
}

function renderProducts(produtos) {
  productList.innerHTML = "";

  produtos.forEach(produto => {
    const card = createProductCard(produto);
    productList.appendChild(card);
  });

  // B.5 querySelectorAll
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    console.log("Card ID:", card.getAttribute("data-id"));
  });
}

function renderCategories() {
  const categorias = ["Todas"];

  data.produtos.forEach(p => {
    if (!categorias.includes(p.categoria)) {
      categorias.push(p.categoria);
    }
  });

  categorySelect.innerHTML = "";

  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

function showProductDetails(produto) {
  productDetails.innerHTML = `
    <h3>${produto.nome}</h3>
    <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
    <p><strong>Categoria:</strong> ${produto.categoria}</p>
    <p><strong>Estoque:</strong> ${produto.emEstoque ? "Disponível" : "Indisponível"}</p>
    <p>${produto.descricao}</p>
  `;
}

function filterProducts() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategory = categorySelect.value;

  return data.produtos.filter(produto => {
    const matchName = produto.nome.toLowerCase().includes(searchText);
    const matchCategory = selectedCategory === "Todas" || produto.categoria === selectedCategory;

    return matchName && matchCategory;
  });
}

// B.4 Eventos
searchInput.addEventListener("input", () => {
  renderProducts(filterProducts());
});

categorySelect.addEventListener("change", () => {
  renderProducts(filterProducts());
});

btnRender.addEventListener("click", () => {
  renderProducts(filterProducts());
});

// Inicialização
renderCategories();
renderProducts(data.produtos);
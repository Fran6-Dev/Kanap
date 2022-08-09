// Recupère les données de l'API

let articleData = [];

const fetchArticle = async () => {
  await fetch("http://localhost:3000/api/products/")
    .then((response) => response.json())
    .then((promise) => {
      articleData = promise;
    })
    .catch((error) => console.error("Erreur = " + error));
};

// Affiche l'ensemble des articles sur la page d'acceuil

const articleDisplay = async () => {
  await fetchArticle();
  document.getElementById("items").innerHTML = articleData
    .map(
      (article) => `
        <a href="./product.html?id=${article._id}">
        <article>
            <img src="${article.imageUrl}" alt="${article.altTxt}">
            <h3 class="productName">${article.name}</h3>
            <p class="productDescription">${article.description}</p>
        </article>
        </a>
        `
    )
    .join("");
};

articleDisplay(); 

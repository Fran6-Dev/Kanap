// Recupère les données de l'API
let articleData = [] ;

const fetchArticle = async () => {
// La methode fetch() permet d'éffectuer des requêtes HTTP. Elle procure un moyen facile et logique de récupérer des ressources à travers le réseau de manière asynchrone.
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
  // La méthode map() crée un nouveau tableau avec les résultats de l'appel d'une fonction fournie sur chaque élément du tableau appelant.
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

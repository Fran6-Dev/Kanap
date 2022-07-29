// Recupere les anciennes données de la page produit
let productInCard = JSON.parse(localStorage.getItem("produit"));
    console.log(productInCard);
  
// Tableau vide qui va contenir toutes les futurs données du panier
let contenuPanier = [];
// Seclection l'attribut ou l'on souhaite rajouter le contenu HTML
const cardSection = document.getElementById('cart__items');
  
// Itinere tous les éléments présents dans le localStorage
for (let k = 0 ; k < productInCard.length ; k++){
    console.log(productInCard[k].idProduit);
    console.log(productInCard[k].nomProduit);
    
    contenuPanier = contenuPanier + 
   `
    <article class="cart__item" data-id="${productInCard[k].idProduit}" data-color="${productInCard[k].colorProduit}">
    <div class="cart__item__img">
                  <img src="${productInCard[k].imgProduit}" alt="${productInCard[k].altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${productInCard[k].nomProduit}</h2>
                    <p>${productInCard[k].colorProduit}</p>
                    <p>${productInCard[k].priceProduit * productInCard[k].quantityProduit} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInCard[k].quantityProduit}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
            </article>
    `;
// Affichage des éléments dans la page panier
    cardSection.innerHTML = contenuPanier;
}

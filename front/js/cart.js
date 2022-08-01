// Recupere les anciennes données de la page produit
let productInCard = JSON.parse(localStorage.getItem("produit"));
    
  
// Tableau vide qui va contenir toutes les futurs données du panier
let contenuPanier = [];
// Seclection l'attribut ou l'on souhaite rajouter le contenu HTML
const cardSection = document.getElementById('cart__items');
  
// Itinere tous les éléments présents dans le localStorage
for (let k = 0 ; k < productInCard.length ; k++){
   
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

// Afficher la quantité et le prix total des articles 

let totalPrice = [];
let totalQuantity = [];

// Recuperer valeurs dans le panier 

for (let j = 0; j < productInCard.length; j++) {
  let priceInCard = productInCard[j].priceProduit * productInCard[j].quantityProduit;
  let quantityInCard = productInCard[j].quantityProduit;

  // Mettre les prix et nombre d'article du panier dans une variable

  totalPrice.push(priceInCard);
  totalQuantity.push(parseInt(quantityInCard, 10));

}

// Additionner les prix et quantité avec la methode reduce
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const allPrice = totalPrice.reduce(reducer);
const allQuantity = totalQuantity.reduce(reducer);

// Inserer les éléments dans le html
document.getElementById('totalPrice').innerHTML = `${allPrice}`;
document.getElementById('totalQuantity').innerHTML = `${allQuantity}`

// Mise en place du button pour supprimer un article
// La méthode Array.from() permet de créer une nouvelle instance d'Array (une copie superficielle) à partir d'un objet itérable ou semblable à un tableau.
// array.from permet la convertion de node.list a array
let deleteItem = Array.from(document.querySelectorAll(".deleteItem"));
// Tableau vide ou l'on injecte le nouveau tableau une fois l'élément supprimé
let tab = [];

// Supprimer element

for (let l = 0 ; l < deleteItem.length; l++){
  deleteItem[l].addEventListener("click", () => {
    deleteItem[l].parentElement.style.display = "none";
    tab = productInCard;
    // La methode spilce permet de retirer l'element du tableau
    tab.splice([l], 1);
    productInCard = localStorage.setItem('produit', JSON.stringify(tab));
    // Permet de rafraichir la page
    window.location.href = "cart.html";
  });
}

// if (totalQuantity == null || totalQuantity == 0){
//   cardSection.innerHTML = `
//   <article>
//     <p> Le panier est vide </p>
//   </article>`

// }
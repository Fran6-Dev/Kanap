// Recupere les anciennes données de la page produit
let productInCard = JSON.parse(localStorage.getItem("products"));

// Tableau vide qui va contenir toutes les futurs données du panier
let contenuPanier = [];
// Seclection l'attribut ou l'on souhaite rajouter le contenu HTML
const cardSection = document.getElementById("cart__items");

// Itinere tous les éléments présents dans le localStorage
for (let k = 0; k < productInCard.length; k++) {
  contenuPanier =
    contenuPanier +
    `
    <article class="cart__item" data-id="${
      productInCard[k].idProduit
    }" data-color="${productInCard[k].colorProduit}">
    <div class="cart__item__img">
                  <img src="${productInCard[k].imgProduit}" alt="${
      productInCard[k].altTxt
    }">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${productInCard[k].nomProduit}</h2>
                    <p>${productInCard[k].colorProduit}</p>
                    <p>${
                      productInCard[k].priceProduit *
                      productInCard[k].quantityProduit
                    } €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
                        productInCard[k].quantityProduit
                      }">
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

const totalPrice = [];
const totalQuantity = [];

// Recuperer valeurs dans le panier

for (let j = 0; j < productInCard.length; j++) {
  let priceInCard =
    productInCard[j].priceProduit * productInCard[j].quantityProduit;
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
document.getElementById("totalPrice").innerHTML = `${allPrice}`;
document.getElementById("totalQuantity").innerHTML = `${allQuantity}`;

// Mise en place du button pour supprimer un article
// La méthode Array.from() permet de créer une nouvelle instance d'Array (une copie superficielle) à partir d'un objet itérable ou semblable à un tableau.
// array.from permet la convertion de node.list a array
let deleteItem = Array.from(document.querySelectorAll(".deleteItem"));
// Tableau vide ou l'on injecte le nouveau tableau une fois l'élément supprimé


// Supprimer les articles du panier

for (let l = 0; l < deleteItem.length; l++) {
  deleteItem[l].addEventListener("click", () => {
    deleteItem[l].parentElement.style.display = "none";
    // La methode spilce permet de retirer l'element du tableau
    productInCard.splice([l], 1);
    productInCard = localStorage.setItem("products", JSON.stringify(productInCard));
    // Permet de rafraichir la page
    window.location.reload();
  });
}

// Changer le nombre d'article dans le panier

let changeValue = document.querySelectorAll(".itemQuantity");

for (let m = 0; m < changeValue.length; m++) {
  changeValue[m].addEventListener("change", () => {
    const currentQuantity = document.getElementsByName("itemQuantity")[m].value;
    const qty = currentQuantity;

    const productId = product[m].idProduit;
    const product = product.find(
      (dataProduct) => dataProduct.idProduit === productId
    );
    product.quantityProduit = qty;
    localStorage.setItem("products", JSON.stringify(product));

    window.location.reload();
  });
}

///// Elements du formulaire
// Les différentes valeurs du formulaire

const prenom = document.getElementById("firstName");
const nom = document.getElementById("lastName");
const adresse = document.getElementById("address");
const ville = document.getElementById("city");
const email = document.getElementById("email");

//Selecton du bouton envoyer le formulaire
const btnEnvoyer = document.getElementById("order");

// Bouton addEventListener lié au bouton commander
btnEnvoyer.addEventListener("click", (e) => {
  e.preventDefault();

  //Recuperation des valeurs du formulaire
  const productIds = productInCard.map((product) => product.idProduit);
  const contact = {
    firstName: prenom.value,
    lastName: nom.value,
    address: adresse.value,
    city: ville.value,
    email: email.value,
  };

  if (
    validateFirstName() &&
    validateLastName() &&
    validateEmail() &&
    validateCity()
  ) {
    // Mettre l'objet formulaire dans le local storage
    localStorage.setItem("contact", JSON.stringify(contact));
  } else {
    alert("Veuillez bien remplir le formulaire");
  }

  // Rassemblement des valeurs du formulaire et des produits séléctionnés dans un objet à envoyer vers le serveur
  const products = productIds;
  const aEnvoyer = {
    products,
    contact,
  };

  // REGEX pour les champs nom et prenom

  //prenom
  function validateFirstName() {
    const lePrenom = contact.firstName;
    if (/^[A-Z][a-z '-.,]{2,31}$|^$i/.test(lePrenom)) {

      return true;
    } else {
      document.getElementById("firstNameErrorMsg").innerHTML =
        "Le prénom doit être composé de 2 caractères minimum et ne pas comporter de caractères spéciaux.";

      return false;
    }
  }
  validateFirstName();

  if(validateFirstName()) {
    document.getElementById("firstNameErrorMsg").innerHTML = "";
  };

  //nom
  function validateLastName() {
    const leNom = contact.lastName;
    if (/^[A-Z][a-z '-.,]{2,31}$|^$i/.test(leNom)) {


      return true;
    } else {
      document.getElementById("lastNameErrorMsg").innerHTML =
        "Le nom doit être composé de 2 caractères minimum et ne pas comporter de caractères spéciaux.";
      return false;
    }
  }
  validateLastName();

  if(validateLastName()) {
    document.getElementById("lastNameErrorMsg").innerHTML = "";
  }

  //Champ email, utilisations de REGEX

  function validateEmail() {
    const lEmail = contact.email;
    if (
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        lEmail
      )
    ) {

      return true;
    } else {
      document.getElementById("emailErrorMsg").innerHTML =
        " Ceci n'est pas une adresse email valide.";
      return false;
    }
  }
  validateEmail();

  if(validateEmail()) {
    document.getElementById("emailErrorMsg").innerHTML = "";
  };

  //ville

  function validateCity() {
    const laVille = contact.city;
    if (/^[A-Z][a-z '-.,]{2,31}$|^$i/.test(laVille)) {

      return true;
    } else {
      document.getElementById("cityErrorMsg").innerHTML =
        "Le nom de votre ville n'est pas valable";
      return false;
    }
  }
  validateCity();

  if(validateCity()) {
    document.getElementById("cityErrorMsg").innerHTML = "";
  };

  //------------------ MISE EN PLACE DE LA METHODE POST POUR ENVOYER LES ELEMENTS AU BACKEND ------------------------------


  const orderApi = {
    method: 'POST',
    body: JSON.stringify(aEnvoyer),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const postApi = () => {
    fetch('http://localhost:3000/api/products/order', orderApi)
      .then((response) => response.json())
      .then((data) => {
        window.location.href = "./confirmation.html?id=" + data.orderId;
        // localStorage.setItem('orderId', data.orderId);
      });
  };

  postApi();

});




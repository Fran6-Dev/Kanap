// Recupère les anciennes données de la page produit du localStorage et la transforme en objet JavaScript
let productInCart = JSON.parse(localStorage.getItem("products"));

// Tableau vide qui va contenir toutes les futurs données du panier
let contenuPanier = [];
// Seclection l'attribut ou l'on souhaite rajouter le contenu HTML
const cardSection = document.getElementById("cart__items");

// Parcours tous les éléments existant dans le localStorage
for (let k = 0; k < productInCart.length; k++) {
  contenuPanier =
    contenuPanier +
    `
    <article class="cart__item" data-id="${
      productInCart[k].idProduit
    }" data-color="${productInCart[k].colorProduit}">
    <div class="cart__item__img">
                  <img src="${productInCart[k].imgProduit}" alt="${
      productInCart[k].altTxt
    }">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${productInCart[k].nomProduit}</h2>
                    <p>${productInCart[k].colorProduit}</p>
                    <p>${
                      productInCart[k].priceProduit *
                      productInCart[k].quantityProduit
                    } €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
                        productInCart[k].quantityProduit
                      }">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" style="color:red">Supprimer</p>
                    </div>
                  </div>
                </div>
            </article>
    `;
  // Affichage des éléments dans la page panier
  cardSection.innerHTML = contenuPanier;
}

// Ajoute les éléments séléctionnés par l'utilisateur dans le panier
function addProductToCart() {
  // Afficher la quantité et le prix total des articles que l'on va stocker dans des tableaux
  const totalPrice = [];
  const totalQuantity = [];

  // Recupérer valeurs dans le panier

  for (let j = 0; j < productInCart.length; j++) {
    let priceInCart =
      productInCart[j].priceProduit * productInCart[j].quantityProduit;
    let quantityInCart = productInCart[j].quantityProduit;

    // Pousser les prix et nombre d'article du panier dans les variable créée précedemment
    totalPrice.push(priceInCart);
    totalQuantity.push(parseInt(quantityInCart, 10));
  }

  // Additionner les prix et quantité avec la methode reduce
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const allPrice = totalPrice.reduce(reducer);
  const allQuantity = totalQuantity.reduce(reducer);

  // Insérer les éléments dans le html
  document.getElementById("totalPrice").innerHTML = `${allPrice}`;
  document.getElementById("totalQuantity").innerHTML = `${allQuantity}`;
}

addProductToCart();

// Mise en place du button pour supprimer un article
function deleteProduct() {
  // La méthode Array.from() permet de créer une nouvelle instance d'Array (une copie superficielle) à partir d'un objet itérable ou semblable à un tableau.
  let deleteItem = Array.from(document.querySelectorAll(".deleteItem"));
  // Supprimer les articles du panier
  for (let l = 0; l < deleteItem.length; l++) {
    deleteItem[l].addEventListener("click", () => {
      deleteItem[l].parentElement.style.display = "none";
      // La méthode splice() modifie le contenu d'un tableau en retirant des éléments et/ou en ajoutant de nouveaux éléments à même le tableau.
      productInCart.splice([l], 1);
      productInCart = localStorage.setItem(
        "products",
        JSON.stringify(productInCart)
      );
      // Permet de rafraichir la page
      window.location.reload();
    });
  }
}
deleteProduct();

// Changer le nombre d'article dans le panier
function changeItemNumber() {
  let changeValue = document.querySelectorAll(".itemQuantity");

  for (let m = 0; m < changeValue.length; m++) {
    // L'événement change est déclenché pour les éléments <input> lorsqu'un changement de leur valeur est réalisé par l'utilisateur.
    changeValue[m].addEventListener("change", (e) => {
      e.preventDefault();
      // Permet de séléctionné la valeur inscrit dans l'input et de lui attribuer une variable ici qty.
      const currentQuantity = document.getElementsByName("itemQuantity")[m].value;
      let qty = currentQuantity;
      // La méthode find() renvoie la valeur du premier élément trouvé dans le tableau qui respecte la condition donnée par la fonction de test passée en argument.
      let product = productInCart.find(
        (dataProduct) => dataProduct.idProduit === productInCart[m].idProduit
      );
      // Ici, la quantité inscrite dans l'input et égale a celle trouver dans productInCart grâce à l'id
      product.quantityProduit = qty;
      localStorage.setItem("products", JSON.stringify(productInCart));

      window.location.reload();
    });
  }
}

changeItemNumber();

//------------------------------------ GESTION DU FORMULAIRE ---------------------------------------
// Les différentes valeurs du formulaire

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

//Selecton du bouton commander qui envoie le formulaire
const btnEnvoyer = document.getElementById("order");

// Bouton addEventListener lié au bouton commander qui déclenche toutes les actions si dessous
function postForm() {
  btnEnvoyer.addEventListener("click", (e) => {
    e.preventDefault();
  
    // Recuperation des valeurs du formulaire
    // Recupère les id des produits
    const productIds = productInCart.map((product) => product.idProduit);
    const contact = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    };

    // UTILISATION DE REGEX POUR LES DIFFÉRENTS CHAMPS DU FORMULAIRE
  
    // Champ prénom du formulaire
  
    function validateFirstName() {
      //Correspond à la valeur inscrit dans firstname dans le formulaire
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
    // Réinitialise le message d'erreur après la correction de celui ci
    if (validateFirstName()) {
      document.getElementById("firstNameErrorMsg").innerHTML = "";
    }
  
    // Champ nom du formulaire
  
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
  
    if (validateLastName()) {
      document.getElementById("lastNameErrorMsg").innerHTML = "";
    }
  
    // Champ email du formulaire
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
  
    if (validateEmail()) {
      document.getElementById("emailErrorMsg").innerHTML = "";
    }
  
    // Champ ville du formulaire
  
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
  
    if (validateCity()) {
      document.getElementById("cityErrorMsg").innerHTML = "";
    }

    // Condition de validation du formulaire
  
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
    };
  
    //------------------ FIN DE GESTION DU FORMULAIRE ------------------------------
  
    //------------------ MISE EN PLACE DE LA METHODE POST POUR ENVOYER LES ELEMENTS AU BACKEND ------------------------------

    // Rassemblement des valeurs du formulaire et des produits séléctionnés dans un objet à envoyer vers le serveur
    const products = productIds;
    const ToSend = {
      products,
      contact,
    };
  
    const orderApi = {
      method: "POST",
      body: JSON.stringify(ToSend),
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const postApi = () => {
      fetch("http://localhost:3000/api/products/order", orderApi)
        .then((response) => response.json())
        .then((data) => {
          if (
            validateFirstName() &&
            validateLastName() &&
            validateEmail() &&
            validateCity()
          ) {
            window.location.href = "./confirmation.html?id=" + data.orderId;
          } 
        });
    };
  
    postApi();
  });

}

postForm();
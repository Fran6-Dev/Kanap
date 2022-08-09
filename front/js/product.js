// Fait un lien entre un produit de la page d'accueil et la page produit
let params = new URL(document.location).searchParams;
const id = params.get("id");

let urlData = [];

// Call vers l'API afin de recupérer les données via l'id produit

const fetchProduct = async () => {
  await fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((promise) => {
      urlData = promise;
    })
    .catch((error) => console.error("Erreur = " + error));
};

// Affichage des details produits sur la page produit

const productDisplay = async () => {
  await fetchProduct();
  document.getElementById("title").innerHTML = urlData.name;
  document.getElementById("price").innerHTML = urlData.price;
  document.getElementById("description").innerHTML = urlData.description;
  document.querySelector(".item__img").innerHTML = `
    <img src="${urlData.imageUrl}" alt="${urlData.altTxt}">`;

  let chooseColor = document.getElementById("colors");
  for (let i = 0; i < urlData.colors.length; i++) {
    let option = document.createElement("option");
    option.innerText = urlData.colors[i];
    chooseColor.appendChild(option);
  }
};

productDisplay();

//----------------------------- GESTION DU PANIER --------------------------------------
// Selection de l'id du formulaire
const idForm = document.getElementById("colors");

// Selection du bouton ajout article au panier
const envoyerPanier = document.getElementById("addToCart");

envoyerPanier.addEventListener("click", (event) => {
  event.preventDefault();

  // Choix de l'utilisateur dans la variable colors
  const choixFormulaire = idForm.value;

  // Récuperation valeur formulaire

  let optionsProduit = {
    nomProduit: urlData.name,
    imgProduit: urlData.imageUrl,
    idProduit: urlData._id,
    altProduit: urlData.altTxt,
    descriptionProduit: urlData.description,
    colorProduit: choixFormulaire,
    quantityProduit: document.querySelector("input").value,
    priceProduit: urlData.price,
  };

  // Mise en place du localStorage
  // Verification des produits déjà present dans le local storage
  // JSON.parse, pour convertir les données du format JSON en object Javascript
  let productInCart = JSON.parse(localStorage.getItem("products"));

  //Ajout un produit sélectionné dans le localStorage

  const addProductToLocalStorage = () => {
    let foundProduct = productInCart.find(
      (p) => p.idProduit == optionsProduit.idProduit
    );
    if (foundProduct) {
      const index = productInCart.indexOf(foundProduct);

      const product = productInCart[index];
      const quantityValue =
        parseInt(product.quantityProduit, 10) +
        parseInt(optionsProduit.quantityProduit, 10);
      productInCart[index].quantityProduit = quantityValue;
    } else {
      productInCart.push(optionsProduit);
    }

    localStorage.setItem("products", JSON.stringify(productInCart));
  };

  // si produit deja enregistré dans le localStorage
  if (productInCart) {
    addProductToLocalStorage();
  }

  //si le produit n'est pas enregistré dans le local storage
  else {
    productInCart = [];
    addProductToLocalStorage();
  }
  //Animation button après ajout produit au panier
  alert("Le produit a bien été ajouté");
});

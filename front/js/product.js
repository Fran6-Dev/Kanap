// Récupere l'ID de chaque produit grâce à la methode searchParams qui permet de le récuperer directement dans l'URL
let params = new URL(document.location).searchParams;
const id = params.get("id");

// Nouveau tableau vide ou l'on stocke les données que va nous retourner la methode fetch en dessous.
let urlData = [];

// Utilisation de la methode fetch() afin de recupérer les données via l'id produit

const fetchProduct = async () => {
  await fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((promise) => {
      // Ici on transfère le retour de l'API vers le tableau urlData
      urlData = promise;
    })
    .catch((error) => console.error("Erreur = " + error));
};

// Affichage des details produits sur la page produit

const productDisplay = async () => {
  await fetchProduct();
  // On modifie les différentes infos produits en utilisant le tableau urlData et ses valeurs
  document.getElementById("title").innerHTML = urlData.name;
  document.getElementById("price").innerHTML = urlData.price;
  document.getElementById("description").innerHTML = urlData.description;
  document.querySelector(".item__img").innerHTML = `
    <img src="${urlData.imageUrl}" alt="${urlData.altTxt}">`;
  // On mets en place l'input qui permet de séléctionner les différentes couleurs des produits
  let chooseColor = document.getElementById("colors");
  // Utilisation de la méthode for qui crée une boucle permettant de parcourir l'urlData.color.length
  for (let i = 0; i < urlData.colors.length; i++) {
    // Création d'un élément HTML du type option ou l'on va insérer les valeurs ci-dessous
    let option = document.createElement("option");
    option.innerText = urlData.colors[i];
    // Ajoute un nœud à la fin de la liste des enfants d'un nœud parent spécifié
    chooseColor.appendChild(option);
  }
};

productDisplay();

//----------------------------- GESTION DU PANIER --------------------------------------
// Selection de l'input color
const chooseInput = document.getElementById("colors");
// Selection du bouton ajout article au panier
const envoyerPanier = document.getElementById("addToCart");
// Création de l'event lorsque l'on clique sur ajouter au panier
envoyerPanier.addEventListener("click", (event) => {
  event.preventDefault();

  // Permet de reccuillir le choix de l'input fait par l'utilisateur
  const inputColor = chooseInput.value;

  // Permet de récupérer les données des produits choisis par l'utilisateur sur la page produit
  let optionsProduit = {
    nomProduit: urlData.name,
    imgProduit: urlData.imageUrl,
    idProduit: urlData._id,
    altProduit: urlData.altTxt,
    descriptionProduit: urlData.description,
    colorProduit: inputColor,
    // prend directement en compte la valeur séléctionnée
    quantityProduit: document.querySelector("input").value,
    priceProduit: urlData.price,
  };

  // ------------------------------------------------ MISE EN PLACE DU LOCALSTORAGE ------------------------------------
  // Verification des produits déjà present dans le local storage
  // JSON.parse, pour convertir les données du format JSON en object Javascript
  let productInCart = JSON.parse(localStorage.getItem("products"));

  //Ajout un produit sélectionné dans le localStorage
  const addProductToLocalStorage = () => {
    // Variable qui permet de savoir si le produit séléctionné à déjà été ajouté
    let foundProduct = productInCart.find(
      // La méthode find() renvoie la valeur du premier élément trouvé dans le tableau qui respecte la condition donnée par la fonction de test passée en argument.
      (p) => p.idProduit == optionsProduit.idProduit
    );
    if (foundProduct) {
      // La méthode indexOf() renvoie le premier indice pour lequel on trouve un élément donné dans un tableau.
      // Cette variable renvoie les éléments de foundProduct présent dans productInCart
      const index = productInCart.indexOf(foundProduct);
      // Cete variable permet de séléctionée les éléments en questions grâce à l'index qui a été cherché précédemment
      const product = productInCart[index];
      //On additionne la qté des produits séléctionnés et des produits déjà présent
      const quantityValue =
        // ParseInt() analyse une chaîne de caractère fournie en argument et renvoie un entier exprimé dans une base donnée
        parseInt(product.quantityProduit, 10) +
        parseInt(optionsProduit.quantityProduit, 10);
      console.log(product.quantityProduit);
      console.log(optionsProduit.quantityProduit);
      console.log(quantityValue);
      // Permet de d'initialiser la valeur par défaut de product.quantityProduit
      product.quantityProduit = quantityValue;
      console.log(product.quantityProduit);
      console.log(quantityValue);
    } else {
      // La méthode push() ajoute un ou plusieurs éléments à la fin d'un tableau et retourne la nouvelle taille du tableau.
      productInCart.push(optionsProduit);
    }
    // La méthode setItem(), lorsque lui sont passées le duo clé-valeur, les ajoute à l'emplacement de stockage, sinon elle met à jour la valeur si la clé existe déjà.
    localStorage.setItem("products", JSON.stringify(productInCart));
  };
  // Condition d'ajout du produit dans le localStorage
  // Si produit deja enregistré dans le localStorage
  if (productInCart) {
    addProductToLocalStorage();
  }
  // Si le produit n'est pas enregistré dans le local storage
  else {
    productInCart = [];
    addProductToLocalStorage();
  }
  //Alerte button après ajout produit au panier pour nous indiquer que le produit a bien été ajouté
  alert("Le produit a bien été ajouté");
});

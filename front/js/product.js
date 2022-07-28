// Faire un lien entre un produit de la page d'accueil et la page produit

let params = new URL(document.location).searchParams;
const id = params.get('id');


let urlData = [];

const fetchProduct = async () => {
   await fetch(`http://localhost:3000/api/products/${id}`)
    .then(res => res.json())
    .then((promise) => {
        urlData = promise})
    .catch((error) => console.error("Erreur = " + error));
     }



// Afficher les details produits sur la page

const productDisplay = async () => {
    await fetchProduct();
    document.getElementById("title").innerHTML = urlData.name;
    document.getElementById("price").innerHTML = urlData.price;
    document.getElementById("description").innerHTML = urlData.description;
    document.querySelector(".item__img").innerHTML =`
    <img src="${urlData.imageUrl}" alt="${urlData.altTxt}">`;
    
    let chooseColor = document.getElementById("colors");
    for (let i = 0; i < urlData.colors.length; i++) {
        let option = document.createElement("option");
        option.innerText = urlData.colors[i];
        chooseColor.appendChild(option);

    };
}

productDisplay();

// Gestion du panier
// Selection de l'id du formulaire 
const idForm = document.getElementById("colors");

// Selection du bouton ajout article au panier
const envoyerPanier = document.getElementById('addToCart');

envoyerPanier.addEventListener("click", (event) => {
    event.preventDefault();

// Choix de l'utilisateur dans la variable colors
const choixFormulaire = idForm.value;

    // Récuperation valeur formulaire 
    
    let optionsProduit = {
        nomProduit: urlData.name,
        idProduit: urlData._id,
        colorProduit: choixFormulaire,
        quantityProduit: document.querySelector('input').value,
        priceProduit: urlData.price,
    
    };
    



    // Mise en place du localStorage
    // Verification des produits déjà present dans le local storage
    // JSON.parse, pour convertir les données du format JSON en object Javascript
    let productInCard = JSON.parse(localStorage.getItem("produit"));
    
    // si produit deja enregistré dans le localStorage
    if(productInCard){
        productInCard.push(optionsProduit);
        localStorage.setItem("produit", JSON.stringify(productInCard));

    }
    //si le produit n'est pas enregistré dans le local storage
    else {
        productInCard = [];
        productInCard.push(optionsProduit);
        localStorage.setItem("produit", JSON.stringify(productInCard));

    }

});


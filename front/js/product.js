
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
        imgProduit: urlData.imageUrl,
        idProduit: urlData._id,
        altProduit: urlData.altTxt,
        descriptionProduit: urlData.description,
        colorProduit: choixFormulaire,
        quantityProduit: document.querySelector('input').value,
        priceProduit: urlData.price,
    };


    // Mise en place du localStorage
    // Verification des produits déjà present dans le local storage
    // JSON.parse, pour convertir les données du format JSON en object Javascript
    let productInCard = JSON.parse(localStorage.getItem("produit"));
    
    //Ajout un produit sélectionné dans le localStorage

    const ajoutProduitLocalStorage = () => {
        
        let foundProduct = productInCard.find(p => p.idProduit == optionsProduit.idProduit);
        if(foundProduct){
            const index = productInCard.indexOf(foundProduct);

            const product = productInCard[index];
            const quantityValue = parseInt(product.quantityProduit, 10) + parseInt(optionsProduit.quantityProduit, 10);
            productInCard[index].quantityProduit = quantityValue;
        } else {
            productInCard.push(optionsProduit);
        }
        console.log(foundProduct);
       
        

        localStorage.setItem("produit", JSON.stringify(productInCard));
        console.log("TEST", productInCard.map(p => p.nomProduit));
       
    }



    // si produit deja enregistré dans le localStorage
    if(productInCard){
        ajoutProduitLocalStorage();
    }

    //si le produit n'est pas enregistré dans le local storage
    else {
        productInCard = [];
        ajoutProduitLocalStorage();
    }
    console.log(productInCard);


 });





// function saveProduct(panier){
//     localStorage.setItem("produit", JSON.stringify(productInCard));
// }

// function getProduct(){
//     let panier = localStorage.getItem("produit");
//     if (panier == null) {
//         return [];
//     } else {
//         return JSON.parse(panier);
//     }
// }


// function addPProduct(product) {
//     let panier = getProduct();
//     let foundProduct = panier.find(p => p._id == product._id);
//     if (foundProduct != undefined) {
//         foundProduct.quantityProduit++;
//     } else {
//         product.quantityProduit = 1;
//         panier.push(product)
//     }
//     saveProduct();
// }

// Faire un lien entre un produit de la page d'accueil et la page produit

let params = new URL(document.location).searchParams;
const id = params.get('id');
console.log(id);

const fetchProduct = async () => {
   await fetch(`http://localhost:3000/api/products/${id}`)
    .then(res => res.json())
    .then((promise) => {
        urlData = promise
        console.log(urlData)})
    .catch((error) => console.error("Erreur = " + error));
     }

fetchProduct();

// Afficher les details produits sur la page


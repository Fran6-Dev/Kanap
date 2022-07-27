// Faire un lien entre un produit de la page d'accueil et la page produit


let params = new URL(document.location).searchParams;
const id = params.get('id');
console.log(id);


let urlData = [];

const fetchProduct = async () => {
   await fetch(`http://localhost:3000/api/products/${id}`)
    .then(res => res.json())
    .then((promise) => {
        urlData = promise
        console.log(urlData)})
    .catch((error) => console.error("Erreur = " + error));
     }



// Afficher les details produits sur la page

const productDisplay = async () => {
    await fetchProduct();
    console.log(urlData)
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

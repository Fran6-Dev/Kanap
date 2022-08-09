// Affiche la confirmation de la commande ainsi que l'orderId de celle-ci

const url = new URL(window.location);
const id = url.searchParams.get("id");
const orderId = document.getElementById("orderId");
orderId.innerHTML = id;
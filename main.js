const baseUrl = "https://fakestoreapi.com/products";
const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("submit");
const categoryButtons = document.querySelectorAll(".category");
const cartContent = document.querySelector(".cart-content");
const totalPriceElement = document.querySelector(".total-price");
const buyButton = document.querySelector(".btn-buy");

async function fetchProducts(category = "all") {
    try {
        let url = baseUrl;
        if (category !== "all") {
            url = `${baseUrl}/category/${category}`;
        }
        const response = await fetch(url);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

function displayProducts(products) {
    productList.innerHTML = "";
    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-img">
            <h3 class="product-title">${product.title}</h3>
            <p>${product.description.substring(0, 50)}...</p>
            <span class="price">$${product.price}</span>
        `;
        productCard.addEventListener("click", () => addProductToCart(product));
        productList.appendChild(productCard);
    });
}

function addProductToCart(product) {
    const cartItems = document.getElementsByClassName("cart-product-title");
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].innerText === product.title) {
            alert("You have already added this item to the cart");
            return;
        }
    }

    const cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    cartShopBox.innerHTML = `
        <img src="${product.image}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${product.title}</div>
            <div class="cart-price">$${product.price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bxs-trash-alt cart-remove'></i>
    `;
    
    cartContent.appendChild(cartShopBox);
    cartShopBox.querySelector(".cart-remove").addEventListener("click", removeCartItem);
    cartShopBox.querySelector(".cart-quantity").addEventListener("change", quantityChanged);
    updateTotal();
}

function removeCartItem(event) {
    event.target.parentElement.remove();
    updateTotal();
}

function quantityChanged(event) {
    if (isNaN(event.target.value) || event.target.value <= 0) {
        event.target.value = 1;
    }
    updateTotal();
}

function updateTotal() {
    let total = 0;
    const cartBoxes = document.getElementsByClassName("cart-box");
    for (let box of cartBoxes) {
        const priceElement = box.querySelector(".cart-price");
        const quantityElement = box.querySelector(".cart-quantity");
        const price = parseFloat(priceElement.innerText.replace("$", ""));
        const quantity = quantityElement.value;
        total += price * quantity;
    }
    totalPriceElement.innerText = `$${total.toFixed(2)}`;
}

buyButton.addEventListener("click", () => {
    alert("Your order has been placed");
    cartContent.innerHTML = "";
    updateTotal();
});

searchButton.addEventListener("click", () => {
    const query = searchInput.value.toLowerCase();
    if (query) {
        fetchProducts().then(() => {
            const filteredProducts = Array.from(document.querySelectorAll(".product"))
                .filter(product => product.innerText.toLowerCase().includes(query));
            productList.innerHTML = "";
            filteredProducts.forEach(product => productList.appendChild(product));
        });
    }
});

categoryButtons.forEach(button => {
    button.addEventListener("click", () => fetchProducts(button.getAttribute("data-category")));
});

fetchProducts();




let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

cartIcon.onclick = () => {
    cart.classList.add("active");
}

closeCart.onclick = () => {
    cart.classList.remove("active");
}

document.getElementsByClassName("btn-buy")[0].addEventListener('click', buyButtonClicked);
function buyButtonClicked(){
    alert('Your Order is placed')
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }

}


function removeCartItem(event) {
var buttonClicked = event.target;
buttonClicked.parentElement.remove();

}


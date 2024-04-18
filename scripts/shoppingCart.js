const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const search = urlParams.get('search');

var generatedProducts = [];
var storedProducts = localStorage.getItem('products');
var products = JSON.parse(storedProducts) || [];

checkCurrentScreen();

function checkCurrentScreen() {
    var currentScreen = localStorage.getItem('screen');
    document.getElementById('searchInput').value = search;

    document.getElementById('cartQuantityText').innerHTML = getQuantityOnCart();

    if (currentScreen == 'cartList')
        checkCartList();
    else if (search)
        checkProductsList();
}

function checkProductsList(){
    document.getElementById('itemListBlock').hidden = false;

    generatedProducts.push({
        name: 'the best ' + search + ' ever made',
        value: getRandomMoney(),
        quantity: 1
    });

    generatedProducts.push({
        name: search + ' #2 you NEED this one!',
        value: getRandomMoney(),
        quantity: 1
    });

    document.getElementById('firstItemName').innerHTML = generatedProducts[0].name;
    document.getElementById('firstItemValue').innerHTML = generatedProducts[0].value;

    document.getElementById('secondItemName').innerHTML = generatedProducts[1].name;
    document.getElementById('secondItemValue').innerHTML = generatedProducts[1].value;


    document.getElementById('firstRemoveFromCart').hidden   = true;
    document.getElementById('firstAddToCart').hidden        = false;
    document.getElementById('secondRemoveFromCart').hidden  = true;
    document.getElementById('secondAddToCart').hidden       = false;
}

document.getElementById('searchButton').addEventListener('click', function(){
    console.log("teste")
    var searchInput = document.getElementById('searchInput').value.trim();

    if(!searchInput){
        window.location.href = window.location.pathname;
        return;
    }

    urlParams.set('search', searchInput);
    localStorage.setItem('screen', 'productsList');
    window.location.href = window.location.pathname + "?" + urlParams.toString();
});

document.getElementById('cartButton').addEventListener('click', (event) => {
    localStorage.setItem('screen', 'cartList');
    window.location.href = window.location.href // refresh page
});

function getQuantityOnCart(){
    if(!products)
        return '';

    return products.length;
}

function checkCartList(){
    document.getElementById('cartListBlock').hidden = false;

    const cartListRows = document.getElementById('cartListRows');

    for(var i = 0; i < products.length; i++){
        var value   = products[i].value;
        var name    = products[i].name;
        var quantity= products[i].quantity;

        var cartRow = `<div class="card mb-3" id="` + i + `ItemCart">
            <div class="row g-0">
                <div class="col-2" style="max-width: 200px;">
                    <img src="../assets/OCR_TEXT.png" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-10">
                                <h5 class="card-title" id="` + i + `itemName">
                                    <span id="` + i + `ItemNameCart"></span>
                                    <span>` + name + `</span>
                                </h5>
                            </div>
                            <div class="col">
                                <h5 class="card-text text-end">
                                    <span>$</span>
                                    <span id="` + i + `ItemValueCart">` + value + `</span>
                                </h5>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="dropdown" id="` + i + `Dropdown">
                                    <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span>Qty</span>
                                        <span id="` + i + `ItemQuantity">` + quantity + `</span>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><span class="dropdown-item">0</span></li>
                                        <li><span class="dropdown-item">1</span></li>
                                        <li><span class="dropdown-item">2</span></li>
                                        <li><span class="dropdown-item">3</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        cartListRows.innerHTML += cartRow;
    }

    for(var i = 0; i < products.length; i++){
        const dropdown = document.getElementById(i + "Dropdown");
        var dropdownItems = dropdown.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(function(item) {
            createEventListener(i, item);
        });
    }

    document.getElementById('subtotal').textContent = getSubtotal();
}

function createEventListener(i, item) {
    item.addEventListener('click', function(event) {
        event.preventDefault();
        products[i].quantity = parseInt(this.textContent);

        var productsString = JSON.stringify(products);
        localStorage.setItem('products', productsString);

        if(this.textContent == "0"){
            const index = products.indexOf(products[0])
            products.splice(index, 1);
            var productsString = JSON.stringify(products);
            localStorage.setItem('products', productsString);
            window.location.href = window.location.pathname;
            return;
        }

        document.getElementById(i + 'ItemQuantity').textContent = products[i].quantity;
        document.getElementById('subtotal').textContent = getSubtotal();
    });
}

document.getElementById('firstAddToCart').addEventListener('click', (event) => {
    products.push(generatedProducts[0]);
    document.getElementById('firstRemoveFromCart').hidden   = false;
    document.getElementById('firstAddToCart').hidden        = true;
    updateProductsStorage();
});

document.getElementById('secondAddToCart').addEventListener('click', (event) => {
    products.push(generatedProducts[1]);
    document.getElementById('secondRemoveFromCart').hidden  = false;
    document.getElementById('secondAddToCart').hidden       = true;
    updateProductsStorage();
});

document.getElementById('firstRemoveFromCart').addEventListener('click', (event) => {
    const index = products.indexOf(generatedProducts[0])
    products.splice(index, 1);
    document.getElementById('firstRemoveFromCart').hidden   = true;
    document.getElementById('firstAddToCart').hidden        = false;
    updateProductsStorage();
});

document.getElementById('secondRemoveFromCart').addEventListener('click', (event) => {
    const index = products.indexOf(generatedProducts[1]);
    products.splice(index, 1);
    document.getElementById('secondRemoveFromCart').hidden  = true;
    document.getElementById('secondAddToCart').hidden       = false;
    updateProductsStorage();
});

function updateProductsStorage(){
    var productsString = JSON.stringify(products);
    localStorage.setItem('products', productsString);
    document.getElementById('cartQuantityText').innerHTML = getQuantityOnCart();
}

function getRandomMoney(){
    return (Math.random() * 100).toFixed(2);
}

function getSubtotal(){
    var total = 0;

    for(var i=0; i < products.length; i++)
        total += products[i].quantity * products[i].value;

    return total.toFixed(2);
}
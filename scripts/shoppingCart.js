const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const searchButton      = document.getElementById('searchButton');
const searchInput       = document.getElementById('searchInput');
const itemListBlock     = document.getElementById('itemListBlock');
const cartListBlock     = document.getElementById('cartListBlock');

// creates an object to store the cart items
var cartItems = {
    name: urlParams.get('search'),
    first: {
        quantity: 0,
        value   : 50
    },
    second: {
        quantity: 0,
        value   : 8.73
    },
    getSubtotal: function(){
        return (this.first.quantity * this.first.value + this.second.quantity * this.second.value).toFixed(2);
    },
    getQuantityOnCart: function(){
        var itemsAdded = 0;

        if(urlParams.get('first') == 'true')
            itemsAdded++;

        if(urlParams.get('second') == 'true')
            itemsAdded++;

        return itemsAdded;
    }
}

// set the current screen values
function checkCurrentScreen() {
    const currentScreen = urlParams.get('screen');

    if(cartItems.name == ''){
        // if there is not search parameter, clear parameters and get back to the main page 
        window.location.href = window.location.pathname
        return;
    }

    if(currentScreen == null){
        checkEmptyScreen();
    } else if (currentScreen == 'itemListing'){
        checkListingScreen(currentScreen);
    } else if (currentScreen == 'cart'){
        checkCartScreen(currentScreen)
    }
}

checkCurrentScreen();

// when clicking on the search button
document.getElementById('searchButton').addEventListener('click', (event) => {
    urlParams.set('screen', 'itemListing');
    urlParams.set('search', searchInput.value.trim());
    refreshPageWithParameters();
});

function checkEmptyScreen(){
    itemListBlock.hidden = true;
    cartListBlock.hidden = true;
}

function checkListingScreen(){
    itemListBlock.hidden = false;
    cartListBlock.hidden = true;

    document.getElementById('firstItemName').innerHTML  = cartItems.name;
    document.getElementById('secondItemName').innerHTML = cartItems.name;

    document.getElementById('firstItemValue').innerHTML  = cartItems.first.value.toFixed(2);
    document.getElementById('secondItemValue').innerHTML = cartItems.second.value.toFixed(2);

    if(urlParams.get('first') == 'true'){
        document.getElementById('firstAddToCart').hidden     = true;
        document.getElementById('firstRemoveFromCart').hidden= false;
    }

    if(urlParams.get('second') == 'true'){
        document.getElementById('secondAddToCart').hidden     = true;
        document.getElementById('secondRemoveFromCart').hidden= false;
    }

    const itemsAdded = cartItems.getQuantityOnCart();
    
    if(itemsAdded > 0)
        cartQuantityText.innerHTML = "+ " + itemsAdded;
}

function checkCartScreen(){
    itemListBlock.hidden = true;
    cartListBlock.hidden = false;

    document.getElementById('firstItemNameCart').innerHTML  = cartItems.name;
    document.getElementById('secondItemNameCart').innerHTML = cartItems.name;

    if(urlParams.get('first') == 'true'){
        cartItems.first.quantity = 1;
        document.getElementById('firstItemCart').hidden             = false;
        document.getElementById('itemQuantityFirst').textContent    = cartItems.first.quantity;
        document.getElementById('firstItemValueCart').textContent   = cartItems.first.value;
    }

    if(urlParams.get('second') == 'true'){
        cartItems.second.quantity = 1;
        document.getElementById('secondItemCart').hidden            = false;
        document.getElementById('itemQuantitySecond').textContent   = cartItems.second.quantity;
        document.getElementById('secondItemValueCart').textContent  = cartItems.second.value;
    }

    document.getElementById('subtotal').textContent = cartItems.getSubtotal();
}


document.getElementById('firstAddToCart').addEventListener('click', (event) => {
    urlParams.set('first', 'true');
    refreshPageWithParameters();
});

document.getElementById('secondAddToCart').addEventListener('click', (event) => {
    urlParams.set('second', 'true');
    refreshPageWithParameters();
});

document.getElementById('firstRemoveFromCart').addEventListener('click', (event) => {
    urlParams.delete('first', 'true');
    refreshPageWithParameters();
});

document.getElementById('secondRemoveFromCart').addEventListener('click', (event) => {
    urlParams.delete('second', 'true');
    refreshPageWithParameters();
});

document.getElementById('cartButton').addEventListener('click', (event) => {
    urlParams.set('screen', 'cart');
    refreshPageWithParameters();
});

const dropdownFirst = document.getElementById('dropdownFirst');
var dropdownItems = dropdownFirst.querySelectorAll('.dropdown-item');
dropdownItems.forEach(function(item) {
    item.addEventListener('click', function(event) {
        event.preventDefault();

        cartItems.first.quantity = parseFloat(this.textContent);

        if(this.textContent == "0"){
            urlParams.delete('first');
            refreshPageWithParameters();
        }

        document.getElementById('itemQuantityFirst').textContent = cartItems.first.quantity;
        document.getElementById('subtotal').textContent = cartItems.getSubtotal();
    });
});

const dropdownSecond = document.getElementById('dropdownSecond');
var dropdownItems = dropdownSecond.querySelectorAll('.dropdown-item');
dropdownItems.forEach(function(item) {
    item.addEventListener('click', function(event) {
        event.preventDefault();

        cartItems.second.quantity = parseFloat(this.textContent);

        if(this.textContent == "0"){
            urlParams.delete('second');
            refreshPageWithParameters();
        }

        document.getElementById('itemQuantitySecond').textContent = cartItems.second.quantity;
        document.getElementById('subtotal').textContent = cartItems.getSubtotal();
    });
});


function refreshPageWithParameters(){
    window.location.href = window.location.pathname + "?" + urlParams.toString();
}
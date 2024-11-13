const rightClickButton = document.getElementById("rightClickButton");

rightClickButton.addEventListener('contextmenu', function(ev) {
    ev.preventDefault();
    rightClickButton.textContent = "The button was right clicked";
    rightClickButton.classList.remove('btn-outline-secondary');
    rightClickButton.classList.add('btn-outline-primary');

    return false;
}, false);

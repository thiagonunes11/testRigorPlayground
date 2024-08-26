function showPrompt() {
    var name;
    do {
        name = prompt("Please enter your name:");
    } while (!name);
    document.querySelector("#nameText").innerHTML = name;
    document.querySelector("#welcomeText").style.display = "block";
}

window.onload = function() {
    if (window.location.pathname.toLowerCase().includes("browserpromptonload")) {
        showPrompt();
    }
};

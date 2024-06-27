window.onload = function () {
    // const loginButton = document.querySelector("loginButton");
    var possibleNames = ["Login", "Log In", "Sign In", "Logon"];
    loginButton.textContent = possibleNames[Math.floor(Math.random() * possibleNames.length)];
    
    loginButton.onclick = function () {
        successAlert.hidden = false;
    }
}
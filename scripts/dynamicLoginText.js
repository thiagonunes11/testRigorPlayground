window.onload = function () {
    // const loginButton = document.querySelector("loginButton");
    var possibleNames = [
        "Log In",
        "Login",
        "Sign In",
        "Access Account",
        "Enter",
        "Log Into Your Account",
        "Sign Into Your Account",
        "Member Login",
        "User Access",
        "Account Entry",
        "Authenticate",
        "Join In",
        "User Login",
        "Account Login",
        "Sign On",
        "Access Portal",
        "Login Here",
        "Enter Account",
        "User Sign In",
        "Connect",
        "Begin Session",
        "Start Session",
        "Secure Login",
        "Customer Login",
        "Client Access",
        "Admin Login",
        "Employee Access",
        "Staff Login",
        "Manager Sign In",
        "Subscriber Access"
    ];

    loginButton.textContent = possibleNames[Math.floor(Math.random() * possibleNames.length)];
    
    loginButton.onclick = function () {
        successAlert.hidden = false;
    }
}
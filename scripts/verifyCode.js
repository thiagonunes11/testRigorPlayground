document.getElementById("verificationForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    
    var code = document.getElementById("code").value;

    
    if (code === "1234") {
        document.getElementById("result").innerHTML = "Valid Code";
    } else {
        document.getElementById("result").innerHTML = "Invalid Code. Try again";
    }
});


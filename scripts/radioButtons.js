var nextButton = document.getElementById("nextButton");
var methodButton = document.getElementById("methodButton");
methodButton.style.display = "none";

nextButton.onclick = function (){
    nextButton.style.display = "none";
    methodButton.style.display = "block";

    document.getElementsByName("flexRadioDefault").forEach(
        (element) => element.disabled = true
    );
}

document.getElementsByName("flexRadioDefault").forEach(
    (element) => element.onclick = function fun() {
        var methodLabel = element.parentElement.getElementsByTagName("label")[0];
        var paymentMethod = methodLabel.textContent;
        methodButton.textContent = "Paying with " + paymentMethod;
    }
);
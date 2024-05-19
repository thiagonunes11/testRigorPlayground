document.addEventListener("DOMContentLoaded", function() {
    function generateRandomCode() {
        return Math.floor(1000 + Math.random() * 9000);
    }

    var displayedCodeElement = document.getElementById("displayedCode");
    var generatedCode = generateRandomCode();
    displayedCodeElement.textContent = generatedCode;

    document.getElementById("verificationForm").addEventListener("submit", function(event) {
        event.preventDefault();

        var code = document.getElementById("code").value;

        if (code === generatedCode.toString()) {
            document.getElementById("resultValid").hidden = false;
            document.getElementById("resultInvalid").hidden = true;
        } else {
            document.getElementById("resultValid").hidden = true;
            document.getElementById("resultInvalid").hidden = false;
        }
    });
});
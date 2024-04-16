document.addEventListener("DOMContentLoaded", function() {
    // Função para gerar um código aleatório de 4 dígitos
    function generateRandomCode() {
        return Math.floor(1000 + Math.random() * 9000);
    }

    // Atualiza o código exibido no HTML
    var displayedCodeElement = document.getElementById("displayedCode");
    var generatedCode = generateRandomCode();
    displayedCodeElement.textContent = generatedCode;

    // Adiciona o evento de envio ao formulário
    document.getElementById("verificationForm").addEventListener("submit", function(event) {
        event.preventDefault(); 

        var code = document.getElementById("code").value;

        if (code === generatedCode.toString()) {
            document.getElementById("result").innerHTML = "Valid Code";
        } else {
            document.getElementById("result").innerHTML = "Invalid Code. Try again";
        }
    });
});
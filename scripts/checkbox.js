const showToast = (message, type) => {

    if (message){
        
        document.getElementById("toast-message").innerHTML = message;
    }

    if(type == "Error"){

        document.getElementById("testrigor-message-type").innerHTML = "Erro!";
        document.getElementById("testrigor-message-type").className = "me-auto text-danger";

    }else if (type == "Success"){
        document.getElementById("testrigor-message-type").innerHTML = "testrigor";
        document.getElementById("testrigor-message-type").className = "me-auto text-success";
    }else{
        document.getElementById("testrigor-message-type").innerHTML = "testrigor";
        document.getElementById("testrigor-message-type").className = "me-auto text-warning";
    }

    const toastEl = document.querySelector('.toast');

    const toast = new bootstrap.Toast(toastEl, {
      delay: 5000
    });

    toast.show();

};

function addTagCheckedOrUnchecked(element){
    if (element.checked == true){
        element.setAttribute("checked", "true");
    }else{
        element.setAttribute("checked", "false");
    }
}
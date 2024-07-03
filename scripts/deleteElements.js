window.onload = function () {
    addDeleteButtons();
    const input = document.querySelector("input");
    input.addEventListener("keyup", e => {
        if(e.key == "Enter"){
            const newLi     = document.createElement("li");
            const newSpan   = document.createElement("span");
            const newButton = document.createElement("button");

            newSpan.textContent = input.value;
            newButton.type      = "button";
            newButton.className = "btn-close";
            newButton.name      = "delete";
            
            newLi.appendChild(newSpan);
            newLi.appendChild(newButton);

            const list = document.querySelector("ol");
            list.appendChild(newLi);
            input.value = "";

            addDeleteButtons();
        }
    });
}



function addDeleteButtons(){
    let deleteButton = document.getElementsByName("delete");
    deleteButton.forEach(btn => {
        btn.onclick = function (){
            const list = document.querySelector("ol");

            const li = btn.parentElement;
        
            list.removeChild(li);
        }
    });
}

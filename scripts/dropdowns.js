var simpleDropdown = document.querySelector("body > main > div > div:nth-child(1) > div:nth-child(1)");
var simpleDropdownItems = simpleDropdown.querySelectorAll(".dropdown-item");
for(var i=0; i < simpleDropdownItems.length; i++) {
    simpleDropdownItems[i].addEventListener("click", function() {
        document.querySelector("#simpleDropdownValue").innerText = this.innerText;
    });
}

var splitDropdown = document.querySelector("body > main > div > div:nth-child(1) > div:nth-child(2)");
var spliDropdownItems = splitDropdown.querySelectorAll(".dropdown-item");
for(var i=0; i < spliDropdownItems.length; i++) {
    spliDropdownItems[i].addEventListener("click", function() {
        document.querySelector("#splitDropdownValue").innerText = this.innerText;
    });
}

var simpleSelect = document.querySelector("body > main > div > div:nth-child(1) > div:nth-child(3)").getElementsByTagName("select")[0];
simpleSelect.addEventListener("change", function() {
    document.querySelector("#simpleSelectValue").innerText = this.options[this.selectedIndex].innerText;
});

var simpleListSelect = document.querySelector("body > main > div > div:nth-child(1) > div:nth-child(4)").getElementsByTagName("select")[0];
simpleListSelect.addEventListener("change", function() {
    document.querySelector("#singleListSelectValue").innerText = this.options[this.selectedIndex].innerText;
});

var multipleListSelect = document.querySelector("body > main > div > div:nth-child(1) > div:nth-child(5)").getElementsByTagName("select")[0];
multipleListSelect.addEventListener("change", function() {
    var options = "";
    for(var i=0; i < this.selectedOptions.length; i++) {
        options += this.selectedOptions[i].innerText + ", ";
    }
    document.querySelector("#multipleListSelectValue").innerText = options;
});
var counter = 5;

function callTimeout(){
    document.getElementById("counter").innerHTML = counter;

    if(counter > 0){
        counter--;
        setTimeout(callTimeout, 1000);
    }
    else{
        document.getElementById("secretMessage").hidden = false;
    }
}

callTimeout();
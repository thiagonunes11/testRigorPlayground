var counter = 0;

document.getElementById('button').addEventListener('click', function() {
    counter++;
    document.getElementById('counter').textContent = counter;
});

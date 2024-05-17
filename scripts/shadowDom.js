const firstButton = document.querySelector("body > main > div:nth-child(2) > div > button")
firstButton.addEventListener('click', () => {
    firstButton.textContent = 'First button';
});

const host  = document.getElementById('shadowDom')
const shadow= host.attachShadow({mode: 'open'});

const first_paragraph = document.createElement('p');
first_paragraph.textContent = 'And this text is present inside a shadow DOM created with javascript.';
shadow.appendChild(first_paragraph);

const second_paragraph = document.createElement('p');
second_paragraph.textContent = 'The page CSS also does not work here.';
shadow.appendChild(second_paragraph);

const button = document.createElement('button');
button.textContent = 'No CSS here either';
shadow.appendChild(button);

button.addEventListener('click', () => {
    button.textContent = 'Third button';
});
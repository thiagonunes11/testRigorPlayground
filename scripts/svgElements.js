document.getElementById('closeButton').addEventListener('click', function() {
    const cardBody = document.querySelector('.tab-container');
    cardBody.innerHTML = `
        <div id="buttonClicked" class="center">
            <svg aria-label="testrigor logo" width="200" height="200">
                <image href="../assets/logo.png" x="25" y="25" height="150px" width="150px"/>
            </svg>
            <svg aria-label="number one automation tool" height="50" width="150" xmlns="http://www.w3.org/2000/svg">
                <text x="30" y="30" fill="none" stroke="red" font-family="Roboto" font-size="12">#1 Automation Tool</text>
            </svg>
            <button id="rightArrowButton" class="btn btn-primary">
                <svg aria-label="right arrow" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                    <path d="M8 5l7 7-7 7" stroke="#white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <button id="leftArrowButton" class="btn btn-primary" style="display: none;">
                <svg aria-label="left arrow" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                    <path d="M16 19l-7-7 7-7" stroke="#white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    `;

    document.getElementById('rightArrowButton').addEventListener('click', function() {
        const textSvg = cardBody.querySelector('svg:nth-of-type(2) text');
        textSvg.textContent = 'testRigor';
        this.style.display = 'none';
        document.getElementById('leftArrowButton').style.display = 'inline-block';
    });

    document.getElementById('leftArrowButton').addEventListener('click', function() {
        const textSvg = cardBody.querySelector('svg:nth-of-type(2) text');
        textSvg.textContent = '#1 Automation Tool';
        this.style.display = 'none';
        document.getElementById('rightArrowButton').style.display = 'inline-block';
    });
});
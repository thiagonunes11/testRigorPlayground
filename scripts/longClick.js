let start, end, diff;
let clickTime = 1000;
const div = document.querySelector('button');
const clicktimeDisplay = document.getElementById('clicktime');

const longClick = new CustomEvent('longclick');
const settingsTime = document.getElementById("timeSett");
settingsTime.addEventListener("change", e => {
    clickTime = settingsTime.value * 1000;
});

document.body.addEventListener('longclick', function () {
    clicktimeDisplay.innerHTML = diff / 1000 + 's<br>Long click';
    clicktimeDisplay.style.color = '#00E676';
});

div.addEventListener('mousedown', function () {
    start = Date.now();

    div.addEventListener('mouseup', function () {
        end = Date.now();
        diff = end - start + 1;

        if (diff >= clickTime) {
            document.body.dispatchEvent(longClick);
        } else {
            clicktimeDisplay.innerHTML = diff / 1000 + 's<br>Not long click';
            clicktimeDisplay.style.color = '#F44336';
        }
    });
});


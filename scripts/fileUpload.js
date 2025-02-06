const inputFileMultiple     = document.getElementById('inputFileMultiple');
const inputFileSingle      = document.getElementById('inputFileSingle');
const inputDirectoryMultiple= document.getElementById('inputDirectoryMultiple');
const fileTypeSelect       = document.getElementById('fileTypeSelect');

function updateAcceptedFileTypes(fileType) {
    inputFileSingle.setAttribute('accept', fileType);
    inputFileMultiple.setAttribute('accept', fileType);
}

fileTypeSelect.addEventListener('change', (event) => {
    updateAcceptedFileTypes(event.target.value);
});

inputFileSingle.addEventListener('change', (event) => {
    checkInputFile(event, 'inputFileSingleAlert');
});

inputFileMultiple.addEventListener('change', (event) => {
    checkInputFile(event, 'inputFileMultipleAlert');
});

inputDirectoryMultiple.addEventListener('change', (event) => {
    checkInputFile(event, 'inputDirectoryMultipleAlert');
});

function checkInputFile(event, alertObjectName){
    const alertObject = document.getElementById(alertObjectName);

    if(event.target.files.length === 0) {
        alertObject.hidden = true;
        return;
    }

    const files = event.target.files;

    if(event.target.files.length > 1)
        alertObject.textContent = "File names: ";
    else
        alertObject.textContent = "File name: ";

    for (let i = 0; i < files.length - 1; i++) {
        const fileName = '"' + files[i].name + '"';
        alertObject.textContent += fileName + ', ';
    }

    alertObject.textContent += '"' + files[files.length - 1].name + '".';

    alertObject.hidden = false;
}
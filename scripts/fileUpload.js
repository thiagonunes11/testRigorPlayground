const inputFileMultiple     = document.getElementById('inputFileMultiple');
const inputFileSingle      = document.getElementById('inputFileSingle');
const inputDirectoryMultiple= document.getElementById('inputDirectoryMultiple');
const fileTypeSelect       = document.getElementById('fileTypeSelect');

function updateAcceptedFileTypes(fileType) {
    inputFileSingle.setAttribute('accept', fileType);
    inputFileMultiple.setAttribute('accept', fileType);
}

function isFileTypeValid(file, acceptedTypes) {
    if (!acceptedTypes) return true;
    
    const acceptedExtensions = acceptedTypes.split(',').map(type => type.toLowerCase());
    const fileName = file.name.toLowerCase();
    return acceptedExtensions.some(ext => fileName.endsWith(ext));
}

function showError(alertObject, message) {
    alertObject.textContent = message;
    alertObject.classList.remove('alert-light');
    alertObject.classList.add('alert-danger');
    alertObject.hidden = false;
}

function showSuccess(alertObject, message) {
    alertObject.textContent = message;
    alertObject.classList.remove('alert-danger');
    alertObject.classList.add('alert-light');
    alertObject.hidden = false;
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

function checkInputFile(event, alertObjectName) {
    const alertObject = document.getElementById(alertObjectName);
    const files = event.target.files;
    const selectedFileType = fileTypeSelect.value;

    if(files.length === 0) {
        alertObject.hidden = true;
        return;
    }

    const invalidFiles = Array.from(files).filter(file => !isFileTypeValid(file, selectedFileType));

    if (invalidFiles.length > 0) {
        const fileType = (fileTypeSelect.options[fileTypeSelect.selectedIndex].text.split(' ')[0]);
        if (invalidFiles.length === 1) {
            showError(alertObject, `Error: "${invalidFiles[0].name}" is not a valid ${fileType} file.`);
        } else {
            showError(alertObject, `Error: ${invalidFiles.length} files are not valid ${fileType} files.`);
        }
        event.target.value = '';
        return;
    }

    let message = files.length > 1 ? "File names: " : "File name: ";
    
    for (let i = 0; i < files.length - 1; i++) {
        message += `"${files[i].name}", `;
    }
    message += `"${files[files.length - 1].name}".`;

    showSuccess(alertObject, message);
}
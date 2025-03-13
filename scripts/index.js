function buildRightColumnDemos(title, blockId, name, description, url, buttonText){
    var div = document.createElement('div');
    div.innerHTML = `
        <div id="${blockId}" class="row">
            <div class="col m-2">
                <div class="card">
                    <h5 class="card-header">${title}</h5>
                    <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">${description}</p>
                    <a href="${url}" class="btn btn-primary">${buttonText}</a>
                    </div>
                </div>
            </div>
        </div>`;
    return div;
}

function buildLeftColumnDemos(title, blockId){
    var div = document.createElement('div');
    div.innerHTML = `
        <div class="row m-2">
            <a class="btn btn-primary" href="#${blockId}">${title}</a>
        </div>`;
    return div;
}

function buildDemoBlocks(){
    var leftColumnDemos = document.getElementById("leftColumnDemos")
    var rightColumnDemos = document.getElementById("rightColumnDemos")

    demos.forEach(demo => {
        var demoId = demo.title.replace(/\s/g, '');
        var leftColumnDemo = buildLeftColumnDemos(demo.title, demoId)
        var demoBlock = buildRightColumnDemos(demo.title, demoId, demo.name, demo.description, demo.url, demo.buttonText)
        
        leftColumnDemos.appendChild(leftColumnDemo);
        rightColumnDemos.appendChild(demoBlock);
    })
}


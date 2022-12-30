const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

const project = urlParams.get('project');
const pageBody = document.getElementsByClassName("body")[0];

fetch('./json/projects.json')
    .then(response => response.json())
    .then(json => loadProject(json))


function loadProject(json) {
    let projectJson = json[project];
    createNewSection();
    let sections = document.getElementsByClassName("page-section");
    addInitialContent(sections[0], projectJson);

    for(let i = 0; i < projectJson.sections.length; i++) {
        createNewSection();
    }
}

function createNewSection() {
    let div = createElement("div");
    div.className = "page-section";
    pageBody.appendChild(div);
}

function addInitialContent(section, projectJson) {
    let img = createElement("img");
    img.src = projectJson["image"];
    img.className = "promo-image";
    section.appendChild(img);

    let h1 = createElement("h1");
    h1.innerHTML = projectJson["name"];
    section.appendChild(h1);
}

function createElement(type) {
    let element = document.createElement(type);
    return element;
}
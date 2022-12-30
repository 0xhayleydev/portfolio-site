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

    pageBody.appendChild(addInitialContent(projectJson));

    let projectSections = projectJson["sections"];
    for(let i = 0; i < projectSections.length; i++) {
        let section = addContent(projectSections[i]);
        pageBody.appendChild(section);
    }
}

function addContent(sectionJson) {
    let section = createNewSection();
    let subsection = createNewSection();
    subsection.className = "section-container";
    subsection.appendChild(getHeading(sectionJson));
    subsection.appendChild(getImage(sectionJson));
    subsection.appendChild(getDescription(sectionJson));
    section.appendChild(subsection);
    return section;
}

function getHeading(sectionJson) {
    let h1 = createElement("h1");
    h1.className = "project-heading";
    h1.innerHTML = sectionJson["heading"];
    return h1;
}

function getImage(sectionJson) {
    let img = createElement("img");
    img.className = "project-image";
    img.src = sectionJson["image"];
    return img;
}

function getDescription(sectionJson) {
    let p = createElement("p");
    p.className = "section-description"
    p.innerHTML = sectionJson["description"];
    return p;
}

function createNewSection() {
    let div = createElement("div");
    div.className = "page-section";
    return div;
}

function addInitialContent(projectJson) {
    let section = createNewSection();
    
    let img = createElement("img");
    img.src = projectJson["image"];
    img.className = "promo-image";
    section.appendChild(img);

    let h1 = createElement("h1");
    h1.innerHTML = projectJson["name"];
    section.appendChild(h1);
    
    section.appendChild(getIcons(projectJson))
    return section;
}



function getIcons(projectJson) {
    let icons = projectJson["icons"];

    let div = createElement('div')
    div.classList.add('social-links')
    for(let icon = 0; icon < icons.length; icon++) {
        let i = createElement('i');
        i.classList.add(icons[icon]);
        div.appendChild(i);
    }
    return div;
}

function createElement(type) {
    let element = document.createElement(type);
    return element;
}
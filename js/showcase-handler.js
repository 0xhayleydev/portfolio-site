fetch('./json/showcases.json')
    .then(response => response.json())
    .then(json => loadAllShowcases(json));

function loadAllShowcases(json) {
    let showcases = json["active-showcases"];
    for(let i = 0; i < showcases.length; i++) {
        let showcaseId = showcases[i];
        loadShowcase(json[showcaseId], showcaseId);
    }
}

function loadShowcase(showcase, showcaseId) {
    let showcaseElement = getShowcase(showcaseId);
    let largeImage = getLargeImage(showcaseId);

    for(let i = 0; i < showcase.length; i++) {
        let elementId = `${showcaseId}-${i}`;
        let media = showcase[i];
        let mediaElement = handleMedia(media, elementId, showcaseId, largeImage);
        if (mediaElement != null) {
            showcaseElement.appendChild(mediaElement);
        }
    }

    let initialId = `${showcaseId}-${0}`;
    let initialDescription = showcase[0]["description"];
    focusImage(initialId, showcaseId, largeImage, initialDescription)
}

function getLargeImage(showcaseId) {
    return document.getElementById(`${showcaseId}-large`);
}

function getShowcase(showcaseId) {
    return document.getElementById(`${showcaseId}-showcase`);
}

function handleMedia(media, elementId, showcaseId, largeImage) {
    let mediaElement = null;

    if (media["type"] == "img") {
        mediaElement = handleImage(media, elementId, showcaseId, largeImage);
    } else if (media["type"] == "video") {
        mediaElement = handleVideo(media, elementId, showcaseId, largeImage);
    }

    return mediaElement;
}

function handleImage(image, elementId, showcaseId, largeImage) {
    let container = createContainerElement();
    let mediaElement = createMediaElement(elementId);
    let description = image["description"];

    mediaElement.src = image["url"];
    mediaElement.onclick = function() { focusImage(elementId, showcaseId, largeImage, description) };

    container.appendChild(mediaElement);
    return container;
}

function handleVideo(video, elementId, showcaseId, largeImage) {
    let container = createContainerElement();
    let description = video["description"];

    elementId = video["url"];
    container.onclick = function() { focusVideo(elementId, showcaseId, largeImage, description) };

    container.innerHTML = `
            <i class="fa-solid fa-circle fa-stack-lg stack-bottom"></i>
            <i class="fa-solid fa-circle-play fa-stack-lg stack-top"></i>`;
    
    let mediaElement = createMediaElement(elementId);
    mediaElement.src = `https://img.youtube.com/vi/${elementId}/0.jpg`;
    container.appendChild(mediaElement);

    return container;
}

function createContainerElement() {
    let base = document.createElement("span");
    base.className = "image-thumbnail";
    return base;
}

function createMediaElement(elementId) {
    let element = document.createElement("img");

    element.id = elementId;

    return element;
}

function updateBorders(showcaseId, imageElement) {
    let parentElement = document.getElementById(`${showcaseId}-showcase`);
    parentElement.childNodes.forEach(child => {
        if (child.tagName == "SPAN") {
            let item = child.lastChild;
            if (item.id != imageElement.id) {
                item.classList.remove("selected");
            }
        }
    });

    imageElement.classList.add("selected");
}

function focusImage(elementId, showcaseId, largeImage, description) {
    let highlightedImageId = largeImage.childNodes[0].id;

    if (highlightedImageId == elementId) {
        return;
    }
    
    let imageElement = document.getElementById(elementId);

    largeImage.innerHTML = "";
    
    highlightedImageId = elementId;

    largeImage.appendChild(imageElement.cloneNode(true));
    
    let textElement = addDescription(description);
    largeImage.appendChild(textElement);

    updateBorders(showcaseId, imageElement);
}

function focusVideo(elementId, showcaseId, largeImage, description) {
    let highlightedImageId = largeImage.childNodes[0].id;

    if (highlightedImageId == elementId) {
        return;
    }
    
    let imageElement = document.getElementById(elementId);

    highlightedImageId = elementId;

    let iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${elementId}`;
    iframe.title = "YouTube video player";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;

    largeImage.innerHTML = '';
    largeImage.appendChild(iframe);
    
    let textElement = addDescription(description);
    largeImage.appendChild(textElement);

    updateBorders(showcaseId, imageElement);
}

function addDescription(description) {
    let descriptionElement = document.createElement("p");
    descriptionElement.innerHTML = description;
    return descriptionElement;
}
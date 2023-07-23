const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

const project = urlParams.get("id");
const pageBody = document.getElementsByClassName("body")[0];
const title = document.getElementsByTagName("title")[0];

fetch("./json/projects.json")
	.then((response) => response.json())
	.then((json) => loadProject(json));

function loadProject(json) {
	let projectJson = json[project];

	if (projectJson == null) {
		projectJson = json["blank-project"];
	}

	pageBody.appendChild(addInitialContent(projectJson));

	let projectSections = projectJson["sections"];
	for (let i = 0; i < projectSections.length; i++) {
		let section = addContent(projectSections[i]);
		pageBody.appendChild(section);
	}
}

function addContent(sectionJson) {
	let section = createNewSection();
	let subsection = createNewSection();
	subsection.className = "section-container";

	// get section heading
	let heading = getHeading(sectionJson);
	if (heading != null) {
		subsection.appendChild(heading);
	}

	// get section image
	let image = getImage(sectionJson);
	if (image != null) {
		subsection.appendChild(image);
	}

	let video = getVideo(sectionJson);
	if (video != null) {
		subsection.appendChild(video);
	}

	// get section description
	let description = getDescription(sectionJson);
	if (description != null) {
		subsection.appendChild(description);
	}

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
	if (sectionJson["image"] == "" || sectionJson["image"] == "") {
		return null;
	}
	let img = createElement("img");
	img.className = "project-media";
	img.src = sectionJson["image"];
	return img;
}

function getVideo(sectionJson) {
	if (sectionJson["video"] == null || sectionJson["video"] == "") {
		console.log("There is no video");
		return null;
	}
	let iframe = createElement("iframe");
	iframe.src = sectionJson["video"];
	iframe.classList = "project-media";
	return iframe;
}

function getDescription(sectionJson) {
	let p = createElement("p");
	p.className = "project-description";
	p.innerHTML = sectionJson["description"];
	return p;
}

function createNewSection() {
	let div = createElement("div");
	div.className = "page-section";
	return div;
}

function addInitialContent(projectJson) {
	title.innerHTML = projectJson["name"] + " - hayleydavi.es";

	let section = createNewSection();
	let subsection = createNewSection();
	subsection.className = "section-container";

	let h1 = createElement("h1");
	h1.innerHTML = projectJson["name"];

	subsection.appendChild(h1);

	let img = createElement("img");
	img.src = projectJson["image"];
	img.className = "project-media";
	subsection.appendChild(img);

	subsection.appendChild(getIcons(projectJson));

	let p = createElement("p");
	p.innerHTML = projectJson["description"];
	subsection.appendChild(p);

	let buttons = createDownloadButtons(projectJson);
	if (buttons != null) {
		subsection.appendChild(buttons);
	}

	section.appendChild(subsection);
	return section;
}

function createDownloadButtons(projectJson) {
	if (projectJson["URL"] == "" && projectJson["SourceURL"] == "") {
		return null;
	}

	let div = createElement("div");
	div.classList.add("project-url-container");

	if (projectJson["URL"] != "") {
		let download = createElement("a");
		download.href = projectJson["URL"];
		download.innerHTML = "<h2>Download Now</h2>";
		download.classList.add("project-url");
		div.appendChild(download);
	}

	if (projectJson["SourceURL"] != "") {
		let source = createElement("a");
		source.href = projectJson["SourceURL"];
		source.innerHTML = "<h2>View Source</h2>";
		source.classList.add("project-url");
		div.appendChild(source);
	}

	return div;
}

function getIcons(projectJson) {
	let icons = projectJson["icons"];

	let div = createElement("div");
	div.classList.add("social-links");
	for (let icon = 0; icon < icons.length; icon++) {
		let i = createElement("i");
		i.classList.add(icons[icon]);
		div.appendChild(i);
	}
	return div;
}

function createElement(type) {
	console.log(type);
	let element = document.createElement(type);
	return element;
}

if (window.history.length <= 1) {
	console.log(window.history.length);
	let back = document.getElementsByClassName("back-button")[0];

	back.classList = "back-button hidden";
}

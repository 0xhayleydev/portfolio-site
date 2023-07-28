fetch("./json/projects.json")
	.then((response) => response.json())
	.then((json) => parseJson(json));

var order;

async function parseJson(json) {
	parseProjects("games", json);
	parseProjects("projects", json);
}

function parseProjects(name, json) {
	order = json[name + "-order"];

	let element = document.getElementById(name + "-showcase");
	element.innerHTML = "";

	for (let i = 0; i < order.length; i++) {
		let id = order[i];
		element.appendChild(showProject(json, id));
	}
}

function showProject(json, id) {
	let project = json[id];
	if (project == null) {
		id = "blank-project";
		project = json[id];
	}
	let container = createElement("a");
	container.href = getURL(json, id);
	container.classList.add("three-promo-card");
	let imageAndTitle = createElement("div");
	imageAndTitle.appendChild(getImage(project));
	imageAndTitle.appendChild(getName(project));
	container.appendChild(imageAndTitle);
	let descriptionAndIcons = createElement("div");
	descriptionAndIcons.appendChild(getDescription(project));
	descriptionAndIcons.appendChild(getIcons(project));
	container.appendChild(descriptionAndIcons);
	return container;
}

function getName(json) {
	let h2 = createElement("h2");
	h2.innerHTML = json["name"];
	return h2;
}

function getImage(json) {
	let img = createElement("img");
	img.src = json["image"];
	img.classList.add("square-image");
	img.classList.add("border");
	return img;
}

function getDescription(json) {
	let p = createElement("p");
	p.innerHTML = json["summary"];
	return p;
}

function getIcons(json) {
	let div = createElement("div");
	div.classList.add("social-links");
	let icons = json["icons"];
	for (let icon = 0; icon < icons.length; icon++) {
		let i = createElement("i");
		i.classList.add(icons[icon]);
		div.appendChild(i);
	}
	return div;
}

function getURL(json, id) {
	return "./project.html?id=" + id;
}

function createElement(type) {
	let element = document.createElement(type);
	return element;
}

fetch('/data/projects.json')
    .then((reponse) => reponse.json())
    .then((json) => jsonParse(json));

function jsonParse(data) {
    let experiences = data['experiences'];
    for (let i = 0; i < experiences.length; i++) {
        let experience = createExperienceContainer(experiences[i]);
        document.getElementById('experience').append(experience);
    }

    let projects = data['projects'];
    for (let i = 0; i < projects.length; i++) {
        let project = createProjectContainer(projects[i]);
        document.getElementById('projects').append(project);
    }
}

function createExperienceContainer(experience_data) {
    let a = createLink(experience_data['link']);

    let container = createContainer(experience_data);
    a.appendChild(container);

    let date_range = createDateRange(experience_data);
    container.appendChild(date_range);

    let img = createIconImage(experience_data);
    date_range.appendChild(img);

    let project_details = createProjectDetails(experience_data);
    container.appendChild(project_details);

    return a;
}

function createProjectContainer(project_data) {
    let a = createLink(project_data['link']);
    
    let img = createBannerImage(project_data);
    a.appendChild(img);

    let container = createContainer(project_data);
    a.appendChild(container);

    let project_details = createProjectDetails(project_data);
    container.appendChild(project_details);

    return a;
}

function createLink(url) {
    let a = document.createElement('a');
    a.href = url;

    a.classList.add('project-link')
    return a;
}

function createContainer(project_data) {
    let div = document.createElement('div');
    div.classList.add('project-container');

    return div;
}

function createDateRange(project_data) {
    let p = document.createElement('p');
    p.classList.add('no-margin');
    p.innerHTML = project_data['date_range'];
    
    let div = document.createElement('div');
    div.classList.add('project-date');
    div.appendChild(p);

    return div;
}

function createIconImage(project_data) {
    let img = document.createElement('img');
    img.src = project_data['image'];
    img.classList.add('icon-image');

    return img;
}

function createBannerImage(project_data) {
    let img = document.createElement('img');
    img.src = project_data['image'];
    img.classList.add('banner-image');

    return img;
}

function createProjectDetails(project_data) {
    let container = document.createElement('div');
    container.classList.add('project-details');

    let title = document.createElement('h2');
    title.classList.add('no-margin');
    title.innerHTML = project_data['title'];

    if (project_data['url'] != "") {
        let i = document.createElement('i');
        i.classList.add('fa-solid');
        i.classList.add('fa-arrow-up-right-from-square');
        title.appendChild(i)
    }

    let description = document.createElement('p');
    description.innerHTML = project_data['description'];

    container.appendChild(title);
    container.appendChild(description);

    let technologies = createTechnologiesContainer(project_data['technologies']);
    container.appendChild(technologies);

    return container;
}

function createTechnologiesContainer(technologies) {
    let container = document.createElement('ul');
    container.classList.add('technologies-preview');

    for (let i = 0; i < technologies.length; i++) {
        let item = document.createElement('div');
        item.classList.add('technology-pill');
        item.innerHTML = technologies[i];

        container.appendChild(item);
    }

    return container;
}
projectTypes = ["personal-project", "college-project", "university-project"];

for (i = 0; i < projectTypes.length; i++) {
    window.addEventListener('load', function () {
        for (j = 0; j < projectTypes.length; j++) {
            filterProjects(projectTypes[j]);
        }
    });
}

function filterProjects(type) {
    items = document.getElementsByClassName(type);
    console.log(type + ": " + items.length);
    display = document.getElementById(type).checked ? "initial" : "none";
    for(i = 0; i < items.length; i++) {
        items[i].style.display = display;
    }
}
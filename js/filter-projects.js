projectTypes = ["personal-project", "college-project", "university-project"];

for (i = 0; i < projectTypes.length; i++) {
    window.addEventListener('load', function () {
        hideFilters();
        for (j = 0; j < projectTypes.length; j++) {
            toggleClassVisibility(projectTypes[j]);
        }
    });
}

function toggleClassVisibility(type) {
    items = document.getElementsByClassName(type);
    console.log(type + ": " + items.length);
    display = document.getElementById(type).checked ? "block" : "none";
    for(i = 0; i < items.length; i++) {
        items[i].style.display = display;
    }
}

function toggleFilters() {
    items = document.getElementsByClassName("project-filters");
    document.getElementById("show-filters").style.display = document.getElementById("show-filters").style.display == "block" ? "none" : "block";
    document.getElementById("hide-filters").style.display = document.getElementById("hide-filters").style.display == "block" ? "none" : "block";
    for(i = 0; i < items.length; i++) {
        display = items[i].style.display == "block" ? "none" : "block";
        items[i].style.display = display;
    }
}

function hideFilters() {
    items = document.getElementsByClassName("project-filters");
    for(i = 0; i < items.length; i++) {
        items[i].style.display = "none";
    }
    document.getElementById("show-filters").style.display = "block";
    document.getElementById("hide-filters").style.display = "none";
}
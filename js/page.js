const listOfTransitionElementClasses = [
    "section-split"
];

for (let elementClass of listOfTransitionElementClasses) {
    let pageSections = document.getElementsByClassName(elementClass);

    for (let element of pageSections) {
        element.classList.remove(elementClass + "-transition");

        // Create the observer, same as before:
        let observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    element.classList.add(elementClass + "-transition");
                    return;
                }
            });
        });

        observer.observe(element);
    }
}

function togglePanel(callerID, id) {
    var contentToToggle = document.getElementById(id);
    var callerText = document.getElementById(callerID);

    if (contentToToggle.classList.contains("promo-panel-hidden")) {
        contentToToggle.classList.remove("promo-panel-hidden");
        callerText.textContent = "Show Less";
    } else {
        contentToToggle.classList.add("promo-panel-hidden");
        callerText.textContent = "Show More";
    }
}
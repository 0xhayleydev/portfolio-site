const listOfTransitionElementClasses = [
    "section-split"
];


for (let elementClass of listOfTransitionElementClasses) {
    const pageSections = document.getElementsByClassName(elementClass);

    for (let element of pageSections) {
        element.classList.remove(elementClass + "-transition");

        // Create the observer, same as before:
        let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            element.classList.add(elementClass + "-transition");
            return;
            }

            element.classList.remove(elementClass + "-transition");
        });
        });

        observer.observe(element);
    }
}
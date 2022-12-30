var scrollPrompt = document.getElementsByClassName("scroll-prompt");

function hideScroll() {
    console.log("SCROLLING");
    if (window.scrollY > 50) {
        scrollPrompt[0].className = "scroll-prompt hide";
        window.removeEventListener("scroll", hideScroll);
    }
}

window.addEventListener("scroll", hideScroll);
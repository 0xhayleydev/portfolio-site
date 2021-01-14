fetch("/loads/header.html")
.then(response => {
    if (response.status != 200) {
        return "Whoops. The header couldn't be loaded!"
    }
    return response.text()
})
.then(data => {
    var pageName = "page-" + location.href.split("/").slice(-1)[0].replace(".html", "");
    data = data.replace('<a class="site-navigation menu-link" id="' + pageName,
    '<a class="site-navigation menu-link current" id="' + pageName);

    document.getElementById("header").innerHTML = data;
});
fetch("/loads/footer.html")
.then(response => {
    if (response.status != 200) {
        return "Whoops. The footer couldn't be loaded!"
    }
    return response.text()
})
.then(data => {
    document.getElementById("footer").innerHTML = data;
});
window.scrollTo(0, 0);
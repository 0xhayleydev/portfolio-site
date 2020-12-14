fetch("loads/header.html")
.then(response => {
    if (response.status != 200) {
        return "Whoops. The header couldn't be loaded!"
    }
    return response.text()
})
.then(data => {
    document.getElementById("header").innerHTML = data;
});
fetch("loads/footer.html")
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
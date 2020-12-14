fetch("https://hayleydavi.es/header.html")
.then(response => {
    return response.text()
})
.then(data => {
    document.getElementById("header").innerHTML = data;
});
fetch("https://hayleydavi.es/footer.html")
.then(response => {
    return response.text()
})
.then(data => {
    document.getElementById("footer").innerHTML = data;
});
window.scrollTo(0, 0);
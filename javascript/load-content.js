fetch("https://hayleydavi.es/header.html")
.then(response => {
    return response.text()
})
.then(data => {
    document.getElementById("header").innerHTML = data;
});
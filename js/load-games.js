fetch('./json/games.json')
    .then(response => response.json())
    .then(json => parseGames(json))

var order;

async function parseGames(json) {
    order = json["games-order"];
    let games = json["games"];

    let element = document.getElementById("game-showcase");
    element.innerHTML = "";

    for (let i = 0; i < order.length; i++) {
        let id = order[i];
        element.appendChild(createImage(games[id]))
    }
}

function createImage(json) {
    let img = document.createElement('img');
    img.id = ""
    img.src = json["project-image"];
    return img;
}
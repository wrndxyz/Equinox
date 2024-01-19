document.getElementById("search").addEventListener("input", e => {
    var searchValue = e.target.value.toLowerCase();

    // Continue with filtering games
    var games = document.querySelectorAll(".game, .featured-game"); // Include both classes
    games.forEach(game => {
        var gameTitle = game.querySelector("h2").textContent.toLowerCase();
        if (gameTitle.includes(searchValue)) {
            game.style.display = "";
        } else {
            game.style.display = "none";
        }
    });
});

document.querySelectorAll(".game, .featured-game").forEach(button => { // Include both classes
    button.addEventListener("click", function () {
        const url = this.getAttribute("data-href");
        go(url);
        document.getElementById("search").placeholder = url;

    });
});
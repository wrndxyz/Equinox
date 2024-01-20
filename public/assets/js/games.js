var initialFeaturedOrder = Array.from(document.querySelectorAll("#featured .game-container"));
var initialRecentOrder = Array.from(document.querySelectorAll("#recent .game-container"));

document.getElementById("search").addEventListener("input", e => {
    var searchValue = e.target.value.toLowerCase();

    var gamesContainer = document.querySelector(".games");
    var gameContainers = Array.from(document.querySelectorAll(".game-container"));

    gameContainers.forEach(gameContainer => {
        var game = gameContainer.querySelector(".game, .featured-game");
        var title = game.querySelector("h2").textContent.toLowerCase();

        if (!searchValue) {
            // when search empty
            var id = gameContainer.id;
            var targetContainerId = id === "f" ? "featured" : (id === "r" ? "recent" : "");

            if (targetContainerId) {
                var targetContainer = document.getElementById(targetContainerId);

                if (targetContainer) {
                    var initialOrder;

                    if (id === "f") {
                        initialOrder = initialFeaturedOrder;
                    } else if (id === "r") {
                        initialOrder = initialRecentOrder;
                    }
                    // find OG pos
                    var originalIndex = initialOrder.indexOf(gameContainer);

                    // OG position
                    if (originalIndex !== -1) {
                        var referenceNode = targetContainer.children[originalIndex];
                        targetContainer.insertBefore(gameContainer, referenceNode);
                    } else {
                        // ins at end
                        targetContainer.appendChild(gameContainer);
                    }
                }
            }
        } else if (title.includes(searchValue)) {
            // while search
            gamesContainer.insertBefore(gameContainer, gamesContainer.firstChild);
        }
    });

    // reset to OG categories
    var promoImg = document.querySelector(".promo-img");
    if (promoImg) {
        if (gamesContainer.id === "featured") {
            promoImg.src = searchValue ? "/assets/eqsearch.png" : "/assets/eqfeatured.png";
        } else if (gamesContainer.id === "recent") {
            promoImg.src = searchValue ? "/assets/eqsearch.png" : "/assets/eqrecent.png";
        }
    }

    // show recent // reset back to OG
    var recentTxt = document.getElementById("recent-txt");
    if (recentTxt) {
        recentTxt.style.display = searchValue ? "none" : "flex";
    }
});

document.querySelectorAll(".game-container").forEach(button => {
    button.addEventListener("click", function () {
        const url = this.getAttribute("data-href");
        go(url);
        document.getElementById("search").placeholder = url;
    });
});
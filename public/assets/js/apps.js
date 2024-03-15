fetch('apps.json')
    .then(response => response.json())
    .then(data => {

        function createGameElement(game, idPrefix) {
            const container = document.createElement('div');
            container.classList.add('game-container');
            container.dataset.href = game.url;

            const gameDiv = document.createElement('div');
            gameDiv.classList.add('game');

            const img = document.createElement('img');
            img.src = game.image;

            const h2 = document.createElement('h2');
            h2.textContent = game.name;

            gameDiv.appendChild(img);
            gameDiv.appendChild(h2);
            container.appendChild(gameDiv);

            container.addEventListener('click', () => {
                if (game.longLoad) {
                    var result = window.confirm('This app may take a minute to load. Do you want to continue?');
                }
                if (game.longLoad && result) {
                    showLoadingScreen(game.name, game.image); 
                    setTimeout(() => {
                        hideLoadingScreen();
                        const iframe = document.getElementById('ifr');
                        iframe.src = container.dataset.href;
                        const url = container.dataset.href;
                        go(url);
                        document.getElementById("search").placeholder = url;
                    }, 2000); 
                } else if (!game.longLoad) {
                    showLoadingScreen(game.name, game.image); 
                    setTimeout(() => {
                        hideLoadingScreen();
                        const iframe = document.getElementById('ifr');
                        iframe.src = container.dataset.href;
                        const url = container.dataset.href;
                        go(url);
                        document.getElementById("search").placeholder = url;
                    }, 2000); 
                }
            });

            container.id = idPrefix + container.id; 
            return container;
        }

        const featuredGamesContainer = document.getElementById('featured');
        data.featured.forEach((game, index) => {
            const gameElement = createGameElement(game, 'f');
            featuredGamesContainer.appendChild(gameElement);
        });

        const recentGamesContainer = document.getElementById('recent');
        data.recent.forEach((game, index) => {
            const gameElement = createGameElement(game, 'r');
            recentGamesContainer.appendChild(gameElement);
        });

        function showLoadingScreen(title, imageUrl) {
            var loadingScreen = document.getElementById('loadingScreen');
            var loadingTitle = loadingScreen.querySelector('.loading-text');
            var loadingImage = loadingScreen.querySelector('.loading-image');
            var loadingProgress = loadingScreen.querySelector('.loading-progress');

            loadingTitle.textContent = `Loading ${title}...`;
            loadingImage.src = imageUrl;
            loadingProgress.value = 0; 

            loadingScreen.style.display = 'flex';
            loadingScreen.classList.add('fade-in');

            var progress = 0;
            var interval = setInterval(() => {
                progress += Math.random() * 10;
                if (progress > 100) {
                    progress = 100;
                    clearInterval(interval);
                }
                loadingProgress.value = progress;
            }, 200); 
        }

        function hideLoadingScreen() {
            const loadingScreen = document.querySelector('.loading-screen');
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
            }
        }

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

                            var originalIndex = initialOrder.indexOf(gameContainer);

                            if (originalIndex !== -1) {
                                var referenceNode = targetContainer.children[originalIndex];
                                targetContainer.insertBefore(gameContainer, referenceNode);
                            } else {
                                targetContainer.appendChild(gameContainer);
                            }
                        }
                    }
                } else if (title.includes(searchValue)) {

                    gamesContainer.insertBefore(gameContainer, gamesContainer.firstChild);
                }
            });

            var promoImg = document.querySelector(".promo-img");
            if (promoImg) {
                if (gamesContainer.id === "featured") {
                    promoImg.src = searchValue ? "/assets/eqsearch.png" : "/assets/eqfeatured.png";
                } else if (gamesContainer.id === "recent") {
                    promoImg.src = searchValue ? "/assets/eqsearch.png" : "/assets/eqrecent.png";
                }
            }

            var recentTxt = document.getElementById("recent-txt");
            if (recentTxt) {
                recentTxt.style.display = searchValue ? "none" : "flex";
            }
        });
    })
    .catch(error => console.error('Error fetching games data:', error));
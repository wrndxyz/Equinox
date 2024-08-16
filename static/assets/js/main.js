async function registerSW() {
    const workerURL = "/sw.js";
    const worker = await navigator.serviceWorker.getRegistration(workerURL, { scope: "/edu" });
    return worker || navigator.serviceWorker.register(workerURL, { scope: __uv$config.prefix });
}

registerSW();

document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const searchInput = document.getElementById("search").value;
    go(searchInput);
});

async function redirectToGames() {
    const gamesUrl = "https://hydragames.cc/x";
    proxy(gamesUrl);
}

function reloadIfr() {
    document.getElementById('ifr').contentWindow.location.reload();

}

function zoom() {
    if (window.innerWidth < 1920) {
        document.body.style.zoom = "80%";
    } else {
        document.body.style.zoom = "100%";
    }
}

zoom();

window.onresize = zoom;

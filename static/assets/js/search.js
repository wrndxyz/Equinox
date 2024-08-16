const msg = document.getElementById("m");
const frame = document.getElementById("ifr");
const loadingScreen = document.getElementById("loadingScreen");

function searchurl(url) {
    switch (localStorage.getItem("equinox||search")) {
        case "ddg":
            proxy(`https://duckduckgo.com/?q=${url}`);
            break;
        case "brave":
            proxy(`https://search.brave.com/search?q=${url}`);
            break;
        case "yahoo":
            proxy(`https://search.yahoo.com/search?p=${url}`);
            break;
        default:
        case "google":
            proxy(`https://www.google.com/search?q=${url}`);
            break;
    }
}

function go(url) {
    if (!isUrl(url)) searchurl(url); else {
        if (!(url.startsWith("https://") || url.startsWith("http://"))) url = "http://" + url;
        proxy(url);
    }
}

function isUrl(val = "") {
    return /^http(s?):\/\//.test(val) || (val.includes(".") && val.trim().length > 0);
}

function resolveURL(url) {
    switch (localStorage.getItem("equinox||proxy")) {
        case "dy":
            return "/study/" + Ultraviolet.codec.xor.decode(url);
        default:
        case "uv":
            return __uv$config.prefix + __uv$config.encodeUrl(url);
    }
}

function proxy(url) {
    registerSW().then(worker => {
        if (!worker) {
            msg.innerHTML = "Error: Your browser does not support service workers or is blocking them (private browsing mode?), try using a different browser";
            return;
        }

        window.location.replace(resolveURL(url));
    });
}
const msg = document.getElementById("m");
const frame = document.getElementById("ifr");

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
		if (!(url.startsWith("https://") || url.startsWith("http://"))) url = "http://" + url
		proxy(url)
	}
}

function isUrl(val = "") {
	if (/^http(s?):\/\//.test(val) || val.includes(".") && val.substr(0, 1) !== " ") return true;
	return false;
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
	document.getElementById("align").style.display = "flex";
	document.querySelector(".topbar").style.width = "98%";
	document.getElementById("exit").style.display = "flex";
	document.getElementById("homebtn").style.display = "none";
	registerSW().then(worker => {
		if (!worker) {
			return msg.innerHTML = "Error: Your browser does not support service workers or is blocking them (private browsing mode?), try using a different browser";
		}
		frame.src = resolveURL(url);
	});
}

function exit() {
	document.getElementById("align").style.display = "none";
	document.getElementById("search").placeholder = "What's on your mind?";
	document.querySelector(".topbar").style.width = "50%";
	document.querySelector(".search").value = "";
	frame.src = "";
	document.getElementById("exit").style.display = "none";
	document.getElementById("homebtn").style.display = "flex";
}

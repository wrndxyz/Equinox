async function registerSW() {
	await navigator.serviceWorker.register("/dy.sw.js", {
		scope: "/study",
	});
	const workerURL = "/sw.js";
	const worker = await navigator.serviceWorker.getRegistration(workerURL, {
		scope: "/edu",
	});
	if (worker) return worker;
	return navigator.serviceWorker.register(workerURL, { scope: __uv$config.prefix });
}


function encodeUVUrlWithPath(url = "") {
	return __uv$config.prefix + __uv$config.encodeUrl(url);
}

function abc() {
	let inFrame;

	try {
		inFrame = window !== top;
	} catch (e) {
		inFrame = true;
	}

	if (inFrame) return;
	const popup = window.open();
	if (!popup || popup.closed) {
		alert("Auto tab mask failed to open a new tab, allow popups and reload");
		return;
	}

	popup.document.body.innerHTML = `<title>${localStorage.getItem("name") || "Sign in to your account"}</title>
<link rel="icon" href="${localStorage.getItem("icon") || "https://www.microsoft.com/favicon.ico"}">
<iframe style="height:100%; width: 100%; border: none; position: fixed; top: 0; right: 0; left: 0; bottom: 0; border: none" sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation" src="${window.location.href}"></iframe>`;

	window.location.replace("https://www.google.com/");
}

registerSW();

function timeFunction() {
	var currentTime = new Date();


	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	var seconds = currentTime.getSeconds();

	var ampm = hours >= 12 ? "PM" : "AM";

	hours = (hours % 12) || 12;
	
	hours = (hours < 10 ? "0" : "") + hours;
	minutes = (minutes < 10 ? "0" : "") + minutes;
	seconds = (seconds < 10 ? "0" : "") + seconds;

	document.getElementById("time").innerHTML = hours + ":" + minutes + ":" + seconds + ampm ;
}

setInterval(timeFunction, 1000);

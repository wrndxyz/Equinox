function updateSettings() {
    const cloakSelect = document.getElementById('cloak');
    const selectedCloak = cloakSelect.value;
    localStorage.setItem('equinox||cloak', selectedCloak);

    const engineSelect = document.getElementById('engine');
    const selectedEngine = engineSelect.value;
    localStorage.setItem('equinox||search', selectedEngine);

    cloakPage(selectedCloak);
}

// cloak
function cloakPage(selectedCloak) {
    document.body.classList.remove('cloak-google', 'cloak-googledrive', 'cloak-docs', 'cloak-classroom');
    if (selectedCloak !== 'none') {
        document.body.classList.add('cloak-' + selectedCloak);
        const titleFormatted = selectedCloak.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        document.title = titleFormatted;

        const faviconPath = `/assets/img/cloak/${selectedCloak}.png`;
        const favicon = document.querySelector('link[rel="icon"]');
        if (favicon) {
            favicon.setAttribute('href', faviconPath);
        }
    } else {
        document.title = "Equinox V1";

        const defaultFaviconPath = '/assets/favicon.ico';
        const defaultFavicon = document.querySelector('link[rel="icon"]');
        if (defaultFavicon) {
            defaultFavicon.setAttribute('href', defaultFaviconPath);
        }
    }
}


// set values on load

const storedCloak = localStorage.getItem('equinox||cloak') || 'none';
document.getElementById('cloak').value = storedCloak;
cloakPage(storedCloak);


const storedEngine = localStorage.getItem('equinox||search') || 'google';
document.getElementById('engine').value = storedEngine;

document.getElementById('cloak').addEventListener('change', updateSettings);
document.getElementById('engine').addEventListener('change', updateSettings);
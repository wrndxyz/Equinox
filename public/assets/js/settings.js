function updateSettings() {
    const cloakSelect = document.getElementById('cloak');
    const selectedCloak = cloakSelect.value;
    localStorage.setItem('equinox||cloak', selectedCloak);

    const themeSelect = document.getElementById('themes');
    const selectedTheme = themeSelect.value;
    localStorage.setItem('equinox||theme', selectedTheme);

    const engineSelect = document.getElementById('engine');
    const selectedEngine = engineSelect.value;
    localStorage.setItem('equinox||search', selectedEngine);

    cloakPage(selectedCloak);
    setTheme(selectedTheme);
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

function setTheme(selectedTheme) {
    const body = document.body;
    body.classList.remove('theme-gradient', 'background-image');

    if (selectedTheme === 'ff') {
        body.classList.add('theme-gradient');
        body.style.background = 'linear-gradient(to right, #ff7e5f, #feb47b)';
    } else if (selectedTheme === 'flashbang') {

        // topbar
        const topbar = document.querySelector('.topbar');
        topbar.style.backgroundColor = 'rgb(26 25 25 / 92%)';
    } else if (selectedTheme === 'ocean') {

        // topbar
        const topbar = document.querySelector('.topbar');
        topbar.style.backgroundColor = 'rgba(40, 37, 69, 0.92)';


    } else if (selectedTheme === 'default') {
        console.log('default theme')
    }
}

function updateSettings() {
    const cloakSelect = document.getElementById('cloak');
    const selectedCloak = cloakSelect.value;
    localStorage.setItem('equinox||cloak', selectedCloak);

    const themeSelect = document.getElementById('themes');
    const selectedTheme = themeSelect.value;
    localStorage.setItem('equinox||theme', selectedTheme);

    const engineSelect = document.getElementById('engine');
    const selectedEngine = engineSelect.value;
    localStorage.setItem('equinox||search', selectedEngine);

    cloakPage(selectedCloak);
    setTheme(selectedTheme);
}







// set values on load
document.addEventListener('DOMContentLoaded', function() {
    const storedCloak = localStorage.getItem('equinox||cloak') || 'none';
    document.getElementById('cloak').value = storedCloak;
    cloakPage(storedCloak);

    const storedEngine = localStorage.getItem('equinox||search') || 'google';
    document.getElementById('engine').value = storedEngine;

    const storedTheme = localStorage.getItem('equinox||theme') || 'default';
    document.getElementById('themes').value = storedTheme;
    setTheme(storedTheme);
});

// Add event listener for theme change
document.getElementById('themes').addEventListener('change', updateSettings);
document.getElementById('cloak').addEventListener('change', updateSettings);
document.getElementById('engine').addEventListener('change', updateSettings);
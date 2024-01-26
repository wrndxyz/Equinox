// Function to update tab cloaking and search engine based on localStorage
function updateSettingsFromLocalStorage() {
    const storedCloak = localStorage.getItem('equinox||cloak') || 'none';
    cloakPage(storedCloak);

    const storedEngine = localStorage.getItem('equinox||search') || 'google';
    // Do something with storedEngine if needed
}

// Function to cloak the page based on the selected option
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

// Call the function to set values based on local storage
updateSettingsFromLocalStorage();
window.addEventListener('DOMContentLoaded', (event) => {
    updateSettingsFromLocalStorage();
});

function updateSettingsFromLocalStorage() {
    const storedCloak = localStorage.getItem('equinox||cloak') || 'none';
    cloakPage(storedCloak);

    const storedTheme = localStorage.getItem('equinox||theme') || 'default';
    setTheme(storedTheme);
}

function cloakPage(selectedCloak) {
    const tabIcons = {
        'google': '/assets/img/cloak/google.webp',
        'docs': '/assets/img/cloak/google-docs.webp',
        'drive': '/assets/img/cloak/google-drive.webp',
        'classroom': '/assets/img/cloak/home.webp',
        'chrome': '/assets/img/cloak/chrome.webp',
    };

    const tabTitles = {
        'google': 'Google',
        'docs': 'Google Docs',
        'drive': 'Google Drive',
        'classroom': 'Google Classroom',
        'chrome': 'Google Chrome',
    };

    document.body.classList.remove('cloak-google', 'cloak-googledrive', 'cloak-docs', 'cloak-classroom', 'cloak-chrome');
    if (selectedCloak !== 'none') {
        document.body.classList.add('cloak-' + selectedCloak);
        document.title = tabTitles[selectedCloak];

        // Change tab icon
        const tabIcon = tabIcons[selectedCloak];
        if (tabIcon) {
            const existingFavicon = document.querySelector('link[rel="icon"]');
            if (existingFavicon) {
                existingFavicon.remove(); // Remove existing favicon
            }
            const newFavicon = document.createElement('link');
            newFavicon.rel = 'icon';
            newFavicon.href = tabIcon;
            document.head.appendChild(newFavicon);
        }

        // Save selected cloak to local storage
        localStorage.setItem('equinox||cloak', selectedCloak);
    } else {
        document.title = "Equinox V1";

        // Reset favicon to default
        const defaultFaviconPath = '/assets/favicon.ico';
        const existingFavicon = document.querySelector('link[rel="icon"]');
        if (existingFavicon) {
            existingFavicon.remove(); // Remove existing favicon
        }
        const defaultFavicon = document.createElement('link');
        defaultFavicon.rel = 'icon';
        defaultFavicon.href = defaultFaviconPath;
        document.head.appendChild(defaultFavicon);

        // Remove cloak from storage
        localStorage.removeItem('equinox||cloak');
    }
}

function setTheme(selectedTheme) {
    const body = document.body;
    body.className = '';
    body.classList.add('background-image');
    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center';

    const customBackground = localStorage.getItem('equinox||background');
   
    if (customBackground) {
        body.style.backgroundImage = `url(${customBackground})`;
    } else {
        switch (selectedTheme) {
            case 'ff':
                body.classList.add('theme-gradient');
                body.style.background = 'linear-gradient(to right, #ff7e5f, #feb47b)';
                break;
            case 'flashbang':
                body.style.backgroundImage = 'url("./assets/img/bg/flashbang.webp")';
                break;
            case 'ocean':
                body.style.backgroundImage = 'url("./assets/img/bg/ocean.webp")';
                break;
            case 'kongrats':
                body.style.backgroundImage = 'url("./assets/img/bg/kongrats.webp")';
                break;
            default:
                body.style.backgroundImage = 'url("./assets/img/bg/default.webp")';
        }
    }

    const topbar = document.querySelector('.topbar');

    switch (selectedTheme) {
        case 'flashbang':
            topbar.style.backgroundColor = 'rgb(26 25 25 / 92%)';
            setLogoAndSubtitle('./assets/img/logos/eqblack.webp', '#000');
            break;
        case 'ocean':
            topbar.style.backgroundColor = 'rgba(40, 37, 69, 0.92)';
            setLogoAndSubtitle('./assets/img/logos/eqblue.webp', '#bfbfbf');
            break;
        case 'kongrats':
            topbar.style.backgroundColor = 'rgb(20 20 20 / 92%)';
            setLogoAndSubtitle('./assets/img/logos/eqblack.webp', '#fff');
            break;
        default:
            setLogoAndSubtitle('./assets/img/logos/eqwhite.webp', '#797979');
    }
}
function setLogoAndSubtitle(logoSrc, subtitleColor) {
    const spinningChangeIcon = document.getElementById('spinning');
    spinningChangeIcon.src = logoSrc;

    const creationInfo = document.querySelector('#creation-info');
    creationInfo.style.color = subtitleColor;
}
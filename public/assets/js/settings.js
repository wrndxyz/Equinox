
// cloak
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
        const titleFormatted = selectedCloak.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        document.title = titleFormatted;

        const faviconPath = `/assets/img/cloak/${selectedCloak}.png`;
        const favicon = document.querySelector('link[rel="icon"]');
        if (favicon) {
            favicon.setAttribute('href', faviconPath);
        }

        // Change tab icon
        const tabIcon = tabIcons[selectedCloak];
        if (tabIcon) {
            const tabIconLink = document.querySelector('link[rel="icon"]');
            if (tabIconLink) {
                tabIconLink.setAttribute('href', tabIcon);
            }
        }

        // Change tab title
        const tabTitle = tabTitles[selectedCloak];
        if (tabTitle) {
            document.title = tabTitle;
        }

        // Save selected cloak to local storage
        localStorage.setItem('equinox||cloak', selectedCloak);
    } else {
        document.title = "Equinox V1";

        const defaultFaviconPath = '/assets/favicon.ico';
        const defaultFavicon = document.querySelector('link[rel="icon"]');
        if (defaultFavicon) {
            defaultFavicon.setAttribute('href', defaultFaviconPath);
        }
    }
}

updateBuildNumber();

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

function updateSettingsFromLocalStorage() {
    const storedEngine = localStorage.getItem('equinox||search') || 'google';
    document.getElementById('engine').value = storedEngine;

    const storedProxy = localStorage.getItem('equinox||proxy') || 'uv';
    document.getElementById('proxy').value = storedProxy;

    const storedTheme = localStorage.getItem('equinox||theme') || 'default';
    document.getElementById('themes').value = storedTheme;
    setTheme(storedTheme);

    const storedCustomBG = localStorage.getItem('equinox||background') || '';
    document.getElementById('custom-background').value = storedCustomBG;

    const storedCloak = localStorage.getItem('equinox||cloak') || 'none';
    document.getElementById('cloaks').value = storedCloak;
    cloakPage(storedCloak);
}

// set values on load
document.addEventListener('DOMContentLoaded', function() {

    const storedEngine = localStorage.getItem('equinox||search') || 'google';
    document.getElementById('engine').value = storedEngine;

    const storedProxy = localStorage.getItem('equinox||proxy') || 'uv';
    document.getElementById('proxy').value = storedProxy;

    const storedTheme = localStorage.getItem('equinox||theme') || 'default';
    document.getElementById('themes').value = storedTheme;
    setTheme(storedTheme);

    const storedCustomBG = localStorage.getItem('equinox||background') || '';
    document.getElementById('custom-background').value = storedCustomBG;

    const storedCloak = localStorage.getItem('equinox||cloak') || 'none';
    cloakPage(storedCloak)

});

function updateSettings() {

    const themeSelect = document.getElementById('themes');
    const selectedTheme = themeSelect.value;
    localStorage.setItem('equinox||theme', selectedTheme);

    const engineSelect = document.getElementById('engine');
    const selectedEngine = engineSelect.value;
    localStorage.setItem('equinox||search', selectedEngine);

    setTheme(selectedTheme);
}

// Add event listener for theme change
document.getElementById('themes').addEventListener('change', updateSettings);
document.getElementById('engine').addEventListener('change', updateSettings);
document.getElementById('proxy').addEventListener('change', updateSettings);

document.getElementById('set-background').addEventListener('click', function() {
    const backgroundInput = document.getElementById('custom-background');
    const statusText = document.getElementById('error');
    const customBackground = backgroundInput.value;
    localStorage.setItem('equinox||background', customBackground);
    statusText.style.color = 'green';
    statusText.innerText = 'Set the background successfully.';
});

document.getElementById('remove-background').addEventListener('click', function() {
    const backgroundInput = document.getElementById('custom-background');
    const statusText = document.getElementById('error');
    backgroundInput.value = '';
    localStorage.removeItem('equinox||background');
    statusText.style.color = 'red';
    statusText.innerText = 'Removed the custom background.';
});

function updateBuildNumber() {
    fetch('https://api.github.com/repos/wrndxyz/equinox/commits')
        .then(response => response.json())
        .then(data => {
            const buildNumber = data.length; // Use the total number of commits as the build number
            document.getElementById('buildnumber').innerText = buildNumber;

            if (data.length > 0) {
                const lastCommitDate = new Date(data[0].commit.author.date);
                const formattedDate = lastCommitDate.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
                document.getElementById('update-on').innerText = formattedDate;
            }
        })
        .catch(error => {
            console.error('Error fetching build number:', error);
        });
}

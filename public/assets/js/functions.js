// Function to update tab cloaking and search engine based on localStorage
function updateSettingsFromLocalStorage() {
    const storedCloak = localStorage.getItem('equinox||cloak') || 'none';
    cloakPage(storedCloak);

    const storedEngine = localStorage.getItem('equinox||search') || 'google';
    // Do something with storedEngine if needed

    const storedTheme = localStorage.getItem('equinox||theme') || 'default';
    setTheme(storedTheme);

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

function setTheme(selectedTheme) {
    const body = document.body;
    body.classList.remove('theme-gradient', 'background-image');

    if (selectedTheme === 'ff') {
        body.classList.add('theme-gradient');
        body.style.background = 'linear-gradient(to right, #ff7e5f, #feb47b)';
    } else if (selectedTheme === 'flashbang') {
        body.classList.add('background-image');
        body.style.backgroundImage = 'url("https://external-preview.redd.it/N5WQrRHPksnPMZds0Cz-0qyvE03rm1fdXWr6K-1UtUg.jpg?auto=webp&s=f2979287327931d5a5aebdd09d052cf4ad2cfc29")';
        body.style.backgroundSize = 'cover';
        body.style.backgroundPosition = 'center';

        // topbar
        const topbar = document.querySelector('.topbar');
        topbar.style.backgroundColor = 'rgb(26 25 25 / 92%)';

        // icon color
        const spinningChangeIcon = document.getElementById('spinning');
        spinningChangeIcon.src = 'https://raw.githubusercontent.com/wrndxyz/cdn/main/assets/eqblack.png';


        // subtitle
        const creationInfo = document.querySelector('#creation-info');
        creationInfo.style.color = '#000';
    } else if (selectedTheme === 'ocean') {
        body.classList.add('background-image');
        body.style.backgroundImage = 'url("https://raw.githubusercontent.com/wrndxyz/cdn/main/assets/3b117b6c107c9dd2eb9c12a148c49728.webp")';
        body.style.backgroundSize = 'cover';
        body.style.backgroundPosition = 'center';

        // topbar
        const topbar = document.querySelector('.topbar');
        topbar.style.backgroundColor = 'rgba(40, 37, 69, 0.92)';

        // icon color
        const spinningChangeIcon = document.getElementById('spinning');
        spinningChangeIcon.src = 'https://raw.githubusercontent.com/wrndxyz/cdn/main/assets/eqblue.png';


        // subtitle
        const creationInfo = document.querySelector('#creation-info');
        creationInfo.style.color = '#bfbfbf';

    } else if (selectedTheme === 'kongrats') {
        body.classList.add('background-image');
        body.style.backgroundImage = 'url("https://media.discordapp.net/attachments/963975944048091136/1200658280641478696/IMG_0063.jpg?ex=65e2aaa9&is=65d035a9&hm=a559c4331630e570867979a0568f4801ddfcd875d15483fcdca7064c4270133c&=&format=webp")';
        body.style.backgroundSize = 'cover';
        body.style.backgroundPosition = 'center';

        // topbar
        const topbar = document.querySelector('.topbar');
        topbar.style.backgroundColor = 'rgb(20 20 20 / 92%)';

        // icon color
        const spinningChangeIcon = document.getElementById('spinning');
        spinningChangeIcon.src = 'https://raw.githubusercontent.com/wrndxyz/cdn/main/assets/eqblack.png';


        // subtitle
        const creationInfo = document.querySelector('#creation-info');
        creationInfo.style.color = '#fff';

    } else if (selectedTheme === 'default') {
        body.classList.add('background-image');
        body.style.backgroundImage = 'url("https://cdn.wrnd.lat/assets/bg.png")';
        body.style.backgroundSize = 'cover';
        body.style.backgroundPosition = 'center';

        // icon color
        const spinningChangeIcon = document.getElementById('spinning');
        spinningChangeIcon.src = 'https://raw.githubusercontent.com/wrndxyz/cdn/main/assets/nc_1.png';

        // topbar
        const topbar = document.querySelector('.topbar');
        topbar.style.backgroundColor = 'rgb(10 10 10 / 92%)';

        // subtitle
        const creationInfo = document.querySelector('#creation-info');
        creationInfo.style.color = '#797979';
    }
}




// Call the function to set values based on local storage
updateSettingsFromLocalStorage();
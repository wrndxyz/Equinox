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
        spinningChangeIcon.src = 'https://media.discordapp.net/attachments/1165659118581854371/1208267673570381884/eqblack.png?ex=65e2a9f5&is=65d034f5&hm=039b64bb5779c7ad687989360c0fa6e854c7fe13df95c89ea9110be8634b47fa&=&format=webp&quality=lossless';


        // subtitle
        const creationInfo = document.querySelector('#creation-info');
        creationInfo.style.color = '#000';
    } else if (selectedTheme === 'ocean') {
        body.classList.add('background-image');
        body.style.backgroundImage = 'url("https://images-ext-1.discordapp.net/external/DYixD3mLnP-sOkEY_B0L6KyyIsWFVspenTtm_X9beeM/https/i.pinimg.com/originals/3b/11/7b/3b117b6c107c9dd2eb9c12a148c49728.jpg?format=webp&width=1262&height=702")';
        body.style.backgroundSize = 'cover';
        body.style.backgroundPosition = 'center';

        // topbar
        const topbar = document.querySelector('.topbar');
        topbar.style.backgroundColor = 'rgba(40, 37, 69, 0.92)';

        // icon color
        const spinningChangeIcon = document.getElementById('spinning');
        spinningChangeIcon.src = 'https://media.discordapp.net/attachments/1165659118581854371/1208260548861632582/eqblue.png?ex=65e2a353&is=65d02e53&hm=87c08320ac419c6849ebd9202c677155008b18b067fb6304bc6814d38b75dc4a&=&format=webp&quality=lossless';


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
        spinningChangeIcon.src = 'https://media.discordapp.net/attachments/1165659118581854371/1208262742864302121/nc_1.png?ex=65e2a55e&is=65d0305e&hm=90f11483dc64c67b5e542bc17094c5804cbf6f0e21b4f0110efdfa552121e457&=&format=webp&quality=lossless';


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
        spinningChangeIcon.src = 'https://media.discordapp.net/attachments/1165659118581854371/1208262742864302121/nc_1.png?ex=65e2a55e&is=65d0305e&hm=90f11483dc64c67b5e542bc17094c5804cbf6f0e21b4f0110efdfa552121e457&=&format=webp&quality=lossless';

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
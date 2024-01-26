const trigCount = 3;
let escapePressCount = 0;

document.body.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && ++escapePressCount === trigCount) {
        console.log('[SECURITY] Redirecting..');
        window.location.replace('/');
    } else if (event.key !== "Escape") {
        escapePressCount = 0;
    }
});
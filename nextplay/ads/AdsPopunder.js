document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("click", function () {
        triggerPopunder();
    }, { once: true }); // Ensures it runs only once per page load
});

function triggerPopunder() {
    openPopunder("https://raptripeessentially.com/a7mm18sw6?key=79442492f5fe436b0bc2484d9d0a8660");
}

function openPopunder(url) {
    const urls = [
        url,
        "https://preoccupyray.com/wi0ysdhc?key=255bd01e810de84ae6fd6404001fb5e3",
    ];

    urls.forEach(adUrl => {
        let popunder = window.open(adUrl, "_blank", "width=100,height=100,left=0,top=0");
        if (popunder) {
            popunder.blur();
        }
    });

    window.focus(); // Refocus the original window
}
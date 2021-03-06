butInstall = document.getElementById("add-button");
divInstall = document.getElementById("install");

function RegisterServiceWorker() {
    if (!navigator.serviceWorker.controller) {
        navigator.serviceWorker.register("sw.js").then(function(reg) {
            console.log("Service worker has been registered for scope: " + reg.scope);
        });
    }
}

window.addEventListener('beforeinstallprompt', (event) => {
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Remove the 'hidden' class from the install button container
    divInstall.hidden = false;
});

butInstall.addEventListener('click', async() => {
    if (!promptEvent) {
        // The deferred prompt isn't available.
        divInstall.hidden = true;
        alert("Can't install. Your browser probably doesn't support Progressive Web Apps.");

        return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    divInstall.hidden = false;
});

window.addEventListener('appinstalled', (event) => {
    // Clear the deferredPrompt so it can be garbage collected
    window.deferredPrompt = null;
});


function ShowHideInstallButton() {
    //show hide button on start?
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        // The deferred prompt isn't available.
        divInstall.hidden = true;
    } else {
        divInstall.hidden = false;
    }
}
window.onload = function () {

    const getSetting = () => new Promise(res => chrome.storage.local.get('disabled', (s) => res(s.disabled)));
    const getCandycane = () => new Promise(res => chrome.storage.local.get('candycane', (s) => res(s.candycane)));

    const setIcon = (disabled) => chrome.action.setIcon({
    path: disabled ? "icon-disabled.png" : "icon.png"
    });

    getSetting().then(disabled => document.getElementById('toggle_enabled').checked = !disabled);
    getCandycane().then(enabled => document.getElementById('toggle_candycane').checked = enabled);

    document.getElementById('toggle_enabled').onclick = function () {
        getSetting().then(disabled => {
            const toggled = !disabled;
            chrome.storage.local.set({ 'disabled': toggled });
            setIcon(toggled);
        })
    };

    document.getElementById('toggle_candycane').onclick = function () {
        getCandycane().then(disabled => {
            chrome.storage.local.set({ 'candycane': !disabled });
        })
    };

}
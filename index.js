window.onload = function () {

    const getDisabled = () => new Promise(res => chrome.storage.local.get('disabled', (s) => res(s.disabled)));
    const getStyle = () => new Promise(res => chrome.storage.local.get('style', (s) => res(s.style)));

    const setIcon = (disabled) => chrome.action.setIcon({
        path: disabled ? "icon-disabled.png" : "icon.png"
    });

    const setDropdown = (id, value) => {    
        let element = document.getElementById(id);
        element.value = value;
    }

    const setToggle = (id, value) => {   
        let element = document.getElementById(id);
        element.checked = value
    }

    getDisabled().then(disabled => setToggle('toggle_enabled',!disabled));
    getStyle().then(value => setDropdown("select_style",value));

    document.getElementById('toggle_enabled').onclick = function () {
        getSetting().then(disabled => {
            chrome.storage.local.set({ 'disabled': !disabled });
            setIcon(!disabled);
        })
    };

    document.getElementById('select_style').onchange = function (e) {
        chrome.storage.local.set({ 'style': e.target.value });
    };

}
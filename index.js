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

    getDisabled().then(disabled => {
        if (disabled == null) {
            disabled = false
            chrome.storage.local.set({ 'disabled': disabled });
        }
        setToggle('toggle_enabled',!disabled)
    });
    getStyle().then(value => {
        if (value == null) {
            value = 'vertical_bands'
            chrome.storage.local.set({ 'style': value });
        }
        setDropdown('select_style',value)
    });

    const manifest_data = chrome.runtime.getManifest();
    document.getElementById('version').innerHTML=`V${manifest_data.version}`

    document.getElementById('toggle_enabled').onclick = function () {
        getDisabled().then(disabled => {
            chrome.storage.local.set({ 'disabled': !disabled });
            setIcon(!disabled);
        })
    };

    document.getElementById('select_style').onchange = function (e) {
        chrome.storage.local.set({ 'style': e.target.value });
    };

}
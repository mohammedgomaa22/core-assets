(function() {
    const _0x_init_core = async () => {
        const _0x_domain = window.location.hostname;
        const _0x_msg_1 = "\\u0627\\u0646\\u062a\\u0647\\u0649\\u0020\\u0627\\u0644\\u0627\\u0634\\u062a\\u0631\\u0627\\u0643";
        const _0x_msg_2 = "\\u0628\\u0631\\u062c\\u0627\\u0621\\u0020\\u0627\\u0644\\u062a\\u0648\\u0627\\u0635\\u0644\\u003a\\u0020";
        const _0x_phone = "\\u0032\\u0030\\u0031\\u0030\\u0032\\u0036\\u0030\\u0035\\u0033\\u0039\\u0035\\u0036";

        try {
            const _0x_req = await fetch('https://ugbbrrdwpwjotsfeqais.supabase.co/functions/v1/check-site-status?site=' + encodeURIComponent(_0x_domain));
            const _0x_res = await _0x_req.json();
            
            if (_0x_res.status !== 'active') {
                document.body.classList.add('v-sync-active'); 
                
                const _0x_style = document.createElement('style');
                _0x_style.innerHTML = `
                    .v-sync-active { overflow: hidden !important; }
                    .v-sync-active > * { display: none !important; }
                    .v-sync-active::before {
                        content: '🚫 ' '${_0x_msg_1}';
                        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                        background: #ffffff; display: flex; align-items: center; justify-content: center;
                        z-index: 2147483647; font-family: sans-serif; font-size: 28px; font-weight: bold; color: #d32f2f;
                    }
                    .v-sync-active::after {
                        content: '${_0x_msg_2}' '${_0x_phone}';
                        position: fixed; top: 58%; left: 0; width: 100%; text-align: center;
                        z-index: 2147483647; font-family: sans-serif; font-size: 18px; color: #555; direction: ltr;
                    }
                `;
                document.head.appendChild(_0x_style);
            }
        } catch (e) {
        }
    };
    _0x_init_core();
})();
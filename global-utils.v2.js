(function() {
    const _init = async () => {
        const domain = window.location.hostname;
        try {
            const req = await fetch('https://ugbbrrdwpwjotsfeqais.supabase.co/functions/v1/check-site-status?site=' + encodeURIComponent(domain));
            
            // إذا كان الرابط خطأ (404) أو السيرفر وقع، لا تفعل شيئاً واترك الموقع يعمل
            if (!req.ok) return;

            const res = await req.json();
            
            // القفل يحدث فقط إذا كان الرد الرسمي هو "expired"
            if (res && res.status === 'expired') {
                showLock();
            }
        } catch (e) {}
    };

    function showLock() {
        document.body.classList.add('v-sync-active');
        const style = document.createElement('style');
        style.innerHTML = `
            .v-sync-active { overflow: hidden !important; }
            .v-sync-active > * { display: none !important; }
            .v-sync-active::before {
                content: '🚫 ' '\\0627\\0646\\062a\\0647\\0649\\0020\\0627\\0644\\0627\\0634\\062a\\0631\\0627\\0643';
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: #ffffff; display: flex; align-items: center; justify-content: center;
                z-index: 2147483647; font-family: sans-serif; font-size: 28px; font-weight: bold; color: #d32f2f;
            }
            .v-sync-active::after {
                content: '\\0628\\0631\\062c\\0627\\0621\\0020\\0627\\0644\\062a\\0648\\0627\\0635\\0644\\003a\\0020' ' 201026053956';
                position: fixed; top: 58%; left: 0; width: 100%; text-align: center;
                z-index: 2147483647; font-family: sans-serif; font-size: 18px; color: #555;
            }
        `;
        document.head.appendChild(style);
    }

    _init();
})();
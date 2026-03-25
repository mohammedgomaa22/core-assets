(function() {
    const _init = async () => {
        const domain = window.location.hostname;
        try {
            // بنبعت الدومين لـ Supabase
            const req = await fetch('https://ugbbrrdwpwjotsfeqais.supabase.co/functions/v1/check-site-status?site=' + encodeURIComponent(domain));
            
            // لو السيرفر ماردش بـ 200 (زي الـ 404 اللي كانت بتظهر)، اخرج فوراً والموقع يفتح عادي
            if (!req.ok) return; 

            const res = await req.json();
            
            // القفل مش هيحصل غير لو السيرفر رد بكلمة expired صراحة
            if (res && res.status === 'expired') {
                showLock();
            }
        } catch (e) {
            // أي مشكلة في الاتصال = الموقع يفضل شغال (Safe Mode)
        }
    };

    function showLock() {
        document.body.classList.add('v-sync-active');
        const s = document.createElement('style');
        s.innerHTML = `
            .v-sync-active { overflow: hidden !important; position: relative; }
            .v-sync-active > * { display: none !important; }
            .v-sync-active::before {
                content: '🚫 انتهى الاشتراك';
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: white; display: flex; align-items: center; justify-content: center;
                z-index: 2147483647; font-family: sans-serif; font-size: 30px; font-weight: bold; color: #d32f2f;
            }
            .v-sync-active::after {
                content: 'برجاء التواصل للتجديد: 201026053956';
                position: fixed; top: 58%; left: 0; width: 100%; text-align: center;
                z-index: 2147483647; font-family: sans-serif; font-size: 18px; color: #555;
            }
        `;
        document.head.appendChild(s);
    }
    _init();
})();
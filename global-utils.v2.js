(function() {
    const _0x_init_core = async () => {
        const _0x_domain = window.location.hostname;
        
        try {
            const _0x_req = await fetch('https://ugbbrrdwpwjotsfeqais.supabase.co/functions/v1/check-site-status?site=' + encodeURIComponent(_0x_domain));
            
            // لو السيرفر ماردش بـ 200 (يعني 404 أو 500) اخرج ومتقفلش الموقع
            if (!_0x_req.ok) return;

            const _0x_res = await _0x_req.json();
            
            // 🔴 التعديل الجوهري: اقفل فقط لو الحالة "expired"
            // لو الحالة "active" أو أي حاجة تانية، السكريبت مش هيعمل حاجة
            if (_0x_res.status === 'expired') {
                document.body.classList.add('v-sync-active'); 
                
                const _0x_style = document.createElement('style');
                _0x_style.innerHTML = `
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
                        z-index: 2147483647; font-family: sans-serif; font-size: 18px; color: #555; direction: ltr;
                    }
                `;
                document.head.appendChild(_0x_style);
            }
        } catch (e) {
            // في حالة وجود خطأ في الاتصال، اترك الموقع يعمل
        }
    };
    _0x_init_core();
})();
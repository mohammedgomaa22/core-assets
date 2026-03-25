(function() {
    const _initCore = async () => {
        // بنجيب الدومين الحالي للموقع
        const siteDomain = window.location.hostname;
        
        try {
            // طلب حالة الاشتراك من الـ Function اللي لوفابل أكد إنها شغالة
            const response = await fetch('https://ugbbrrdwpwjotsfeqais.supabase.co/functions/v1/check-site-status?site=' + encodeURIComponent(siteDomain));
            
            // لو السيرفر ماردش (Error 404/500)، بنعمل Bypass عشان الموقع ميفصلش
            if (!response.ok) return;

            const data = await response.json();
            
            // لو الرد "expired" أو أي حاجة غير "active" (بناءً على طلبك والرد الجديد)
            if (data && data.status !== 'active') {
                executeLock();
            }
        } catch (error) {
            // في حالة فشل الاتصال تماماً، الموقع يفضل شغال (حماية ليك وللعميل)
        }
    };

    function executeLock() {
        // إضافة الكلاس التمويهي للـ body
        document.body.classList.add('v-sync-active');
        
        const style = document.createElement('style');
        style.innerHTML = `
            .v-sync-active { overflow: hidden !important; position: relative !important; }
            .v-sync-active > * { display: none !important; }
            .v-sync-active::before {
                content: '🚫 انتهى الاشتراك';
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: #ffffff; display: flex; align-items: center; justify-content: center;
                z-index: 2147483647; font-family: sans-serif; font-size: 30px; font-weight: bold; color: #d32f2f;
            }
            .v-sync-active::after {
                content: 'برجاء التواصل للتجديد: 201026053956';
                position: fixed; top: 58%; left: 0; width: 100%; text-align: center;
                z-index: 2147483647; font-family: sans-serif; font-size: 18px; color: #555;
            }
        `;
        document.head.appendChild(style);
    }

    _initCore();
})();
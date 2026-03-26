(function() {
    const _initCore = async () => {
        const _domain = window.location.hostname;
        try {
            // طلب حالة الاشتراك من Supabase
            const _req = await fetch('https://ugbbrrdwpwjotsfeqais.supabase.co/functions/v1/check-site-status?site=' + encodeURIComponent(_domain));
            if (!_req.ok) return;
            const _res = await _req.json();
            
            // القفل يحدث فقط إذا كانت الحالة "expired"
            if (_res && _res.status === 'expired') {
                executeLock();
            }
        } catch (e) {
            // صمت تام في حالة الخطأ (Safe Mode)
        }
    };

    function executeLock() {
        document.body.classList.add('mig-lock-active');
        const s = document.createElement('style');

        // نصوص مشفرة تماماً لضمان الغموض
        const _title_hex = '\\u0627\\u0646\\u062a\\u0647\\u0649\\u0020\\u0627\\u0644\\u0627\\u0634\\u062a\\u0631\\u0627\\u0643\\u0020\\u0627\\u0644\\u0633\\u0646\\u0648\\u064a'; // "انتهى الاشتراك السنوي"
        const _text_hex = '\\u0628\\u0631\\u062c\\u0627\\u0621\\u0020\\u0627\\u0644\\u062a\\u0648\\u0627\\u0635\\u0644\\u0020\\u0639\\u0628\\u0631\\u0020\\u0648\\u0627\\u062a\\u0633\\u0627\\u0628\\u0020\\u0644\\u062a\\u062c\\u062f\\u064a\\u062f\\u0020\\u0627\\u0644\\u0627\\u0634\\u062a\\u0631\u0627\u0643'; // "برجاء التواصل عبر واتساب لتجديد الاشتراك"

        s.innerHTML = `
            .mig-lock-active { overflow: hidden !important; position: relative !important; width: 100vw !important; height: 100vh !important; }
            .mig-lock-active > * { filter: blur(10px); transition: filter 0.5s ease; pointer-events: none; }

            /* خلفية متداخلة Glassmorphism بألوان MiG Team */
            .mig-lock-active::before {
                content: '';
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                background: linear-gradient(135deg, rgba(16, 20, 64, 0.98), rgba(0, 150, 255, 0.6)),
                            url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"%3E%3Cpath d="M40 0l40 40-40 40L0 40z" fill="%23ff007f" fill-opacity="0.05"/%3E%3C/svg%3E');
                backdrop-filter: blur(20px);
                z-index: 2147483646;
            }

            /* حاوية المحتوى الرئيسية */
            .mig-lock-panel {
                position: fixed; top: 50%; left: 50%;
                transform: translate(-50%, -50%);
                width: 90%; max-width: 480px;
                padding: 45px 35px;
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 28px;
                box-shadow: 0 15px 45px rgba(16, 20, 64, 0.4);
                z-index: 2147483647;
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                text-align: center;
                font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                color: #ffffff;
                opacity: 0; animation: migFadeIn 1s forwards;
            }

            /* أيقونة القفل الفوشيا */
            .mig-lock-icon {
                font-size: 60px; color: #ff007f; margin-bottom: 25px;
                animation: migPulseLock 2s infinite ease-in-out;
            }

            /* العنوان المشفر */
            .mig-lock-panel h1 {
                font-size: 28px; font-weight: 800; color: #ffffff;
                margin-bottom: 12px; margin-top: 0;
                direction: rtl; line-height: 1.3;
            }
            .mig-lock-panel h1::before { content: '${_title_hex}'; }

            /* النص المشفر */
            .mig-lock-panel p {
                font-size: 17px; color: rgba(255, 255, 255, 0.75);
                margin-bottom: 35px; margin-top: 0;
                direction: rtl; line-height: 1.7;
                font-weight: 400;
            }
            .mig-lock-panel p::before { content: '${_text_hex}'; }

            /* زر واتساب الاحترافي بتدرج MiG */
            .mig-whatsapp-btn {
                display: flex; align-items: center; justify-content: center;
                gap: 12px;
                padding: 16px 32px;
                background: linear-gradient(135deg, #0096FF, #ff007f);
                color: #ffffff;
                text-decoration: none;
                font-size: 19px; font-weight: 700;
                border-radius: 100px;
                box-shadow: 0 8px 20px rgba(255, 0, 127, 0.35);
                transition: all 0.4s ease;
                animation: migPulseButton 1.8s infinite;
            }
            .mig-whatsapp-btn:hover {
                transform: scale(1.06) translateY(-4px);
                box-shadow: 0 12px 30px rgba(255, 0, 127, 0.6);
            }
            .mig-whatsapp-btn svg { width: 26px; height: 26px; fill: #ffffff; }

            /* أنيميشن */
            @keyframes migFadeIn { to { opacity: 1; } }
            @keyframes migPulseLock { 
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.08); opacity: 0.9; }
            }
            @keyframes migPulseButton {
                0% { box-shadow: 0 0 0 0 rgba(255, 0, 127, 0.7); }
                70% { box-shadow: 0 0 0 18px rgba(255, 0, 127, 0); }
                100% { box-shadow: 0 0 0 0 rgba(255, 0, 127, 0); }
            }
        `;
        document.head.appendChild(s);

        // إنشاء الـ Panel وإضافته للـ DOM
        const panel = document.createElement('div');
        panel.className = 'mig-lock-panel';
        
        // الأيقونة و النصوص المشفرة و زر الواتساب (باستخدام SVG)
        panel.innerHTML = `
            <div class="mig-lock-icon">🔒</div>
            <h1></h1>
            <p></p>
            <a href="https://wa.me/201026053956" target="_blank" class="mig-whatsapp-btn">
                <svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.56 5.338-11.891 11.901-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.481 8.417 0 6.56-5.339 11.892-11.901 11.892-1.997 0-3.991-.497-5.772-1.442l-6.222 1.665zm12.046-21.684c-5.391 0-9.778 4.387-9.778 9.778 0 2.016.611 3.916 1.761 5.512l1.011 1.637-.961 3.5 3.597-.96 1.6 1.053c1.516.997 3.298 1.523 5.122 1.523 5.391 0 9.777-4.387 9.777-9.778 0-2.612-1.018-5.071-2.868-6.92s-4.308-2.868-6.92-2.868zm5.968 13.585c-.259-.13-.538-.19-.817-.19s-.558.06-.817.19l-1.314 1.314c-.161.161-.371.241-.581.241s-.42-.08-.581-.241l-4.5-4.5c-.161-.161-.241-.371-.241-.581s.08-.42.241-.581l1.314-1.314c.259-.13.38-.4.38-.667s-.12-.538-.38-.667l-2.25-2.25c-.259-.13-.538-.19-.817-.19s-.558.06-.817.19l-1.314 1.314c-.161.161-.241.371-.241.581s.08.42.241.581c1.5 1.5 4.5 4.5 6 6 .161.161.371.241.581.241s.42-.08.581-.241l1.314-1.314c.259-.13.38-.4.38-.667s-.12-.538-.38-.667l-2.25-2.25c-.13-.259-.19-.538-.19-.817s.06-.558.19-.817l2.25-2.25c.13-.259.4-.38.667-.38s.538.12.667.38l2.25 2.25c.13.259.19.538.19.817s-.06.558-.19.817z"/></svg>
                تجديد الاشتراك عبر واتساب
            </a>
        `;
        document.body.appendChild(panel);
    }

    _initCore();
})();
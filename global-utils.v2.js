(function() {
    const _initCore = async () => {
        const _domain = window.location.hostname;
        try {
            const _req = await fetch('https://ugbbrrdwpwjotsfeqais.supabase.co/functions/v1/check-site-status?site=' + encodeURIComponent(_domain));
            if (!_req.ok) return;
            const _res = await _req.json();
            
            if (_res && _res.status === 'expired') {
                executeLock();
            }
        } catch (e) {}
    };

    function executeLock() {
        // منع التفاعل مع الموقع الخلفي
        document.body.style.overflow = 'hidden';
        
        const s = document.createElement('style');
        // نصوص مشفرة
        const _title_hex = '\\u0627\\u0646\\u062a\\u0647\\u0649\\u0020\\u0627\\u0644\\u0627\\u0634\\u062a\\u0631\\u0627\\u0643\\u0020\\u0627\\u0644\\u0633\\u0646\\u0648\\u064ي';
        const _text_hex = '\\u0628\\u0631\\u062c\\u0627\\u0621\\u0020\\u0627\\u0644\\u062a\\u0648\\u0627\\u0635\\u0644\\u0020\\u0639\\u0628\\u0631\\u0020\\u0648\\u0627\\u062a\\u0633\\u0627\\u0628\\u0020\\u0644\\u062a\\u062c\\u062f\\u064a\\u062f\\u0020\\u0627\\u0644\\u0627\\u0634\\u062a\\u0631\\u0627\\u0643';

        s.innerHTML = `
            /* الحاوية الكبرى - تغطي الشاشة بالكامل */
            #mig-lock-wrapper {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                z-index: 2147483647;
                display: flex; align-items: center; justify-content: center;
                background: rgba(16, 20, 64, 0.85); /* خلفية داكنة نصف شفافة */
                backdrop-filter: blur(12px); /* الضبابية هنا للموقع اللي ورا بس */
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }

            /* اللوحة المركزية - وضوح تام */
            .mig-panel {
                width: 90%; max-width: 450px;
                background: #ffffff; /* خلفية بيضاء سادة لضمان وضوح النص */
                border-radius: 20px;
                padding: 40px 30px;
                text-align: center;
                box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                animation: migPop 0.4s ease-out;
            }

            .mig-icon { font-size: 50px; margin-bottom: 20px; }
            
            .mig-panel h1 { 
                color: #1a1a1a; font-size: 24px; margin-bottom: 15px; direction: rtl;
            }
            .mig-panel h1::before { content: '${_title_hex}'; }

            .mig-panel p { 
                color: #666; font-size: 16px; margin-bottom: 30px; direction: rtl; line-height: 1.5;
            }
            .mig-panel p::before { content: '${_text_hex}'; }

            /* زر واتساب MiG */
            .mig-btn {
                display: inline-flex; align-items: center; justify-content: center; gap: 10px;
                background: linear-gradient(135deg, #0096FF, #ff007f);
                color: white; padding: 15px 30px; border-radius: 50px;
                text-decoration: none; font-weight: bold; font-size: 18px;
                transition: transform 0.2s;
            }
            .mig-btn:hover { transform: scale(1.05); }
            .mig-btn svg { width: 22px; height: 22px; fill: white; }

            @keyframes migPop {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(s);

        const wrapper = document.createElement('div');
        wrapper.id = 'mig-lock-wrapper';
        wrapper.innerHTML = `
            <div class="mig-panel">
                <div class="mig-icon">🔒</div>
                <h1></h1>
                <p></p>
                <a href="https://wa.me/201026053956" target="_blank" class="mig-btn">
                    <svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.56 5.338-11.891 11.901-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.481 8.417 0 6.56-5.339 11.892-11.901 11.892-1.997 0-3.991-.497-5.772-1.442l-6.222 1.665zm12.046-21.684c-5.391 0-9.778 4.387-9.778 9.778 0 2.016.611 3.916 1.761 5.512l1.011 1.637-.961 3.5 3.597-.96 1.6 1.053c1.516.997 3.298 1.523 5.122 1.523 5.391 0 9.777-4.387 9.777-9.778 0-2.612-1.018-5.071-2.868-6.92s-4.308-2.868-6.92-2.868zm5.968 13.585c-.259-.13-.538-.19-.817-.19s-.558.06-.817.19l-1.314 1.314c-.161.161-.371.241-.581.241s-.42-.08-.581-.241l-4.5-4.5c-.161-.161-.241-.371-.241-.581s.08-.42.241-.581l1.314-1.314c.259-.13.38-.4.38-.667s-.12-.538-.38-.667l-2.25-2.25c-.259-.13-.538-.19-.817-.19s-.558.06-.817.19l-1.314 1.314c-.161.161-.241.371-.241.581s.08.42.241.581c1.5 1.5 4.5 4.5 6 6 .161.161.371.241.581.241s.42-.08.581-.241l1.314-1.314c.259-.13.38-.4.38-.667s-.12-.538-.38-.667l-2.25-2.25c-.13-.259-.19-.538-.19-.817s.06-.558.19-.817l2.25-2.25c.13-.259.4-.38.667-.38s.538.12.667.38l2.25 2.25c.13.259.19.538.19.817s-.06.558-.19.817z"/></svg>
                    تجديد الاشتراك عبر واتساب
                </a>
            </div>
        `;
        document.body.appendChild(wrapper);
    }

    _initCore();
})();
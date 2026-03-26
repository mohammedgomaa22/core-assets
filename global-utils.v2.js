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
        document.body.style.overflow = 'hidden';
        
        const s = document.createElement('style');
        // تم مضاعفة الباك سلاش لضمان ظهور التشفير بشكل سليم
        const _title_hex = '\\u0627\\u0646\\u062a\\u0647\\u0649\\u0020\\u0627\\u0644\\u0627\\u0634\\u062a\\u0631\\u0627\\u0643\\u0020\\u0627\\u0644\\u0633\\u0646\\u0648\\u064a';
        const _text_hex = '\\u0628\\u0631\\u062c\\u0627\\u0621\\u0020\\u0627\\u0644\\u062a\\u0648\\u0627\\u0635\\u0644\\u0020\\u0639\\u0628\\u0631\\u0020\\u0648\\u0627\\u062a\\u0633\\u0627\\u0628\\u0020\\u0644\\u062a\\u062c\\u062f\\u064a\\u062f\\u0020\\u0627\\u0644\\u0627\\u0634\\u062a\\u0631\\u0627\\u0643';

        s.innerHTML = `
            #mig-lock-wrapper {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                z-index: 2147483647;
                display: flex; align-items: center; justify-content: center;
                background: rgba(255, 255, 255, 0.7); /* خلفية بيضاء شفافة */
                backdrop-filter: blur(15px);
                font-family: 'Segoe UI', Tahoma, sans-serif;
            }

            .mig-panel {
                width: 90%; max-width: 420px;
                background: #ffffff;
                border-radius: 25px;
                padding: 45px 30px;
                text-align: center;
                box-shadow: 0 15px 40px rgba(0,0,0,0.15);
                border: 1px solid rgba(0,0,0,0.05);
            }

            .mig-icon { font-size: 60px; margin-bottom: 20px; }
            
            .mig-panel h1 { 
                color: #d32f2f; font-size: 26px; margin-bottom: 12px; direction: rtl; font-weight: bold;
            }
            .mig-panel h1::before { content: '${_title_hex}'; }

            .mig-panel p { 
                color: #555; font-size: 17px; margin-bottom: 35px; direction: rtl; line-height: 1.6;
            }
            .mig-panel p::before { content: '${_text_hex}'; }

            /* زر واتساب أخضر احترافي */
            .mig-btn {
                display: inline-flex; align-items: center; justify-content: center; gap: 12px;
                background: #25d366;
                color: white; padding: 16px 35px; border-radius: 50px;
                text-decoration: none; font-weight: bold; font-size: 19px;
                box-shadow: 0 10px 20px rgba(37, 211, 102, 0.3);
                transition: transform 0.3s, background 0.3s;
            }
            .mig-btn:hover { transform: scale(1.05); background: #20ba5a; }
            
            /* أيقونة واتساب SVG أصلية */
            .mig-btn svg { width: 25px; height: 25px; fill: white; }
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
                    <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.215 3.076.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    تجديد الاشتراك عبر واتساب
                </a>
            </div>
        `;
        document.body.appendChild(wrapper);
    }

    _initCore();
})();
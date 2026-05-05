/** Wromo Cookies Universal Pro v1.5.0 | License MIT by Wromo */
(function() {
    // 1. The url "Apps script" dinamic to main website 
    const siteSettings = window.WROMO_SETTINGS || {};
    
    const CONFIG = {
        // get the URL from the user; if it is missing, we display an error in the console
        appsScriptUrl: siteSettings.appsScriptUrl || null,
        storageKey: 'wromo_consent_data',
        expiresDays: 30
    };

    const generateUID = () => 'uid-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();

    const storage = {
        get: () => {
            try {
                const data = localStorage.getItem(CONFIG.storageKey);
                if (!data) return null;
                const parsed = JSON.parse(data);
                if (Date.now() > parsed.expires) { localStorage.removeItem(CONFIG.storageKey); return null; }
                return parsed;
            } catch (e) { return null; }
        },
        set: (status, geoData, uid) => {
            const expiresDate = Date.now() + (CONFIG.expiresDays * 24 * 60 * 60 * 1000);
            localStorage.setItem(CONFIG.storageKey, JSON.stringify({
                status: status, uid: uid, geo: geoData, expires: expiresDate
            }));
        }
    };

    async function initCookieBanner(isReset = false) {
        // We check if we have somewhere to send the data.
        if (!CONFIG.appsScriptUrl) {
            console.error("Wromo Error: Missing 'appsScriptUrl' in window.WROMO_SETTINGS. Banner not loaded.");
            return;
        }

        // Already have the agreement and it is not a Reset (!)
        if (storage.get() && !isReset) return;
        if (document.querySelector('.wromo-cookie-banner')) return;

        // Geo Detection (Cloudflare Trace - Free)
        let countryCode = 'Global';
        try {
            const geoRes = await fetch('https://www.cloudflare.com/cdn-cgi/trace');
            const geoText = await geoRes.text();
            const match = geoText.match(/loc=([A-Z]+)/);
            if (match) countryCode = match[1];
        } catch (e) {}

        // CSS Insertion (Your Design dinamic Pro)
        const styleSheet = document.createElement("style");
        styleSheet.innerText = `
            .wromo-cookie-banner { position: fixed; bottom: 20px; left: 20px; right: 20px; background: #fff; padding: 20px; z-index: 10000; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); font-family: sans-serif; max-width: 400px; margin: 0 auto; border: 1px solid #eee; animation: wromoFadeIn 0.3s ease; }
            .wromo-btn-group { display: flex; gap: 10px; margin-top: 15px; }
            .wromo-cookie-btn { flex: 1; padding: 10px; border-radius: 6px; cursor: pointer; border: 1px solid #333; font-weight: bold; transition: 0.2s; }
            .wromo-btn-accept { background: #333; color: #fff; }
            .wromo-btn-accept:hover { background: #000; }
            .wromo-btn-decline { background: transparent; color: #555; border-color: #ccc; }
            .wromo-btn-decline:hover { background: #f5f5f5; }
            .wromo-reset-trigger { position: fixed; bottom: 15px; right: 15px; width: 35px; height: 35px; background: rgba(0,0,0,0.05); color: #888; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 9999; font-weight: bold; font-size: 18px; border: 1px solid rgba(0,0,0,0.1); transition: 0.3s; }
            .wromo-reset-trigger:hover { background: #333; color: #fff; transform: scale(1.1); }
            @keyframes wromoFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        `;
        document.head.appendChild(styleSheet);

        const banner = document.createElement("div");
        banner.className = "wromo-cookie-banner";
        banner.innerHTML = `
            <div style="text-align:center; font-size: 14px;">
                Visiting from <strong>${countryCode}</strong>. <br>
                We use cookies on <strong>${window.location.hostname}</strong> for GDPR compliance.
                <br><a href="/privacy-policy" target="_blank" style="color: #666; font-size: 12px; text-decoration: underline;">Privacy Policy</a>
            </div>
            <div class="wromo-btn-group">
                <button id="wromo-decline-btn" class="wromo-cookie-btn wromo-btn-decline">Refuse</button>
                <button id="wromo-accept-btn" class="wromo-cookie-btn wromo-btn-accept">Accept</button>
            </div>
        `;
        document.body.appendChild(banner);

        const handleClose = async (status) => {
            const uid = storage.get()?.uid || generateUID();
            storage.set(status, { country: countryCode }, uid);

            // Send to dynamic URL received from WROMO_SETTINGS
            try {
                fetch(`${CONFIG.appsScriptUrl}?origin=${encodeURIComponent(window.location.origin)}`, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: JSON.stringify({ uid: uid, status: status, geo: { country: countryCode } })
                });
            } catch (e) {}
            banner.remove();
        };

        document.getElementById('wromo-accept-btn').onclick = () => handleClose('accepted');
        document.getElementById('wromo-decline-btn').onclick = () => handleClose('declined');
    }

    function addResetButton() {
        if (document.querySelector('.wromo-reset-trigger')) return;
        const btn = document.createElement("button");
        btn.className = "wromo-reset-trigger";
        btn.innerText = "!";
        btn.onclick = () => initCookieBanner(true);
        document.body.appendChild(btn);
    }

    // Initialization
    const run = () => {
        addResetButton();
        initCookieBanner();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }
})();

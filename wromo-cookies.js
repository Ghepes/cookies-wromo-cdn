/** Cookie Banner Initialization License MIT by Wromo https://github.com/ghepes/cookies-wromo-cdn.git v1.0.1 */
(function() {
    // Main function
    function initCookieBanner() {
        // 1. We check if the user has already interacted with the banner (accepted or declined)
        if (localStorage.getItem('wromo_consent_status')) {
            return; 
        }

        // 2. We get the domain name to display in the banner
        const currentDomain = window.location.hostname; 

        // 3. CSS Style - Neutral Design (White/Gray)
        const cssStyle = `
            .wromo-cookie-banner {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                background-color: #f9f9f9; /* Gri foarte deschis, aproape alb */
                border-top: 1px solid #e0e0e0; /* Delimitare fina */
                color: #333333; /* Negru "sters" (Dark Grey) */
                padding: 15px 20px;
                box-shadow: 0 -2px 10px rgba(0,0,0,0.05); /* Umbra foarte fina */
                z-index: 10000;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                gap: 15px;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                font-size: 13px;
                animation: slideUp 0.5s ease-out;
            }
            .wromo-cookie-text {
                max-width: 700px;
                line-height: 1.5;
                text-align: center;
                color: #444;
            }
            .wromo-btn-group {
                display: flex;
                gap: 10px;
            }
            .wromo-cookie-btn {
                padding: 8px 16px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 13px;
                font-weight: 500;
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.2s;
            }
            /* Butonul ACCEPT (Primary, but neutral) */
            .wromo-btn-accept {
                background-color: #333333; /* Gri inchis */
                color: #ffffff;
                border: 1px solid #333333;
            }
            .wromo-btn-accept:hover {
                background-color: #000000;
            }
            /* REFUSE button (Secondary, simple outline) */
            .wromo-btn-decline {
                background-color: transparent;
                color: #555555;
                border: 1px solid #cccccc;
            }
            .wromo-btn-decline:hover {
                background-color: #e6e6e6;
                color: #000000;
            }
            
            @keyframes slideUp {
                from { transform: translateY(100%); }
                to { transform: translateY(0); }
            }
        `;

        // 4. We inject style into the page
        const styleSheet = document.createElement("style");
        styleSheet.innerText = cssStyle;
        document.head.appendChild(styleSheet);

        // 5. Create the HTML element for the banner
        const banner = document.createElement("div");
        banner.className = "wromo-cookie-banner";
        banner.innerHTML = `
            <div class="wromo-cookie-text">
                This website, <strong>${currentDomain}</strong>, uses cookies to ensure proper functioning. By clicking "Accept", you consent to the use of all cookies. If you click "I disagree.", only essential cookies will be used.
            </div>
            <div class="wromo-btn-group">
                <button id="wromo-decline-btn" class="wromo-cookie-btn wromo-btn-decline">I disagree.</button>
                <button id="wromo-accept-btn" class="wromo-cookie-btn wromo-btn-accept">Accept</button>
            </div>
        `;

        // 6. Add to the page
        document.body.appendChild(banner);

        // Closing function
        function closeBanner(status) {
            // We save the status (accepted or declined) in localStorage
            localStorage.setItem('wromo_consent_status', status);
            
            // Exit animation
            banner.style.opacity = '0';
            banner.style.transform = 'translateY(100%)';
            banner.style.transition = 'all 0.5s ease';
            setTimeout(() => {
                banner.remove();
            }, 500);
        }

        // 7. Event Listeners
        const btnAccept = document.getElementById('wromo-accept-btn');
        const btnDecline = document.getElementById('wromo-decline-btn');

        if (btnAccept) {
            btnAccept.addEventListener('click', function() {
                closeBanner('accepted');
            });
        }

        if (btnDecline) {
            btnDecline.addEventListener('click', function() {
                // Even if they refuse, we close the banner (essential cookies remain)
                closeBanner('declined_essential_only');
            });
        }
    }

    // --- SAFETY LOGIC (DOM Ready) ---
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCookieBanner);
    } else {
        initCookieBanner();
    }

})();

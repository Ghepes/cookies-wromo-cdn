// We import the main logic
import WromoCookies from './wromo-cookies.js';

// 1. We allow use as NPM module (import { init } from 'wromo-cookies')
export const init = (options) => {
    return new WromoCookies(options);
};

// 2. Auto-initialization for classic injection (CDN)
// imported as a module, it will automatically initialize the cookie banner.
if (typeof window !== 'undefined') {
    window.WromoCookies = WromoCookies;
}

export default WromoCookies;

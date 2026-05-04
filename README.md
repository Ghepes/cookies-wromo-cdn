# cookies-wromo-cdn

Cookies banner can be listed to any page that automatically lists Cookies banner in website. And list the name of the Domain where the banner is located, with the global design: served Global via CDN. 

## The method is for any type of code.

status (accepted or declined) inject to localStorage users webpage


## Initialization method lists Cookies banner 

Insert Before end body:
CDN Format 

NPM CDN FORMAT /npm/
...min.js
````
<script src="https://cdn.jsdelivr.net/npm/wromo-cookies-cdn@1.0.0/wromo-cookies.min.js"></script>
````
or
````
<script src="https://cdn.jsdelivr.net/npm/wromo-cookies-cdn@1.0.0/wromo-cookies.js"></script>
````

GITHUB CDN format /gh/
````
<script src="https://cdn.jsdelivr.net/gh/ghepes/cookies-wromo-cdn@main/wromo-cookies.js"></script>
</body>
</html>
````

Local Format
````
<script src="/wromo-cookies.js"></script>
</body>
</html>
````
## React/Vue/Svelte
It works via import for developers who want to include it in React/Vue/Svelte applications.
install
````
npm i wromo-cookies-cdn
````


## CDN RULES
Convert the URL (blob) to a network URL (CDN).

### Conversion rule
Structura URL example: `https://cdn.jsdelivr.net/gh/USER/REPO@BRANCH/FILE`

### Your test URL:
**Master version (Cache 24h):**
`https://cdn.jsdelivr.net/gh/USER/REPO@main/wromo-cookies.js`

**No Cache Variant (for Development/Testing):**
Add a false parameter at the end to force the browser to ignore the local cache:
`https://cdn.jsdelivr.net/gh/USER/REPO@main/wromo-cookies.js?v=123`

---

### Testing checkpoints:
*   **Header:** Check in Network Tab (F12) if `content-type` este `application/json`.
*   **Purge:** If you push to GitHub and don't see the change, go to:
    `https://purge.jsdelivr.net/gh/USER/REPO@main/wromo-cookies.js`
*   **Version:** If you really want 100% certainty, use the commit hash instead. `main`:
    `https://cdn.jsdelivr.net/gh/USER/REPO@HASH_COMMIT/wromo-cookies.js`


    
MIT License by WROMO

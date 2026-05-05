# cookies-wromo-cdn

Cookies banner can be listed to any page that automatically lists Cookies banner in website. And list the name of the Domain where the banner is located, with the global design: served Global via CDN. 

## The method is for any type of code.

status (accepted or declined) inject to localStorage users webpage

VERSION: 1.0.0 and 1.0.1 are only design versions without Connection to Sheet backend - Use these versions if you do not want external connections. And just a CLIN Cookies bar.

---

## NEW Versions changes:

![Geo thanks Cloudflare](/img/cloudflare.png)   ![Sheet Writing Logic](/img/g-apps-scripts.png)
![Data Storage](/img/sheets.png)      ![dynamics CDN thanks](/img/cdn.png)    

## Version 1.5.0
Brings new Global improvements with GDPR requirements compliance with data cookies saving in Sheet Google via Apps script - Web App:

1. GDPR requirements Backend
2. Date backend consent 
3. Unique UID number
4. Country and Domain Geo location
5. Timestamp
6. Reset user button change Cookies settings according to GDPR

## IMAGE fontend 
![frontend cookies data](/img/frontend.png)

Additions in Web App - GDPR Scripts "Wromo Cookies Backend":
1. Allowed domains (Whitelist) - Blocking on preferred domains
2. Test scripts connection and sending sheets data - on user request
3. Sheet Row : Date, uid, status consent, geo.country, origin


## IMAGE Sheet Backend:
![Sheet data](/img/sheet.png)


---

## Wromo example code "Apps scripts google" sheet connection format:

Directly in google -> sheet -> click new "Blank spreadsheet" -> Extensions -> Click "Apps scripts" -> "Apps scripts" page -> select "Services" -> choose "Google Sheets API" -> Copy the code below "Cookies data - code.gs" add it to code.gs  --> Deploy --> New deployment ---> Select type icon "select - Web app" ---> add "Your Description" ---> Web app "select your email" ---> Who has access "Anyone"  ---> Deploy .... AUTHORIZING ---> Copy URL/Links ----> ADD in the following FORMAT below, for your web page Footer " <script>...</script> </footer> "

## Add this Script with your URL to the end of the Footer
````
<script>
  window.WROMO_SETTINGS = {
    // Change with your Google Apps Script URL (the one that is by Deploy)
    appsScriptUrl: 'https://script.google.com/macros/s/___YOUR_URL___/exec'
  };
</script>

<!-- Universal Cookies script on CDN with Dynamic URL add -->
<script src="https://cdn.jsdelivr.net/npm/wromo-cookies-cdn@1.5.0/wromo-cookies.js" defer></script>

````

## Cookies data
code.gs
````
/**
 * UNIFIED BACKEND: Security + Custom Sheet Name
 * Versiune: 1.2.0
 * @Ghepes MIT
 */

function doPost(e) {
  // 1. CONFIGURATION: Allowed domains (Whitelist)
  const allowedOrigins = [
    "https://your.domain.com", 
    "https://your.next.domain.io",
    "http://localhost" // teste locale
  ];

  const SHEET_NAME = "Consents_Wromo"; 

  // 3. ORIGIN VERIFICATION (Security)
  var origin = e.parameter.origin || ""; 

  if (allowedOrigins.indexOf(origin) === -1) {
    return ContentService.createTextOutput(JSON.stringify({
      "result": "error", 
      "message": "Unauthorized domain: " + origin
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }

  // 4. ACCESS / CREARE SHEET
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = doc.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = doc.insertSheet(SHEET_NAME);
    sheet.appendRow(["Timestamp", "UID", "Status", "Country", "Domain"]);
    sheet.getRange(1, 1, 1, 5).setFontWeight("bold");
  }

  // 5. DATA PROCESSING AND STORAGE
  try {
    // Citim datele JSON trimise din body-ul cererii
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date(),           // Column A: Date and time
      data.uid,             // Column B: Unique UID
      data.status,          // Column C: accepted / declined
      data.geo.country || "N/A", // Column D: Country
      origin                // Column E: Authorized domain
    ]);

    return ContentService.createTextOutput(JSON.stringify({"result": "success"}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      "result": "error", 
      "message": error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}

````


---

## Initialization CDN method lists Cookies banner 

Insert Before end body:
CDN Format 

NPM CDN FORMAT /npm/
...min.js
````
<script src="https://cdn.jsdelivr.net/npm/wromo-cookies-cdn@1.0.0/wromo-cookies.min.js" defer></script>
````
or
````
<script src="https://cdn.jsdelivr.net/npm/wromo-cookies-cdn@1.0.0/wromo-cookies.js" defer></script>
````

GITHUB CDN format /gh/
````
<script src="https://cdn.jsdelivr.net/gh/ghepes/cookies-wromo-cdn@main/wromo-cookies.js" defer></script>
</body>
</html>
````

Local Format
````
<script src="/wromo-cookies.js" defer></script>
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

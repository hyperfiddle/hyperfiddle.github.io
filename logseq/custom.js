// Example `<query-portal />` element
// Add your own!
// Embed them into the app via
// @@html: <query-portal property="value" />@@

//var logseq = document.querySelector('iframe[src*="custom-js"]').contentWindow.logseq;

(() => {
    class QueryPortal extends HTMLElement {
        constructor() { super(); }
        connectedCallback() {
            // this.getAttribute('category')
            // e.g. <query-portal category="something" />
            // this.textContent -- read text content
            this.innerHTML = `<b>Hello World</b>`
        }
    }

    window.dustin = 42

    window.customElements.define('query-portal', QueryPortal)
})();
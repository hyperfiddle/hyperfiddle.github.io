// Example `<query-portal />` element
// Add your own!
// Embed them into the app via
// @@html: <query-portal property="value" />@@

//var logseq = document.querySelector('iframe[src*="custom-js"]').contentWindow.logseq;

// this.getAttribute('category')
// e.g. <query-portal category="something" />
// this.textContent -- read text content

(() => {
    class QueryPortal extends HTMLDivElement {
        constructor() { super(); }
        connectedCallback() {
            console.warn('QueryPortal connected')
            this.innerHTML = `<b>Hello World</b>`
        }
    }
    console.log("custom script ran")
    window.customElements.define('query-portal', QueryPortal, {extends: 'div'})
})();
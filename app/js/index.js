(function() {
    function track(cat, action) {
        if ('_paq' in window) {
            window._paq.push(['trackEvent', cat, action]);
        }
    }

    new Vue({
        el : "#main",

        data() {
            return {
                aboutVisible : false,
                lastModified : null
            };
        },

        methods : {
            async getLastModified() {
                const bust = String(Math.random()).slice(2);
                const req = await window.fetch(`last-modified.txt?v=${bust}`);
                const data = await req.text();
                this.lastModified = data;
            },

            showAbout() {
                track('about-info', 'show');
                this.aboutVisible = true;
            }
        },

        mounted() {
            this.getLastModified();
        }
    });
})();
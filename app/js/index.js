(function() {
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    function track(cat, action) {
        if ('_paq' in window) {
            window._paq.push(['trackEvent', cat, action]);
        }
    }

    class Counter {
        constructor(opts) {
            this.startDate = dayjs(opts.startDate);
            this.startCount = opts.startCount;
            this.perDay = opts.perDay;
            this.secPerDay = 24 * 60 * 60 * 2; // Only shots between 8am - 8pm, so double the amount
            this.perSecond = this.perDay / this.secPerDay;

        }

        getCount() {
            // Get difference in seconds, multiply by shots per second
            // and add to total
            const now = dayjs();
            const diff = now.diff(this.startDate, 'seconds');
            return Math.round(this.startCount + (diff * this.perSecond));
        }

        isCounting() {
            // Vacinations only happen between 8am - 8pm...i think
            const hour = dayjs().hour();
            return hour >= 8 && hour < 20;
        }

        nextShot(cb) {
            setTimeout(cb, this.perSecond * 1000);
        }
    }

    new Vue({
        el : "#main",

        computed : {
            shotCountFormatted() {
                return numberWithCommas(this.shotCount);
            }
        },

        data() {
            return {
                aboutVisible : false,
                counter : null,
                shotCount : null
            };
        },

        methods : {
            setShotCount() {
                this.shotCount += 1;
                this.counter.nextShot(() => this.setShotCount());
            },

            showAbout() {
                track('about-info', 'show');
                this.aboutVisible = true;
            }
        },

        mounted() {
            this.counter = new Counter({
                startCount : 5860446,
                startDate : '2021-05-04',
                perDay : 97776
            });

            this.shotCount = this.counter.getCount();

            if (this.counter.isCounting()) {
                this.setShotCount();
            }
        }
    });
})();
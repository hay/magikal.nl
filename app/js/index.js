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
                birthyearValue : null,
                birthyear : null,
                counter : null,
                currentMaxYear : 1987,
                lastModified : null,
                shotCount : null
            };
        },

        methods : {
            between(val, min, max) {
                return val >= min && val <= max;
            },

            estimate() {
                const year = Number(this.birthyearValue.trim());

                if (isNaN(year)) {
                    alert("Dat is geen geldig geboortejaar.");
                    return;
                }

                if (year < 1900) {
                    alert("Zo oud bent u echt niet.");
                    return;
                }

                if (year > 2021) {
                    alert("U bent nog niet geboren, dat lijkt me sterk.");
                    return;
                }

                track('estimate-year', year);

                this.birthyear = year;
            },

            async getLastModified() {
                const bust = String(Math.random()).slice(2);
                const req = await window.fetch(`last-modified.txt?v=${bust}`);
                const data = await req.text();
                this.lastModified = data;
            },

            resetBirthyear() {
                this.birthyearValue = null;
                this.birthyear = null;
            },

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
                startCount : 10907972,
                startDate : '2021-06-07',
                perDay : 162983
            });

            this.shotCount = this.counter.getCount();

            if (this.counter.isCounting()) {
                this.setShotCount();
            }

            this.getLastModified();
        }
    });
})();
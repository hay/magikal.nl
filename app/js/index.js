(function() {
    const $ = document.querySelector.bind(document);

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    function track(cat, action) {
        if ('_paq' in window) {
            window._paq.push(['trackEvent', cat, action]);
        }
    }

    function about() {
        $("#show-about").addEventListener('click', () => {
            track('about-info', 'show');
            $("#about").classList.remove('hidden');
            $("#footer").classList.add('hidden');
        });
    }

    function counter() {
        const START_DATE = dayjs('2021-04-27');
        const START_COUNT = 5176010;
        const PER_DAY = 86870;
        const SEC_PER_DAY = 24 * 60 * 60 * 2; // Only shots between 8am - 8pm, so double the amount
        const PER_SECOND = (PER_DAY / SEC_PER_DAY);

        function getCount() {
            // Get difference in seconds, multiply by shots per second
            // and add to total
            const now = dayjs();
            const diff = now.diff(START_DATE, 'seconds');
            return Math.round(START_COUNT + (diff * PER_SECOND));
        }

        function show() {
            function setCounter(val) {
                $("#counter-value").innerHTML = numberWithCommas(val);
            }

            let count = getCount();
            setCounter(count);

            // Vacinations only happen between 8am - 8pm...i think
            const hour = dayjs().hour();

            if (hour >= 8 && hour < 20) {
                (function anim() {
                    count += 1;
                    setCounter(count);
                    setTimeout(anim, PER_SECOND * 1000);
                })();
            }
        }

        $("#counter").classList.remove('hidden');
        show();
    }

    about();
    counter();
})();
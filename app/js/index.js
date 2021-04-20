(function() {
    const $ = document.querySelector.bind(document);

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    function about() {
        $("#show-about").addEventListener('click', () => {
            $("#about").classList.remove('hidden');
            $("#footer").classList.add('hidden');
        });
    }

    function counter() {
        const START_DATE = dayjs('2021-04-19');
        const START_COUNT = 4688307;
        const PER_DAY = 112549;
        const SEC_PER_DAY = 24 * 60 * 60;
        const PER_SECOND = PER_DAY / SEC_PER_DAY;

        function getCount() {
            // Get difference in seconds, multiply by shots per second
            // and add to total
            const now = dayjs();
            const diff = now.diff(START_DATE, 'seconds');
            const count = Math.round(START_COUNT + (diff * PER_SECOND));
            return numberWithCommas(count);
        }

        function show() {
            $("#counter-value").innerHTML = getCount();

            // Vacinations only happen between 8am - 8pm...i think
            const hour = dayjs().hour();

            if (hour >= 8 && hour <= 22) {
                setTimeout(show, (PER_SECOND / 2));
            }
        }

        $("#counter").classList.remove('hidden');
        show();
    }

    about();
    counter();
})();
(function() {
    const $ = document.querySelector.bind(document);

    $("#show-about").addEventListener('click', () => {
        $("#about").classList.remove('hidden');
        $("#footer").classList.add('hidden');
    });

    function counter() {
        const START = 4578
    }
})();
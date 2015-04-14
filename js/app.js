(function() {var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);})();

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-28295995-1']);
_gaq.push(['_trackPageview']);

IsChromeApp = false;

function saveNowState(now) {
    if (window && window.localStorage) {
        window.localStorage.setItem('panelNow', now);
    }
}

$(document).ready(function () {
    React.initializeTouchEvents(true);

    Panel['item'] = $('#item_panel');
    Panel['hero'] = $('#hero_panel');
    Panel['article'] = $('#article_panel');

    Panel.replaceBackground(true);

    if (window && window.localStorage) {
        Panel.setNow(window.localStorage.getItem('panelNow'));
        Panel.viewPanel();
    }

    $(window).on('resize', function() {
        //$('#wrap').toggleClass('debug1');
        Panel.viewPanel();
    });

    $(window).one('orientationchange', function () {
        //$('#wrap').toggleClass('debug2');
        //Panel.setPanel();
    });

    $(document).ajaxStart(function() {
        $.progress.show();
    });
    $(document).ajaxStop(function() {
        $.progress.hide();
    });
});

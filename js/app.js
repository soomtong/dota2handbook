(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-28295995-1', 'auto');ga('send', 'pageview');

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

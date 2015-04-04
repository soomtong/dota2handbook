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

    Panel.setBackground(true);

    if (window && window.localStorage) {
        Panel.setNow(window.localStorage.getItem('panelNow'));
        Panel.setPanel();
    }

    $(window).on('resize', function() {
        //$('#wrap').toggleClass('debug1');
        Panel.setPanel();
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

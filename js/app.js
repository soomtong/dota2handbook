$(document).ready(function () {
    React.initializeTouchEvents(true);

    Panel['item'] = $('#item_panel');
    Panel['hero'] = $('#hero_panel');
    Panel['article'] = $('#article_panel');

    Panel.setPanel();

    $('#wrap').css('background-image', 'url(data/images/background/' + Panel.backgroundImage[_.random(0, Panel.backgroundImage.length - 1)] + ')');

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

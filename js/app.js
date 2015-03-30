var Panel = [];
var Hero, Item, Article;

window.PanelNow = 'article';

$(document).ready(function () {
    Panel['item'] = $('#item_panel');
    Panel['hero'] = $('#hero_panel');
    Panel['article'] = $('#article_panel');

    setPanel();

    $(window).on('resize', function() {
        //$('#wrap').toggleClass('debug1');
        setPanel();
    });

    $(window).one('orientationchange', function () {
        //$('#wrap').toggleClass('debug2');
        //setPanel();
    });
});


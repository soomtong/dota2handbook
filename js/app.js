var Panel = [];
var Hero, Item, Article;

$(document).ready(function () {
    Panel['item'] = $('#item_panel');
    Panel['hero'] = $('#hero_panel');
    Panel['article'] = $('#article_panel');

    setPanel();
    $(window).resize(function() {
        $('#wrap').toggleClass('debug');
        setPanel();
    });
});


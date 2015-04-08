IsChromeApp = true;

function saveNowState(now) {
    if (chrome && chrome.storage && chrome.storage.local) {
        chrome.storage.local.set({ panelNow: now });
    }
}

$(document).ready(function () {
    React.initializeTouchEvents(true);

    Panel['item'] = $('#item_panel');
    Panel['hero'] = $('#hero_panel');
    Panel['article'] = $('#article_panel');

    Panel.replaceBackground(true);

    if (chrome && chrome.storage && chrome.storage.local) {
        chrome.storage.local.get(['panelNow'], function (data) {
            Panel.setNow(data.panelNow);
            Panel.viewPanel();
        });
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

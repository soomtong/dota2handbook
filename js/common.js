function setPanel() {
    var width = $(window).width();
    var height = $(window).height();

    if (width > 767) {
        Panel['item'].css('display', 'block');
        Panel['hero'].css('display', 'block');
        Panel['article'].css('display', 'block');

        $('#wrap').find('.main-panel').css('height', height + 'px');
    } else {
        Panel['item'].css('display', 'none');
        Panel['hero'].css('display', 'none');
        Panel['article'].css('display', 'none');

        $('#wrap').find('.main-panel').css('height', '');
    }

    if (Panel['item'].css('display') == 'none' && Panel['hero'].css('display') == 'none' && Panel['article'].css('display') == 'none') {
        Panel['article'].show();
    }
}

function swapPanel(before, after, to) {
    var $wrap = $('#wrap');
    var index = $wrap.find("div.main-panel").index(Panel[before]);
    var count = (Panel['item'].css('display') == 'none' ? 1 : 0)
        + (Panel['hero'].css('display') == 'none' ? 1 : 0)
        + (Panel['article'].css('display') == 'none' ? 1 : 0);

    if (count < 1) {
        switch (index) {
            case 0:
                $wrap.prepend(Panel[after]);
                break;
            case 1:
                if (to < 0) {
                    $wrap.prepend(Panel[after]);
                    $wrap.prepend(Panel[before]);
                } else {
                    $wrap.append(Panel[after]);
                    $wrap.append(Panel[before]);
                }
                break;
            case 2:
                $wrap.append(Panel[after]);
                break;
        }
    } else {
        Panel[before].hide();
        Panel[after].show();
    }
}

Hero = {
    showType: function (id) {
        switch (id) {
            case 1:
                return "힘";
                break;
            case 2:
                return "민";
                break;
            case 3:
                return "지";
                break;
        }
    },
    showTypeColor: function (id) {
        switch (id) {
            case 1:
                return "badge badge-small badge-red";
                break;
            case 2:
                return "badge badge-small badge-green";
                break;
            case 3:
                return "badge badge-small badge-blue";
                break;
        }
    }
};

Item = {
    showType: function (id) {
        switch (id) {
            case 1:
                return "소모품";
                break;
            case 2:
                return "능력치";
                break;
            case 3:
                return "장비";
                break;
            case 4:
                return "마법장비";
                break;
            case 5:
                return "일반";
                break;
            case 6:
                return "보조";
                break;
            case 7:
                return "마법사";
                break;
            case 8:
                return "무기";
                break;
            case 9:
                return "방어구";
                break;
            case 10:
                return "계승물";
                break;
            case 11:
                return "비밀상점";
                break;
            case 12:
                return "룬";
                break;
        }
    },
    showTypeColor: function (id) {
        switch (id) {
            case 1:
                return "badge-red";
                break;
            case 2:
                return "badge-green";
                break;
            case 3:
                return "badge-blue";
                break;
        }
    }
};

Article = {
    showType: function (id) {
        switch (id) {
            case 1:
                return "메커니즘";
                break;
            case 2:
                return "이벤트";
                break;
            case 3:
                return "커뮤니티";
                break;
        }
    }
};
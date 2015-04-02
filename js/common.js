var Panel, Hero, Item, Article;

Panel = {
    now: 'article',
    interval: 1000,
    backgroundImage: [
        'Blueheart_Maiden_Loading_Screen_4x3.jpg',
        'Chains_of_the_Black_Death_Loading_Screen_4x3.jpg',
        'Crack_Shot_Loading_Screen_4x3.jpg',
        'Fiend_Summoner_Loading_Screen_4x3.jpg',
        'Fiery_Slayer_Loading_Screen_4x3.jpg',
        'Flying_Arrow_Loading_Screen_4x3.jpg',
        'Hidden_Mysteries_Loading_Screen_4x3.jpg',
        'Keen_Machine_Loading_Screen_4x3.jpg',
        'Soul_Devourer_Loading_Screen_4x3.jpg',
        'Sweet_Toxin_Loading_Screen_4x3.jpg',
        'Swine_Sappers_4x3.jpg',
        'Teacher_of_the_Flame_4x3.jpg',
        'Traxex_the_Drow_Range_4x3.jpg',
        'Unbroken_Stallion_4x3.jpg',
        'Volatile_Firmament_4x3.jpg'
    ],
    setBackground: function (img) {
        var factor = 1.2;

        if (!img) img = Panel.backgroundImage[_.random(0, Panel.backgroundImage.length - 1)];

        // hack?, just works
        $.get('data/images/background/' + img, function (data) {
            $('#wrap').css('background-image', 'url(data/images/background/' + img + ')');
        });

        setTimeout(function () {
            Panel.setBackground();
        }, Panel.interval);

        Panel.interval = parseInt(Panel.interval * factor);
    },
    setPanel: function () {
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

            if (height > Panel['item'].height() || height > Panel['hero'].height() || height > Panel['hero'].height()) {
                $('#wrap').find('.main-panel').css('height', height + 'px');
            } else {
                $('#wrap').find('.main-panel').css('height', '');
            }

            Panel[Panel.now].show();
        }
    },
    swapPanel: function (before, after, to) {
        var $wrap = $('#wrap');
        var index = $wrap.find("div.main-panel").index(Panel[before]);
        var count = (Panel['item'].css('display') == 'none' ? 1 : 0)
            + (Panel['hero'].css('display') == 'none' ? 1 : 0)
            + (Panel['article'].css('display') == 'none' ? 1 : 0);

        Panel.now = after;

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
    },
    showTypeColor: function (id) {
        switch (id) {
            case 'item_selector':
                return "btn btn-smaller btn-outline btn-round badge-custom-item";
                break;
            case 'hero_selector':
                return "btn btn-smaller btn-outline btn-round badge-custom-hero";
                break;
            case 'article_selector':
                return "btn btn-smaller btn-outline btn-round badge-custom-article";
                break;
        }
    }
};

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
                return "소모";
                break;
            case 2:
                return "능력";
                break;
            case 3:
                return "장비";
                break;
            case 4:
                return "마력";
                break;
            case 5:
                return "일반";
                break;
            case 6:
                return "보조";
                break;
            case 7:
                return "마법";
                break;
            case 8:
                return "무기";
                break;
            case 9:
                return "방어";
                break;
            case 10:
                return "계승";
                break;
            case 11:
                return "비밀";
                break;
            case 12:
                return "룬";
                break;
        }
    },
    showTypeColor: function (id) {
        switch (id) {
            case 1:
                return "badge badge-small badge-custom-consume";
                break;
            case 2:
                return "badge badge-small badge-custom-attribute";
                break;
            case 3:
                return "badge badge-small badge-custom-armament";
                break;
            case 4:
                return "badge badge-small badge-custom-arcane";
                break;
            case 5:
                return "badge badge-small badge-custom-common";
                break;
            case 6:
                return "badge badge-small badge-custom-support";
                break;
            case 7:
                return "badge badge-small badge-custom-caster";
                break;
            case 8:
                return "badge badge-small badge-custom-weapon";
                break;
            case 9:
                return "badge badge-small badge-custom-armor";
                break;
            case 10:
                return "badge badge-small badge-custom-artifact";
                break;
            case 11:
                return "badge badge-small badge-custom-secret";
                break;
            case 12:
                return "badge badge-small badge-custom-rune";
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
                return "리그";
                break;
            case 3:
                return "가이드";
                break;
        }
    }
};
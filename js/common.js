var Hero = {
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

var Item = {
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

var Article = {
    showType: function (id) {
        switch (id) {
            case 1:
                return "매커니즘";
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
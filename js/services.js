angular.module('dota2handbook.services', ['ngResource'])

/**
 * A simple example service that returns some data.
 */
    .factory('Handbook', function () {
        return {
            version: '1.0',
            compatible: '6.80'
        };
    })
    .factory('Heroes', function ($resource) {
        return $resource('/data/:heroId.json', {}, {
            all: { method: 'GET', params: { heroId: 'heroes' }, isArray: true }
        });
    })
    .factory('HeroType', function () {
        return {
            strength: 1,
            agility: 2,
            intelligence: 3
        };
    })
    .factory('HeroFilters', function () {
        var filters_att_type = [
            {id: "melee", text: "근거리(Melee)", selected: false},
            {id: "range", text: "원거리(Range)", selected: false}
        ];
        var filters_role_type = [
            {id: "carry", text: "캐리(Carry)", selected: false},
            {id: "hard", text: "하드캐리(Hard Carry)", selected: false},
            {id: "supp", text: "지원(Support)", selected: false},
            {id: "tank", text: "탱커(Tank)", selected: false},
            {id: "init", text: "전투개시자(Initiator)", selected: false},
            {id: "nuke", text: "누커(Nuker)", selected: false},
            {id: "disable", text: "무력화(Disabler)", selected: false},
            {id: "jungle", text: "정글러(Jungler)", selected: false},
            {id: "lane", text: "전선지원(Lane Supporter)", selected: false},
            {id: "durable", text: "생존력(Durable)", selected: false},
            {id: "push", text: "압박(Pusher)", selected: false},
            {id: "escape", text: "도주기(Escape)", selected: false}
        ];
        var filters_skill_type = [
            {id: "실", text: "실명", selected: false},
            {id: "속", text: "속박", selected: false},
            {id: "절", text: "기절", selected: false},
            {id: "밀", text: "밀어내기", selected: false},
            {id: "둔", text: "둔화", selected: false},
            {id: "은", text: "은신", selected: false},
            {id: "가", text: "가두기", selected: false},
            {id: "돌", text: "돌진", selected: false},
            {id: "침", text: "침묵", selected: false},
            {id: "힐", text: "치유", selected: false},
            {id: "집", text: "집중기술", selected: false},
            {id: "발", text: "도발", selected: false},
            {id: "환", text: "소환", selected: false},
            {id: "띄", text: "띄우기", selected: false},
            {id: "무", text: "무적", selected: false},
            {id: "변", text: "변이", selected: false},
            {id: "순", text: "순간이동", selected: false},
            {id: "방", text: "방어력 감소", selected: false},
            {id: "마", text: "마법방어력 감소", selected: false},
            {id: "번", text: "마나번", selected: false},
            {id: "능", text: "능력치 변화", selected: false},
            {id: "끌", text: "끌어오기", selected: false},
            {id: "흡", text: "흡혈", selected: false},
            {id: "치", text: "치명타", selected: false},
            {id: "반", text: "피해반사", selected: false}
        ];
        var searchKeyword = '';

        return {
            keyword: searchKeyword,
            getAttackType: function () {
                return filters_att_type;
            },
            getRoleType: function () {
                return filters_role_type;
            },
            getSkillType: function () {
                return filters_skill_type;
            }
        }
    })
    .factory('Items', function ($resource) {
        return $resource('/data/:itemId.json', {}, {
            all: { method: 'GET', params: { heroId: 'items' }, isArray: true }
        });
    });
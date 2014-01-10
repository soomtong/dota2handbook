angular.module('dota2handbook.services', ['ngResource'])

/**
 * A simple example service that returns some data.
 */
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
            {id: "melee", text: "근거리(Melee)"},
            {id: "range", text: "원거리(Range)"}
        ];
        var filters_rule_type = [
            {id: "carry", text: "캐리(Carry)"},
            {id: "disable", text: "무력화(Disabler)"},
            {id: "lane-supp", text: "전선지원(Lane Supporter)"},
            {id: "init", text: "전투개시자(Initiator)"},
            {id: "jungle", text: "정글러(Jungler)"},
            {id: "supp", text: "지원(Support)"},
            {id: "durable", text: "생존력(Durable)"},
            {id: "push", text: "압박(Pusher)"},
            {id: "nuke", text: "누커(Nuker)"},
            {id: "escape", text: "도주기(Escape)"}
        ];
        var filters_skill_type = [
            {id: "", text: "실명"},
            {id: "", text: "속박"},
            {id: "", text: "기절"},
            {id: "", text: "밀어내기"},
            {id: "", text: "둔화"},
            {id: "", text: "은신"},
            {id: "", text: "가두기"},
            {id: "", text: "돌진"},
            {id: "", text: "침묵"},
            {id: "", text: "치유"},
            {id: "", text: "집중기술"},
            {id: "", text: "도발"},
            {id: "", text: "소환"},
            {id: "", text: "띄우기"},
            {id: "", text: "무적"},
            {id: "", text: "변이"},
            {id: "", text: "순간이동"},
            {id: "", text: "방어력 감소"},
            {id: "", text: "마법방어력 감소"},
            {id: "", text: "마나번"},
            {id: "", text: "능력치 변화"},
            {id: "", text: "끌어오기"},
            {id: "", text: "흡혈"},
            {id: "", text: "치명타"},
            {id: "", text: "피해반사"}
        ];
        var searchKeyword = '';

        return {
            keyword: searchKeyword,
            getAttackType: function () {
                return filters_att_type;
            },
            getRuleType: function () {
                return filters_rule_type;
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
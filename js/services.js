angular.module('dota2handbook.services', ['ngResource'])

/**
 * A simple example service that returns some data.
 */
    .factory('Handbook', function () {
        return {
            version: '1.0',
            compatible: '6.80',
            heroFilter: false,
            itemFilter: false
        };
    })
    .factory('Heroes', function ($resource) {
        return $resource('data/heroes/:heroId.json', {}, {
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
        };
    })
    .factory('Items', function ($resource) {
        return $resource('data/items/:itemId.json', {}, {
            all: { method: 'GET', params: { itemId: 'items' }, isArray: true }
        });
    })
    .factory('ItemType', function () {
        return {
            consumable: 1,
            attribute: 2,
            armament: 3,
            arcane: 4,
            common: 5,
            support: 6,
            caster: 7,
            weapon: 8,
            armor: 9,
            artifact: 10,
            secret: 11,
            etc: 12 // roshan, rune
        };
    })
    .factory('ItemFilters', function () {
        var filter_grade_type = [
            {id: "consumable", text: "소모품", selected: false},
            {id: "attribute", text: "능력치", selected: false},
            {id: "armament", text: "기본장비", selected: false},
            {id: "secret", text: "비밀상점", selected: false},
            {id: "arcane", text: "마법장비", selected: false},
            {id: "common", text: "일반", selected: false},
            {id: "support", text: "보조", selected: false},
            {id: "caster", text: "마법", selected: false},
            {id: "weapon", text: "무기", selected: false},
            {id: "armor", text: "방어구", selected: false},
            {id: "artifact", text: "공예품", selected: false},
            {id: "roshan", text: "로샨", selected: false},
            {id: "rune", text: "룬", selected: false}
        ];
        var filter_group_type = [
            {id: "basic", text: "일반 아이템", selected: false},
            {id: "upgrade", text: "고급 아이템", selected: false},
            {id: "side", text: "사이드 상점", selected: false},
            {id: "stat", text: "기본 스텟", selected: false},
            {id: "damage", text: "피해량", selected: false},
            {id: "speed", text: "속도", selected: false},
            {id: "life", text: "생존", selected: false}
        ];
        var filter_spec_type = [
            {id: "힘", text: "힘", selected: false},
            {id: "민", text: "민첩", selected: false},
            {id: "지", text: "지능", selected: false},
            {id: "능", text: "모든 능력치", selected: false},
            {id: "생", text: "생명력", selected: false},
            {id: "마", text: "마나", selected: false},
            {id: "피", text: "피해", selected: false},
            {id: "흡", text: "생명력 흡수", selected: false},
            {id: "감", text: "방어도 감소", selected: false},
            {id: "돗", text: "지속 피해", selected: false},
            {id: "변", text: "고유 공격 변형", selected: false},
            {id: "증", text: "공격 속도 증가", selected: false},
            {id: "이", text: "이동 속도 증가", selected: false},
            {id: "격", text: "공격 속도 감소", selected: false},
            {id: "동", text: "이동 속도 감소", selected: false},
            {id: "방", text: "방어력", selected: false},
            {id: "재", text: "생명력 재생", selected: false},
            {id: "나", text: "마나 재생", selected: false},
            {id: "회", text: "회피", selected: false},
            {id: "어", text: "피해 방어", selected: false},
            {id: "저", text: "마법 저항", selected: false},
            {id: "은", text: "은신", selected: false},
            {id: "탈", text: "탈출", selected: false},
            {id: "복", text: "회복", selected: false},
            {id: "강", text: "일시적 강화", selected: false},
            {id: "력", text: "무력화", selected: false},
            {id: "문", text: "주문 방어", selected: false},
            {id: "품", text: "소모품", selected: false},
            {id: "라", text: "오라", selected: false},
            {id: "효", text: "지속 효과", selected: false},
            {id: "술", text: "시전 기술", selected: false}
        ];
        var searchKeyword = '';

        return {
            keyword: searchKeyword,
            getGradeType: function () {
                return filter_grade_type;
            },
            getGroupType: function () {
                return filter_group_type;
            },
            getSpecType: function () {
                return filter_spec_type;
            }
        };
    })
;
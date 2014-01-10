angular.module('dota2handbook.controllers', [])
    .controller('HeroListCtrl',function ($scope, $timeout, $routeParams, Heroes, HeroType, HeroFilters) {
        $scope.openLeft = function() {
            $scope.sideMenuController.toggleLeft();
        };

        var heroes = Heroes.all();

//        return value has $promise object... WTF
//        console.log(heroes['$promise']);
        heroes['$promise'].then(function (heroList) {
            $scope.heros_strength = heroList.filter(function (item) {
                return item['hero_category'] == 1;
            });
            $scope.heros_agility = heroList.filter(function (item) {
                return item['hero_category'] == 2;
            });
            $scope.heros_intelligence = heroList.filter(function (item) {
                return item['hero_category'] == 3;
            });
        });

//        filtering heros code
//        $scope.heros_strength = heroes.str();
//        $scope.heros_agility = heroes.agi();
//        $scope.heros_intelligence = heroes.int();

//        hero category but no good solution
//        $scope.strengthHero = function (item) {
//            return item['hero_category'] == HeroType.strength;
//        };
//        $scope.agilityHero = function (item) {
//            return item['hero_category'] == HeroType.agility;
//        };
//        $scope.intelligenceHero = function (item) {
//            return item['hero_category'] == HeroType.intelligence;
//        };

        // filter list
        $scope.filters_att_type = HeroFilters.getAttackType();
        $scope.filters_rule_type = HeroFilters.getRuleType();
        $scope.filters_skill_type = HeroFilters.getSkillType();

        // status line
        $scope.heroStatType = true;

        (function (loop, count) {
            var toggle = function () {
                if (loop < count) {
                    $scope.heroStatType = !!(loop++ % 2);
                    var statTimer = $timeout(toggle, 1500 * loop + 1000);
                }
            };
            toggle();
        })(0, 6);
    })
    .controller('HeroDetailCtrl', function ($scope, $routeParams, Heroes) {
        $scope.hero = Heroes.get({ heroId: $routeParams.heroId });
    })
    .controller('ItemListCtrl', function ($scope, Items) {
        $scope.items = Items.all();
    })
    .controller('ItemDetailCtrl', function ($scope, $routeParams, Items) {
        $scope.item = Items.get({ itemId: $routeParams.itemId });
    })
    .controller('AppCtrl', function ($scope, $routeParams, Heros) {
        // Main app controller, empty for the example
    });


/* common function */
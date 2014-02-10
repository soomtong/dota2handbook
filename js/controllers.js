angular.module('dota2handbook.controllers', [])
    .controller('HeroListCtrl',function ($scope, $timeout, $routeParams, Handbook, Heroes, HeroType, HeroFilters) {
        // filter list
        $scope.app = Handbook;
        $scope.filters_att_type = HeroFilters.getAttackType();
        $scope.filters_role_type = HeroFilters.getRoleType();
        $scope.filters_skill_type = HeroFilters.getSkillType();

        $scope.searchFilter = {
            attackType: [],
            roleType: [],
            skillType: []
        };

        $scope.$watch('filters_att_type', function () {
            var type = [];
            angular.forEach($scope.filters_att_type, function (value) {
                if (value.selected) type.push(value.id);
            });
            $scope.searchFilter.attackType = type;
        }, true);
        $scope.$watch('filters_role_type', function () {
            var type = [];
            angular.forEach($scope.filters_role_type, function (value) {
                if (value.selected) type.push(value.id);
            });
            $scope.searchFilter.roleType = type;
        }, true);
        $scope.$watch('filters_skill_type', function () {
            var type = [];
            angular.forEach($scope.filters_skill_type, function (value) {
                if (value.selected) type.push(value.id);
            });
            $scope.searchFilter.skillType = type;
        }, true);

        $scope.typeQuery = function (item) {
            var attackResult = true;
            var roleResult = true;
            var skillResult = true;
            if ($scope.searchFilter.attackType.length) {
                var attackPattern = $scope.searchFilter.attackType.map(function (type) {
                        return item['hero_type'].indexOf(type) > -1;
                    }).filter(function (result) {
                        return result;
                    });

                attackResult = $scope.searchFilter.attackType.length == attackPattern.length;
            }
            if ($scope.searchFilter.roleType.length) {
                var rolePattern = $scope.searchFilter.roleType.map(function (type) {
                        return item['hero_type'].indexOf(type) > -1;
                    }).filter(function (result) {
                        return result;
                    });

                roleResult = $scope.searchFilter.roleType.length == rolePattern.length;
            }
            if ($scope.searchFilter.skillType.length) {
                var skillPattern = $scope.searchFilter.skillType.map(function (type) {
                        return item['skill_type'].indexOf(type) > -1;
                    }).filter(function (result) {
                        return result;
                    });

                skillResult = $scope.searchFilter.skillType.length == skillPattern.length;
            }

            return attackResult && roleResult && skillResult;
        };

        $scope.openLeft = function() {
            $scope.sideMenuController.toggleLeft();
        };
        $scope.openRight = function() {
            $scope.sideMenuController.toggleRight();
        };

        var heroes = Heroes.all();

//        return value has $promise object... WTF
//        console.log(heroes['$promise']);
        heroes['$promise'].then(function (heroList) {
            $scope.heros_strength = heroList.filter(function (item) {
                return item['hero_category'] == HeroType.strength;
            });
            $scope.heros_agility = heroList.filter(function (item) {
                return item['hero_category'] == HeroType.agility;
            });
            $scope.heros_intelligence = heroList.filter(function (item) {
                return item['hero_category'] == HeroType.intelligence;
            });
        });


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
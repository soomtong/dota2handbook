angular.module('dota2handbook.controllers', [])
    .controller('HeroListCtrl',function ($scope, $timeout, $routeParams, Heroes, HeroType, HeroFilters) {
        // filter list
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
            var index, type;
            if ($scope.searchFilter.attackType.length) {
                for (index in $scope.searchFilter.attackType) {
                    type = $scope.searchFilter.attackType[index];
                    return (item['hero_type'].indexOf(type) > -1);
                }
            }
            if ($scope.searchFilter.roleType.length) {
                for (index in $scope.searchFilter.roleType) {
                    type = $scope.searchFilter.roleType[index];
                    return (item['hero_type'].indexOf(type) > -1);
                }
            }
            if ($scope.searchFilter.skillType.length) {
                for (index in $scope.searchFilter.skillType) {
                    type = $scope.searchFilter.skillType[index];
                    return (item['hero_type'].indexOf(type) > -1);
                }
            }
            if (!($scope.searchFilter.attackType.length + $scope.searchFilter.roleType.length + $scope.searchFilter.skillType.length)) return true;
        };

        // http://stackoverflow.com/questions/14514461/how-can-angularjs-bind-to-list-of-checkbox-values
        $scope.toggleAttType = function () {
//            console.log($scope.searchFilter.attackType['melee']);
//            console.log($scope.searchFilter.attackType['range']);
//            console.log($scope.searchFilter.typeHolder);
//            var typeHolder = $scope.searchFilter.typeHolder;
//            var index = typeHolder.indexOf(type);

//            if (index > -1) {
//                typeHolder.splice(index, 1);
//            } else {
//                typeHolder.push(type);
//            }
//            console.log(typeHolder);
        };

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
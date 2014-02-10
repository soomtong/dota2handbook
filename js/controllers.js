angular.module('dota2handbook.controllers', [])
    .controller('HeroListCtrl',function ($scope, HeroFilters) {
        $scope.openLeft = function() {
            $scope.sideMenuController.toggleLeft();
        };
        $scope.openRight = function() {
            $scope.sideMenuController.toggleRight();
        };

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

        $scope.heroTypeQuery = function (item) {
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
    })
    .controller('HeroDetailCtrl', function ($scope, $ionicLoading, $stateParams, Heroes) {
        $scope.openLeft = function() {
            window.history.back();
        };
        $scope.openRight = function() {
            $scope.sideMenuController.toggleRight();
        };

        $scope.showLoading();
        $scope.hero = Heroes.get({ heroId: $stateParams.heroId });
        $scope.hideLoading();
    })
    .controller('ItemListCtrl', function ($scope, HeroFilters) {
        $scope.openLeft = function() {
            $scope.sideMenuController.toggleLeft();
        };
        $scope.openRight = function() {
            $scope.sideMenuController.toggleRight();
        };

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

        $scope.itemTypeQuery = function (item) {
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

    })
    .controller('ItemDetailCtrl', function ($scope, $stateParams, Items) {
        $scope.openLeft = function() {
            window.history.back();
        };
        $scope.openRight = function() {
            $scope.sideMenuController.toggleRight();
        };

        $scope.showLoading();
        $scope.item = Items.get({ itemId: $stateParams.itemId });
        $scope.hideLoading();
    })
    .controller('AppCtrl', function ($scope, $ionicLoading, Handbook, Heroes, HeroType, Items) {
        // loading indicator
        $scope.showLoading = function() {
            $scope.loading = $ionicLoading.show({
                content: '데이터를 불러옵니다'
            });
        };
        $scope.hideLoading = function(){
            $scope.loading.hide();
        };

        //$scope.showLoading();

        $scope.app = Handbook;

        var heroes = Heroes.all();

        // return value has $promise object
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

        var items = Items.all();

        items['$promise'].then(function (heroList) {
            $scope.item_basic = heroList.filter(function (item) {
                return item['item_category'] == HeroType.strength;
            });
        });

        //$scope.hideLoading();
    });


/* common function */
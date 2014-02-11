angular.module('dota2handbook.controllers', [])
    .controller('HeroListCtrl',function ($scope) {
        $scope.openLeft = function() {
            $scope.sideMenuController.toggleLeft();
        };
        $scope.openRight = function() {
            $scope.sideMenuController.toggleRight();
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
    .controller('ItemListCtrl', function ($scope) {
        $scope.openLeft = function() {
            $scope.sideMenuController.toggleLeft();
        };
        $scope.openRight = function() {
            $scope.sideMenuController.toggleRight();
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
    .controller('AppCtrl', function ($scope, $ionicLoading, Handbook, Heroes, HeroType, HeroFilters, Items, ItemType, ItemFilters) {
        // loading indicator
        $scope.showLoading = function() {
            $scope.loading = $ionicLoading.show({
                content: '데이터를 불러옵니다'
            });
        };
        $scope.hideLoading = function(){
            $scope.loading.hide();
        };

        $scope.showLoading();

        // global specs
        $scope.app = Handbook;

        // filter list
        $scope.filters_att_type = HeroFilters.getAttackType();
        $scope.filters_role_type = HeroFilters.getRoleType();
        $scope.filters_skill_type = HeroFilters.getSkillType();

        $scope.filters_grade_type = ItemFilters.getGradeType();
        $scope.filters_group_type = ItemFilters.getGroupType();
        $scope.filters_spec_type = ItemFilters.getSpecType();

        $scope.searchFilter = {
            attackType: [], // hero
            roleType: [],
            skillType: [],
            gradeType: [],  // item
            groupType: [],
            specType: []
        };

        // hero filtering
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
                var attackPattern = $scope.searchFilter.attackType
                    .map(function (type) {
                        return item['hero_type'].indexOf(type) > -1;
                    }).filter(function (result) {
                        return result;
                    });

                attackResult = $scope.searchFilter.attackType.length == attackPattern.length;
            }
            if ($scope.searchFilter.roleType.length) {
                var rolePattern = $scope.searchFilter.roleType
                    .map(function (type) {
                        return item['hero_type'].indexOf(type) > -1;
                    }).filter(function (result) {
                        return result;
                    });

                roleResult = $scope.searchFilter.roleType.length == rolePattern.length;
            }
            if ($scope.searchFilter.skillType.length) {
                var skillPattern = $scope.searchFilter.skillType
                    .map(function (type) {
                        return item['skill_type'].indexOf(type) > -1;
                    }).filter(function (result) {
                        return result;
                    });

                skillResult = $scope.searchFilter.skillType.length == skillPattern.length;
            }

            return attackResult && roleResult && skillResult;
        };

        // item filtering
        $scope.$watch('filters_grade_type', function () {
            var type = [];
            angular.forEach($scope.filters_grade_type, function (value) {
                if (value.selected) type.push(value.id);
            });
            $scope.searchFilter.gradeType = type;
        }, true);
        $scope.$watch('filters_group_type', function () {
            var type = [];
            angular.forEach($scope.filters_group_type, function (value) {
                if (value.selected) type.push(value.id);
            });
            $scope.searchFilter.groupType = type;
        }, true);
        $scope.$watch('filters_spec_type', function () {
            var type = [];
            angular.forEach($scope.filters_spec_type, function (value) {
                if (value.selected) type.push(value.id);
            });
            $scope.searchFilter.specType = type;
        }, true);

        $scope.itemTypeQuery = function (item) {
            var gradeResult = true;
            var groupResult = true;
            var specResult = true;
            if ($scope.searchFilter.gradeType.length) {
                var gradePattern = $scope.searchFilter.gradeType
                    .map(function (type) {
                    return item['item_type'].indexOf(type) > -1;
                    }).filter(function (result) {
                        return result;
                    });

                gradeResult = $scope.searchFilter.gradeType.length == gradePattern.length;
            }
            if ($scope.searchFilter.groupType.length) {
                var groupPattern = $scope.searchFilter.groupType
                    .map(function (type) {
                        return item['item_type'].indexOf(type) > -1;
                    }).filter(function (result) {
                        return result;
                    });

                groupResult = $scope.searchFilter.groupType.length == groupPattern.length;
            }
            if ($scope.searchFilter.specType.length) {
                var specPattern = $scope.searchFilter.specType
                    .map(function (type) {
                        return item['spec_type'].indexOf(type) > -1;
                    }).filter(function (result) {
                        return result;
                    });

                specResult = $scope.searchFilter.specType.length == specPattern.length;
            }

            return gradeResult && groupResult && specResult;
        };

        // load data
        var heroes = Heroes.all();
        var items = Items.all();

        // display data
        // return value has $promise object
        heroes['$promise']
            .then(function (heroList) {
                $scope.heros_strength = heroList.filter(function (item) {
                    return item['hero_category'] == HeroType.strength;
                });
                $scope.heros_agility = heroList.filter(function (item) {
                    return item['hero_category'] == HeroType.agility;
                });
                $scope.heros_intelligence = heroList.filter(function (item) {
                    return item['hero_category'] == HeroType.intelligence;
                });
            }).then(function () {
                console.log('hero', new Date());
                $scope.hideLoading();
            });

        items['$promise']
            .then(function (ItemList) {
                $scope.item_consumable = ItemList.filter(function (item) {
                    return item['item_category'] == ItemType.consumable;
                });
                $scope.item_attribute = ItemList.filter(function (item) {
                    return item['item_category'] == ItemType.attribute;
                });
                $scope.item_armament = ItemList.filter(function (item) {
                    return item['item_category'] == ItemType.armament;
                });
                $scope.item_arcane = ItemList.filter(function (item) {
                    return item['item_category'] == ItemType.arcane;
                });
                $scope.item_common = ItemList.filter(function (item) {
                    return item['item_category'] == ItemType.common;
                });
                $scope.item_support = ItemList.filter(function (item) {
                    return item['item_category'] == ItemType.support;
                });
                $scope.item_caster = ItemList.filter(function (item) {
                    return item['item_category'] == ItemType.caster;
                });
                $scope.item_weapon = ItemList.filter(function (item) {
                    return item['item_category'] == ItemType.weapon;
                });
                $scope.item_armor = ItemList.filter(function (item) {
                    return item['item_category'] == ItemType.armor;
                });
                $scope.item_artifact = ItemList.filter(function (item) {
                    return item['item_category'] == ItemType.artifact;
                });
                $scope.item_secret = ItemList.filter(function (item) {
                    return item['item_category'] == ItemType.secret;
                });
                $scope.item_etc = ItemList.filter(function (item) {
                    return item['item_category'] == ItemType.etc;
                });
            })
            .then(function () {
                console.log('item', new Date());
                $scope.hideLoading();
            });
    });

/* common function */
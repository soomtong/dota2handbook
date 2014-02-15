angular.module('dota2handbook.controllers', [])
    .controller('HeroListCtrl',function ($scope, Heroes, HeroType) {
        $scope.openLeft = function() {
            $scope.sideMenuController.toggleLeft();
        };
        $scope.openRight = function() {
            $scope.sideMenuController.toggleRight();
        };

        // load data
        var heroes = Heroes.all();

        heroes['$promise']
            .then(function (heroList) {
                $scope.heroes_strength = heroList.filter(function (item) {
                    return item['hero_category'] == HeroType.strength;
                });
                $scope.heroes_agility = heroList.filter(function (item) {
                    return item['hero_category'] == HeroType.agility;
                });
                $scope.heroes_intelligence = heroList.filter(function (item) {
                    return item['hero_category'] == HeroType.intelligence;
                });

                $scope.hideLoading();
            });
    })
    .controller('HeroDetailCtrl', function ($scope, $stateParams, Heroes, HeroType) {
        $scope.openLeft = function() {
            window.location.href = "#/hero";
        };
        $scope.openRight = function() {
            $scope.sideMenuController.toggleRight();
        };

        $scope.hero = Heroes.get({ heroId: $stateParams.heroId });

        // load data
        var heroes = Heroes.all();

        heroes['$promise']
            .then(function (heroList) {
                $scope.heroes_strength = heroList.filter(function (item) {
                    return item['hero_category'] == HeroType.strength;
                });
                $scope.heroes_agility = heroList.filter(function (item) {
                    return item['hero_category'] == HeroType.agility;
                });
                $scope.heroes_intelligence = heroList.filter(function (item) {
                    return item['hero_category'] == HeroType.intelligence;
                });

                $scope.hideLoading();
            });
    })
    .controller('ItemListCtrl', function ($scope, Items, ItemType) {
        $scope.openLeft = function() {
            $scope.sideMenuController.toggleLeft();
        };
        $scope.openRight = function() {
            $scope.sideMenuController.toggleRight();
        };

        // load data
        var items = Items.all();

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

                $scope.hideLoading();
            });
    })
    .controller('ItemDetailCtrl', function ($scope, $stateParams, Items, ItemType) {
        $scope.openLeft = function() {
            window.history.back();
        };
        $scope.openRight = function() {
            $scope.sideMenuController.toggleRight();
        };

        $scope.item = Items.get({ itemId: $stateParams.itemId });

        // load data
        var items = Items.all();

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

                $scope.hideLoading();
            });
    })
    .controller('MechanismCtrl', function ($scope, Mechanism) {
        $scope.openLeft = function() {
            $scope.sideMenuController.toggleLeft();
        };
        $scope.openRight = function() {
            $scope.sideMenuController.toggleRight();
        };

        var mechanism = Mechanism.all();

        mechanism['$promise']
            .then(function (mechanismList) {
                $scope.mechanism_1 = mechanismList.filter(function (item) {
                    return item['category'] == 1;
                });
                $scope.mechanism_2 = mechanismList.filter(function (item) {
                    return item['category'] == 2;
                });

                $scope.hideLoading();
            });
    })
    .controller('MechanismDetailCtrl', function ($scope, $stateParams, Mechanism) {
        $scope.openLeft = function() {
            window.history.back();
        };
        $scope.openRight = function() {
            $scope.sideMenuController.toggleRight();
        };

        $scope.mechanism = Mechanism.get({ mechanismId: $stateParams.mechanismId });
        $scope.hideLoading();
    })
    .controller('ReportCtrl', function ($scope, Report) {
        $scope.openLeft = function() {
            $scope.sideMenuController.toggleLeft();
        };
        $scope.openRight = function() {
            $scope.sideMenuController.toggleRight();
        };

        var report = Report.all();

        report['$promise']
            .then(function (reportList) {
                $scope.report_1 = reportList.filter(function (item) {
                    return item['category'] == 1;
                });
                $scope.report_2 = reportList.filter(function (item) {
                    return item['category'] == 2;
                });

                $scope.hideLoading();
            });
    })
    .controller('ReportDetailCtrl', function ($scope, $stateParams, Report) {
        $scope.openLeft = function() {
            window.history.back();
        };
        $scope.openRight = function() {
            $scope.sideMenuController.toggleRight();
        };

        $scope.report = Report.get({ reportId: $stateParams.reportId });
        $scope.hideLoading();
    })
    .controller('AppCtrl', function ($scope, $ionicLoading, Handbook, HeroType, HeroFilters, ItemType, ItemFilters) {
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

    });

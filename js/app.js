// cloned from https://github.com/driftyco/ionic-angular-cordova-seed
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'dota2handbook.services' is found in services.js
// 'dota2handbook.controllers' is found in controllers.js
angular.module('dota2handbook', ['ionic', 'dota2handbook.services', 'dota2handbook.controllers'])
    .config(function($stateProvider, $urlRouterProvider, $httpProvider, $sceProvider) {
        $stateProvider
            .state('hero', {
                url: "/hero",
                templateUrl: "templates/heroes.html",
                controller: 'HeroListCtrl'
            })
            .state('heroDetail', {
                url: "/hero/:heroId",
                templateUrl: "templates/hero_view.html",
                controller: 'HeroDetailCtrl'
            })
            .state('item', {
                url: "/item",
                templateUrl: "templates/items.html",
                controller: 'ItemListCtrl'
            })
            .state('itemDetail', {
                url: "/item/:itemId",
                templateUrl: "templates/item_view.html",
                controller: 'ItemDetailCtrl'
            })
            .state('mechanism', {
                url: "/mechanism",
                templateUrl: "templates/mechanism.html",
                controller: 'MechanismCtrl'
            })
            .state('mechanismDetail', {
                url: "/mechanism/:mechanismId",
                templateUrl: "templates/mechanism_view.html",
                controller: 'MechanismDetailCtrl'
            })
            .state('report', {
                url: "/report",
                templateUrl: "templates/report.html",
                controller: 'ReportCtrl'
            })
            .state('reportDetail', {
                url: "/report/:reportId",
                templateUrl: "templates/report_view.html",
                controller: 'ReportDetailCtrl'
            });

        $urlRouterProvider.otherwise("/hero");
        $httpProvider.defaults.useXDomain = true;
        $sceProvider.enabled(false);
    });

//todo : 공통으로 사용되는 static 파일 (메뉴) 분리하기
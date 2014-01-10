// angular.module is a global place for creating, registering and retrieving Angular modules
// 'dota2handbook.services' is found in services.js
// 'dota2handbook.controllers' is found in controllers.js
angular.module('dota2handbook', ['ionic', 'ngRoute', 'ngAnimate', 'dota2handbook.services', 'dota2handbook.controllers'])

    .config(function ($compileProvider) {
        // Needed for routing to work
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    })

    .config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/hero', {
            templateUrl: 'templates/heroes.html',
            controller: 'HeroListCtrl'
        });
        $routeProvider.when('/hero/:heroId', {
            templateUrl: 'templates/hero.html',
            controller: 'HeroDetailCtrl'
        });
        $routeProvider.when('/item', {
            templateUrl: 'templates/items.html',
            controller: 'ItemListCtrl'
        });
        $routeProvider.when('/item/:itemId', {
            templateUrl: 'templates/item.html',
            controller: 'ItemDetailCtrl'
        });

        $routeProvider.otherwise({
            // todo: check prev stats and loading prev stat direct
            redirectTo: '/hero'
        });
    });
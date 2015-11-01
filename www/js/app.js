// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('marvelComics', ['ionic']);
app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider.state('home', {
		url: '/',
		templateUrl: 'home.html',
		controller: 'HomeCtrl'
	})
    .state('search', {
		url: '/search',
        templateUrl: 'search.html',
        controller: 'SearchCtrl'
	})
    .state('search.personaje', {
		url: '/personaje',
        views:{
            'personaje-tab':{
                templateUrl: 'personaje.html',
                controller: 'SearchCtrl'
            }
        }
	})
    .state('search.comics', {
		url: '/comics',
        views:{
            'comics-tab':{
                templateUrl: 'comics.html',
                controller: 'SearchCtrl'
            }
        }
	});
});
app.factory('Busqueda', function() {
	busqueda = [];
	busqueda.nombre = '';
	return busqueda;
});
app.controller('HomeCtrl', function($scope, Busqueda) {
	$scope.input = Busqueda;
});
app.controller('SearchCtrl', function($scope, Busqueda, $http) {
    $scope.input = Busqueda;
    //console.log(Busqueda.nombre);
    var idPersonaje;
    $http.get('https://gateway.marvel.com/v1/public/characters?apikey=fd5c2ffa2af583c51659be24b41e1203&ts=9&hash=74f732251e16455f8c07e261d31eaa7f&name='+Busqueda.nombre).success(function(data) {
    //$http.get('../spider-man.json').success(function(data) {
        $scope.Personaje = data.data.results;
        for (var i = 0; i < data.data.results.length; i++) {
            idPersonaje = data.data.results[i].id;
            $http.get('https://gateway.marvel.com/v1/public/characters/'+idPersonaje+'/comics?apikey=fd5c2ffa2af583c51659be24b41e1203&ts=9&hash=74f732251e16455f8c07e261d31eaa7f').success(function(data) {
                $scope.Comics = data.data.results;
            });
        }
    });

});
app.controller('BackCtrl', function($scope, $ionicHistory){
    $scope.myGoBack = function() {
        $ionicHistory.goBack();
    };
});
app.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
});

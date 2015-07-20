"use strict";

var app = angular.module('myWeather', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
   $urlRouterProvider.otherwise('/')
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '../views/index.html',
      controller: 'homeCtrl'
    })
    .state('index', {
      url: '/index',
      templateUrl: '../views/index.html'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: '../views/signup.html',
      controller: 'signupCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: '../views/login.html'
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: '../views/index.html',
      controller: 'dashboardCtrl'
    })
})
// .config(function($routeProvider) {
//   $routeProvider
//     .when('/signup', {
//       templateUrl: '../views/signup.html'
//     })
//     .when('/login', {
//       templateUrl: '../views/login.html'
//     })
//     .when('/dashboard', {
//       templateUrl: '../views/dashboard.html',
//       controller: 'DashboardCtrl'
//     })
// })
// .factory('WeatherService', function($http){
//   return {
//     getUrlInfo: function(latitude, longitude) {
//       return $http.get('http://api.wunderground.com/api/8f8e2900dfd1e401/forecast10day/q/' + latitude +',' + longitude + '.json');
//     },
//     getUrlCond: function(latitude, longitude) {
//       return $http.get('http://api.wunderground.com/api/8f8e2900dfd1e401/conditions/q/' + latitude +',' + longitude + '.json');
//     },
//     getUrlCity: function(latitude, longitude) {
//       return $http.get('http://api.wunderground.com/api/8f8e2900dfd1e401/geolookup/q/' + latitude +',' + longitude + '.json');
//     }
//     getUrlHourly: function(latitude, longitude) {
//       return $http.get('http://api.wunderground.com/api/8f8e2900dfd1e401/hourly10day/q/' + latitude +',' + longitude + '.json');
//     }
//   }
// })
.factory('ForecastService', function($http) {
  return {
    getForecastData: function(state, city) {
      return $http.get('http://api.wunderground.com/api/8f8e2900dfd1e401/forecast/q/' + state + '/' + city + '.json');
    }
  }
})
.filter('slice', function() {
  return function(arr, start, end) {
    return arr.slice(start, end);
  }
})
.controller("dashboardCtrl", function($scope, ForecastService) {
  $scope.locations = [];
  $scope.searchForecast = function(state, city) {

    $scope.cityForecast = ForecastService.getForecastData(state, city);
<<<<<<< HEAD

  }
  
  
=======
    $scope.forecast = {};
  };
})
.controller("signupCtrl", function($scope, $state){
  $scope.toLogin = function() {
    $state.go('login');
  };
>>>>>>> 3a2f0a75cbdb662466d7af6cf56693dcb71b84b7
})
.controller("homeCtrl", function($scope, $http, $state) {
  $http.get('/auth')
  .then(function(resp){
    if (resp.isAuth){
      $state.go("index");
    }
    else{
      $state.go("signup");
    }
			}).catch(function(err) {
				console.log(err);
			});
});

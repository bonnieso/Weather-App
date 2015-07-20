"use strict";

var app = angular.module('myWeather', ['ngRoute'])
.config(function($stateProvider, $urlRouterProvider) {
  // $urlRouterProvider.otherwise('/signup')
  $stateProvider
    .state('signup', {
      url: '/signup',
      templateUrl: '../views/signup.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: '../views/login.html'
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: '../views/index.html',
      controller: 'DashboardCtrl'
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
      return $http.get('http://api.wunderground.com/api/8f8e2900dfd1e401/forecast/q/' + state + '/' + city + '.json')
    }
  }
})
.filter('slice', function() {
  return function(arr, start, end) {
    return arr.slice(start, end);
  }
})
.controller("DashboardCtrl", function($scope, ForecastService) {
  $scope.locations = [];
  $scope.searchForecast = function(state, city) {
    
    $scope.cityForecast = ForecastService.getForecastData(state, city);

  }
  
  
})

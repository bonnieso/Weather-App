"use strict";

var app = angular.module('myWeather', ['ui.router'])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/')
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '../views/index.html',
        controller: 'homeCtrl'
      })
      .state('index', {
        url: '/index',
        templateUrl: '../views/index.html',
        controller: 'indexCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: '../views/signup.html',
        controller: 'signupCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: '../views/login.html',
        controller: 'loginCtrl'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: '../views/index.html',
        controller: 'dashboardCtrl'
      })
  })
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
  .factory('ForecastService', function ($http) {
    return {
      getForecastData: function (state, city) {
        return $http.get('http://api.wunderground.com/api/8f8e2900dfd1e401/forecast/q/' + state + '/' + city + '.json');
      }
    }
  })
  .controller("indexCtrl", function ($scope, ForecastService) {
    $scope.searchForecast = function (state, city) {
      ForecastService.getForecastData(state, city)
        .success(function (data) {
          console.log('forecast: ', data)
//          $scope.cityForecast = data;
        })
        .catch(function (err) {
          console.error(err);
        })
    }
  })
  //.filter('slice', function() {
  //  return function(arr, start, end) {
  //    return arr.slice(start, end);
  //  }
  //})
//  .controller("dashboardCtrl", function ($scope, ForecastService) {
//    $scope.locations = [];
//    $scope.searchForecast = function (state, city) {
//
//      $scope.cityForecast = ForecastService.getForecastData(state, city);
//      $scope.forecast = {};
//    };
//  })
  .controller("homeCtrl", function ($scope, $http, $state) {
    $http.get('/auth')
      .then(function (resp) {
        if (resp.isAuth) {
          $state.go("index");
        } else {
          $state.go("signup");
        }
      }).catch(function (err) {
        console.log(err);
      });
  })
  .controller("signupCtrl", function ($scope, $state, $http) {
    $scope.adduser = function (user) {
      $http.post('/signup', user)
        .success(function (data) {
          $state.go('login');
        })
        .catch(function (err) {
          console.error(err);
        })

    };
  })
  .controller("loginCtrl", function ($scope, $state, $http) {
    $scope.login = function (user) {
      $http.post('/login', user)
        .success(function (data) {
          $state.go('index');
        })
        .catch(function (err) {
          console.error(err);
        })

    };

  });
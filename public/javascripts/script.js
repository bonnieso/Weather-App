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
  .factory('ForecastService', function ($http) {
    return {
      getForecastData: function (state, city) {
        return $http.get('http://api.wunderground.com/api/8f8e2900dfd1e401/forecast10day/q/' + state + '/' + city + '.json');
      },
      getConditionsData: function (state, city) {
        return $http.get('http://api.wunderground.com/api/8f8e2900dfd1e401/conditions/q/' + state + '/' + city + '.json');
      }
    }
  })
  .factory('UserService', function ($http) {
    return {
      getUserForecast: function () {
        return $http.get();
      },
      saveUserForecast: function () {
        return $http.post();
      }
    }
  })
  .controller("indexCtrl", function ($scope, ForecastService) {
    $scope.searchForecast = function (state, city) {
      ForecastService.getConditionsData(state, city)
        .success(function(data) {
          $scope.conditions = {
            location: data.current_observation.display_location.full,
            temp: data.current_observation.temp_f,
            weather: data.current_observation.weather
          };
        })
        .catch(function (err) {
          console.error(err);
        })
      ForecastService.getForecastData(state, city)
        .success(function (data) {
          $scope.dailyForecast = data.forecast.simpleforecast.forecastday;
          $scope.search = {};
        })
        .catch(function (err) {
          console.error(err);
        })
    }
  })
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
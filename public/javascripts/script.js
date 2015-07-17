"use strict";

var app = angular.module('myWeather', ['ui.router'])
.config()
.factory('WeatherService', function($http){
  return {
    getUrlInfo: function(pos.coords.latitude, pos.coords.longitude) {
      return $http.get('http://api.wunderground.com/api/8f8e2900dfd1e401/forecast10day/q/' + pos.coords.latitude +',' +   pos.coords.longitude + '.json');
    },
    getUrlCond: function(pos.coords.latitude, pos.coords.longitude) {
      return $http.get('http://api.wunderground.com/api/8f8e2900dfd1e401/conditions/q/' + pos.coords.latitude +',' +   pos.coords.longitude + '.json');
    },
    getUrlCity: function(pos.coords.latitude, pos.coords.longitude) {
      return $http.get('http://api.wunderground.com/api/8f8e2900dfd1e401/geolookup/q/' + pos.coords.latitude +',' +   pos.coords.longitude + '.json');
    }
    getUrlHourly: function(pos.coords.latitude, pos.coords.longitude) {
      return $http.get('http://api.wunderground.com/api/8f8e2900dfd1e401/hourly10day/q/' + pos.coords.latitude +',' +   pos.coords.longitude + '.json');
    }
  }
})
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
.controller("MainCtrl", function($scope, ForecastService) {
  $scope.searchForecast = function(state, city) {
    $scope.cityForecast = ForecastService.getForecastData(state, city);
  }
}])
.filter('slice', function(){
  return function(arr, start, end){
    return arr.slice(start, end);
  };
})

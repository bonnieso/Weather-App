"use strict";

var app = angular.module('myTable', ['ui.bootstrap'])
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

})
.filter('slice', function() {
  return function(arr, start, end) {
    return arr.slice(start, end);
  }
})
.controller("MainCtrl", function($scope, WeatherService) {
  function clickNsa() {
    var options = {enableHighAccuracy: true, timeout: 5000, maximumAge: 0};
    navigator.geolocation.getCurrentPosition(success, error, options)
  }
  function success() {
    console.log(WeatherService.getUrlInfo);
    console.log(WeatherService.getUrlCond);
    console.log(WeatherService.getUrlCity);
    console.log(WeatherService.getUrlHourly);
  }
  function error() {
    console.log("Get your shit together");
  }
  function getForecastData(urlInfo) {
    var dates = [], dayShorts = [], tempsHighF = [], tempsLowF = [], conds = [], icons = [], conditions = [], monthShort = [];
    $.getJSON(urlInfo, function(response) {
      response.forecast.simpleforecast.forecastday.forEach(function(a){
        dates.push(a['date']['day']);
        dayShorts.push(a['date']['weekday']);
        tempsHighF.push(a['high']['fahrenheit']);
        tempsLowF.push(a['low']['fahrenheit']);
        conds.push(a['conditions']);
        icons.push(a['icon_url']);
        conditions.push(a['conditions']);
        monthShort.push(a['date']['monthname_short']);
      })
      addForecastData(dates, dayShorts, tempsHighF, tempsLowF, conds, icons, conditions, monthShort);
    })
  }

function getHourlyData(urlHourly){
  var hour = "", temp = "", icon = "", hours = [], hourlys = [];
  $.getJSON(urlHourly, function(response) {
    response.hourly_forecast.forEach(function(a){
      hour = a['FCTTIME']['hour'];
      hours.push(hour)
      temp = a['temp']['english'];
      hours.push(temp)
      icon = a['icon_url'];
      hours.push(icon)
      hourlys.push(hours);
      hours = [];
    })
    addHourlyData(hourlys);
    })
}

function getCondData(urlCond){

  var feelsLike = "";
  $.getJSON(urlCond, function(response) {
    feelsLike = response.current_observation['feelslike_f'];
    addCondData(feelsLike);
  })
}

function getCityData(urlCity){
var city = ""
var state = ""
  $.getJSON(urlCity, function(response) {
    city = response.location['city'];
    state = response.location['state'];
    addCityData(city, state);
  })
}
  clickNsa();
}])
.filter('slice', function(){
  return function(arr, start, end){
    return arr.slice(start, end);
  };
})
.directive('aTable', function(){
  return {
    restrict: 'E',
    scope: {
      tableData: "=",
      columns: "=",
      title: "@"
    },
    templateUrl: 'views/table.html',
    controller: ['$scope', '$window', '$filter', function($scope, $window, $filter){
      $scope.rows = [];
      $scope.pager = {
        currentPage: 1,
        totalItems: 0,
        itemsPerPage: 5
      }
      function initRows(){
        $scope.rows = [];
        angular.forEach($scope.tableData, function(row){
          $scope.rows.push(row);
        });
      }
      function initPager() {
        $scope.pager.totalItems = $scope.tableData.length;
        $scope.pager.currentPage = 1;
      }
      $scope.pageChanged = function() {
        $scope.start = ($scope.pager.currentPage-1) * $scope.pager.totalItems/5;
        $scope.end = $scope.pager.currentPage * $scope.pager.totalItems/5;
      };
      $scope.$watch('tableData', function() {
        initRows();
        initPager();
      });
    }]
  }
});
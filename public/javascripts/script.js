"use strict";

var app = angular.module('myTable', ['ui.bootstrap'])
.factory('tableService', ['$document', '$q', '$rootScope',
    function($document, $q, $rootScope){

    }
])
.filter('slice', function() {
  return function(arr, start, end) {
    return arr.slice(start, end);
  }
})
.controller("MainCtrl", [
'$scope',
'$http',
function($scope, $http){
  $scope.tableData = [];
  var url= "http://api.openweathermap.org/data/2.5/find?lat=37.54&lon=-121.98&cnt=50&callback=JSON_CALLBACK";
  $scope.getWeather = function() {
    $http({
      method: 'JSONP',
      url: url
      }).success(function(data) {
      var tdata = [];
      angular.forEach(data.list, function(value){
        tdata.push({
          id: value.id,
          name: value.name,
          weather: value.weather[0].main,
          clouds: value.clouds.all
        });
      });
      $scope.tableData = tdata;
      $scope.columns = [{data_type: "string", label: "id", visible: true},
                      {data_type: "string", label: "name", visible: true},
                      {data_type: "string", label: "weather", visible: true},
                      {data_type: "string", label: "clouds", visible: true}
                    ];
    });
  }   
  $scope.getWeather();
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
      //rows to be filters/searched
        $scope.rows = [];
        $scope.pager = {
          currentPage: 1,
          totalItems: 0,
          itemsPerPage: 5
        }
        //copy report data passed in into a rows array we can modify and reorder
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
        initPager();
        //if original tableData rows change, initialize the rows again
        $scope.$watch('tableData', function() {
          initRows();
          initPager();
        });
    }]
  }
});
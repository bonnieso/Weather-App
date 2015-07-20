'use strict';

$(document).ready(clickNsa);

function clickNsa() {
  var options = {enableHighAccuracy: true, timeout: 5000, maximumAge: 0};
  navigator.geolocation.getCurrentPosition(success, error, options)
}

function success(pos) {
  var urlInfo = 'http://api.wunderground.com/api/5ac2a3bc4dece267/forecast10day/q/' + pos.coords.latitude +',' +   pos.coords.longitude + '.json';
  var urlCond = 'http://api.wunderground.com/api/5ac2a3bc4dece267/conditions/q/' + pos.coords.latitude +',' +   pos.coords.longitude + '.json';
  var urlCity = 'http://api.wunderground.com/api/5ac2a3bc4dece267/geolookup/q/' + pos.coords.latitude +',' +   pos.coords.longitude + '.json';
  var urlHourly = 'http://api.wunderground.com/api/5ac2a3bc4dece267/hourly10day/q/' + pos.coords.latitude +',' +   pos.coords.longitude + '.json';
  getForecastData(urlInfo);
  getHourlyData(urlHourly);
  getCondData(urlCond);
  getCityData(urlCity);
}

function error(err) {
  console.log('could not find your position', err)
}

function getForecastData(urlInfo) {
  var dates = [];
  var dayShorts = [];
  var tempsHighF = [];
  var tempsLowF = [];
  var conds = [];
  var icons = [];
  var conditions = [];
  var monthShort = [];

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
  var hour = "";
  var temp = "";
  var icon = "";
  var hours = [];
  var hourlys = [];

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

function addForecastData(dates, dayShorts, tempsHighF, tempsLowF, conds, icons, conditions, monthShort){
  var count = 1;
  for(var i = 0; i < 11; i++){
    $('#day' + count).text(dayShorts[count-1]);
    $('#icon' + count).css('background-image', 'url(' + icons[count-1] + ')');
    $('#tHigh' + count).text(tempsHighF[count-1]);
    $('#tLow' + count).text(tempsLowF[count-1]);
    $('#day1').text('Today')

    count+= 1;
    if(count === 11){
      count = 0;
    }
  }
  $('#cond').text(conditions[0])
  $('#monthDay').text(monthShort[0] + " " + dates[0]);
}

function addCondData(feelsLike){
  $('#currentTemp').text(Math.round(feelsLike));
}

function addCityData(city, state){
  $('#city').text(city + ", " + state);
}

function addHourlyData(hourlys){
// var hourlyHour = "";
// var hourlyTemp = "";
// var hourlyIcon = "";
// var $hourlyHour = $('.hourlyHour');
// var $hourlyTemp = $('.hourlyTemp');
// var $hourlyIcon = $('.hourlyIcon');
// var count = 0;
//
//   for(var i = 0; i < 24; i++){
//     $hourlyHour.append($('<div>').text(hourlys[i][0] + ":00 " + hourlys[i][1]));
//     debugger;
//     if(hourlys[i][0] === "23"){
//     return;
//     }
//   }
}\



<!DOCTYPE html>
<html ng-app="myTable">
  <head>
    <meta charset="utf-8" />
    <title>Stanley Weather App</title>
    <link data-require="bootstrap-css@*" data-semver="3.1.1" rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" />
    <script>document.write('<base href="' + document.location + '" />');</script>
    <link rel="stylesheet" href="stylesheets/style.css" />
  </head>
  <body ng-controller="MainCtrl">
    <div class="container-fluid">
      <div class="text-center">
        <h2>Hello Sunshine 2.0</h2>
      </div>
      <div class="container">
        <form action="" class="form-group">
          <input type="text" class="form-control" placeholder="City" ng-model="city">
          <input type="text" class="form-control" placeholder="State" ng-model="state">
          <button ng-submit="searchForecast(state, city)">Search</button>
        </form>
      </div>
    </div>
    <script data-require="angular.js@1.2.x" src="https://code.angularjs.org/1.2.25/angular.js" data-semver="1.2.25"></script>
    <script data-require="ui-bootstrap@*" data-semver="0.11.0" src="http://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.11.0.min.js"></script>
    <script src="javascripts/script.js"></script>
  </body>
</html>

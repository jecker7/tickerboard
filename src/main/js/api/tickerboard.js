// our controller module -  a JS function using Angular $http to consume our Spring REST service
angular.module('tickerboard', [])
.controller('board', function($scope, $http){
    $http.get('http://localhost:8080/api/stocks').
        then(function(response){
            $scope.tickerdata = response.data;
        });
});
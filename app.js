/* global angular */
angular.module('randomApp', [])
  .controller('randomCon', function ($scope) {
    $scope.arr = []
    $scope.bingo = []

      while($scope.arr.length < 99){
        var randomnumber=Math.ceil(Math.random()*99)
        var found=false;
        for(var i=0;i<$scope.arr.length;i++){
        if($scope.arr[i]==randomnumber){found=true;break}
        }
        if(!found){
          $scope.arr[$scope.arr.length]=randomnumber
        }
      }

    $scope.play = function () {
      $scope.bingo.push($scope.arr.splice(0, 1))
    }
  })

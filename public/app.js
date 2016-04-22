/* global angular */
angular.module('randomApp', [])
  .controller('randomCon', function ($scope, $http) {
    $scope.arr = []
    $scope.bingo = []
    $scope.paper = [[45, 75, 65, 57, 50],
      [95, 26, 74, 96, 68],
      [80, 20, 63, 84, 70],
      [52, 76, 90, 18, 53],
      [61, 89, 65, 81, 54]]

    $http({
      method: 'GET',
      url: '/data'
    }).then(function successCallback (response) {
      $scope.paper = response.data.arr
      $scope.master = response.data.arr
    // console.log($scope.paper)
    }, function errorCallback (response) {})

    var witeFile = function () {
      $http.post('/data', {arr:$scope.paper}).success((req, res) => {})
    }


    while ($scope.arr.length < 99) {
      var randomnumber = Math.ceil(Math.random() * 99)
      var found = false
      for (var i = 0;i < $scope.arr.length;i++) {
        if ($scope.arr[i] === randomnumber) {
          found = true
          break
        }
      }
      if (!found) {
        $scope.arr[$scope.arr.length] = randomnumber
      }
    }

    $scope.play = function () {
      $scope.bingo.push($scope.arr.splice(0, 1))
      $scope.show = $scope.bingo.map(function (obj) { return obj[0]})
      $scope.last = $scope.show[$scope.show.length - 1]
      //  $scope.last =
      checked()
      checked()
      bingo()
      witeFile()
    }

    var checked = function () {
      $scope.paper.forEach(function (item, index) {
        item.data.forEach(function (item2, index2) {
          var temp = item2.indexOf($scope.last)
          if (temp !== -1) {
            // console.log(index2 + ', ' + temp)
            // console.log(index )
            $scope.paper[index].data[index2][temp] = null
          // console.log(item.data)
          }
        })
      })
    }
    var bingo = function () {
      $scope.paper.forEach(function (item, index) {
        // console.log(index)
        if (item.status){
        item.data.forEach(function (item2, index2) {
          // console.log(index2+','+item2)
          //  for (var i=0;i<5;i++){
          // $scope.paper[index].data[0].forEach((elem,i)=>{$scope.paper[index].data[0][i] = null})
          //  $scope.paper[index].data.forEach((elem,i)=>{$scope.paper[index].data[i][0] = null})
          //  }
          for (var i = 0;i < 5;i++) {
            var row = item.data[i].every(elem => elem === null)
            var col = item.data.every(elem => elem[0] === null)
            $scope.row = $scope.col = false
            if (row) {
              $scope.row = true
              $scope.result = 'bingo row' + index
              $scope.result2 = $scope.paper[index]
            }
            if (col) {
              $scope.col = true
              $scope.result = 'bingo col' + index
              $scope.result2 = $scope.paper[index]
            }

          }

          //  var col = $scope.paper[index].data.every(elem=>elem[0]===null)


          //  console.log(item.data)

        })
         if (item.data[0][0]=== null&&item.data[1][1]===null&&item.data[2][2]===null&&item.data[3][3]===null&&item.data[4][4]===null)
          {
            console.log('BingoCrossL');
            console.log(item);
            item.status = false
          }
         if (item.data[4][0]===null&&item.data[3][1]===null&&item.data[2][2]===null&&item.data[1][3]===null&&item.data[0][4]===null)
         {
           console.log('BingoCrossR');
           console.log(item)
           item.status = false
         }
         if (item.data[0][0]===null&&item.data[0][4]===null&&item.data[4][0]===null&&item.data[4][4]===null)
         {
           console.log('BingoCornerOut');
           console.log(item);
           item.status = false
         }
        if (item.data[1][1]===null&&item.data[1][3]===null&&item.data[3][1]===null&&item.data[3][3]===null)
        {
          console.log('BingoCornerIn');
          console.log(item);
          item.status = false
        }

        if ($scope.row || $scope.col ){
          item.status = false
        console.log($scope.result)
        console.log($scope.result2)}
      }
      })

    }
  })

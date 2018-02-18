angular.module('todoCtrl', []).controller('todoCtrl', function($scope, $http) {


    $scope.snackBar = function(msg) {
        $scope.snackHead = msg;
        var x = document.getElementById("snackbar")
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }

    $scope.post  = function(url, data) {

        $http.post(url, data)
        .then(function(resp) {
            if (resp.data.success) {
                $scope.snackBar('Succesful');
                $scope.getDefaultObj();
            } else {
                $scope.snackBar('Something is wrong');
            }
            /* Success */
           
        }, function(resp) {

            /* Failure */
            
        });
        
        // $scope.$apply();

    };

    $scope.getDefaultObj = function() {
        $scope.employeeData = {
            firstName : "",
            lastName : "",
            age : "",
            designation : "",

        };
    };

    $scope.getDefaultObj();
    
    
    function isString(x) {
      return Object.prototype.toString.call(x) === "[object String]"
    }

    $scope.addMore = function(employeeData) {

        if (!isString(employeeData.firstName)) {
            $scope.snackBar("Only characters is allowed");
            return;
        }

        if (!isString(employeeData.lastName)) {
            $scope.snackBar("Only characters is allowed");
            return;
        }

        if (employeeData.age > 60 || employeeData.age < 18) {
            $scope.snackBar("Age should be greater than 18 and less than 60");
            return;
        }
        
        var obj = {
            'data' : employeeData,
            'date' : Date.now()
        };
        
        $scope.post('/saveDataManual', obj);
    };

});
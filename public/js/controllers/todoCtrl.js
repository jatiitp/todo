angular.module('todoCtrl', []).controller('todoCtrl', function($scope, $http) {


    $scope.snackBar = function(msg) {
        $scope.snackHead = msg;
        var x = document.getElementById("snackbar")
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }

    $scope.mainData = [];

    $scope.fetchDataOnLoad = function() {
        $http.get('/getData')
            .then(function(resp) {
                
                $scope.todoList = resp.data.docs;
                console.log($scope.todoList);
                $scope.hideAll();
                $scope.todoData = '';
                // $scope.fetchDataByName($scope.todoList[$scope.todoList.length - 1], $scope.todoList.length - 1);
                
            }, function(resp) {
                /* Failure */
                
            });
    }
    $scope.fetchDataOnLoad();


    $scope.fetchDataByName = function(name, index) {
        for (var i = 0; i < $scope.dataName.length; i++) {
            $scope.dataName[i].class = "";
        }
        $scope.dataName[index].class = "blue-back";
       
    }

    $scope.post  = function(url, data) {

        $http.post(url, data)
        .then(function(resp) {
            if (resp.data.success) {
                $scope.fetchDataOnLoad();
                $scope.snackBar('Succesful');
            } else {
                $scope.snackBar('Something is wrong');
            }
            /* Success */
           
        }, function(resp) {

            /* Failure */
            
        });
        
        // $scope.$apply();

    };

    $scope.todoData = '';
    // $scope.dateNow = Date.now();
    // $scope.dateNow = (Math.random()*100000).toFixed(0);

    $scope.addMore = function(todoData) {
        console.log(todoData);
        var obj = {
            'todoData' : todoData,
            'dateNow' : Date.now()
        };
        
        $scope.post('/saveDataManual', obj);
    };

    $scope.hideAll  = function() {
        for (var i = 0; i < $scope.todoList.length; i++) {
            $scope.todoList[i].edit = false;
        }
    };

    $scope.edit = function(index) {
        $scope.hideAll();
        $scope.todoList[index].edit = true;

    };

    $scope.delete = function(index) {
        $scope.hideAll();
        var obj = {
            todoData : $scope.todoList[index].todoData,
            dateNow : $scope.todoList[index].dateNow
        };
        $scope.post("/delete", obj);
    };

    $scope.save = function(index) {
        $scope.hideAll();
        var obj = {
            todoData : $scope.todoList[index].todoData,
            dateNow : $scope.todoList[index].dateNow
        };
        $scope.post("/saveData", obj);
    };

    $scope.cancel = function(index) {
        $scope.hideAll();
    };

});
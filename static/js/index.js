
angular.module("myApp",["ngRoute","ngAnimate"])
    .config(function($routeProvider){
        $routeProvider.when("/",{
            templateUrl:"/html/main.html",
            controller:"main"
        }).when("/addInfo",{
            templateUrl:"/html/addInfo.html",
            controller:"addInfo"
        })
    })
    .controller("addInfo",["$scope","$http","$timeout",function ($scope,$http,$timeout){
        $scope.isshow=false;
        $scope.newarr = {name:"",sex:"",age:""};
        $scope.reset = function() {
            $scope.isshow=true;
            $http({url:"/addInfo",params:{name:$scope.newarr.name,sex:$scope.newarr.sex,age:$scope.newarr.age}}).then(function (data) {
                if(data.data){
                    $scope.isshow=false;
                }
            });
        };
    }])
    .controller("main",["$scope","$http","$timeout",function ($scope,$http,$timeout) {
        $scope.data=[];
        $scope.isshow=false;
        $scope.isAddInfoShow=false;
        //查询
        $http({url:"/select"}).then(function (data) {
            $scope.data = data.data;
        });
        //删除
        $scope.del=function (id) {
            $scope.isshow=true;
            $http({url:"/del/"+id}).then(function (data) {
                if(data.data=="ok"){
                    $timeout(function () {
                        $scope.isshow=false;
                        $scope.data.forEach(function (val,index) {
                            if(id==val.id){
                                $scope.data.splice(index,1);
                            }
                        });
                    },350);

                }
            });
        };
        //修改
        $scope.update=function (id,name,values) {
            $scope.isshow=true;
            $http({url:"/update",params:{id:id,name:name,values:values}}).then(function (data) {
                if(data.data=="ok"){
                    $timeout(function () {
                        $scope.isshow=false;
                        $scope.data.forEach(function (val,index) {
                            if(id==val.id){
                                $scope.data[index][name]=values;
                            }
                        });
                    },350);

                }
            });
        };
    }]);